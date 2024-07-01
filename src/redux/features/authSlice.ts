import { createSlice } from "@reduxjs/toolkit";

interface User {
  _id: string;
  userId: string;
  email: string;
  isEmailVerified: boolean;
  fullName: string;
  phone: string;
  username: string;
  profilePicture: string | undefined;
  gender?: string;
  dob?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
    },

    removeAuth: (state) => {
      return initialState;
    },

    resetAuth: () => {
      return initialState;
    },
  },
});

export const { setAuth, removeAuth, resetAuth } = authSlice.actions;
export default authSlice.reducer;
