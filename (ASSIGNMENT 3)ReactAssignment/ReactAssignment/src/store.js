import {createStore} from 'redux';
import {applyMiddleware} from 'redux';
import { thunk } from 'redux-thunk';
import { combineReducers } from 'redux';
import filterReducer from './redux/filters/filterReducer';
import dataReducer from './redux/data/dataReducer';
const rootReducer = combineReducers({
    filterReducer: filterReducer,
    dataReducer: dataReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;