import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import './callDetailPage.css'
import {useParams} from 'react-router-dom'
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllActivities, fetchMultipleActivities, fetchSingleActivities} from "../store/actions/activitiesAction";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import {clearLoading, setLoading} from "../store/actions/loadingAction";
import LinearProgress from '@mui/material/LinearProgress';
import SingleCallDetail from "./SingleCallDetail";
import Divider from '@mui/material/Divider';

const CallDetailPage = () => {
    const id = useParams().id
    const dispatch = useDispatch()
    const tempCall = useSelector(state => state.activitiesReducer?.singleCall)
    const tempCalls = useSelector(state => state.activitiesReducer?.multipleCalls)
    const isLoading = useSelector(state => state.loadingReducer?.isLoading)
    let navigate = useNavigate()

    useEffect(() => {
        fetchOne(id)
    }, [])

    const fetchOne = (id) => {
        dispatch(setLoading());  // 设置 loading 状态
        id.includes("+") ? dispatch(fetchMultipleActivities(id)):dispatch(fetchSingleActivities(id))
        setTimeout(async () => {
            dispatch(clearLoading());  // 清除 loading 状态
        }, 600);
    }

    const multipleCalls = (calls) =>{
        return(
            <div>
                {calls.map((call)=>{
                    console.log(call)
                    if(call){
                        return(
                            <div>
                                <SingleCallDetail call={call} />
                                <Divider />
                            </div>
                        )
                    }
                    }
                )}
            </div>
        )
    }

    return (
        <div style={{height:'508px',overflow:'auto'}}>
            <IconButton aria-label="delete">
                <ArrowBackIcon onClick={() => {
                    navigate('/')
                }}/>
            </IconButton>
            <div className='details'>
                <Avatar src="/broken-image.jpg" sx={{width: 100, height: 100, margin: '10px'}}/>
            </div>
            {!isLoading ?
                id.includes("+") && tempCalls?.length ?
                    multipleCalls(tempCalls)
                    :tempCall ? <SingleCallDetail call={tempCall} />:<div> </div>
            :<LinearProgress />}

        </div>
    );
};

export default CallDetailPage;