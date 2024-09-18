import React, { useEffect, useState,useImperativeHandle,forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button,Form, Input, notification  } from 'antd';
import FormInput from '../../components/FormInput/FormInput';
import '../reporting/Cdp.css';
import { getCdpData } from '../../redux/slices/cdpslice';
import { validationMessages } from '../../constants';


// const Cdp = forwardRef((props, ref) => {
//   const dispatch = useDispatch();
//   const { data: cdpData = {}, loading, error } = useSelector((state) => state.cdp);
//   const [inputData, setInputData] = useState({
//     reportingYear: '',
//     cdpScore: '',
//     emissionDataList: [],
//     annualSavingsList: [],
//     comments: '',
//     percentageOfIntensity: ''
//   });
//   useEffect(() => {
//     const savedData = JSON.parse(localStorage.getItem('cdpData'));
//     if (savedData) {
      
//       setInputData(savedData);
//     }
//   }, []);

//   useImperativeHandle(ref, () => ({
//     saveData: () => {
      
//       localStorage.setItem('cdpData', JSON.stringify(inputData));
//       console.log('CDP data saved:', inputData);
//     }
//   }));
//   useEffect(() => {
//     dispatch(getCdpData());
//   }, [dispatch]);

//   useEffect(() => {
//     if (cdpData) {
//       console.log("cdpdata : ", cdpData);
//       setInputData({
//         reportingYear: cdpData.reportingYear || '',
//         cdpScore: cdpData.cdpScore || '',
//         emissionDataList: cdpData.emissionDataList || [],
//         annualSavingsList: cdpData.annualSavingsList || [],
//         comments: cdpData.comments || '',
//         percentageOfIntensity: cdpData.percentageOfIntensity || ''
//       });
//     }
//   }, [cdpData]);
//   useEffect(() => {
//     if (error) {
//       console.error('Error:', error);
//       setInputData({
//         reportingYear: '',
//         cdpScore: '',
//         emissionDataList: [{ scope1: '', scope2LocationBased: '', scope2MarketBased: '' }],
//         annualSavingsList: [{ initiativeCategory: '', annualCo2Savings: '', lifetimeOfInitiative: '' }],
//         comments: '',
//         percentageOfIntensity: ''
//       });
//     }
//   }, [error]);

//   const handleInputChange = (e, field, index = null, listType = null) => {
//     const value = e.target.value;
//     console.log("Field:", field, "Value:", value, "Index:", index, "ListType:", listType);
  
//     if (listType) {
//       setInputData(prevState => {
//         const updatedList = [...prevState[listType]];
//         updatedList[index][field] = value;
//         return { ...prevState, [listType]: updatedList };
//       });
//     } else {
//       setInputData(prevState => ({ ...prevState, [field]: value }));
//     }
//   };

  

//   if (loading) return <div>Loading...</div>;
  
//   return (
//     <div style={{ height: '400px', lineHeight: '10px' }}>
//       <Row gutter={[16, 16]}>
//         <Col span={6}>
//           <h3 className="text-[#014d4ecd] font-bold">CDP Reporting Year</h3>
//         </Col>
//         <Col span={6}>
//           <FormInput
//             placeholder="Enter Reporting Year"
//             value={inputData.reportingYear || ''}  
//             onChange={(e) => handleInputChange(e, 'reportingYear')}
//           />
//         </Col>
//         <Col span={6}>
//           <h3 className="text-[#014d4ecd] font-bold">CDP Score</h3>
//         </Col>
//         <Col span={6}>
//           <FormInput
//             placeholder="Enter CDP Score"
//             value={inputData.cdpScore}
//             onChange={(e) => handleInputChange(e, 'cdpScore')}
//             rules={[{ required: true, message: 'Please enter the CDP score' }]}
//           />
//         </Col>
//       </Row>

//       <div>
//         <h4 className="text-[#014d4ecd] leading-[4] font-bold">Emission Data [C6]</h4>
//       </div>

