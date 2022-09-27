import { configureStore } from '@reduxjs/toolkit';

import CardsReducer from './reducers/CardsReducer';

export const store = configureStore({
    reducer: {
        cards: CardsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;