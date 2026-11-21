import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const BASE_API = `http://localhost:5257/api/System`;

export const useGetSystem = ({ unitId, search, code, page, pageSize }) => {
  const { token } = useSelector((state) => state.auth);

  const getReport = useQuery({
    queryKey: ['sys', unitId, search, code, page, pageSize],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { unitId, search, code, page, pageSize },
      });
      return res.data;
    },
  });
  return getReport;
};

export const useCreateSystem = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createReport = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${BASE_API}`, data, {
        headers: { Authorization: `bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success(`سیستم با موفقیت اضافه شد`);
      queryClient.invalidateQueries({ queryKey: ['sys'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ایجاد سیستم');
    },
  });
  return createReport;
};

export const useUpdateSystem = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const updateReport = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axios.put(`${BASE_API}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('ویرایش سیستم با موفقیت انجام شد');
      queryClient.invalidateQueries({ queryKey: ['sys'] });
    },
    onError: (e) => {
      toast.error(e.reponse.data.message || 'خطا در ویرایش سیستم');
    },
  });
  return updateReport;
};

export const useDeleteSystem = () => {
  const { token } = useSelector((state) => state.auth);
  const queryclient = useQueryClient();

  const deleteReport = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`${BASE_API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('سیستم با موفقیت حذف شد');
      queryclient.invalidateQueries({ queryKey: ['sys'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در حذف سیستم');
    },
  });
  return deleteReport;
};
