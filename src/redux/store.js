import { configureStore } from '@reduxjs/toolkit';

//import storage from 'redux-persist/lib/storage'; // use in production is ok
import storage from './storage'; // prevent console waring message on development

import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist'

// when adding more reducer don't forget to place here
import GeneralReducer from 'redux/reducers/GeneralReducer';
import AuthReducer from 'redux/reducers/AuthReducer';
import SoundReducer from 'redux/reducers/SoundReducer';
import FormReducer from 'redux/reducers/FormReducer';
import SettingReducer from 'redux/reducers/SettingReducer';
import MainmenuReducer from 'redux/reducers/MainmenuReducer';
import ModalReducer from 'redux/reducers/ModalReducer';
import LoaderReducer from 'redux/reducers/LoaderReducer';
import CreditCardReducer from 'redux/reducers/CreditCardReducer';
//import SmartContractReducer from 'redux/reducers/SmartContractReducer';
import ErrorReducer from 'redux/reducers/ErrorReducer';
import PackageReducer from 'redux/reducers/PackageReducer';
import StatementReducer from 'redux/reducers/StatementReducer';
import WithdrawalReducer from 'redux/reducers/WithdrawalReducer';
import AffiliateReducer from 'redux/reducers/AffiliateReducer';
import VideoPlayReducer from 'redux/reducers/VideoPlayReducer';
import ReferralReducer from 'redux/reducers/ReferralReducer';
import MatchingReducer from 'redux/reducers/MatchingReducer';
import AdminReducer from 'redux/reducers/AdminReducer';
import UploadReducer from 'redux/reducers/UploadReducer';
import DepositReducer from 'redux/reducers/DepositReducer'; 
 
const rootReducer = combineReducers({
  GeneralReducer,
  AdminReducer,
  AffiliateReducer,
  AuthReducer,
  CreditCardReducer,
  ErrorReducer,
  FormReducer,
  LoaderReducer,
  MainmenuReducer,
  ModalReducer,
  PackageReducer,
  ReferralReducer,
  MatchingReducer,
  SoundReducer,
  SettingReducer,
  StatementReducer,
  WithdrawalReducer,
  VideoPlayReducer,
  UploadReducer,
  DepositReducer
});

const persistConfig = {
  key: 'root',
  storage,
  //whitelist: [],
  whitelist: ["SettingReducer", "AuthReducer"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  //devTools: process.env.NODE_ENV !== 'production', // to show redux dev tool on production
  middleware: [thunk],
});


const persistor = persistStore(store)

export { store, persistor }

