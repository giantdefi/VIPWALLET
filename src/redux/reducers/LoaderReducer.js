import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    btnSpinner: false,
    menuSpinner: false,
    loaderBalance: false

};

export const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        setBtnSpinner: (state, action) => {
            state.btnSpinner = action.payload
        },
        setMenuSpinner: (state, action) => {
            state.menuSpinner = action.payload
        },
        setLoaderBalance: (state, action) => {
            state.loaderBalance = action.payload
        },

        resetLoader: () => initialState
    }

});

export const { resetLoader, setBtnSpinner, setMenuSpinner, setLoaderBalance } = loaderSlice.actions;

export default loaderSlice.reducer;
