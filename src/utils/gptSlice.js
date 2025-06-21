import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        searchBarToggleFlag: false,
    },
    reducers: {
        toggleSearchBar: (state, action) => {
            state.searchBarToggleFlag = !state.searchBarToggleFlag;
        }
    }
})

export const { toggleSearchBar } = gptSlice.actions; 
export default gptSlice.reducer;