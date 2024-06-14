import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    myDownlines : false  // array
}

export const NetworkSlice = createSlice({
    name: 'network', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {
        setMyDownlines: (state, action) => {
            state.myDownlines = action.payload
        },
       // resetRefLink: () => initialState
    }

})

export const {  setMyDownlines } = NetworkSlice.actions

export default NetworkSlice.reducer
