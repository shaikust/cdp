export const FETCH_CDP_DATA_REQUEST = 'FETCH_CDP_DATA_REQUEST';
export const FETCH_CDP_DATA_SUCCESS = 'FETCH_CDP_DATA_SUCCESS';
export const FETCH_CDP_DATA_FAILURE = 'FETCH_CDP_DATA_FAILURE';

export const fetchCdpDataRequest = () => ({
  type: FETCH_CDP_DATA_REQUEST,
});

export const fetchCdpDataSuccess = (data) => ({
  type: FETCH_CDP_DATA_SUCCESS,
  payload: data,
});

export const fetchCdpDataFailure = (error) => ({
  type: FETCH_CDP_DATA_FAILURE,
  payload: error,
});