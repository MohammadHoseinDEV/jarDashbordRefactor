import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import API_HOST from '../../../API/api';

const BASE_API = `http://localhost:5257/api/Signature`;

const useCreateSignature = () => {
  const { token, userInfo } = useSelector((state) => state.auth); // اضافه کن userInfo
  const queryClient = useQueryClient();

  const createSignature = useMutation({
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
      }); // اضافه کن
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در انجام عملیات');
    },
  });
  return createSignature;
};

const useGetSignature = () => {
  const { token } = useSelector((state) => state.auth);

  const getImages = useQuery({
    queryKey: ['signature', token],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
  return getImages;
};

export const useGetSignatureId = (id) => {
  const { token } = useSelector((state) => state.auth);

  const getSignature = useQuery({
    queryKey: ['signature', id, token],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!id && !!token,
  });
  return getSignature;
};

const useDeleteSignature = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const deleteImage = useMutation({
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
      toast.error(e.response.data.message || 'خطا در حذف کردن امضاء');
    },
  });
  return deleteImage;
};

const useSignatureVerify = () => {
  const { token, userInfo } = useSelector((state) => state.auth); // اضافه کن userInfo
  const queryClient = useQueryClient();

  const getSignature = useMutation({
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
      }); // اضافه کن
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت امضاء');
    },
  });
  return getSignature;
};

export {
  useCreateSignature,
  useGetSignature,
  useDeleteSignature,
  useSignatureVerify,
};
