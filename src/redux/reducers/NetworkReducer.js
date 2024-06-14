import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    
    myNetwork : false,
    myDownlines : false  // array
}

export const NetworkSlice = createSlice({
    name: 'network', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {
        setMyNetwork: (state, action) => {
            state.myNetwork = action.payload
        },
        setMyDownlines: (state, action) => {
            state.myDownlines = action.payload
        },
        resetRefLink: () => initialState
    }

})

export const {  setMyNetwork, setMyDownlines } = NetworkSlice.actions

export default NetworkSlice.reducer
