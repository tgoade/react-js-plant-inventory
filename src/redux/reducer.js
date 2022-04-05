// Components never directly manipulate the store data, they only subscribe to it.
// Instead, we have the concept of reducers, we have a reducer function which is responsible for changing the store data.

//import * as types from './actionTypes';

const initialState = {
    plants: [],
    plant: {}
}

const plantReducer = (state = initialState, action) => {
    switch (action.types){
        default:
            return state; 
    }
}

export default plantReducer;