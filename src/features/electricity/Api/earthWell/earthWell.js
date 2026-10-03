import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import API_HOST from '../../../../../API/api';
import { toast } from 'react-toastify';

const BASE_API = `http://localhost:5273/api/MonthlyEarthWellInspection`;

export const useGetEarthWell = ({ search, page, pageSize }) => {
  const { token } = useSelector((state) => state.auth);

  const getReport = useQuery({
    queryKey: ['earth', token, search, page, pageSize],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, page, pageSize },
      });
      return res.data;
    },
  });
  return getReport;
};

export const useGetAllEarthWell = () => {
  const { token } = useSelector((state) => state.auth);

  const getReport = useQuery({
    queryKey: ['earth', token],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/simple`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
  return getReport;
};

export const useCreateEarthWell = () => {
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
      toast.success('گزار با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['earth', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.title || 'خطا در ثبت گزارش');
    },
  });
  return createReport;
};

export const useupdateEarthWell = () => {
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
      queryClient.invalidateQueries({ queryKey: ['earth', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.title || 'خطا در ویرایش گزارش');
    },
  });
  return updateReport;
};

export const useDeleteEarthWell = () => {
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
      queryClient.invalidateQueries({ queryKey: ['earth', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.title || 'خطا در حذف گزارش');
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
      toast.success('امضاء مجری با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['earth', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.title || 'خطا در ثبت امضاء مجری');
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
        `${BASE_API}/${id}/sign/pm-supervisor`,
        { signaturePassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضاءسرپرست P.M با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['earth', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.title || 'خطا در ثبت امضاء');
    },
  });
  return createSign;
};
