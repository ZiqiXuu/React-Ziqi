import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import PhoneCallbackOutlinedIcon from '@mui/icons-material/PhoneCallbackOutlined';
import PhoneForwardedOutlinedIcon from '@mui/icons-material/PhoneForwardedOutlined';
import Divider from '@mui/material/Divider';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import IconButton from '@mui/material/IconButton';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import {useDispatch} from "react-redux";
import {updateCall} from "../store/actions/activitiesAction";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import {clearLoading, setLoading} from "../store/actions/loadingAction";
import './singleCallSummary.css'


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -6,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const SingleCallSummary = (props) => {
    const call = props.activity
    const dispatch = useDispatch()
    const amount = props.amount
    const [date, timeAndRest] = call.created_at.split("T")
    const [hours, minutes] = timeAndRest.split(":")
    const time = `${hours}:${minutes}`
    let navigate = useNavigate()
    const typography = {display: 'flex', alignItems: 'center',justifyContent:'space-between', color: 'text.secondary', '& hr': {mx: 2}, padding:"0 10px"}
    const card = {minWidth: 275, borderRadius: 5, background:"F0F0F0", cursor:'pointer',margin:'5px'}
    const icon = {fontSize:'17px'}
    const updateCallStatus = (id, is_archived,event) =>{
        event.stopPropagation();
        updateOne(id,is_archived)
    }

    const updateOne = (id,is_archived) => {
        dispatch(setLoading())
        dispatch(updateCall(id, !is_archived))
        setTimeout(async () => {
            dispatch(clearLoading())
        }, 1000);
    }

    const handleClick = () =>{
        let itemId = props.items.map(item => item.id.toString()).join('+');
        navigate(`/${itemId}`)
    }

    return (
        <div className='outContainer' onClick={()=>{handleClick()}}>
            <Card variant="outlined" sx={card}>
                <div className='mainContent'>
                    <Typography variant="body2" sx={typography}>
                        <StyledBadge badgeContent={amount>1?amount:0} color="secondary">
                            {call.direction === 'outbound' ?  <PhoneForwardedOutlinedIcon/>:<PhoneCallbackOutlinedIcon/>}
                        </StyledBadge>
                        <div className='direction'>
                            {call.direction === 'outbound' ?  call.to :call.from }
                        </div>
                        <Divider orientation="vertical" variant="middle" flexItem/>
                        {time}
                        <Divider orientation="vertical" variant="middle" flexItem/>
                        <IconButton aria-label="delete" size="large" onClick={(event) =>{updateCallStatus(call.id, call.is_archived,event)} }>
                            {!call.is_archived?<UnarchiveOutlinedIcon sx={icon}/>:<Inventory2OutlinedIcon sx={icon}/>}
                        </IconButton>
                    </Typography>
                </div>
            </Card>
        </div>
    );
};

export default SingleCallSummary;