import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    depositArray: false,
    depositTotal: false,
    depositConfirmed: false,

    selectedDepositId: false,
    changeTrxValue: false, // if amount not same as in transaction hash

};

export const WithdrawalSlice = createSlice({
    name: 'withdraw', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {
        setDepositArray: (state, action) => {
            state.depositArray = action.payload
        },
        setDepositTotal: (state, action) => {
            state.depositTotal = action.payload
        },
        setDepositConfirmed: (state, action) => {
            state.depositConfirmed = action.payload
        },
        setSelectedDepositId: (state, action) => {
            state.selectedDepositId = action.payload
        },
        setChangeTrxValue: (state, action) => {
            state.changeTrxValue = action.payload
        },


        resetDeposit: () => initialState
    }

});

export const { resetDeposit, setDepositArray, setDepositTotal, setDepositConfirmed, setSelectedDepositId, setChangeTrxValue

} = WithdrawalSlice.actions;

export default WithdrawalSlice.reducer;
