import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { GEMINI_URL } from "@/config/URL";
import { RootState } from "../store";

type Answers = {
    part1: string[]
    part2: string
    part3: string[]
}
const initialState: Answers = {
    part1: [],
    part2: "",
    part3: []
}

export const ieltsAnswersSlice = createSlice({
    name: "ieltsAnswers",
    initialState,
    reducers: {
        saveAnswers: (state, action: PayloadAction<Answers>) => {
          return action.payload;
        },
        resetAnswers: (state) => {
            return initialState;
        }
    },
});

export const selectIeltsAnswers = (state: RootState) => state.ieltsAnswers;

export const ieltsAnswersReducer = ieltsAnswersSlice.reducer;
