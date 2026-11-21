import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const BASE_API = `http://localhost:5257/api/Unit`;

export const useGetUnit = ({
  search,
  page,
  pageSize,
  code,
  companyId,
} = {}) => {
  const { token } = useSelector((state) => state.auth);

  const getReport = useQuery({
    queryKey: ['unit', search, page, pageSize, code, companyId],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `bearer ${token}` },
        params: {
          search,
          page,
          pageSize,
          code,
          companyId,
        },
      });
      return res.data;
    },
  });
  return getReport;
};

export const useCreateUnit = () => {
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
      toast.success('واحد با موفقیت ایجاد شد');
      queryclient.invalidateQueries({ queryKey: ['unit'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ایجاد واحد');
    },
  });
  return createReport;
};

export const useUpdateReport = () => {
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
      toast.success('واحد با موفقیت ویرایش شد');
      queryClient.invalidateQueries({ queryKey: ['unit'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ویرایش واحد');
    },
  });
  return updateReport;
};

export const useDeleteUnit = () => {
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
      toast.success('واحد با موفقیت حذف شد');
      queryClient.invalidateQueries({ queryKey: ['unit'] });
    },
    onError: (e) => {
      toast.error(e.reponse.data.message || 'خطا در حذف واحد');
    },
  });
  return deleteReport;
};
