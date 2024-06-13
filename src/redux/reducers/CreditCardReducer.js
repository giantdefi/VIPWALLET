import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    // userClone: false,
    cardNo: false,
    joinDate: false,

    nametitle: 'Mrs.',
    name: false,
    VIPID: 'VIP10000000001',
    idLength : 10000000000,
    allowAnimated: false,

    random1 : false,
    random2 : false,
    random3 : false,
    random4 : false,

    usersCount : false

}

export const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      
        
        setCardNo: (state, action) => {
            state.cardNo = action.payload
        },
        setMyclonedUsers: (state, action) => {
            state.joinDate = action.payload
        },
        setJoinDate: (state, action) => {
            state.joinDate = action.payload
        },
        setNametitle: (state, action) => {
            state.nametitle = action.payload
        },
        setName: (state, action) => {
            state.name = action.payload
        },
        setVIPID: (state, action) => {
            state.VIPID = action.payload
        },
        setAllowAnimated: (state, action) => {
            state.allowAnimated = action.payload
        },
        setRandom1: (state, action) => {
            state.random1 = action.payload
        },
        setRandom2: (state, action) => {
            state.random2 = action.payload
        },
        setRandom3: (state, action) => {
            state.random3 = action.payload
        },
        setRandom4: (state, action) => {
            state.random4 = action.payload
        },
        setUsersCount: (state, action) => {
            state.usersCount = action.payload
        },


        resetCard: () => initialState
    }

})

export const { resetCard,setCardNo, setJoinDate,setNametitle, setName, setVIPID, setAllowAnimated, setRandom1, setRandom2, setRandom3, setRandom4, setUsersCount
   
} = UsersSlice.actions

export default UsersSlice.reducer
