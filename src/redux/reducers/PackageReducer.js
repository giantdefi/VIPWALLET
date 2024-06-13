import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    
    PACKAGES : false,
    usersPACKAGES: false, // consist 1 to 4
  
    selectedPID: false, // consist 1 to 4
    selectedPackageName: false,
    selectedPackageValue: false,
    selectedROI: false,
    myPackageDetail: false,

    myPackagesArray: false,

    selectedActPackID: false,
    selectedPackName : false,
    selectedPackValue : false,
    wdAmmounts: false,
    wdType: false, // investement or bonus
};

export const packageSlice = createSlice({
    name: 'package', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {
        setPACKAGES: (state, action) => { // consist 1 to 4
            state.PACKAGES = action.payload
        },
        setUsersPACKAGES: (state, action) => { // consist 1 to 4
            state.usersPACKAGES = action.payload
        },
        setSelectedPID: (state, action) => { // consist 1 to 4
            state.selectedPID = action.payload
        },
        setSelectedPackageName: (state, action) => {
            state.selectedPackageName = action.payload
        },
        setSelectedPackageValue: (state, action) => {
            state.selectedPackageValue = action.payload
        },
        setSelectedROI: (state, action) => {
            state.selectedROI = action.payload
        },
        setMyPackageDetail: (state, action) => {
            state.myPackageDetail = action.payload
        },
        setSelectedActPackID: (state, action) => {
            state.selectedActPackID = action.payload
        },
        setSelectedPackName: (state, action) => {
            state.selectedPackName = action.payload
        },
        setWDAmounts: (state, action) => {
            state.wdAmmounts = action.payload
        },
        setSelectedPackValue: (state, action) => {
            state.selectedPackValue = action.payload
        },
        resetPackage: () => initialState



    }

});

export const { resetPackage, setPACKAGES, setUsersPACKAGES, setSelectedPID, setSelectedPackageName, setSelectedPackageValue, setSelectedROI, setMyPackageDetail,
    setSelectedActPackID, setWDAmounts, setWDType, setSelectedPackName, setSelectedPackValue

} = packageSlice.actions;

export default packageSlice.reducer;
