import { useSelector } from 'react-redux';
import API_HOST from '../../../API/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_API = `http://localhost:5257/api/Holding`;

export const useGetHolding = ({
  search,
  code,
  isActive,
  page,
  pageSize,
} = {}) => {
  const { token } = useSelector((state) => state.auth);

  const getData = useQuery({
    queryKey: ['holding', search, code, isActive, page, pageSize],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, code, isActive, page, pageSize },
      });
      return res.data;
    },
  });
  return getData;
};

export const usecreateHolding = () => {
  const { token } = useSelector((state) => state.auth);

  const queryClient = useQueryClient();

  const createReport = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${BASE_API}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('هلدینگ با موفقیت ایجاد شد');
      queryClient.invalidateQueries({ queryKey: ['holding'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ایجاد هلدینگ');
    },
  });
  return createReport;
};

export const useUpdateholding = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const updateReport = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axios.put(`${BASE_API}/${id}`, data, {
        headers: { Authorization: `bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('هلدینگ با موفقیت ویرایش شد');
      queryClient.invalidateQueries({ queryKey: ['holding'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ویرایش هلدینگ');
    },
  });
  return updateReport;
};

export const useDeleteholding = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const deleteReport = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`${BASE_API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('هلدینگ با موفقیت  حذف شد');
      queryClient.invalidateQueries({ queryKey: ['holding'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در حذف هلدینگ');
    },
  });
  return deleteReport;
};
