import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PAGES from '../const/pages.js';
import { clearTokens } from '../store/auth/slice.js';

const useAuthErrorHandler = (error) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error === 'Request failed with status code 401') {
      dispatch(clearTokens());
      navigate(PAGES.AUTH);
    }
  }, [dispatch, error, navigate]);
};

export default useAuthErrorHandler;
