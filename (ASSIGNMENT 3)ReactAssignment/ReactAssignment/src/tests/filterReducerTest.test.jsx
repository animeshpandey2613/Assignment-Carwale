import { describe, it, expect } from 'vitest';
import { SET_SORT, RESET_SORT, SET_BUDGET } from '../redux/filters/filterTypes';
import filterReducer from '../redux/filters/filterReducer';

describe('filterReducer', () => {
    const initialState = {
        sort: null,
        minBudget: 0,
        maxBudget: 1000,
        fuel: [],
    };

    it("should update 'sort' with SET_SORT action", () => {
        const action = {
            type: SET_SORT,
            payload: "price",
        };
        const expectedState = {
            ...initialState,
            sort: "price",
        };
        const newState = filterReducer(initialState, action);
        expect(newState).toStrictEqual(expectedState);
    });

    it("should reset 'sort' to null with RESET_SORT action", () => {
        const modifiedState = {
            ...initialState,
            sort: "price",
        };
        const action = {
            type: RESET_SORT,
        };
        const expectedState = {
            ...initialState,
            sort: null,
        };
        const newState = filterReducer(modifiedState, action);
        expect(newState).toStrictEqual(expectedState);
    });

    it("should update 'minBudget' and 'maxBudget' with SET_BUDGET action without changing 'sort'", () => {
        const modifiedState = {
            ...initialState,
            sort: "price",
            minBudget: 20,
            maxBudget: 50,
        };
        const action = {
            type: SET_BUDGET,
            payload: {
                min: 10,
                max: 30,
            },
        };
        const expectedState = {
            ...modifiedState,
            minBudget: 10,
            maxBudget: 30,
        };
        const newState = filterReducer(modifiedState, action);
        expect(newState).toStrictEqual(expectedState);
    });
});
