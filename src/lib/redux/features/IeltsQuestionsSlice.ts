import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GEMINI_URL } from "@/config/URL";
import { RootState } from "../store";

type Questions = {
    part1: string[]
    part2: {
        subject: string;
        shouldSay: string[]
    },
    part3: string[]
}

export type Data = {
    data: Questions;
    status: "idle" | "pending" | "succeeded" | "failed";
    error: undefined | string;
};

const initialData: Questions = {
    part1: [],
    part2: {
        subject: "",
        shouldSay: []
    },
    part3: []
}

const initialState: Data = {
    data: initialData,
    status: "idle",
    error: undefined,
};

export const ieltsQuestionsSlice = createSlice({
    name: "ieltsQuestions",
    initialState,
    reducers: {},
});

export const selectIeltsQuestions = (state: RootState) => state.ieltsQuestions.data;
export const selectIeltsQuestionsStatus = (state: RootState) => state.ieltsQuestions.status;

export const ieltsQuestionsReducer = ieltsQuestionsSlice.reducer;
