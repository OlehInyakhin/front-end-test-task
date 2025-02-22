import React from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
	loginFailure,
	loginStart,
	loginSuccess,
} from "../store/slices/authSlice";

const SignInPage: any = () => {
	const navigate: any = useNavigate();
	const dispatch: any = useAppDispatch();
	const isAuthenticated: any = useAppSelector(
		(state: any) => state.auth.isAuthenticated,
	);

	const [email, setEmail]: any = React.useState("");
	const [password, setPassword]: any = React.useState("");

	React.useEffect(() => {
		if (isAuthenticated === true) navigate("/");
	}, [isAuthenticated, navigate]);

	async function handleSubmit(e: any) {
		e.preventDefault();
		dispatch(loginStart());

		await new Promise((r) => setTimeout(r, 1000));

		if (email && password) {
			dispatch(
				loginSuccess({
					email: email,
					name: email.split("@")[0],
					id: Math.random(),
					role: "user",
				}),
			);
		} else dispatch(loginFailure("Please fill all fields"));
	}

	return (
		<div className="h-screen flex items-center justify-center bg-gray-50">
			<div className="w-full max-w-md">
				<div className="bg-white shadow-md rounded-xl p-8">
					<h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
						Sign In
					</h1>

					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label htmlFor="email" className="block text-sm font-medium mb-2">
								Email address
							</label>
							<input
								type="email"
								id="email"
								name="email"
								className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div className="mb-6">
							<label
								htmlFor="password"
								className="block text-sm font-medium mb-2">
								Password
							</label>
							<input
								type="password"
								id="password"
								name="password"
								className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<button
							type="submit"
							className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
							Sign in
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignInPage;
