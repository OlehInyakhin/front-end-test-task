import React from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
	loginFailure,
	loginStart,
	loginSuccess,
} from "@/feature/auth/slices/authSlice";

type FormData = {
	email: string
	password: string
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })

export const SignInPage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { error, isAuthenticated, status } = useAppSelector(
		(state) => state.auth,
	);
	const {
		register,
		handleSubmit,
		formState: { isValid, errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
		mode: 'all',
		defaultValues: {
			email: '',
			password: '',
		}
	});
	const isLoading = status === 'loading';

	React.useEffect(() => {
		if (isAuthenticated === true) navigate('/');
	}, [isAuthenticated]);

	const onSubmit = async (values: FormData) => {
		const { email, password } = values;
		dispatch(loginStart());

		await new Promise((r) => setTimeout(r, 2000));

		if (email === 'test@test.test' && password === 'password') {
			dispatch(
				loginSuccess({
					email: email,
					name: email.split("@")[0],
					id: Math.random(),
					role: "user",
				}),
			);
		} else dispatch(loginFailure("User not found"));
	}

	return (
		<div className="py-10 grow flex items-center justify-center bg-gray-50 dark:bg-transparent">
			<div className="w-full max-w-md">
				<div className="bg-white dark:bg-gray-800 dark:text-white shadow-md rounded-xl p-8">
					<h1 className="text-2xl font-bold text-gray-900 dark:text-inherit text-center mb-6">
						Sign In
					</h1>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-4">
							<label htmlFor="email" className="block text-sm font-medium mb-2">
								Email address
							</label>
							<input
								{...register("email")}
								type="email"
								id="email"
								data-invalid={!!errors?.email}
								className="py-3 px-4 block w-full border border-gray-200 data-[invalid=true]:border-red-600 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
							/>
							{errors?.email && (
								<p className="text-red-600 text-sm">{errors?.email?.message}</p>
							)}
						</div>
						<div className="mb-6">
							<label
								htmlFor="password"
								className="block text-sm font-medium mb-2">
								Password
							</label>
							<input
								{...register("password")}
								type="password"
								id="password"
								data-invalid={!!errors?.password}
								className="py-3 px-4 block w-full border border-gray-200 data-[invalid=true]:border-red-600 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
							/>
							{errors?.password && (
								<p className="text-red-600 text-sm">{errors?.password?.message}</p>
							)}
						</div>
						<button
							disabled={!isValid || isLoading}
							type="submit"
							className="transition duration-300 w-full cursor-pointer py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
							Sign in
						</button>
						{error && (
							<p className="text-red-600 text-lg text-center mt-4 p-2 radius-4 border border-red rounded-md">{error}</p>
						)}
					</form>
				</div>
			</div>
		</div>
	);
};
