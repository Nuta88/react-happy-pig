import { ReactNode, ReactElement } from 'react';
import { render, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { store } from './store/store';

export async function renderWithProviders(Component: ReactElement, isRenderWithoutRouter?: boolean) {
  setupListeners(store.dispatch);

  function Wrapper({ children }: {children: ReactNode}) {
    if ( isRenderWithoutRouter ) {
      return <Provider store={store}>{children}</Provider>;
    }

    return (
        <Provider store={store}>
          <Router>{children}</Router>
        </Provider>
    )
  }

  return await act(async () => ({ store, ...render(Component, { wrapper: Wrapper }) }));
}
