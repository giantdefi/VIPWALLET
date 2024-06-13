import { createSlice } from '@reduxjs/toolkit';

const initialState = {




    playNumber: 0,
    bgNumber: 0,

    videosCount: false,
    allVideos: false
};

export const videoSlice = createSlice({
    name: 'video', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {
        setPlayNumber: (state, action) => {
            state.playNumber = action.payload
        },
        setBgNumber: (state, action) => {
            state.bgNumber = action.payload
        },
        setVideosCount: (state, action) => {
            state.videosCount = action.payload
        },
        setAllVideos: (state, action) => {
            state.allVideos = action.payload
        },

        resetVideo: () => initialState
    }

});

export const { setPlayNumber, setBgNumber, resetVideo, setVideosCount, setAllVideos, } = videoSlice.actions;

export default videoSlice.reducer;
