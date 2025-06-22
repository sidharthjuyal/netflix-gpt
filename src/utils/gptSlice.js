import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        searchBarToggleFlag: true,
        gptMovies: null
    },
    reducers: {
        toggleSearchBar: (state, action) => {
            state.searchBarToggleFlag = !state.searchBarToggleFlag;
        },
        addGptMovieResult: (state, action) => {
            state.gptMovies = action.payload
        },
    }
})

export const { toggleSearchBar, addGptMovieResult } = gptSlice.actions; 
export default gptSlice.reducer;