import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    imageBlob: false,
    imageUploadBlob: false,


};

export const Upload = createSlice({
    name: 'upload',
    initialState,
    reducers: {
        setImageBlob: (state, action) => {
            state.imageBlob = action.payload
        },
        setUploadImageBlob: (state, action) => {
            state.imageUploadBlob = action.payload
        },
        resetUpload: () => initialState
    }

});

export const { resetUpload, setUploadImageBlob, setImageBlob } = Upload.actions;

export default Upload.reducer;
