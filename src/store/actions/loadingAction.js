import {CLEAR_LOADING, SET_LOADING} from "../../helper";


export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};

export const clearLoading = () => {
    return {
        type: CLEAR_LOADING
    };
};