import { useSelector } from 'react-redux';
import API_HOST from '../../../../../API/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_API = `http://localhost:5273/api/UPSBatteryVoltageReading`;

export const useGetElectricityReport = ({
  search,
  page,
  pageSize,
  companyId,
  isExecutorSigned,
  isSupervisorSigned,
} = {}) => {
  const { token } = useSelector((state) => state.auth);

  return useQuery({
    queryKey: [
      'electricity',
      token,
      search,
      page,
      pageSize,
      companyId,
      isExecutorSigned,
      isSupervisorSigned,
    ],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          search,
          page,
          pageSize,
          companyId,
          isExecutorSigned,
          isSupervisorSigned,
        },
      });
      return res.data;
    },
  });
};

export const useGetElectricityReportAll = ({ companyId } = {}) => {
  const { token } = useSelector((state) => state.auth);

  const getReportAll = useQuery({
    queryKey: ['electricity', token, companyId],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/simple`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { companyId },
      });
      return res.data;
    },
  });
  return getReportAll;
};

export const useCreateElectricityReport = () => {
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
      queryClient.invalidateQueries({ queryKey: ['electricity', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ایجاد گزارش');
    },
  });
  return createReport;
};

export const useUpdateElectricityReport = () => {
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
      toast.success('گزارش با موفقیت ویرایش شد');
      queryClient.invalidateQueries({ queryKey: ['electricity', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ویرایش گزارش');
    },
  });
  return updateReport;
};

export const useDeleteElectricityReport = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const deleteReport = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`${BASE_API}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('گزارش با موفقیت حذف شد');
      queryClient.invalidateQueries({ queryKey: ['electricity', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در حذف گزارش');
    },
  });
  return deleteReport;
};

// S

export const useCreateSignExecutor = () => {
  const { token } = useSelector((state) => state.auth);
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, signaturePassword }) => {
      return await axios.post(
        `${BASE_API}/${id}/sign/executor`,
        { signaturePassword },
        { headers: { Authorization: `bearer ${token}` } }
      );
    },
    onSuccess: () => {
      toast.success('امضاء تهیه کننده با موفقیت ثبت شد');
      queryclient.invalidateQueries({ queryKey: ['electricity'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت امضاء تهیه کننده');
    },
  });
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
      queryClient.invalidateQueries({ queryKey: ['electricity'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت امضاء سرپرست');
    },
  });
  return createSign;
};
