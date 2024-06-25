import { combineReducers } from "@reduxjs/toolkit";
import guestReducer from "./features/guestSlice";
import popupReducer from "./features/popupSlice";
import popupMessageReducer from "./features/popupMessageSlice";
import authReducer from "./features/authSlice";

const rootReducer = combineReducers({
  guest: guestReducer,
  popup: popupReducer,
  popupMessage: popupMessageReducer,
  auth: authReducer,
});

export const resetAll = () => {
  const initialState = rootReducer(undefined, { type: "" });
  return {
    type: "RESET_ALL",
    payload: initialState,
  };
};

export type IRootState = ReturnType<typeof rootReducer>;
export default rootReducer;
