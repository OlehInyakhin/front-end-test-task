import { configureStore, Middleware } from "@reduxjs/toolkit";
import { catsApi } from "@/feature/dashboard/services/catsService";
import authReducer from "@/feature/auth/slices/authSlice";

const customMiddleware: Middleware = (store) => (next) => (action) => {
	const response = next(action);
	const afterState = store.getState();
	console.log('store state', afterState);
	return response;
};

const store = configureStore({
	reducer: {
		cats: catsApi.reducer,
		auth: authReducer,
		[catsApi.reducerPath]: catsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat([catsApi.middleware, customMiddleware])
			.concat(catsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
