// import React, { useEffect, useState } from 'react';
// import { Button, Card, Tabs, notification } from 'antd';
// import { DownloadOutlined } from '@ant-design/icons';
// import './reporting.css';
// import ButtonGroup from '../../components/custombutton';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteEnergyData, getEnergyData, updateEnergyData } from '../../redux/slices/energyslice';
// import EnergyContent from '../../components/reportingtab/energycontent';
// import WasteContent from '../../components/reportingtab/wastecontent';
// import Packaging from '../../components/reportingtab/packaging';
// import Cdp from './Cdp';
// const { TabPane } = Tabs;

// const Reporting = () => {
//   const dispatch = useDispatch();
//   const [activeTabKey, setActiveTabKey] = useState('sustainabilityReporting');
//   const [activeNestedTabKey, setActiveNestedTabKey] = useState('energy');
//   const { data: energyData, loading, error } = useSelector((state) => state.energy);

//   useEffect(() => {
//     dispatch(getEnergyData());
//   }, [dispatch]);

//   const handleNext = () => {
//     // Example: Move to the next tab in the "reporting" tab section
//     if (activeTabKey === 'reporting') {
//       const currentIndex = reportingNestedTabs.findIndex(tab => tab.key === activeNestedTabKey);
//       if (currentIndex < reportingNestedTabs.length - 1) {
//         const nextTabKey = reportingNestedTabs[currentIndex + 1].key;
//         setActiveNestedTabKey(nextTabKey);
//       } else {
//         // Handle case where there are no more tabs
//         notification.info({
//           message: 'End of Tabs',
//           description: 'You are already on the last tab.',
//         });
//       }
//     }
//   };

//   const handleReset = async () => {
//     try {
//       await dispatch(deleteEnergyData());
//       notification.success({
//         message: 'Reset Successful',
//         description: 'Data has been reset successfully.',
//       });
//       dispatch(getEnergyData());
//     } catch (err) {
//       notification.error({
//         message: 'Reset Failed',
//         description: 'Error resetting data: ' + err.message,
//       });
//     }
//   };

//   const handleSave = async () => {
//     try {
//       await dispatch(updateEnergyData(energyData));
//       notification.success({
//         message: 'Save Successful',
//         description: 'Data has been saved successfully.',
//       });
//     } catch (err) {
//       notification.error({
//         message: 'Save Failed',
//         description: 'Error saving data: ' + err.message,
//       });
//     }
//   };

//   const tabListNoTitle = [
//     { key: 'preSurvey', tab: 'Pre-Survey' },
//     { key: 'cdpDetails', tab: 'CDP Details' },
//     { key: 'reporting', tab: 'Reporting' },
//   ];

//   const reportingNestedTabs = [
//     { key: 'energy', tab: 'Energy' },
//     { key: 'waste', tab: 'Waste' },
//     { key: 'packaging', tab: 'Packaging' },
//   ];

//   const nestedTabContent = {
//     energy: <EnergyContent data={energyData} />,
//     waste: <WasteContent data={energyData} />,
//     packaging: <Packaging data={energyData}/>,
//   };

//   const contentListNoTitle = {
//     sustainabilityReporting: <p>Pre-Survey</p>,
//     cdpDetails: <Cdp/>,
//     reporting: (
//       <Tabs
//         activeKey={activeNestedTabKey}
//         onChange={setActiveNestedTabKey}
//         className="nested-tabs"
//       >
//         {reportingNestedTabs.map(tab => (
//           <TabPane tab={tab.tab} key={tab.key}>
//             {nestedTabContent[tab.key]}
//           </TabPane>
//         ))}
//       </Tabs>
//     ),
//   };

//   const buttonConfigs = [
//     { text: 'Reset', onClick: handleReset, style: { borderRadius: '25px' } },
//     { text: 'Save', onClick: handleSave, style: { borderRadius: '25px' } },
//     { text: 'Next', onClick: handleNext, style: { borderRadius: '25px' }, disabled: (activeTabKey === 'reporting' && activeNestedTabKey === 'packaging') },
//   ];

//   return (
//     <div className="reporting">
//       <div className="header-container">
//         <Button className="header-button" type="primary" icon={<DownloadOutlined />}>
//           PDF Download
//         </Button>
//       </div>
//       <div className="content-container">
//         <Card
//           className="custom-card"
//           tabList={tabListNoTitle}
//           activeTabKey={activeTabKey}
//           onTabChange={setActiveTabKey}
//           tabProps={{ size: 'middle' }}
//         >
//           {contentListNoTitle[activeTabKey]}
//         </Card>
//       </div>
//       <div className="footer-container">
//         <ButtonGroup buttons={buttonConfigs} />
//       </div>
//     </div>
//   );
// };

