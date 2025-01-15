import { SET_FUEL, SET_BUDGET, REMOVE_BUDGET, SET_SORT, RESET_SORT, REMOVE_ALL_FILTERS } from "./filterTypes";
export const setFuel=(e = 1)=>{
    return {
        type: SET_FUEL,
        payload: e
    }
}

export const setBudget=(min = 1,max = 21)=>{ 
    return {
        type: SET_BUDGET,
        payload: {
            min,
            max
        }
    }
}
export const removeBudget=()=>{
    return {
        type: REMOVE_BUDGET,
    }
}

export const setSort=(sort = 'price')=>{
    return {
        type: SET_SORT,
        payload: sort
    }
}
export const removeSort=()=>{
    return {
        type: RESET_SORT,
    }
}
export const removeAllFilters=()=>{
    return{
        type: REMOVE_ALL_FILTERS,
    }
}