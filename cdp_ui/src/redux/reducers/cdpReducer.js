import {
    FETCH_CDP_DATA_REQUEST,
    FETCH_CDP_DATA_SUCCESS,
    FETCH_CDP_DATA_FAILURE,
  } from '../actions/cdpActions';
  
  const initialState = {
    loading: false,
    data: {},
    error: null,
  };
  
  export const cdpReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CDP_DATA_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_CDP_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      case FETCH_CDP_DATA_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };