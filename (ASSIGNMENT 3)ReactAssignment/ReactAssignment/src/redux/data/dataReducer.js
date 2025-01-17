import { FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from './dataTypes'

const initialState = {
    loading: false,
    cars: [],
    error: ''
}

const dataReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_DATA:
            return {
                ...state,
                loading: true
            }
        case FETCH_DATA_SUCCESS:
            return {
                loading: false,
                cars: action.payload,
                error: ''
            }
        case FETCH_DATA_FAILURE:
            return {
                loading: false,
                cars: [],
                error: action.payload
            }
        default: return state
    }
}

export default dataReducer