import {
    SET_ENERGY_DATA,
    ADD_ENERGY_ITEM,
    DELETE_ENERGY_ITEM,
    UPDATE_ENERGY_DATA,
    RESET_ENERGY_DATA,
  } from '../actions/action';
  
  const initialState = {
    data: [],
  };
  
  const energyReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ENERGY_DATA:
        return {
          ...state,
          data: action.payload,
        };
      case ADD_ENERGY_ITEM:
        return {
          ...state,
          data: [...state.data, action.payload],
          
        };
      case DELETE_ENERGY_ITEM:
        return {
          ...state,
          data: state.data.filter(item => item.id !== action.payload),
        };
      case UPDATE_ENERGY_DATA:
        return {
          ...state,
          data: action.payload,
        };
      case RESET_ENERGY_DATA:
        return {
          ...state,
          data: [],
        };
      default:
        return state;
    }
  };
  
  export default energyReducer;
  