// export default Reporting;
import React, { useState,useRef,useEffect } from 'react';
import { Button, Card, Tabs, notification } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import './reporting.css';
import ButtonGroup from '../../components/custombutton';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEnergyData, getEnergyData, updateEnergyData } from '../../redux/slices/energyslice';
import EnergyContent from '../../components/reportingtab/energycontent';
import WasteContent from '../../components/reportingtab/wastecontent';
import Packaging from '../../components/reportingtab/packaging';
import Cdp from './Cdp';
const { TabPane } = Tabs;

const Reporting = () => {
  const dispatch = useDispatch();
  const cdpRef = useRef(null);
  const [activeTabKey, setActiveTabKey] = useState('sustainabilityReporting');
  const [activeNestedTabKey, setActiveNestedTabKey] = useState('energy');
  const { data: energyData, loading, error } = useSelector((state) => state.energy);

  useEffect(() => {
    dispatch(getEnergyData());
  }, [dispatch]);

  const handleNext = () => {
    if (activeTabKey === 'reporting') {
      const currentIndex = reportingNestedTabs.findIndex(tab => tab.key === activeNestedTabKey);
      if (currentIndex < reportingNestedTabs.length - 1) {
        const nextTabKey = reportingNestedTabs[currentIndex + 1].key;
        setActiveNestedTabKey(nextTabKey);
      } else {
        notification.info({
          message: 'End of Tabs',
          description: 'You are already on the last tab.',
        });
      }
    }
  };

  const handleReset = async () => {
    try {
      await dispatch(deleteEnergyData());
      notification.success({
        message: 'Reset Successful',
        description: 'Data has been reset successfully.',
      });
      dispatch(getEnergyData());
    } catch (err) {
      notification.error({
        message: 'Reset Failed',
        description: 'Error resetting data: ' + err.message,
      });
    }
  };

  const handleSave = async () => {
    try {
      if (cdpRef.current) {
        cdpRef.current.saveData(); // Call the saveData method of Cdp component
      }
      await dispatch(updateEnergyData(energyData));
      // notification.success({
      //   message: 'Save Successful',
      //   description: 'Data has been saved successfully.',
      // });
    } catch (err) {
      notification.error({
        message: 'Save Failed',
        description: 'Error saving data: ' + err.message,
      });
    }
  };

  const tabListNoTitle = [
    { key: 'preSurvey', tab: 'Pre-Survey' },
    { key: 'cdpDetails', tab: 'CDP Details' },
    { key: 'reporting', tab: 'Reporting' },
  ];

  const reportingNestedTabs = [
    { key: 'energy', tab: 'Energy' },
    { key: 'waste', tab: 'Waste' },
    { key: 'packaging', tab: 'Packaging' },
  ];

  const nestedTabContent = {
    // energy: <EnergyContent data={energyData} />,
    // waste: <WasteContent data={energyData} />,
    // packaging: <Packaging data={energyData}/>,
  };

  const contentListNoTitle = {
    sustainabilityReporting: <p>Pre-Survey</p>,
    cdpDetails: <Cdp ref={cdpRef}/>,
    reporting: (
      <Tabs
        activeKey={activeNestedTabKey}
        onChange={setActiveNestedTabKey}
        className="nested-tabs h-auto!"
      >
        {reportingNestedTabs.map(tab => (
          <TabPane tab={tab.tab} key={tab.key}>
            {nestedTabContent[tab.key]}
          </TabPane>
        ))}
      </Tabs>
    ),
  };

  const buttonConfigs = [
    { text: 'Reset', onClick: handleReset, style: { borderRadius: '25px' }},
    { text: 'Save', onClick: handleSave, style: { borderRadius: '25px' },'data-testid': 'save-button'  },
    { text: 'Next', onClick: handleNext, style: { borderRadius: '25px' }, disabled: (activeTabKey === 'reporting' && activeNestedTabKey === 'packaging') },
  ];

  return (
    <div className="reporting">
      <div className="header-container">
        <Button className="header-button" type="primary" icon={<DownloadOutlined />}>
          PDF Download
        </Button>
      </div>
      <div className="content-container">
        <Card
          className="custom-card"
          tabList={tabListNoTitle}
          activeTabKey={activeTabKey}
          onTabChange={setActiveTabKey}
          tabProps={{ size: 'middle' }}
        >
          {contentListNoTitle[activeTabKey]}
        </Card>
      </div>
      <div className="footer-container">
        <ButtonGroup buttons={buttonConfigs} />
      </div>
    </div>
  );
};

export default Reporting;

