import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice";
import trailerModalReducer from "./trailerModalSlice"

const appStore = configureStore({
    reducer: {
       user: userReducer,
       movies: moviesReducer,
       gpt: gptReducer,
       config: configReducer,
       trailerModal: trailerModalReducer
    }
});

export default appStore;