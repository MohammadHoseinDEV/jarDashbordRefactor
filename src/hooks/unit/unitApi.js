import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';

const BASE_API = `http://localhost:5257/api/Unit`;

export const useGetUnit = ({ search, page, pageSize, code } = {}) => {
  const { token } = useSelector((state) => state.auth);

  const getReport = useQuery({
    queryKey: ['unit', search, page, pageSize, code],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `bearer ${token}` },
        params: {
          search,
          page,
          pageSize,
          code,
        },
      });
      return res.data;
    },
  });
  return getReport;
};
