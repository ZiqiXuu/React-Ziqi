import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';

const BottomBar = () => {
    const [value, setValue] = React.useState('activity');
    const bottomNavStyles = {
        position: "absolute",
        bottom: 0,
        width: "100%",
        borderTop: "1px solid #F1F2F1"
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <BottomNavigation value={value} onChange={handleChange} sx={bottomNavStyles}>
            <BottomNavigationAction
                label="Activity"
                value="activity"
                icon={<PhoneOutlinedIcon  />}
            />
            <BottomNavigationAction
                label="Contacts"
                value="contacts"
                icon={<PermIdentityIcon />}
            />
            <BottomNavigationAction
                label="Settings"
                value="settings"
                icon={<SettingsOutlinedIcon />}
            />
            <BottomNavigationAction
                label="Other"
                value="other"
                icon={<RadioButtonCheckedOutlinedIcon />} />
        </BottomNavigation>
    );
};

export default BottomBar;