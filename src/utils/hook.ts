import { useEffect } from 'react';
import { useAppSelector } from '@/redux/hook';
import  { setAuthToken } from './axiosInstance';

const useAxiosToken = () => {
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
  }, [token]);
};

export default useAxiosToken;