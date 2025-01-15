import { FETCH_CAR, FETCH_CAR_SUCCESS, FETCH_CAR_FAILURE } from './dataTypes'

const initialState = {
    loading: false,
    cars: [],
    error: ''
}

const dataReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_CAR:
            return {
                ...state,
                loading: true
            }
        case FETCH_CAR_SUCCESS:
            return {
                loading: false,
                cars: action.payload,
                error: ''
            }
        case FETCH_CAR_FAILURE:
            return {
                loading: false,
                cars: [],
                error: action.payload
            }
        default: return state
    }
}

export default dataReducer