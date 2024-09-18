import React, { useState } from 'react';
import { Row, Col, Button, message } from 'antd';
import CommonInput from '../input';
import CommonDropdown from '../dropdown';
import { DownOutlined } from '@ant-design/icons';
import './wastecontent.css'
const WasteContent = () => {
  const [inputs, setInputs] = useState(
    Array.from({ length: 3 }, () => ({
      material: '',
      sourceReduced: '',
      recycled: '',
      landfilled: '',
      combusted: '',
      totalEmissions: '',
    }))
  );

  const handleInputChange = (rowIndex, key, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[rowIndex][key] = value;
    setInputs(updatedInputs);
  };

//   const handleSubmit = async () => {
//     try {
//       await postWasteData(inputs);
//       message.success('Data successfully posted!');
//     } catch (error) {
//       message.error('Failed to post data.');
//     }
//   };

  const dropdownItems = [
    { label: 'Material Option 1', key: '1' },
    { label: 'Material Option 2', key: '2' },
    { label: 'Material Option 3', key: '3' }
  ];

  return (
    <div className='container'>
      <h3>Details of Waste Materials Used:</h3>
      <div className='table-headers'>
        <span className='header-name'>Material</span>
        <span className='header-name'>Source Reduced</span>
        <span className='header-name'>Recycled</span>
        <span className='header-name'>Landfilled</span>
        <span className='header-name'>Combusted</span>
        <span className='header-name'>Total Emissions</span>
      </div>
      {[0, 1, 2].map((rowIndex) => (
        <div key={rowIndex} className='row'>
          <Row gutter={16} align="middle">
            <Col span={4}>
              <CommonDropdown
                items={dropdownItems}
                buttonText={inputs[rowIndex].material || "Select Material"}
                icon={<DownOutlined />}
                onClick={(e) => handleInputChange(rowIndex, 'material', e.key)}
              />
            </Col>
            {['sourceReduced', 'recycled', 'landfilled', 'combusted', 'totalEmissions'].map((field, colIndex) => (
              <Col key={colIndex} span={4}>
                <CommonInput
                  suffix="MT"
                  value={inputs[rowIndex][field]}
                  onChange={(e) => handleInputChange(rowIndex, field, e.target.value)}
                />
              </Col>
            ))}
          </Row>
          <div className='divider'></div>
        </div>
      ))}
    </div>
  );
};

export default WasteContent;
