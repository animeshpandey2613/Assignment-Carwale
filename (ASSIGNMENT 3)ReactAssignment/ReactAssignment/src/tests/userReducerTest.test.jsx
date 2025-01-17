import { describe, it, expect } from 'vitest';
import { FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from '../redux/data/dataTypes';
import dataReducer from '../redux/data/dataReducer';

describe('dataReducer', () => {
    const initialState = {
    loading: false,
    cars: [],
    error: ''
    };

    it("should set cars data with FETCH_DATA action", () => {
        const action = {
            type: FETCH_DATA,
        };
        const expectedState = {
            ...initialState,
            loading:true,
        };
        const newState = dataReducer(initialState, action);
        expect(newState).toStrictEqual(expectedState);
    });

    it("fetch data success test", () => {
        const dummyApiValues = {
            name:"Bugatti Chiron",
            price:"13 lacs",
        }
        const action = {
            type: FETCH_DATA_SUCCESS,
            payload:dummyApiValues
        };
        const expectedState = {
            ...initialState,
            cars:dummyApiValues
        };
        const newState = dataReducer(initialState, action);
        expect(newState).toStrictEqual(expectedState);
    });

    it("fetch data failure test", () => {
        const DUMMY_ERROR = "DUMMY_ERROR"
        const modifiedState = {
            ...initialState,
        };
        const action = {
            type: FETCH_DATA_FAILURE,
            payload:DUMMY_ERROR,
        };
        const expectedState = {
            ...modifiedState,
            error:DUMMY_ERROR,
        };
        const newState = dataReducer(modifiedState, action);
        expect(newState).toStrictEqual(expectedState);
    });
});
