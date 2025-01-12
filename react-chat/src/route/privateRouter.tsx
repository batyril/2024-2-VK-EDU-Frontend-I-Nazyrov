import { Navigate } from 'react-router-dom';
import PAGES from '../const/pages.ts';
import isTokenExpired from '../helpers/isTokenExpired.ts';
import { clearTokens, setTokens } from '../store/auth/slice.ts';
import { useDispatch } from 'react-redux';
import { ReactNode, useEffect, useState } from 'react';
import { userService } from '../api/userService';

const PrivateRouter = ({ children }: { children: ReactNode }) => {
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
        if (refreshToken) {
          const data = await updateOldToken({ refresh_token: refreshToken });
          dispatch(
            setTokens({
              accessToken: data.access,
              refreshToken: data.refresh,
            }),
          );
        }
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === 'Request failed with status code 401'
        ) {
          setIsRefreshing(true);
        }
      }
    };

    if (isExpired) {
      fetchAccessToken();
    }
  }, [dispatch, isExpired, refreshToken, updateOldToken]);

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
