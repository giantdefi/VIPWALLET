import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    statsData: false,
    selectedWDItem: false,

    Acct_1: false,
    Acct_2: false,
    Acct_3: false,

};

export const AdminSlice = createSlice({
    name: 'adms',
    initialState,
    reducers: {
        setStatsData: (state, action) => {
            state.statsData = action.payload
        },
        setSelectedWDItem: (state, action) => {
            state.selectedWDItem = action.payload
        },
        setAcct_1: (state, action) => {
            state.Acct_1 = action.payload
        },
        setAcct_2: (state, action) => {
            state.Acct_2 = action.payload
        },
        setAcct_3: (state, action) => {
            state.Acct_3 = action.payload
        },
        resetStats: () => initialState
    }

});

export const { resetStats, setStatsData, setSelectedWDItem, setAcct_1, setAcct_2, setAcct_3 } = AdminSlice.actions;

export default AdminSlice.reducer;
