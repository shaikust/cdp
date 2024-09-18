import React from 'react';
import { render, screen, waitFor,fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Cdp from '../Cdp'; 
import {cdpReducer} from '../../../redux/reducers/cdpReducer';
import cdpMockData from '../../../mockdata/cdpMockData';

const setup = (store) => {
  return render(
    <Provider store={store}>
      <Cdp />
    </Provider>
  );
};

// Setup the mock store
const store = configureStore({
  reducer: {
    cdp: cdpReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});
describe('Cdp Component', () => {

  test('renders loading state', () => {
    const loadingStore = configureStore({
      reducer: {
        cdp: () => ({ data: {}, loading: true, error: null })
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware() 
    });

    render(
      <Provider store={loadingStore}>
        <Cdp />
      </Provider>
    );

    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });
  test('should reset form on error', async () => {
    const errorStore = configureStore({
      reducer: {
        cdp: () => ({ data: {}, loading: false, error: 'Some error occurred' })
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware() 
    });
      render(
      <Provider store={errorStore}>
        <Cdp />
      </Provider>
    );

      // Check that inputs are reset
      const reportingYearInput = screen.getByPlaceholderText('Enter Reporting Year');
      await waitFor(() => expect(reportingYearInput.value).toBe(''));
     });
     test('should render the CDP Reporting Year input', async () => {
      const dataStore = configureStore({
      reducer: {
        cdp: () => ({ data: cdpMockData, loading: false, error: null })
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware() 
    });

      setup(dataStore);

      await waitFor(() => {
        const reportingYearInput = screen.getByPlaceholderText('Enter Reporting Year');
        expect(reportingYearInput).toBeInTheDocument();
        expect(reportingYearInput.value).toBe('2024');
      });
    });

    test('should render the CDP Score input', async () => {
      const dataStore = configureStore({
      reducer: {
        cdp: () => ({ data: cdpMockData, loading: false, error: null })
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware() 
    });

      setup(dataStore);

      await waitFor(() => {
         const cdpScoreInput = screen.getByPlaceholderText('Enter CDP Score');
         expect(cdpScoreInput).toBeInTheDocument();
         expect(cdpScoreInput.value).toBe('A');
      });
    });
    test('should render emission data inputs', async () => {
      const dataStore = configureStore({
        reducer: {
          cdp: () => ({ data: cdpMockData, loading: false, error: null })
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware() 
      });
        setup(dataStore);
        await waitFor(()=>{
        const scope1Input = screen.getByPlaceholderText('Enter Scope 1');
        const scope2LocationBasedInput = screen.getByPlaceholderText('Enter Scope 2 Location Based');
        const scope2MarketBasedInput = screen.getByPlaceholderText('Enter Scope 2 Market Based');

        expect(scope1Input.value).toBe('100');
        expect(scope2LocationBasedInput.value).toBe('200');
        expect(scope2MarketBasedInput.value).toBe('150');
        });
    });
     test('should render annual savings inputs', async () => {
      const dataStore = configureStore({
        reducer: {
          cdp: () => ({ data: cdpMockData, loading: false, error: null })
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware() 
      });
        setup(dataStore);
        await waitFor(()=>{
          const initiativeCategoryInput = screen.getByPlaceholderText('Enter Initiative Category');
          const annualCo2SavingsInput = screen.getByPlaceholderText('Enter CO2 Savings');
          const lifetimeOfInitiativeInput = screen.getByPlaceholderText('Enter Lifetime of Initiative');

          expect(initiativeCategoryInput.value).toBe('Energy Efficiency');
          expect(annualCo2SavingsInput.value).toBe('50');
          expect(lifetimeOfInitiativeInput.value).toBe('10 years');
        });

    });
     test('should render comments input', async () => {
      const dataStore = configureStore({
        reducer: {
          cdp: () => ({ data: cdpMockData, loading: false, error: null })
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware() 
      });
        setup(dataStore);
        await waitFor(()=>{
          const commentsInput = screen.getByPlaceholderText('Enter Comments');
          expect(commentsInput.value).toBe('Good progress on sustainability goals.');

        });
      });

      test('should render intensity % input', async() => {
        const dataStore = configureStore({
          reducer: {
            cdp: () => ({ data: cdpMockData, loading: false, error: null })
          },
          middleware: (getDefaultMiddleware) => getDefaultMiddleware() 
        });
          setup(dataStore);
          await waitFor(()=>{
              const intensityInput = screen.getByPlaceholderText('Enter Intensity %');
              expect(intensityInput.value).toBe('10%');
          });
      });
    
      test('should update the input values on change', () => {
        const dataStore = configureStore({
          reducer: {
            cdp: () => ({ data: cdpMockData, loading: false, error: null })
          },
          middleware: (getDefaultMiddleware) => getDefaultMiddleware() 
        });
          setup(dataStore);
        const reportingYearInput = screen.getByPlaceholderText('Enter Reporting Year');
        fireEvent.change(reportingYearInput, { target: { value: '2023' } });
        expect(reportingYearInput.value).toBe('2023');
      });

    
});