//       <Row gutter={[16, 16]}>
//         {inputData.emissionDataList?.map((emission, index) => (
//           <React.Fragment key={index}>
//             <Col span={8}>
//               <FormInput
//                 className="text-[#014d4ecd]"
//                 label={`Scope 1 Location Based [C6] - ${index + 1}`}
//                 placeholder="Enter Scope 1"
//                 value={emission.scope1 || ''}
//                 onChange={(e) => handleInputChange(e, 'scope1', index, 'emissionDataList')}
//               />
//             </Col>
            
//             <Col span={8}>
//               <FormInput
//                 className="text-[#014d4ecd]"
//                 label={`Scope 2 Location Based [C6.3] - ${index + 1}`}
//                 placeholder="Enter Scope 2 Location Based"
//                 value={emission.scope2LocationBased || ''}
//                 onChange={(e) => handleInputChange(e, 'scope2LocationBased', index, 'emissionDataList')}
//               />
//             </Col>
//             <Col span={8}>
//               <FormInput
//                 className="text-[#014d4ecd]"
//                 label={`Scope 2 Market Based [C6.3] - ${index + 1}`}
//                 placeholder="Enter Scope 2 Market Based"
//                 value={emission.scope2MarketBased || ''}
//                 onChange={(e) => handleInputChange(e, 'scope2MarketBased', index, 'emissionDataList')}
//               />
//             </Col>
//           </React.Fragment>
//         ))}
//       </Row>

//       <div>
//         <h4 className="text-[#014d4ecd] font-bold leading-[3]">Annual Savings</h4>
//       </div>

//       <Row gutter={[16, 16]}>
//         {inputData.annualSavingsList?.map((saving, index) => (
//           <React.Fragment key={index}>
//             <Col span={8}>
//               <FormInput
//                 className="text-[#014d4ecd]"
//                 label={`Initiative Category - ${index + 1}`}
//                 placeholder="Enter Initiative Category"
//                 value={saving.initiativeCategory || ''}
//                 onChange={(e) => handleInputChange(e, 'initiativeCategory', index, 'annualSavingsList')}
//               />
//             </Col>
//             <Col span={8}>
//               <FormInput
//                 className="text-[#014d4ecd]"
//                 label={`Annual CO2 Savings - ${index + 1}`}
//                 placeholder="Enter CO2 Savings"
//                 value={saving.annualCo2Savings || ''}
//                 onChange={(e) => handleInputChange(e, 'annualCo2Savings', index, 'annualSavingsList')}
//               />
//             </Col>
//             <Col span={8}>
//               <FormInput
//                 className="text-[#014d4ecd]"
//                 label={`Lifetime of Initiative - ${index + 1}`}
//                 placeholder="Enter Lifetime of Initiative"
//                 value={saving.lifetimeOfInitiative || ''}
//                 onChange={(e) => handleInputChange(e, 'lifetimeOfInitiative', index, 'annualSavingsList')}
//               />
//             </Col>
//           </React.Fragment>
//         ))}
//       </Row>

//       <Row gutter={[16, 16]}>
//         <Col span={6}>
//           <h4 className="text-[#014d4ecd] font-bold mt-2">Comments</h4>
//         </Col>
//         <Col span={16}>
//           <FormInput
//             placeholder="Enter Comments"
//             value={inputData.comments}
//             onChange={(e) => handleInputChange(e, 'comments')}
//           />
//         </Col>
//       </Row>

//       <Row gutter={[16, 16]}>
//         <Col span={8}>
//           <h4 className="text-[#014d4ecd] font-bold mt-4">Intensity % attributed for your company</h4>
//         </Col>
//         <Col span={8}>
//           <FormInput
//             placeholder="Enter Intensity %"
//             value={inputData.percentageOfIntensity}
//             onChange={(e) => handleInputChange(e, 'percentageOfIntensity')}
//           />
//         </Col>
//       </Row>

//       {/* <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
//         <Col span={24}>
//           <Button type="primary" onClick={handleSave}>
//             Save
//           </Button>
//         </Col>
//       </Row> */}
//     </div>
//   );
// });

// export default Cdp;

