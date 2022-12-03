import { render, act } from '@testing-library/react';
import { Provider } from 'react-redux'
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { store } from './store/store';

export async function renderWithProviders(Component) {
  setupListeners(store.dispatch);

  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  return await act(async () => ({ store, ...render(Component, { wrapper: Wrapper }) }));
}
