import { createStore } from 'redux';
import {rootReducer,atcReducer} from '../reducer/index';
import { combineReducers } from 'redux'
let combineStore= combineReducers({
    rootReducer,
    atcReducer
  })
  const store = createStore(
    rootReducer,
    );


export default store