import {CLEAR_LOADING, SET_LOADING} from "../../helper";

const initialState = {
    isLoading: false
};

const loadingReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case CLEAR_LOADING:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
};

export default loadingReducer;