import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalMessage: false, // will consist ( true/false, modalType, message )
  modalLanguage: false,
  modalConfirmLogOut: false, 
  modalConfirmTopUp : false,
  modalWarningBuyPackage : false
};

export const modalSlice = createSlice({
  name: 'modal', // specified name for this reducer. You can see this name on redux toolkit action
  initialState,
  reducers: {
    setModalMessage: (state, action) => {
      state.modalMessage = action.payload
    },
    setModalLanguage: (state, action) => {
      state.modalLanguage = action.payload
    },
    setModalConfirmLogOut: (state, action) => {
      state.modalConfirmLogOut = action.payload
    },
    setModalConfirmTopUp: (state, action) => {
      state.modalConfirmTopUp = action.payload
    },
    setModalWarningBuyPackage: (state, action) => {
      state.modalWarningBuyPackage = action.payload
    },
    resetModal: () => initialState
  }

});

export const { resetModal, setModalMessage, setModalLanguage, setModalConfirmLogOut, setModalConfirmTopUp, setModalWarningBuyPackage
} = modalSlice.actions;

export default modalSlice.reducer;
