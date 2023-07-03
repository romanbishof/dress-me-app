import { configureStore } from "@reduxjs/toolkit";
import ClosetData_reducer from "./ClosetSlice";

export default configureStore({
  reducer: {
    ClosetData: ClosetData_reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
