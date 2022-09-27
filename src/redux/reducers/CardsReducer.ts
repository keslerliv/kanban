import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'cards',
    initialState: {
        cards: [
            { title: '📝  To Do' },
            { title: '💻  In Progress' },
            { title: '🚀  Done' }
        ],
        items: [
            { title: 'Anexado ao 1', parent: 0 },
            { title: 'Anexado ao 2', parent: 1 },
            { title: 'Anexado ao 3', parent: 2 }
        ]
    },
    reducers: {
        setCards: (state, action) => {
            state.cards = action.payload;
        },
        setItems: (state, action) => {
            state.items = action.payload;
        }
    }
});

export const { setCards, setItems } = slice.actions;
export default slice.reducer;