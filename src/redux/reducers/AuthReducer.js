import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin: false,
  fullname : false,
  userID: false,
  level: false,
  boardNo : false,
  token: false,

  phone: false,
  email: false,
  isActive : false
}

export const AuthSlice = createSlice({
  name: 'auth', // specified name for this reducer. You can see this name on redux toolkit action
  initialState,
  reducers: {
   

    // on page reload and the value is changed
    setIsLogin: (state, action) => {
      state.isLogin = action.payload
    },
    setFullName: (state, action) => {
      state.fullname = action.payload
    },
    setUserID: (state, action) => {
      state.userID = action.payload
    },
    setLevel: (state, action) => {
      state.level = action.payload
    },
    setBoardNo: (state, action) => {
      state.boardNo = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },

    setPhone: (state, action) => {
      state.phone = action.payload
    },
    setEmail: (state, action) => {
      state.email = action.payload
    },
    setIsActive: (state, action) => {
      state.isActive = action.payload
    },
    
    

    setLogout: () => initialState
  }

})

export const { setLogout, setIsLogin,  setFullName, setUserID, setLevel, setBoardNo, setToken, setPhone, setEmail, setIsActive

} = AuthSlice.actions

export default AuthSlice.reducer
