import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // registration form
    sponsor: false,
    name : false,
    username: false,
    userPhone: false,
    password: false,
    confirmPassword: false,
    userEmail: false, // for test send email
   

    //forgot pass
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,

}

export const FormSlice = createSlice({
    name: 'form', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {
        setFormSponsor: (state, action) => {
            state.sponsor = action.payload
        },
        setFormName: (state, action) => {
            state.name = action.payload
        },
        setFormUsername: (state, action) => {
            state.username = action.payload
        },
    
        setFormPhone: (state, action) => {
            state.userPhone = action.payload
        },
        setFormEmail: (state, action) => {
            state.userEmail = action.payload
        },
        setFormPassword: (state, action) => {
            state.password = action.payload
        },
        setFormConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload
        },
     
        setCurrentPassword: (state, action) => {
            state.currentPassword = action.payload
        },
        setNewPassword: (state, action) => {
            state.newPassword = action.payload
        },
        setConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload
        },

 

        resetForm: () => initialState
    }

})

export const {  resetForm, 

    setFormSponsor, setFormName, setFormUsername, setFormPhone, setFormPassword, 
    setFormConfirmPassword, setFormEmail, setCurrentPassword, setNewPassword, setConfirmPassword, 

} = FormSlice.actions

export default FormSlice.reducer
