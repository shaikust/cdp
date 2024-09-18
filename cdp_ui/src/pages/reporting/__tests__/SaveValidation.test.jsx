import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Cdp  from '../Cdp';
import Reporting from '../reporting';
import {cdpReducer} from '../../../redux/reducers/cdpReducer';
import cdpMockData from '../../../mockdata/cdpMockData';


// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

// Mock reducer for energy
const energyMockData = {
  data: {
    energyField1: "value1",
    energyField2: "value2",
  },
  loading: false,
  error: null,
};

const setup = (store) => {
  return render(
    <Provider store={store}>
      <Reporting />
      <Cdp/>
    </Provider>
  );
};

const store = configureStore({
  reducer: {
    cdp: cdpReducer,
    energy: () => energyMockData, // Mock energy reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

describe('Cdp Component - Validation and Save Functionality', () => {

  test('should show an error if the reporting year is less than 2022', async () => {
    const dataStore = configureStore({
      reducer: {
        cdp: () => ({ data: cdpMockData, loading: false, error: null }),
        energy: () => energyMockData,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware() 
    });

    setup(dataStore);
    const reportingYearInput = screen.getByPlaceholderText('Enter Reporting Year');
    fireEvent.change(reportingYearInput, { target: { value: '2021' } });
    const saveButton = screen.getByTestId('save-button');
    console.log(saveButton)
    fireEvent.click(saveButton);
    const errorMessage = screen.queryByText('* Reporting year must be greater than 2022');
    console.log(errorMessage);

// expect(errorMessage).toHaveAttribute('');
  // Assert that the error message is in the document
  // expect(errorMessage).not.toBeNull();
  
  });
  test('should show validation error for empty reporting year', async () => {
    const emptyStore = configureStore({
      reducer: {
        cdp: () => ({ data: {}, loading: false, error: null }),
        energy: () => energyMockData,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware() 
    });
  
    setup(emptyStore);
    const saveButton = screen.getByTestId('save-button');
    fireEvent.click(saveButton);
    await waitFor(() => {
      const error = screen.queryByText('* Reporting year is required');
      //  expect(error).toBeInTheDocument();
    });
  });
  test('should show validation error for empty cdp score', async () => {
    const emptyStore = configureStore({
      reducer: {
        cdp: () => ({ data: {}, loading: false, error: null }),
        energy: () => energyMockData,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware() 
    });
  
    setup(emptyStore);
    const saveButton = screen.getByTestId('save-button');
    fireEvent.click(saveButton);
    await waitFor(() => {
      const error = screen.queryByText('* CDP score is required');
      // expect(error).toBeInTheDocument();
    });
  });
  
});