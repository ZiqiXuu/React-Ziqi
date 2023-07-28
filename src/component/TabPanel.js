import React from 'react';
import {Route, Routes} from "react-router-dom";
import CallsList from "./CallsList";
import CallDetailPage from "./CallDetailPage";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const TabPanel = (props) => {

    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{background:"#FAFAF9"}}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    return (
        <div>
            <CustomTabPanel value={props.value} index={props.index} sx={{padding:0}}>
                <Routes>
                    <Route path="/" element={<CallsList pageName={props.pageName}/>}/>
                    <Route path='/:id' element={<CallDetailPage/>}/>
                </Routes>
            </CustomTabPanel>
        </div>
    );
};

export default TabPanel;