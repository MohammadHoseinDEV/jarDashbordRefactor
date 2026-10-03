import { useQuery } from '@tanstack/react-query';
import API_HOST from '../../../API/api';
import { useSelector } from 'react-redux';
import axios from 'axios';

const BASE_API = `http://localhost:5257/api/Department`;

export const useGetDepartment = ({
  search,
  page,
  pageSize,
  code,
  holdingId,
} = {}) => {
  const { token } = useSelector((state) => state.auth);

  const getReport = useQuery({
    queryKey: ['dep', search, page, pageSize, code, holdingId],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `bearer ${token}` },
        params: { search, page, pageSize, code, holdingId },
      });
      return res.data;
    },
  });
  return getReport;
};
