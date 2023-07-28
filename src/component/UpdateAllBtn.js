import React from 'react';
import Card from "@mui/material/Card";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import './updateAllBtn.css'

const UpdateAllBtn = (props) => {
    const cardStyles = {minWidth: 275, borderRadius: 5, background: "F0F0F0", margin: '5px 15px',padding:'2px'}
    const iconStyles = {padding:'0 30px 0 5px'}

    return (
        <div>
            <Card variant="outlined" sx={cardStyles} onClick={()=>props.onClick()}>
                <div className='cardBtn'>
                    <Inventory2OutlinedIcon sx={iconStyles}/>
                    {props.btnName}
                </div>
            </Card>
        </div>
    );
};

export default UpdateAllBtn;