import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lang: 'ru',
  allowSound: true,
  attemps: 0, // limit for search user
  btnCheckDisabled: false,

  adminWalletSelected: 1,
};

export const SettingSlice = createSlice({
  name: 'setting', // specified name for this reducer. You can see this name on redux toolkit action
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload
    },
    setAllowSound: (state, action) => {
      state.allowSound = action.payload
    },
    setAttemps: (state, action) => {
      state.attemps = action.payload
    },
    setBtnCheckDisabled: (state, action) => {
      state.btnCheckDisabled = action.payload
    },
    setAdminWalletSelected: (state, action) => { // deposit
      state.adminWalletSelected = action.payload
    },
  }

});

export const { setLanguage, setAllowSound, setAttemps, setBtnCheckDisabled, setAdminWalletSelected } = SettingSlice.actions;

export default SettingSlice.reducer;
