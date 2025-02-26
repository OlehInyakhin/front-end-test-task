import React from 'react';
import { Provider } from "react-redux";
import { store } from "@/store/store";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers(props: ProvidersProps) {
  const { children } = props;

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
