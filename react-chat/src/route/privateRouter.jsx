import { Navigate } from 'react-router-dom';
import PAGES from '../const/pages.js';
import isTokenExpired from '../helpers/isTokenExpired.js';
import { clearTokens, setTokens } from '../store/auth/slice.js';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { userService } from '../api/userService/index.js';

const PrivateRouter = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const exp = localStorage.getItem('exp');
  const dispatch = useDispatch();
  const { updateOldToken } = userService();

  const isExpired = exp && isTokenExpired(exp);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const data = await updateOldToken({ refresh_token: refreshToken });
        dispatch(
          setTokens({
            accessToken: data.access,
            refreshToken: data.refresh,
          }),
        );
      } catch (error) {
        if (error.message === 'Request failed with status code 401') {
          setIsRefreshing(true);
        }
      }
    };

    if (isExpired) {
      fetchAccessToken(exp);
    }
  }, [dispatch, exp, isExpired, refreshToken, updateOldToken]);

  if (!accessToken) {
    return <Navigate to={PAGES.AUTH} replace />;
  }

  if (isExpired && isRefreshing) {
    dispatch(clearTokens());
    return <Navigate to={PAGES.AUTH} replace />;
  }

  return children;
};

export default PrivateRouter;
