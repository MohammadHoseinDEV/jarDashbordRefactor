import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import API_HOST from '../../../API/api';

const API_BASE = `http://localhost:5257/api/company`;

export const companyApi = {
  list: async ({ token, page = 1, pageSize = 20, search }) => {
    const res = await axios.get(`${API_BASE}`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { page, pageSize, search: search?.trim() || undefined },
    });
    return res.data;
  },

  create: async ({ token, dto }) => {
    const res = await axios.post(`${API_BASE}`, dto, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  update: async ({ token, id, dto }) => {
    const res = await axios.put(`${API_BASE}/${id}`, dto, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  remove: async ({ token, id }) => {
    const res = await axios.delete(`${API_BASE}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};

const useGetCompanies = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const getCompany = useQuery({
    queryKey: ['company', token],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
  return getCompany;
};

export { useGetCompanies };
