import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    
    myNetwork : false,
    myDownlines : false , // array
    activateSpinner : false,

    // activation
    userIDSponsor : false,
    userIDMember : false,
    level : false,
    boardNo : false,

    allowReload : false
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
        setActivateSpinner: (state, action) => {
            state.activateSpinner = action.payload
        },
        setActivateSpinner: (state, action) => {
            state.activateSpinner = action.payload
        },
        //activation
        setUserIDSponsor: (state, action) => {
            state.userIDSponsor = action.payload
        },
        setUserID: (state, action) => {
            state.userIDMember = action.payload
        },
        setLevel: (state, action) => {
            state.level = action.payload
        },
        setBoardNo: (state, action) => {
            state.boardNo = action.payload
        },
        setAllowReload: (state, action) => {
            state.allowReload = action.payload
        },
        resetNetwork: () => initialState
    }

})

export const {  setMyNetwork, setMyDownlines, setActivateSpinner,setAllowReload,
    setUserIDSponsor,setUserID, setLevel, setBoardNo 
 } = NetworkSlice.actions

export default NetworkSlice.reducer
