import { configureStore } from '@reduxjs/toolkit'
import operatorReducer from './operator-slice';

const store = configureStore({
    reducer: {
        operators: operatorReducer
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;