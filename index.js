import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

// Initial State
const initialState = {
  loading: false,
  data: [],
  error: "",
};

// Action Types
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

// Action Creators
const fetchUsersRequest = () => ({ type: FETCH_USERS_REQUEST });
const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});
const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

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

// Async Action Creator (Thunk)
export const fetchUser = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data.map((user) => user.name); // Extract names
        dispatch(fetchUsersSuccess(users));
        renderUsers(); // Update UI
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.message));
        renderUsers(); // Show error message
      });
  };
};

// Create Redux Store
export const store = createStore(reducer, applyMiddleware(thunk));

// Function to Update UI
const renderUsers = () => {
  const state = store.getState();
  const userList = document.getElementById("user-list");
  userList.innerHTML = ""; // Clear previous content

  if (state.loading) {
    userList.innerHTML = "<li>Loading...</li>";
  } else if (state.error) {
    userList.innerHTML = `<li style="color: red;">Error: ${state.error}</li>`;
  } else {
    state.data.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = user;
      userList.appendChild(li);
    });
  }
};

// Subscribe to Store Changes
store.subscribe(renderUsers);
