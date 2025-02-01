const redux = require("redux");
const applyMiddleware = redux.applyMiddleware;

// Logger Middleware
const logger = (store) => (next) => (action) => {
  console.log("Dispatching:", action);
  let result = next(action); // Pass action to next middleware or reducer
  console.log("Updated State:", store.getState());
  return result;
};

// Reducer
const reducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    default:
      return state;
  }
};

// Create Store with Middleware
const store = redux.createStore(reducer, applyMiddleware(logger));

store.dispatch({ type: "INCREMENT" });
