import React, { useEffect } from "react";
import { useLocation } from "react-router";
import "preline/preline";
import { IStaticMethods } from "preline/preline";

declare global {
	interface Window {
		HSStaticMethods: IStaticMethods;
	}
}

type Props = {
	children: React.ReactNode;
};

export const UIProvider = ({ children }: Props) => {
	const location = useLocation();

	useEffect(() => {
		window.HSStaticMethods.autoInit();
	}, [location.pathname]);

	return children;
};
