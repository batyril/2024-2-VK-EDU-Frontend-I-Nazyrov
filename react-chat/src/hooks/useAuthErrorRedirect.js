import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PAGES from '../const/pages';
import getAccessToken from '../helpers/getAccessToken.js';

const useAuthErrorRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      navigate(PAGES.AUTH);
    }
  }, [navigate]);
};

export default useAuthErrorRedirect;
