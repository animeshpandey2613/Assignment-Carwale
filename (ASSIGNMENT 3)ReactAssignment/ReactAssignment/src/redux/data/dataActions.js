import { FETCH_CAR, FETCH_CAR_SUCCESS, FETCH_CAR_FAILURE } from "./dataTypes"
export const fetchCar=()=>{
    return{
        type:FETCH_CAR,
    }
}
export const fetchCarSuccess=(e)=>{
    return{
        type:FETCH_CAR_SUCCESS,
        payload:e,
    }
}

export const fetchUserFailure=(e)=>{
    return{
        type:FETCH_CAR_FAILURE,
        payload:e,
    }
}