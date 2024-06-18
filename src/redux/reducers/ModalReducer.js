import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalMessage: false, // will consist ( true/false, modalType, message )
  modalActivateUser: false,
  modalConfirmLogOut: false, 
  modalConfirmTopUp : false,
  modalWarningBuyPackage : false,
  modalSuccessRankings : false
};

export const modalSlice = createSlice({
  name: 'modal', // specified name for this reducer. You can see this name on redux toolkit action
  initialState,
  reducers: {
    setModalMessage: (state, action) => {
      state.modalMessage = action.payload
    },
    setModalActivateUser: (state, action) => {
      state.modalActivateUser = action.payload
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
    setModalSuccessRanking: (state, action) => {
      state.modalSuccessRankings = action.payload
    },
    resetModal: () => initialState
  }

});

export const { resetModal, setModalMessage, setModalActivateUser, setModalConfirmLogOut, setModalConfirmTopUp, setModalWarningBuyPackage, setModalSuccessRanking
} = modalSlice.actions;

export default modalSlice.reducer;
