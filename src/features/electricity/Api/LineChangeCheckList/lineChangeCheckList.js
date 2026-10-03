import { useSelector } from 'react-redux';
import API_HOST from '../../../../../API/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_API = `http://localhost:5273/api/DistributionLineReplacementChecklist`;

export const useGetLinechangeCheckList = ({
  search,
  page,
  pageSize,
  companyId,
} = {}) => {
  const { token } = useSelector((state) => state.auth);

  const getReport = useQuery({
    queryKey: ['checkList', search, page, pageSize, companyId],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/all`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, page, pageSize, companyId },
      });
      return res.data;
    },
    enabled: !!token,
  });
  return getReport;
};

export const useCreateLineChangeCheckList = () => {
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
      queryClient.invalidateQueries({ queryKey: ['checkList'] });
    },
    onError: (e) => {
      toast.error(e.response?.data?.message || 'خطا در ثبت فرم');
    },
  });
  return createReport;
};

export const useUpdateLineChangeCheckList = () => {
  const { token } = useSelector((state) => state.auth);
  const queryclient = useQueryClient();

  const updateReport = useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await axios.put(`${BASE_API}/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('گزارش با موفقیت ویرایش شد');
      queryclient.invalidateQueries({ queryKey: ['checkList'] });
    },
    onError: (e) => {
      toast.error(e.response?.data?.message || 'خطا در ویرایش گزارش');
    },
  });

  return updateReport;
};

export const usedeleteLineChangeCheckList = () => {
  const { token } = useSelector((state) => state.auth);
  const queryclient = useQueryClient();

  const deleteReport = useMutation({
    mutationFn: async ({ id }) => {
      const res = await axios.delete(`${BASE_API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('گزارش با موفقیت حذف شد');
      queryclient.invalidateQueries({ queryKey: ['checkList'] });
    },
    onError: (e) => {
      toast.error(e.response?.data?.message || 'خطا در حذف فرم');
    },
  });
  return deleteReport;
};

export const useCreateSignShiftSupervisor = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createSign = useMutation({
    mutationFn: async ({ id, signaturePassword }) => {
      const res = await axios.post(
        `${BASE_API}/${id}/sign/shift-supervisor`,
        { signaturePassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضاء سرشیفت با موفقیت ایجاد شد');
      queryClient.invalidateQueries({ queryKey: ['checkList'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت امضاء');
    },
  });
  return createSign;
};

export const useCreateSignOperationSupervisor = () => {
  const { token } = useSelector((state) => state.auth);
  const queryclient = useQueryClient();

  const createSign = useMutation({
    mutationFn: async ({ id, signaturePassword }) => {
      const res = await axios.post(
        `${BASE_API}/${id}/sign/operations-supervisor`,
        { signaturePassword },

        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضاء سرپرست با موفقیت ثبت شد');
      queryclient.invalidateQueries({ queryKey: ['checkList'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت امضاء');
    },
  });
  return createSign;
};
