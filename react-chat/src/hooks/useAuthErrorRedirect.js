import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PAGES from '../const/pages';
import { useSelector } from 'react-redux';

const useAuthErrorRedirect = (error) => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();

  if (!accessToken) {
    navigate(PAGES.AUTH);
  }

  useEffect(() => {
    if (
      error === 'Access token not found' ||
      error === 'Request failed with status code 401'
    ) {
      navigate(PAGES.AUTH);
    }
  }, [error, navigate]);

  return accessToken;
};
export default useAuthErrorRedirect;
