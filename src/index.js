import './css/body.css';
import './css/app.css';
import './css/header.css';
import App from './App.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import store, {persistor} from "./store/store";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </PersistGate>
    </Provider>,

    document.getElementById('app')
);
