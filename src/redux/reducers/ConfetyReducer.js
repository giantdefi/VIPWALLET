import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   
   confety : false
}

export const ConfetySlice = createSlice({
    name: 'confety', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {
        setConfety: (state, action) => {
            state.confety = action.payload
        },
       

 

        resetCOnfety: () => initialState
    }

})

export const {  resetForm, 

    resetCOnfety, setConfety

} = ConfetySlice.actions

export default ConfetySlice.reducer
