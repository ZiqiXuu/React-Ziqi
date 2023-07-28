import React from 'react';
import ReactDOM from 'react-dom';
import NaviBar from "./component/NaviBar";
import Header from './component/Header.jsx';
import BottomBar from "./component/BottomBar";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2AC420', // 这里是你想要的颜色
        },
        secondary: {
            main: '#f44336',
        },
    },
});


const App = () => {
    return (
        <ThemeProvider theme={theme}>
                <div className='container'>
                    <Header/>
                    <NaviBar/>
                    <BottomBar/>
                </div>
        </ThemeProvider>
    )
};

export default App;
