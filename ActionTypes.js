const redux = require("redux");
// const createStore = redux.createStore;
// const applyMiddleware = redux.applyMiddleware;
const { createStore, applyMiddleware } = require("redux");
const thunk = require("redux-thunk").default;
const axios = require("axios");

// Initial state
const initialState = {
  loading: false,
  data: [],
  error: "",
};

// Action types
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

// Action creators
const fetchUsersRequest = () => {
  return { type: FETCH_USERS_REQUEST };
};

const fetchUsersSuccess = (users) => {
  return { type: FETCH_USERS_SUCCESS, payload: users };
};

const fetchUsersFailure = (error) => {
  return { type: FETCH_USERS_FAILURE, payload: error };
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_USERS_SUCCESS:
      return { loading: false, data: action.payload, error: "" };
    case FETCH_USERS_FAILURE:
      return { loading: false, data: [], error: action.payload };
    default:
      return state;
  }
};

// Async action creator using Redux Thunk
const fetchUser = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest()); // Set loading state to true
    axios
      .get("https://jsonplaceholder.typicode.com/users/2") // Fetch users from API
      .then((response) => {
        const users = response.data.map((user) => user.name); // Extract names
        dispatch(fetchUsersSuccess(users)); // Dispatch success action
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.message)); // Dispatch failure action
      });
  };
};

// Create Redux store with Thunk middleware
const store = createStore(reducer, applyMiddleware(thunk));

// Subscribe to store updates
store.subscribe(() => console.log(store.getState()));

// Dispatch the async action
store.dispatch(fetchUser());
