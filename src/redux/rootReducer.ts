import { combineReducers } from "@reduxjs/toolkit";
// import countReducer from "./features/countSlice";
// import navbarCategoryReducer from "./features/navbarCategorySlice";
import guestReducer from "./features/guestSlice";
// import cartReducer from "./features/cartSlice";
import popupReducer from "./features/popupSlice";
// import shopReducer from "./features/shopSlice";
import popupMessageReducer from "./features/popupMessageSlice";
import authReducer from "./features/authSlice";

const rootReducer = combineReducers({
  //   count: countReducer,
  //   navbarCategory: navbarCategoryReducer,
  guest: guestReducer,
  //   cart: cartReducer,
  popup: popupReducer,
  //   shop: shopReducer,
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

export default rootReducer;
