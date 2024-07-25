import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    properties: null,
    loading : false,
    error : false,
}



const propertySlice = createSlice({
    name : 'property',
    initialState,
    reducers : {
        propertyInStart : (state) => {
            state.loading = true;
        },
        propertyInSuccess : (state, action) => {
            state.properties = action.payload;
            state.loading = false;
            state.error = false;
        },
        propertyInFailure : (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});


export const {
    propertyInStart, propertyInSuccess, propertyInFailure
} = propertySlice.actions;

export default propertySlice.reducer;