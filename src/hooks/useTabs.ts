import {
  useCallback,
  useEffect,
  useState
} from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

interface IUseTabs {
  tabKey: string;
  setTabKey: (key: string) => void
}

export const useTabs = (defaultTab: string, tabKeys: string[]): IUseTabs => {
  const { tab } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [ tabKey, setTabKey ] = useState(tab ?? defaultTab);

  useEffect(() => {
    if (tab && !tabKeys.includes(tab)) navigate(-1);
  }, [ tab, tabKey, tabKeys ]);

  const createNewPath = (key: string): string => {
    for (const curTab of tabKeys) {
      if (location.pathname.includes(curTab)) return location.pathname.replace(curTab, key);
    }

    return location.pathname;
  };

  const changeTab = useCallback((key: string) => {
    setTabKey(key);
    navigate(createNewPath(key));
  }, [ ]);

  return { tabKey, setTabKey: changeTab };
};
