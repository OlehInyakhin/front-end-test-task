import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import { HomePage } from "@/feature/dashboard/pages/Home";
import { Providers } from "@/providers";
import { SignInPage } from "@/feature/auth/pages/SignIn";
import { PageWrapper } from "@/components/PageWrapper";

const App = () => {
	return (
		<Providers>
			<BrowserRouter>
				<PageWrapper>
					<Routes>
						<Route
							path="/"
							element={<HomePage />}
						/>
						<Route
							path="/sign-in"
							element={<SignInPage />}
						/>
						<Route
							path="*"
							element={<Navigate to={'/'} />}
						/>
					</Routes>
				</PageWrapper>
			</BrowserRouter>
		</Providers>
	);
};

export default App;
