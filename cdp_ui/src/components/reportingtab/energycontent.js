import React, { useState, useCallback } from 'react';
import { Switch, Col, Row, Select, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import './energycontent.css';
import ActionButton from '../commonbutton';
import { addItem, deleteItem } from '../../redux/slices/energyslice';

const { Option } = Select;

const EnergyContent = ({ data }) => {
  const [visibleText, setVisibleText] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [addedItems, setAddedItems] = useState([]);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.energy.items);

  const handleToggle = (id) => {
    setVisibleText((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAdd = (id) => {
    const itemToAdd = data?.questions?.find((item) => item.id === id);
    if (itemToAdd) {
      const newItem = { ...itemToAdd, id: new Date().getTime() };

      setAddedItems((prev) => [
        ...prev,
        { ...newItem, parentId: id },
      ]);

      dispatch(addItem(newItem));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
    setAddedItems((prev) => prev.filter(item => item.id !== id));
  };

  const handleDropdownChange = (key, value) => {
    setInputValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleInputChange = (key, value) => {
    setInputValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const renderTextWithComponents = (text, inputFields, emissionsSaved) => {
    let parts = text.split(/(<[^>]+>)/g);

    return (
      <div>
        {parts.map((part, index) => {
          if (part.startsWith('<') && part.endsWith('>')) {
            const placeholder = part.slice(1, -1);
            const field = inputFields.find(f => f.label === placeholder);
            if (field) {
              if (field.inputType === 'dropdown') {
                return (
                  <Select
                    key={index}
                    className='select-dashed'
                    value={inputValues[placeholder] || field.label}
                    onChange={(value) => handleDropdownChange(placeholder, value)}
                  >
                    {field.options.map(option => (
                      <Option key={option} value={option}>{option}</Option>
                    ))}
                  </Select>
                );
              } else if (field.inputType === 'number' || field.inputType === 'text') {
                return (
                  <Input
                    key={index}
                    className='input-dashed'
                    value={inputValues[placeholder] || field.label}
                    onChange={(e) => handleInputChange(placeholder, e.target.value)}
                  />
                );
              }
            }
          }
          return <span key={index}>{part}</span>;
        })}
        {emissionsSaved !== undefined && (
          <div className='details-box'>
            <div className='emissions-saved'>
              <span className='Emmissions-Text'>Emissions Saved:</span>
              <Input
                className='emmissioons-Input'
                suffix="MT"
                value={inputValues['emissionsSaved'] || emissionsSaved}
                onChange={(e) => handleInputChange('emissionsSaved', e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='energy-content-wrapper'>
      {data?.questions?.map((item) => (
        <React.Fragment key={item.id}>
          <Row gutter={16} className='item-row'>
            <Col span={22} className='item-content'>
              <div className='item-box'>
                <Row className='question-box'>
                  <Col flex="auto">
                    <div className='question-text'>{item.question}</div>
                  </Col>
                  <Col>
                    <Switch
                      checked={!!visibleText[item.id]}
                      onChange={() => handleToggle(item.id)}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </Col>
                </Row>
                {visibleText[item.id] && (
                  <div className='details-box'>
                    {renderTextWithComponents(item.text, item.inputFields, item.emissionsSaved)}
                  </div>
                )}
              </div>
            </Col>
            <Col span={2} className='button-container'>
              <ActionButton
                type="primary"
                onClick={() => handleAdd(item.id)}
                text="Add"
              />
              <ActionButton
                type="danger"
                onClick={() => handleDelete(item.id)}
                text="Delete"
              />
            </Col>
          </Row>

          {/* Render added items outside of their parent item */}
          {addedItems.filter((addedItem) => addedItem.parentId === item.id).map((addedItem) => (
            <Row key={addedItem.id} gutter={16} className='item-row added-item-row'>
              <Col span={22} className='item-content'>
                <div className='item-box'>
                  <Row className='question-box'>
                    <Col flex="auto">
                      <div className='question-text'>{addedItem.question}</div>
                    </Col>
                    <Col>
                      <Switch
                        checked={!!visibleText[addedItem.id]}
                        onChange={() => handleToggle(addedItem.id)}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                      />
                    </Col>
                  </Row>
                  {visibleText[addedItem.id] && (
                    <div className='details-box'>
                      {renderTextWithComponents(addedItem.text, addedItem.inputFields, addedItem.emissionsSaved)}
                    </div>
                  )}
                </div>
              </Col>
              <Col span={2} className='button-container'>
                <ActionButton
                  type="danger"
                  onClick={() => handleDelete(addedItem.id)}
                  text="Delete"
                />
              </Col>
            </Row>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default EnergyContent;
