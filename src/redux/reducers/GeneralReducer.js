import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    masterUser: 'VIP1000000001', // for not login user to see m-tree
    domain: 'vipwallet.com',
    title: 'VIPWALLET',
    desc: '',
    currency: 'BUSD'
}

export const GeneralSlice = createSlice({
    name: 'general', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {
        setDomain: (state, action) => { // not used to prevent error only
            state.domain = action.payload
        },
    }

})

export const { setDomain } = GeneralSlice.actions

export default GeneralSlice.reducer
