import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import API_HOST from '../../../API/api';

const BASE_API = `http://localhost:5257/api/User/profile`;

const useGetProfile = () => {
  const { token } = useSelector((state) => state.auth);

  const getProfile = useQuery({
    queryKey: ['profiles', token],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
  return getProfile;
};

export { useGetProfile };
