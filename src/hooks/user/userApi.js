import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import API_HOST from '../../../API/api';

const BASE_API = `${API_HOST}:5257/api/User`;

export const useGetUser = ({ search, page, pageSize } = {}) => {
  const { token } = useSelector((state) => state.auth);

  return useQuery({
    queryKey: ['user', search, page, pageSize],
    queryFn: async () => {
      const res = await axios.get(BASE_API, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, page, pageSize },
      });
      return res.data;
    },
  });
};


export const useCreateUser = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(BASE_API, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('کاربر با موفقیت ایجاد شد');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (e) => {
      toast.error(e?.response?.data?.message || 'خطا در ایجاد کاربر');
    },
  });
};

export const useUpdateUser = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axios.put(`${BASE_API}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('کاربر با موفقیت ویرایش شد');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (e) => {
      toast.error(e?.response?.data?.message || 'خطا در ویرایش کاربر');
    },
  });
};

export const useDeleteUser = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`${BASE_API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('کاربر با موفقیت حذف شد');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (e) => {
      toast.error(e?.response?.data?.message || 'خطا در حذف کاربر');
    },
  });
};

export const usePermissionSignature = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form) => {
      const res = await axios.post(`${BASE_API}/permission-sign`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('عملیات با موفقیت انجام شد');
      queryClient.invalidateQueries({ queryKey: ['permission-sign'] });
      queryClient.invalidateQueries({ queryKey: ['permission-sign-menus'] });
    },
  });
};

export const useUpdatePermissionSignature = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await axios.put(`${BASE_API}/permission-sign`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('عملیات با موفقیت انجام شد');
      queryClient.invalidateQueries({ queryKey: ['permission-sign'] });
      queryClient.invalidateQueries({ queryKey: ['permission-sign-menus'] });
    },
  });
};

export const useGetPermissionSignature = (id) => {
  const { token } = useSelector((state) => state.auth);

  return useQuery({
    queryKey: ['permission-sign', id],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/${id}/permission-signs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!id && !!token,
  });
};

export const getMenuSignatureName = (id) => {
  const { token } = useSelector((state) => state.auth);

  return useQuery({
    queryKey: ['permission-sign-menus', id],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/${id}/permission-sign-menus`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!id && !!token,
  });
};

export const useGetImageSign = (id) => {
  const { token } = useSelector((state) => state.auth);

  return useQuery({
    queryKey: ['sign', token, id],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5257/api/Signature/user/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    enabled: !!id,
  });
};
