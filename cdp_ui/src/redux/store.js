// import { configureStore } from '@reduxjs/toolkit';
// import energyReducer from '../redux/slices/energyslice';
// import cdpReducer from './reducers/cdpReducer'

// const store = configureStore({
//   reducer: {
//     energy: energyReducer,
//     cdp:cdpReducer
//   },
// });

// export default store;
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import energyReducer from './reducers/reducer'

import { cdpReducer } from './reducers/cdpReducer';

const rootReducer = combineReducers({
  cdp: cdpReducer,
  energy: energyReducer

});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;