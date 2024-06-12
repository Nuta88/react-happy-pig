import {
  BankIcon,
  DollarIcon,
  TagsIcon
} from '../components';

import { apiUrls } from './apiUrls';

export const dateFormat = 'YYYY-MM-DD';

export const navigationLinks = [
  {
    name: 'Funds',
    link: apiUrls.funds.root,
    icon: DollarIcon
  },
  {
    name: 'Bank',
    link: apiUrls.bank.root,
    icon: BankIcon
  },
  {
    name: 'Tags',
    link: apiUrls.tags.root,
    icon: TagsIcon
  }
];
