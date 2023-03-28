import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import videoApi from "./videoApi"
import reducerFunction from "./reducerSlice"

const store = configureStore({
  reducer: {
    videoData: reducerFunction
    // [videoApi.reducerPath]: videoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(videoApi.middleware),
});


setupListeners(store.dispatch);

export default store;