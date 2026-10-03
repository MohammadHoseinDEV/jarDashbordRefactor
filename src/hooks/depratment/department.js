import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API_HOST from '../../../API/api';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

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

export const useCreateDepartment = () => {
  const { token } = useSelector((state) => state.auth);
  const queryclient = useQueryClient();

  const createreport = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${BASE_API}`, data, {
        headers: { Authorization: `bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('دپارتمان با موفقیت ثبت شد');
      queryclient.invalidateQueries({ queryKey: [`dep`] });
    },
    onError: (e) => {
      toast.error('خطا در ثبت دپارتمان');
    },
  });
  return createreport;
};

export const useUpdateDepartment = () => {
  const { token } = useSelector((state) => state.auth);
  const queryclient = useQueryClient();

  const updateReport = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axios.put(`${BASE_API}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('دپارتمان مورد نظر با موفقیت ویرایش شد');
      queryclient.invalidateQueries({ queryKey: [`dep`] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ویرایش دپارتمان مورد نظر');
    },
  });
  return updateReport;
};

export const useDeleteDepartment = () => {
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
      toast.success('دپارتمان با موفقیت حذف شد');
      queryClient.invalidateQueries({ queryKey: ['dep'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در حذف دپارتمان');
    },
  });
  return deleteReport;
};
