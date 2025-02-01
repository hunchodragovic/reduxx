const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

// Action Types
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

// Action Creators
function buyCake() {
  return { type: BUY_CAKE };
}

function buyIcecream() {
  return { type: BUY_ICECREAM };
}

// Initial States
const initialCakeState = { numberOfCakes: 10 };
const initialIcecreamState = { numberOfIcecreams: 15 };

// Cake Reducer
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return { ...state, numberOfCakes: state.numberOfCakes - 1 };
    default:
      return state;
  }
};

// Ice Cream Reducer
const iceCreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return { ...state, numberOfIcecreams: state.numberOfIcecreams - 1 };
    default:
      return state;
  }
};

// Combine Reducers
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

// Create Store
const store = createStore(rootReducer);
console.log("Initial State", store.getState());

// Subscribe to state changes
const unsubscribe = store.subscribe(() =>
  console.log("Updated State", store.getState())
);

// Dispatch Actions

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());

unsubscribe();
