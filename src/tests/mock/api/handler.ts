import { http, HttpResponse } from 'msw';

import {
  apiUrls,
  baseUrl
} from '../../../constants/apiUrls';

import { testMockData } from './mockData';

export const handlers = [
  http.get(`${String(baseUrl)}${apiUrls.funds.root}`, () => {
    return HttpResponse.json(testMockData.funds);
  }),
  http.get(`${String(baseUrl)}${apiUrls.funds.root}/1`, () => {
    return HttpResponse.json(testMockData.funds[0]);
  }),
  http.get(`${String(baseUrl)}${apiUrls.bank.root}`, () => {
    return HttpResponse.json(testMockData.bank);
  }),
  http.get(`${String(baseUrl)}${apiUrls.bank.activeLoans}`, () => {
    return HttpResponse.json(testMockData.loans);
  })
];
