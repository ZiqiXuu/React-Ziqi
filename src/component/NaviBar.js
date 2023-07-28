import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Divider from "@mui/material/Divider";
import TuneIcon from '@mui/icons-material/Tune';
import PhoneIcon from '@mui/icons-material/Phone';
import TabPanel from "./TabPanel";
import {useNavigate} from "react-router-dom";

const NaviBar = () => {
    const [value, setValue] = React.useState(2);
    let navigate = useNavigate()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider',display:'flex' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{background:'#FAFAF9',borderTop:'1px solid',borderColor:'divider'}}>
                    <div style={{display: "flex",justifyContent: "center", alignItems: "center", fontWeight:"bolder",padding:'0 20px',fontSize:'15px',background:'white'}}><PhoneIcon/>Activity</div>
                    <Divider orientation="vertical"  flexItem/>
                    <Tab label="Inbox" onClick={()=>{ navigate(`/`)}}/>
                    <Divider orientation="vertical" variant="middle" flexItem/>
                    <Tab label="All Calls"  onClick={()=>{ navigate(`/`)}}/>
                    <Divider orientation="vertical" variant="middle" flexItem/>
                    <div style={{display: "flex",justifyContent: "center", alignItems: "center",padding:"12px 16px"}}>
                        <TuneIcon />
                    </div>
                </Tabs>
            </Box>
            <TabPanel value={value} index={2} pageName={'inbox'}/>
            <TabPanel value={value} index={4} pageName={'allCalls'}/>
        </Box>
    );
};

export default NaviBar;