import reducer from './reducers'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from "redux";
import {persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig={
    key: 'persist-key',
    storage
}

const persistedReducer =persistReducer(persistConfig,reducer)
const store = createStore(persistedReducer,applyMiddleware(thunk))
const persistor =persistStore(store)
export default store;
export {persistor}

