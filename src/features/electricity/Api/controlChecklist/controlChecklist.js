import { useSelector } from 'react-redux';
import API_HOST from '../../../../../API/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_API = `http://localhost:5273/api/DistributionPostControlRoomChecklist`;

export const useGetControlChecklistReport = ({ search, page, pageSize }) => {
  const { token } = useSelector((state) => state.auth);

  const getReports = useQuery({
    queryKey: ['checklist', token, search, page, pageSize],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/all`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, page, pageSize },
      });
      return res.data;
    },
  });
  return getReports;
};

export const useGetAllControlChecklistReport = () => {
  const { token } = useSelector((state) => state.auth);

  const getReport = useQuery({
    queryKey: ['checklist', token],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/simple`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
  return getReport;
};

export const useCreateControlChecklistReport = () => {
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
      queryClient.invalidateQueries({ queryKey: ['checklist', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت گزارش');
    },
  });
  return createReport;
};

export const useUpdateControlChecklistReport = () => {
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
      queryClient.invalidateQueries({ queryKey: ['checklist', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت ویرایش');
    },
  });
  return updateReport;
};

export const useDeleteControlChecklistReport = () => {
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
      queryClient.invalidateQueries({ queryKey: ['checklist', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در حذف گزارش');
    },
  });
  return deleteReport;
};
// ----------------------------------------------------------
// Sign
export const useCreateSignProducerControlChecklist = () => {
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
      queryClient.invalidateQueries({ queryKey: ['checklist', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت امضاء مجری');
    },
  });
  return createSign;
};

export const useCreateSignSupervisorControlChecklist = () => {
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
      queryClient.invalidateQueries({ queryKey: ['checklist', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت امضاء سرپرست');
    },
  });
  return createSign;
};
