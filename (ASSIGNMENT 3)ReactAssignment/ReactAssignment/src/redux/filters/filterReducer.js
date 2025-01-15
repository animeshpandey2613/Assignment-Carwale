import { SET_BUDGET, SET_FUEL, SET_SORT, REMOVE_BUDGET, RESET_SORT, REMOVE_ALL_FILTERS } from "./filterTypes"
const initialState = {
    sort : null,
    minBudget : 0,
    maxBudget : 1000,
    fuel : [],
}

const filterReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_FUEL:
            return {
                ...state,
                fuel : action.payload,
            }
        case SET_BUDGET:
            return {
                ...state,
                maxBudget : action.payload.max,
                minBudget : action.payload.min,
            }
        case REMOVE_BUDGET:
                return {
                    ...state,
                    maxBudget : 21,
                    minBudget : 0,
                }
        case SET_SORT:
                return {
                ...state,
                sort : action.payload
                }
        case RESET_SORT:
            return{
                ...state,
                sort : null
            }
        case REMOVE_ALL_FILTERS:
            return{
               ...initialState,
            }
        default:
            return state
    }
}

export default filterReducer;