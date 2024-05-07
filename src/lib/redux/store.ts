import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { ieltsAnswersReducer } from './features/IeltsAnswersSlice';


const reducers = combineReducers({
    ieltsAnswers: ieltsAnswersReducer
})

const store = configureStore({
    reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;