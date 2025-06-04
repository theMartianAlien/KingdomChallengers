import { createSlice } from '@reduxjs/toolkit'

const betsSlice = createSlice({
    name: 'bets',
    initialState: { filtersBy: [], term: '', status: '' },
    reducers: {
        filterByPlayerIs(state, action) {
            const item = action.payload;
            state.filtersBy = item._ids;
        },
        filterBySearchTerm(state, action) {
            const term = action.payload;
            state.term = term.term;
        },
        filterByStatus(state, action) {
            const status = action.payload;
            state.status = status.status;
        }
    }
});

export const betsActions = betsSlice.actions;

export default betsSlice;