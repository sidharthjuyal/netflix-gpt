import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        searchBarToggleFlag: false,
        gptMovies: null
    },
    reducers: {
        toggleSearchBar: (state, action) => {
            state.searchBarToggleFlag = !state.searchBarToggleFlag;
        },
        addGptMovieResult: (state, action) => {
            state.gptMovies = action.paylod
        },
    }
})

export const { toggleSearchBar, addGptMovieResult } = gptSlice.actions; 
export default gptSlice.reducer;