import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    myWDWalletArray: false,
    totalRequestAmount: false,
    totalPaidAmount: false,


    admWdRequestsArray: false,
    admTotalRequestAmount: false,
    admTotalPaidAmount: false,

};

export const WithdrawalSlice = createSlice({
    name: 'withdraw', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {
        setMyWDWalletArray: (state, action) => {
            state.myWDWalletArray = action.payload
        },
        setTotalRequestAmount: (state, action) => {
            state.totalRequestAmount = action.payload
        },
        setTotalPaidAmount: (state, action) => {
            state.totalPaidAmount = action.payload
        },

        setADMTotalWDRequestArray: (state, action) => {
            state.admWdRequestsArray = action.payload
        },
        setADMTotalRequestAmount: (state, action) => {
            state.admTotalRequestAmount = action.payload
        },
        setADMTotalPaidAmount: (state, action) => {
            state.admTotalPaidAmount = action.payload
        },

        resetWithdrawal: () => initialState
    }

});

export const { resetWithdrawal, setMyWDWalletArray, setTotalRequestAmount, setTotalPaidAmount,
    setADMTotalWDRequestArray, setADMTotalRequestAmount, setADMTotalPaidAmount

} = WithdrawalSlice.actions;

export default WithdrawalSlice.reducer;
