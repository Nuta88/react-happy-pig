import '@testing-library/jest-dom';
import ResizeObserver from 'resize-observer-polyfill';

import { server } from './tests/mock/api/server';

global.ResizeObserver = ResizeObserver;

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: () => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false
  })
});

beforeAll(() => { server.listen({ onUnhandledRequest: 'error' }); });
afterEach(() => { server.resetHandlers(); });
afterAll(() => { server.close(); });
