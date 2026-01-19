import { http, HttpResponse } from 'msw';

import {
  apiUrls,
  baseUrl
} from '../../../constants/apiUrls';

import { testMockData } from './mockData';

export const handlers = [
  http.get(`${baseUrl}${apiUrls.funds.root}`, () => {
    return HttpResponse.json(testMockData.funds);
  }),
  http.get(`${baseUrl}${apiUrls.funds.root}/1`, () => {
    return HttpResponse.json(testMockData.funds[0]);
  }),
  http.get(`${baseUrl}${apiUrls.bank.root}`, () => {
    return HttpResponse.json(testMockData.bank);
  })
];
