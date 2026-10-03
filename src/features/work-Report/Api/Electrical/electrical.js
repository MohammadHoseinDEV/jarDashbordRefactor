import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import API_HOST from '../../../../../API/api';

const BASE_API = `http://localhost:5273/api/ElectricalReport`;

export const useCreateElectricalReports = () => {
  const { token } = useSelector((state) => state.auth);

  const queryClient = useQueryClient();

  const createReports = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${BASE_API}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('گزارش با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['electrical', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت گزارش');
    },
  });
  return createReports;
};

export const useUpdateElectericalReports = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const updateReports = useMutation({
    mutationFn: async ({ id, form }) => {
      const res = await axios.put(`${BASE_API}/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('ویرایش با موفقیت ایجاد شد');
      queryClient.invalidateQueries({ queryKey: ['electrical', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در انجام ویرایش');
    },
  });
  return updateReports;
};

export const useGetElectricalReports = ({
  search,
  startDate,
  endDate,
  shiftName,
  shiftSupervisorName,
  personnelName,
  dayOfWeek,
  hasWorkTasks,
  page,
  pageSize,
} = {}) => {
  const { token } = useSelector((state) => state.auth);

  const getElectrical = useQuery({
    // TODO: بک‌اند /api/ElectricalReport هنوز پیاده‌سازی نشده.
    // enabled: false تا وقتی که یکی از سه گزینه‌ی مطرح‌شده انتخاب و اجرا بشه.
    enabled: false,
    queryKey: [
      'electrical',
      token,
      search,
      startDate,
      endDate,
      shiftName,
      shiftSupervisorName,
      personnelName,
      dayOfWeek,
      hasWorkTasks,
      page,
      pageSize,
    ],
    queryFn: async () => {
      const params = {
        search,
        startDate,
        endDate,
        shiftName,
        shiftSupervisorName,
        personnelName,
        dayOfWeek,
        hasWorkTasks,
        page,
        pageSize,
      };

      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(
          ([, v]) => v !== undefined && v !== null && v !== ''
        )
      );

      try {
        const res = await axios.get(`${BASE_API}`, {
          headers: { Authorization: `Bearer ${token}` },
          params: cleanParams,
        });
        return res.data;
      } catch (e) {
        // TODO: backend endpoint /api/ElectricalReport فعلا وجود نداره.
        // تا زمانی که بک‌اند آماده بشه، خطا رو نادیده می‌گیریم و لیست خالی برمی‌گردونیم
        // تا صفحه کرش نکنه و کنسول پر از ارور نشه.
        console.warn('ElectricalReport endpoint not available yet:', e);
        return { data: { items: [], totalPages: 1, totalCount: 0 } };
      }
    },
    retry: false,
    keepPreviousData: true,
  });

  return getElectrical;
};

export const useGetElectericalReportAll = ({ enabled = false } = {}) => {
  const { token } = useSelector((state) => state.auth);
  const getElectericalAll = useQuery({
    queryKey: ['electrical', token, 'all'],
    queryFn: async () => {
      try {
        const res = await axios.get(`${BASE_API}/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
      } catch (e) {
        // TODO: بک‌اند این مسیر هنوز آماده نیست؛ فعلا نادیده گرفته میشه
        console.warn('ElectricalReport/all endpoint not available yet:', e);
        return { data: [] };
      }
    },
    enabled,
    retry: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
  return getElectericalAll;
};

export const useDeleteElectricalReports = () => {
  const { token } = useSelector((s) => s.auth);
  const queryClient = useQueryClient();

  const deleteReports = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`${BASE_API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('گزارش با موفقیت حذف شد');
      queryClient.invalidateQueries({ queryKey: ['electrical', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در حذف گزارش');
    },
  });
  return deleteReports;
};

// --------------------------------------------------------

export const useCreateSignatureHandover = (id) => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createSignature = useMutation({
    mutationFn: async ({ signaturePassword }) => {
      const res = await axios.post(
        `${BASE_API}/${id}/sign/shift-handover`,
        {
          signaturePassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضاء تحویل دهنده شیفت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['electrical', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت امضاء');
    },
  });
  return createSignature;
};

export const useCreateSignatureReceiver = (id) => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createSignature = useMutation({
    mutationFn: async ({ signaturePassword }) => {
      const res = await axios.post(
        `${BASE_API}/${id}/sign/shift-receiver`,
        { signaturePassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضاء با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['electrical', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت امضاء');
    },
  });
  return createSignature;
};

export const useCreateSignatureSupervisor = (id) => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createSignature = useMutation({
    mutationFn: async ({ signaturePassword }) => {
      const res = await axios.post(
        `${BASE_API}/${id}/sign/supervisor`,
        { signaturePassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضاء سرپرست با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['electrical', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت امضاء');
    },
  });
  return createSignature;
};
