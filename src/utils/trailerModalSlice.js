import { createSlice } from "@reduxjs/toolkit";

const trailerModalSlice = createSlice({
  name: "trailerModal",
  initialState: {
    isOpen: false,
    movieName: "",
    movieId: null,
    trailerId: null,
  },
  reducers: {
    openTrailerModal: (state, action) => {
      state.movieName = action.payload.movieName;
      state.movieId = action.payload.movieId;
      state.isOpen = true;
    },
    closeTrailerModal: (state) => {
      state.isOpen = false;
      state.movieId = null;
      state.trailerId = null;
    },
    setTrailerId: (state, action) => {
      state.trailerId = action.payload;
    },
  },
});

export const { openTrailerModal, closeTrailerModal, setTrailerId } =
  trailerModalSlice.actions;
export default trailerModalSlice.reducer;
