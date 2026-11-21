import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import API_HOST from '../../../API/api';
import { toast } from 'react-toastify';

export const BASE_API = `http://localhost:5257/api/JobPosition`;

export const useJobPositions = ({
  search,
  page,
  pageSize,
  isActive,
  departmentId,
  companyId,
  status,
} = {}) => {
  const { token } = useSelector((state) => state.auth);

  const params = {
    search: search || undefined,
    page,
    pageSize,
    departmentId: departmentId || undefined,
    companyId: companyId || undefined,
    isActive,
  };

  return useQuery({
    queryKey: ['jobPositions', token, params],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      return res.data;
    },
  });
};

export const usecreateJobPosition = () => {
  const { token } = useSelector((state) => state.auth);
  const queryclient = useQueryClient();

  const createReport = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${BASE_API}`, data, {
        headers: { Authorization: `bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('جایگاه شغلی با موفقیت ایجاد شد');
      queryclient.invalidateQueries({ queryKey: ['jobPositions'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ایجاد جایگاه شغلی');
    },
  });
  return createReport;
};

export const useUpdateJobPosition = () => {
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
      toast.success('جایگاه شغلی مورد نظر با موفقیت ویرایش شد');
      queryClient.invalidateQueries({ queryKey: ['jobPositions'] });
    },
    onError: (e) => {
      toast.error(
        e.response.data.message || 'خطا در ویرایش جایگاه شغلی مورد نظر'
      );
    },
  });
  return updateReport;
};

export const useDeleteJopPosition = () => {
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
      toast.success('جایگاه شغلی با موفقیت حذف شد');
      queryclient.invalidateQueries({ queryKey: ['jobPositions'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در حذف جایگاه شغلی');
    },
  });
  return deleteReport;
};
