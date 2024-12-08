import { configureStore } from '@reduxjs/toolkit'
import headerRudcer from './reducers/headerReducer'
import customBlockReducer from './reducers/blockReducer'
import constructionReducer from './reducers/constructionReducer'
const store = configureStore({
    reducer: {
        header: headerRudcer,
        customBlock: customBlockReducer,
        construction: constructionReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
