import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import API_HOST from '../../../API/api';
import { toast } from 'react-toastify';

const BASE_API = `http://localhost:5257/api/EducationDegree`;

export const useEducationDegrees = ({ search } = {}) => {
  const { token } = useSelector((state) => state.auth);

  const getEducationDegrees = useQuery({
    queryKey: ['education', token, search],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search },
      });
      return res.data;
    },
  });
  return getEducationDegrees;
};

export const useCreateEducation = () => {
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
      toast.success('مدرک تحصیلی با موفقیت ایجاد شد');
      queryclient.invalidateQueries({ queryKey: ['education'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ایجاد مدرک تحصیلی');
    },
  });
  return createReport;
};

export const useUpdateEducation = () => {
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
      toast.success('مدرک تحصیلی مورد نظر با موفقیت ویرایش شد');
      queryclient.invalidateQueries({ queryKey: ['education'] });
    },
    onError: (e) => {
      toast.error(
        e.response.data.message || 'خطا در ویرایش مدرک تحصیلی مورد نظر'
      );
    },
  });
  return updateReport;
};

export const useDeleteEducation = () => {
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
      toast.success('مدرک تحصیلی با موفقیت حذف شد');
      queryclient.invalidateQueries({ queryKey: ['education'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در حذف مدرک تحصیلی');
    },
  });
  return deleteReport;
};
