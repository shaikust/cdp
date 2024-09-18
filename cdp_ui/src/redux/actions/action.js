// Define action types
export const SET_ENERGY_DATA = 'SET_ENERGY_DATA';
export const ADD_ENERGY_ITEM = 'ADD_ENERGY_ITEM';
export const DELETE_ENERGY_ITEM = 'DELETE_ENERGY_ITEM';
export const UPDATE_ENERGY_DATA = 'UPDATE_ENERGY_DATA';
export const RESET_ENERGY_DATA = 'RESET_ENERGY_DATA';

// Action creators
export const setEnergyData = (data) => ({
  type: SET_ENERGY_DATA,
  payload: data,
});

export const addEnergyItem = (item) => ({
  type: ADD_ENERGY_ITEM,
  payload: item,
});

export const deleteEnergyItem = (id) => ({
  type: DELETE_ENERGY_ITEM,
  payload: id,
});

export const updateEnergyData = (data) => ({
  type: UPDATE_ENERGY_DATA,
  payload: data,
});

export const resetEnergyData = () => ({
  type: RESET_ENERGY_DATA,
});
