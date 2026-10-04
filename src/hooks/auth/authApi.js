import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';

const API_BASE = `http://localhost:5257/api`;

export const useGetFullAccess = () => {
  const { token } = useSelector((state) => state.auth);

  const getPermission = useQuery({
    queryKey: ['access'],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE}/Auth/user-permissions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
  return getPermission;
};
