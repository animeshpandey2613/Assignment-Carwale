import { FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from "./dataTypes"
export const fetchData=()=>{
    return{
        type:FETCH_DATA,
    }
}
export const fetchDataSuccess=(e)=>{
    return{
        type:FETCH_DATA_SUCCESS,
        payload:e,
    }
}

export const fetchDataFailure=(e)=>{
    return{
        type:FETCH_DATA_FAILURE,
        payload:e,
    }
}