// src/redux/slices/energyslice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEnergyData, saveEnergyData, resetEnergyData } from '../../services/reportingservice';

// Initial State
const initialState = {
  data: [],
  loading: false,
  error: null,
  items: [], // Ensure items is initialized
};

// Thunks
export const getEnergyData = createAsyncThunk('energy/getEnergyData', async () => {
  const data = await fetchEnergyData();
  return data;
});

export const updateEnergyData = createAsyncThunk('energy/updateEnergyData', async (data) => {
  const response = await saveEnergyData(data);
  return response;
});

export const deleteEnergyData = createAsyncThunk('energy/deleteEnergyData', async () => {
  const response = await resetEnergyData();
  return response;
});

// Slice
const energySlice = createSlice({
  name: 'energy',
  initialState,
  reducers: {
    addItem: (state, action) => {
      console.log(state,action)
      const newItem = { ...action.payload, id: new Date().getTime() };
      console.log(newItem)
      state.items.push(newItem);
      console.log(state.items,"items after pushing..")
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEnergyData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEnergyData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getEnergyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateEnergyData.fulfilled, (state, action) => {
        // Handle updated data as needed
      })
      .addCase(deleteEnergyData.fulfilled, (state) => {
        state.data = [];
      });
  },
});

export const { addItem, deleteItem } = energySlice.actions;
export default energySlice.reducer;
