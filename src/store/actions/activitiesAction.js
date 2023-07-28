import axios from "axios"
import {
    BASE_URL,
    FETCH_ALL_ACTIVITIES,
    FETCH_SINGLE_ACTIVITIES,
    UPDATE_CALL,
    UPDATE_ALL_CALLS,
    FETCH_MULTIPLE_ACTIVITIES
} from '../../helper'


export const fetchAllActivities = () => async dispatch =>{
    try{
        let res = await axios.get(`${BASE_URL}/activities`)
        dispatch({
            type: FETCH_ALL_ACTIVITIES,
            payload: res.data,
        })
    }catch (e) {
        alert(e)
    }
}

export const fetchSingleActivities = (id) => async dispatch =>{
    try{
        let res = await axios.get(`${BASE_URL}/activities/${id}`)
        dispatch({
            type: FETCH_SINGLE_ACTIVITIES,
            payload: res.data,
        })
    }catch (e) {
        alert(e)
    }
}

export const fetchMultipleActivities = (id) => async dispatch =>{
    const ids = id.split('+')
    const updatePromises = ids.map(id => {
        return axios.get(`${BASE_URL}/activities/${id}`)
            .catch(e => {
                alert(e)
            })
    })
    Promise.all(updatePromises)
        .then(res => {
            const temp = []
            res.map(res=>temp.push(res.data))
            dispatch({
                type: FETCH_MULTIPLE_ACTIVITIES,
                payload: temp,
            })
        })
        .catch(error => {
            console.error(error);
        });
}

export const updateCall = (id, is_archived) => async dispatch => {
    const postBody = {
        is_archived: is_archived
    }
    try{
        let r = await axios.patch(`${BASE_URL}/activities/${id}`,postBody)
        let res = await axios.get(`${BASE_URL}/activities`)

        dispatch({
            type: UPDATE_CALL,
            payload: res.data,
        })
    }catch (e) {
        alert(e)
    }
}

export const updateAllCalls = (calls, targetStatus) => async dispatch => {
    const updatePromises = calls.map(call => {
        const postBody = {
            is_archived: targetStatus
        }
        return axios.patch(`${BASE_URL}/activities/${call.id}`, postBody)
            .catch(e => {
                alert(e)
            })
    })
    Promise.all(updatePromises)
        .then(() => {
            // 这里所有的calls都更新完成了，你可以执行一些后续的操作，例如获取最新的calls列表
            axios.get(`${BASE_URL}/activities`)
                .then(res => {
                    dispatch({
                        type: UPDATE_ALL_CALLS,
                        payload: res.data,
                    })
                })
                .catch(e => {
                    alert(e);
                });
        })
        .catch(e => {
            alert(e);
        });
}
