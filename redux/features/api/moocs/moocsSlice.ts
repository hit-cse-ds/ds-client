import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    myMoocs: "",
    totalCreditPoints: 0,
    myMar: "",
    totalMarPoints: 0,
    moocsCourseList: [],
};

const moocsSlice = createSlice({
    name:"moocs",
    initialState,
    reducers: {
        myMoocs: (state,action: PayloadAction<{myMoocs:string,totalCreditPoints:number}>) => {
            state.myMoocs = action.payload.myMoocs;
            state.totalCreditPoints = action.payload.totalCreditPoints;
        },
        myMar: (state,action: PayloadAction<{myMar:string,totalMarPoints:number}>) => {
            state.myMar = action.payload.myMar;
            state.totalMarPoints = action.payload.totalMarPoints;
        },
    },
});

export const { myMoocs,myMar } = moocsSlice.actions;

export default moocsSlice.reducer;