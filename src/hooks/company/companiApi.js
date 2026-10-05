import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import API_HOST from '../../../API/api';
import { toast } from 'react-toastify';

const BASE_API = `http://localhost:5257/api/company`;

export const useGetCompanies = ({
  search,
  code,
  departmentId,
  isActive,
  page,
  pageSize,
} = {}) => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const getCompany = useQuery({
    queryKey: ['company', search, code, departmentId, isActive, page, pageSize],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, code, departmentId, isActive, page, pageSize },
      });
      return res.data;
    },
  });
  return getCompany;
};

export const useCreateCompany = () => {
  const { token } = useSelector((state) => state.auth);
  const queryclient = useQueryClient();

  const createReport = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${BASE_API}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success(`شرکت با موفقیت ایجاد شد`);
      queryclient.invalidateQueries({ queryKey: ['company'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت شرکت');
    },
  });
  return createReport;
};

export const useUpdateCompany = () => {
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
      toast.success('شرکت با موفقیت ویرایش شد');
      queryClient.invalidateQueries({ queryKey: ['company'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ویرایش شرکت');
    },
  });
  return updateReport;
};

export const useDeleteCompany = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const deleteReport = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`${BASE_API}/${id}`, {
        headers: { Authorization: `bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('حذف شرکت با موفقیت انجام شد');
      queryClient.invalidateQueries({ queryKey: ['company'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در حذف شرکت');
    },
  });
  return deleteReport;
};
