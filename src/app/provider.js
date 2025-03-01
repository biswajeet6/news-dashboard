'use client';

import { Provider } from 'react-redux';
import { SessionProvider } from "next-auth/react";
import { store } from '../../redux/store';

export function Providers({ children }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        {children}
      </Provider>
    </SessionProvider>
  );
}
