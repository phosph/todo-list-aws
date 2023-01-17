import { PropsWithChildren } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query/react';
import { Provider } from 'react-redux';
import { listApi } from './Store/Store';

const store = configureStore({
  reducer: {
    [listApi.reducerPath]: listApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listApi.middleware),
});

setupListeners(store.dispatch);

export default function StoreProvide({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
