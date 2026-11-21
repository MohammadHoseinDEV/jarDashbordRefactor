import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import API_HOST from '../../../API/api';

const BASE_API = `${API_HOST}:5257/api/Signature`;

const BASE = `${API_HOST}:5273/api`;

const useCreateSignature = () => {
  const { token, userInfo } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${BASE_API}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('عملیات با موفقیت انجام شد');
      queryClient.invalidateQueries({ queryKey: ['signature', token] });
      queryClient.invalidateQueries({
        queryKey: ['signature', userInfo?.userId, token],
      });
    },
    onError: (e) => {
      toast.error(e?.response?.data?.message || 'خطا در انجام عملیات');
    },
  });
};

const useGetSignature = () => {
  const { token } = useSelector((state) => state.auth);

  return useQuery({
    queryKey: ['signature', token],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!token,
  });
};

const useGetSignatureId = (id) => {
  const { token } = useSelector((state) => state.auth);

  return useQuery({
    queryKey: ['signature', id, token],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!id && !!token,
  });
};

const useDeleteSignature = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await axios.delete(`${BASE_API}`, {
        data,
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضاء با موفقیت حذف شد');
      queryClient.invalidateQueries({ queryKey: ['signature', token] });
    },
    onError: (e) => {
      toast.error(e?.response?.data?.message || 'خطا در حذف کردن امضاء');
    },
  });
};

const useSignatureVerify = () => {
  const { token, userInfo } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${BASE_API}/verify`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('امضاء با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: ['signature', token] });
      queryClient.invalidateQueries({
        queryKey: ['signature', userInfo?.userId, token],
      });
    },
    onError: (e) => {
      toast.error(e?.response?.data?.message || 'خطا در ثبت امضاء');
    },
  });
};

const useGetSignatureForms = () => {
  const { token } = useSelector((s) => s.auth);

  return useQuery({
    queryKey: ['signature-forms'],
    queryFn: async () => {
      const res = await axios.get(`${BASE}/form-signatures/forms`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    },
    enabled: !!token,
    staleTime: Infinity,
  });
};

const useGetAllSignatureSteps = () => {
  const { token } = useSelector((s) => s.auth);
  const { data: forms } = useGetSignatureForms();

  const results = useQueries({
    queries: (forms || []).map((f) => ({
      queryKey: ['signature-steps', f.formType],
      queryFn: async () => {
        const res = await axios.get(
          `${BASE}/form-signatures/${f.formType}/steps`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        return res.data.data;
      },
      enabled: !!token,
      staleTime: Infinity,
    })),
  });

  const map = {};
  (forms || []).forEach((f, i) => {
    map[f.menuName] = results[i]?.data || [];
  });
  return map;
};

// وضعیت امضای یک گزارش
const useGetSignatureStatus = (formType, formId) => {
  const { token } = useSelector((s) => s.auth);

  return useQuery({
    queryKey: ['signature-status', formType, formId],
    queryFn: async () => {
      const res = await axios.get(
        `${BASE}/form-signatures/${formType}/${formId}/signature-status`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    enabled: !!formType && !!formId && !!token,
  });
};

const useSignStep = (formType, formId) => {
  const { token } = useSelector((s) => s.auth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ stepKey, signaturePassword }) => {
      const res = await axios.post(
        `${BASE}/form-signatures/${formType}/${formId}/sign/${stepKey}`,
        { signaturePassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('مرحله با موفقیت امضا شد');
      queryClient.invalidateQueries({
        queryKey: ['signature-status', formType, formId],
      });
    },
    onError: (e) => {
      toast.error(e?.response?.data?.message || 'خطا در امضا');
    },
  });
};

export {
  useCreateSignature,
  useGetSignature,
  useGetSignatureId,
  useDeleteSignature,
  useSignatureVerify,
  useGetSignatureForms,
  useGetAllSignatureSteps,
  useGetSignatureStatus,
  useSignStep,
};
