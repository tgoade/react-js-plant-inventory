// Components trigger certain actions.
// An action is a javascript object that describes the kind of operation the reducer should perform
// Redux forwards actions to the reducer, which reads the described actions, the reducer spits out a new state, which replaces the state in the store, subcribing components are notified so they can update their UI 

import * as types from "./actionTypes";
import db from "../firebase";

const addPlant = () => ({
    type: types.ADD_PLANT
});

export const addPlantInitiate = (plant) => {
    return function(dispatch){
       
    }
}