// // src/redux/slices/energyslice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import {fetchCdpData} from '../../services/goalservice'
// // Initial State
// const initialState = {
//   data: [],
//   loading: false,
//   error: null,
//   items: [], // Ensure items is initialized
// };

// // Thunks
// export const getCdpData = createAsyncThunk('cdp/getCdpData', async () => {
//   const data = await fetchCdpData();
//   return data;
// });
// // Slice
// const cdpSlice = createSlice({
//   name: 'cdp',
//   initialState,
  
//   // reducers: (builder) => {
//   //   builder
//   //     .addCase(getCdpData.pending, (state) => {
//   //       state.loading = true;
//   //       state.error = null;
//   //     })
//   //     .addCase(getCdpData.fulfilled, (state, action) => {
//   //       state.data = action.payload;
//   //       state.loading = false;
//   //     })
//   //     .addCase(getCdpData.rejected, (state, action) => {
//   //       state.loading = false;
//   //       state.error = action.error.message;
//   //     })
      
//   // },
// });

// export const { addItem } = cdpSlice.actions;
// export default cdpSlice.reducer;
import { getCdpDataService } from '../../services/cdpservice';
import { fetchCdpDataRequest, fetchCdpDataSuccess, fetchCdpDataFailure } from '../actions/cdpActions';

export const getCdpData = () => {
  return async (dispatch) => {
    dispatch(fetchCdpDataRequest());
    try {
      const data = await getCdpDataService();
      dispatch(fetchCdpDataSuccess(data));
    } catch (error) {
      dispatch(fetchCdpDataFailure(error.message));
    }
  };
}