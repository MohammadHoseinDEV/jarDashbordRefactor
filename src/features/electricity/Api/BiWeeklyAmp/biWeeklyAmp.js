import { useSelector } from 'react-redux';
import API_HOST from '../../../../../API/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_API = `http://localhost:5273/api/BiweeklyAmperageReport`;

export const useGetBiweeklyAmp = ({ search, page, pageSize }) => {
  const { token } = useSelector((state) => state.auth);
  const getReport = useQuery({
    queryKey: ['biweekly', token, search, page, pageSize],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/all`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, page, pageSize },
      });
      return res.data;
    },
  });
  return getReport;
};

export const useGetAllBiweeklyAmp = () => {
  const { token } = useSelector((state) => state.auth);

  const getReport = useQuery({
    queryKey: ['biweekly', token],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/simple`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
  return getReport;
};

export const useCreateBiweeklyAmp = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createReport = useMutation({
    mutationFn: async (form) => {
      const res = await axios.post(`${BASE_API}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('گزارش با موفقیت ایجاد شد');
      queryClient.invalidateQueries({ queryKey: ['biweekly', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ایجاد گزارش');
    },
  });
  return createReport;
};

export const useUpdateBiweeklyAmp = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const updateReport = useMutation({
    mutationFn: async ({ id, form }) => {
      const res = await axios.put(`${BASE_API}/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('گزارش با موفقیت ویرایش شد');
      queryClient.invalidateQueries({ queryKey: ['biweekly', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ویرایش گزارش');
    },
  });
  return updateReport;
};

export const useDeleteBiweeklyAmp = () => {
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
      toast.success('گزارش با موفقیت حذف شد');
      queryClient.invalidateQueries({ queryKey: ['biweekly', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در حذف گزارش');
    },
  });
  return deleteReport;
};

export const useCreateSignProducer = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createSign = useMutation({
    mutationFn: async ({ id, signaturePassword }) => {
      const res = await axios.post(
        `${BASE_API}/${id}/sign/executor`,
        { signaturePassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضاء تهیه کننده با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['biweekly', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت امضاء تهیه کننده');
    },
  });
  return createSign;
};

export const useCreateSignSupervisor = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createSign = useMutation({
    mutationFn: async ({ id, signaturePassword }) => {
      const res = await axios.post(
        `${BASE_API}/${id}/sign/supervisor`,
        { signaturePassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضاء سرپرست با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['biweekly', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت امضاء سرپرست');
    },
  });
  return createSign;
};
