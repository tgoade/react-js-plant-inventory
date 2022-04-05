import { combineReducers } from "redux";  // The combineReducers helper function turns an object whose values are different reducing functions into a single reducing function you can pass to createStore.
import plantReducer from "./reducer";

const rootReducer =  combineReducers({
    data: plantReducer,                     // The data key represents the plants and plant key in reducer.js
})

export default rootReducer;