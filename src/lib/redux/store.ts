import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { ieltsQuestionsReducer } from './features/IeltsQuestionsSlice'


const reducers = combineReducers({
    ieltsQuestions: ieltsQuestionsReducer
})

const store = configureStore({
    reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;