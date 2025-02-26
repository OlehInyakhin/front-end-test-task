import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAuthenticated: false,
	user: null,
	loading: false,
	error: null,
	data: {},
	status: "idle",
	userInfo: {
		email: "",
		name: "",
		id: null,
		role: "",
	},
};

const authSlice = createSlice({
	name: "authentication",
	initialState: initialState,
	reducers: {
		loginStart(state) {
			state.loading = true;
			state.error = null;
			state.status = "loading";
			state.data = {};
		},
		loginSuccess(state, { payload }) {
			state.isAuthenticated = true;
			state.user = payload;
			state.loading = false;
			state.error = null;
			state.status = "succeeded";
			state.data = payload;
			state.userInfo = {
				...state.userInfo,
				...payload,
			};
		},
		loginFailure(state, { payload }) {
			state.loading = false;
			state.error = payload;
			state.status = "failed";
			state.data = {};
			state.user = null;
		},
		logout() {
			return initialState;
		},
	},
});

export const {
	loginStart,
	loginSuccess,
	loginFailure,
	logout,
} = authSlice.actions;
export default authSlice.reducer;
