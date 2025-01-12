import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PAGES from '../const/pages.ts';

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (accessToken) {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        navigate(PAGES.CHAT_LIST);
      }
    }
  }, [accessToken, navigate]);

  return children;
};

export default PublicRoute;
