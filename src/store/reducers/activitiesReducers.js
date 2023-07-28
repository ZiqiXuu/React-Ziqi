import {
    FETCH_ALL_ACTIVITIES,
    FETCH_SINGLE_ACTIVITIES,
    UPDATE_CALL,
    UPDATE_ALL_CALLS,
    FETCH_MULTIPLE_ACTIVITIES
} from "../../helper";

const initStates = {
    activities:[],
    singleCall:[],
    multipleCalls:[]
}

export const activitiesReducer = (state = initStates, action) => {
    switch (action?.type) {
        case FETCH_SINGLE_ACTIVITIES:
            return {...state, singleCall: action?.payload}
        case FETCH_ALL_ACTIVITIES:
            return {...state, activities: action?.payload}
        case FETCH_MULTIPLE_ACTIVITIES:
            return {...state, multipleCalls: action?.payload}
        case UPDATE_CALL:
            return {...state, activities: action?.payload}
        case UPDATE_ALL_CALLS:
            return {...state, activities: action?.payload}
        default:
            return state

    }
}