const Cdp = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { data: cdpData = {}, loading, error } = useSelector((state) => state.cdp);
  const [inputData, setInputData] = useState({
    reportingYear: '',
    cdpScore: '',
    emissionDataList: [],
    annualSavingsList: [],
    comments: '',
    percentageOfIntensity: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('cdpData'));
    if (savedData) {
      setInputData(savedData);
    }
  }, []);

  useImperativeHandle(ref, () => ({
    saveData: () => {
      if (validate()) {
        localStorage.setItem('cdpData', JSON.stringify(inputData));
        console.log('CDP data saved:', inputData);
        notification.success({
          message: 'Save Successful',
          description: 'Data has been saved successfully.',
        });
      }
    }
  }));

  useEffect(() => {
    dispatch(getCdpData());
  }, [dispatch]);

  useEffect(() => {
    if (cdpData) {
      console.log("cdpdata : ", cdpData);
      setInputData({
        reportingYear: cdpData.reportingYear?cdpData.reportingYear:'',
        cdpScore: cdpData.cdpScore?cdpData.cdpScore:'',
        emissionDataList: cdpData.emissionDataList?cdpData.emissionDataList:[],
        annualSavingsList: cdpData.annualSavingsList?cdpData.annualSavingsList:[],
        comments: cdpData.comments?cdpData.comments:'',
        percentageOfIntensity: cdpData.percentageOfIntensity?cdpData.percentageOfIntensity:''
      });
    }
  }, [cdpData]);

  useEffect(() => {
    if (error) {
      console.error('Error:', error);
      // notification.error({
      //   message: 'Error',
      //   description: 'There was an error fetching CDP data.',
      // });
      setInputData({
        reportingYear: '',
        cdpScore: '',
        emissionDataList: [{ scope1: '', scope2LocationBased: '', scope2MarketBased: '' }],
        annualSavingsList: [{ initiativeCategory: '', annualCo2Savings: '', lifetimeOfInitiative: '' }],
        comments: '',
        percentageOfIntensity: ''
      });
    }
  }, [error]);

  const handleInputChange = (e, field, index = null, listType = null) => {
    const value = e.target.value;
    console.log("Field:", field, "Value:", value, "Index:", index, "ListType:", listType);

    if (listType) {
      setInputData(prevState => {
        const updatedList = [...prevState[listType]];
        updatedList[index][field] = value;
        return { ...prevState, [listType]: updatedList };
      });
    } else {
      setInputData(prevState => ({ ...prevState, [field]: value }));
    }
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      if (listType) {
        delete updatedErrors[`${field}-${index}`];
      } else {
        delete updatedErrors[field];
      }
      return updatedErrors;
    });

  };

  const validate = () => {
    const newErrors = {};
    let isValid = true;

    if (!inputData.reportingYear) {
      newErrors.reportingYear = validationMessages.cdprequired;
      isValid = false;
    }else if (!/^\d{4}$/.test(inputData.reportingYear)) {
      newErrors.reportingYear = validationMessages.cdpValidYear;
      isValid = false;
    }else if (parseInt(inputData.reportingYear) <= 2022) {
      newErrors.reportingYear =validationMessages.cdpValid;
      isValid = false;
    }

    const validScores = ['A', 'B', 'C'];
  if (!inputData.cdpScore) {
    newErrors.cdpScore = validationMessages.scorerequired;
    isValid = false;
  } else if (!validScores.includes(inputData.cdpScore.toUpperCase())) {
    newErrors.cdpScore = validationMessages.cdpscore;
    isValid = false;
  }

    inputData.emissionDataList.forEach((emission, index) => {
      if (!emission.scope1) {
        newErrors[`scope1-${index}`] = validationMessages.scope1;
        isValid = false;
      }
      if (!emission.scope2LocationBased) {
        newErrors[`scope2LocationBased-${index}`] = validationMessages.scope2Location;
        isValid = false;
      }
      if (!emission.scope2MarketBased) {
        newErrors[`scope2MarketBased-${index}`] = validationMessages.scope2Market;
        isValid = false;
      }
    });

    inputData.annualSavingsList.forEach((saving, index) => {
      if (!saving.initiativeCategory) {
        newErrors[`initiativeCategory-${index}`] = validationMessages.annualSavingintiative;
        isValid = false;
      }
      if (!saving.annualCo2Savings) {
        newErrors[`annualCo2Savings-${index}`] = validationMessages.annualCo2;
        isValid = false;
      }
      if (!saving.lifetimeOfInitiative) {
        newErrors[`lifetimeOfInitiative-${index}`] = validationMessages.annualLifetime;
        isValid = false;
      }
    });
    const wordCount = inputData.comments ? inputData.comments.trim().split(/\s+/).length : 0;
  if (wordCount > 10) {
    newErrors.comments = validationMessages.comments;
    isValid = false;
  }

  if (!inputData.percentageOfIntensity) {
    newErrors.percentageOfIntensity = validationMessages.intensity;
    isValid = false;
  } else if (isNaN(inputData.percentageOfIntensity)) {
    newErrors.percentageOfIntensity = validationMessages.intensityNumber;
    isValid = false;
  } else if (parseFloat(inputData.percentageOfIntensity) < 0 || parseFloat(inputData.percentageOfIntensity) > 100) {
    newErrors.percentageOfIntensity = validationMessages.intensityBetween;
    isValid = false;
  }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validate()) {
      localStorage.setItem('cdpData', JSON.stringify(inputData));
      console.log('CDP data saved:', inputData);
    } else {
      notification.error({
        message: 'Validation Failed',
        description: 'Please fix the validation errors and try again.',
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ height: "auto", lineHeight: '10px' }}>
      <Row gutter={[16, 16]} className="m-3">
        <Col span={6}>
          <h3 className="text-[#014d4ecd] font-bold">CDP Reporting Year</h3>
        </Col>
        <Col span={7} >
          <Input
            placeholder="Enter Reporting Year"
            value={inputData.reportingYear?inputData.reportingYear:''}
            onChange={(e) => handleInputChange(e, 'reportingYear')}
          />
          {errors.reportingYear && <div className="error-message text-[red] text-[13px]  whitespace-nowrap mr-2 mt-2">{errors.reportingYear}</div>}
        </Col>
        <Col span={5}>
          <h3 className="text-[#014d4ecd] font-bold">CDP Score</h3>
        </Col>
        <Col span={6}>
          <Input
            placeholder="Enter CDP Score"
            value={inputData.cdpScore}
            onChange={(e) => handleInputChange(e, 'cdpScore')}
          />
          {errors.cdpScore && <div className="error-message text-[red] text-[13px] whitespace-nowrap  ml-2 mt-2">{errors.cdpScore}</div>}
        </Col>
      </Row>

      <div>
        <h4 className="text-[#014d4ecd] leading-[4] font-bold">Emission Data [C6]</h4>
      </div>

      <Row gutter={[16, 16]}>
  {inputData.emissionDataList?.map((emission, index) => (
    <React.Fragment key={index}>
      <Col span={8}>
        <Form.Item
          label={`Scope 1 Location Based [C6] - ${index + 1}`}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input
            className="text-[#014d4ecd]"
            placeholder="Enter Scope 1"
            value={emission.scope1?emission.scope1:''}
            onChange={(e) => handleInputChange(e, 'scope1', index, 'emissionDataList')}
          />
          {errors[`scope1-${index}`] && <div className="error-message text-[red]  ml-2 mt-2">{errors[`scope1-${index}`]}</div>}
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          label={`Scope 2 Location Based [C6.3] - ${index + 1}`}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input
            className="text-[#014d4ecd]"
            placeholder="Enter Scope 2 Location Based"
            value={emission.scope2LocationBased?emission.scope2LocationBased :''}
            onChange={(e) => handleInputChange(e, 'scope2LocationBased', index, 'emissionDataList')}
          />
          {errors[`scope2LocationBased-${index}`] && <div className="error-message  ml-2 mt-2 text-[red]">{errors[`scope2LocationBased-${index}`]}</div>}
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          label={`Scope 2 Market Based [C6.4] - ${index + 1}`}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input
            className="text-[#014d4ecd]"
            placeholder="Enter Scope 2 Market Based"
            value={emission.scope2MarketBased?emission.scope2MarketBased:''}
            onChange={(e) => handleInputChange(e, 'scope2MarketBased', index, 'emissionDataList')}
          />
          {errors[`scope2MarketBased-${index}`] && <div className="error-message  ml-2 mt-2 text-[red]">{errors[`scope2MarketBased-${index}`]}</div>}
        </Form.Item>
      </Col>
    </React.Fragment>
  ))}
</Row>


      <div>
        <h4 className="text-[#014d4ecd] font-bold leading-[3]">Annual Savings</h4>
      </div>

      <Row gutter={[16, 16]} className="m-3">
  {inputData.annualSavingsList?.map((saving, index) => (
    <React.Fragment key={index}>
      <Col span={8}>
        <Form.Item
          label={`Initiative Category - ${index + 1}`}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input
            className="text-[#014d4ecd]"
            placeholder="Enter Initiative Category"
            value={saving.initiativeCategory?saving.initiativeCategory:''}
            onChange={(e) => handleInputChange(e, 'initiativeCategory', index, 'annualSavingsList')}
          />
        </Form.Item>
        {errors[`initiativeCategory-${index}`] && (
          <div className="error-message ml-2 mt-2 text-[red]">
            {errors[`initiativeCategory-${index}`]}
          </div>
        )}
      </Col>
      <Col span={8}>
        <Form.Item
          label={`CO2 Savings - ${index + 1}`}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input
            className="text-[#014d4ecd]"
            placeholder="Enter CO2 Savings"
            value={saving.annualCo2Savings?saving.annualCo2Savings:''}
            onChange={(e) => handleInputChange(e, 'annualCo2Savings', index, 'annualSavingsList')}
          />
        </Form.Item>
        {errors[`annualCo2Savings-${index}`] && (
          <div className="error-message ml-2 mt-2 text-[13px]  text-[red]">
            {errors[`annualCo2Savings-${index}`]}
          </div>
        )}
      </Col>
      <Col span={8}>
        <Form.Item
          label={`Lifetime of Initiative - ${index + 1}`}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input
            className="text-[#014d4ecd]"
            placeholder="Enter Lifetime of Initiative"
            value={saving.lifetimeOfInitiative?saving.lifetimeOfInitiative:''}
            onChange={(e) => handleInputChange(e, 'lifetimeOfInitiative', index, 'annualSavingsList')}
          />
        </Form.Item>
        {errors[`lifetimeOfInitiative-${index}`] && (
          <div className="error-message ml-2 mt-2 text-[red] text-[13px] ">
            {errors[`lifetimeOfInitiative-${index}`]}
          </div>
        )}
      </Col>
    </React.Fragment>
  ))}
</Row>

      <Row gutter={[16, 16]} className="m-3">
        <Col span={6}>
          <h4 className="text-[#014d4ecd] font-bold mt-2">Comments</h4>
        </Col>
        <Col span={16}>
          <Input
            placeholder="Enter Comments"
            value={inputData.comments}
            onChange={(e) => handleInputChange(e, 'comments')}
          />
          {errors.comments && <div className="error-message text-[red]  ml-2 mt-2">{errors.comments}</div>}
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="m-3">
        <Col span={8}>
          <h4 className="text-[#014d4ecd] font-bold mt-4">Intensity % attributed for your company</h4>
        </Col>
        <Col span={8}>
          <Input
            placeholder="Enter Intensity %"
            value={inputData.percentageOfIntensity}
            onChange={(e) => handleInputChange(e, 'percentageOfIntensity')}
          />
          {errors.percentageOfIntensity && <div className="error-message  ml-2 mt-2 text-[red]">{errors.percentageOfIntensity}</div>}
        </Col>
      </Row>

    </div>
  );
});

export default Cdp;




