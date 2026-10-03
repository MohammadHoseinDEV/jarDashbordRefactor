import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import API_HOST from '../../../API/api';
import { toast } from 'react-toastify';

export const useGetMenu = ({ page, pageSize, search, isActive } = {}) => {
  const { token } = useSelector((state) => state.auth);

  const getMenu = useQuery({
    queryKey: ['menu', page, pageSize, search, isActive],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5257/api/MyMenu`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, pageSize, search, isActive },
      });
      return res.data;
    },
  });
  return getMenu;
};

export const useCreateMenu = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createMenu = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`http://localhost:5257/api/MyMenu`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('منو با موفقیت ایجاد شد');
      queryClient.invalidateQueries({ queryKey: ['menu'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ثبت منو');
    },
  });
  return createMenu;
};

export const useUpdateMenu = () => {
  const { token } = useSelector((state) => state.auth);
  const queryclient = useQueryClient();

  const updateMenu = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axios.put(
        `http://localhost:5257/api/MyMenu/UpdateMenu/${id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('منو با موفقیت ویرایش شد');
      queryclient.invalidateQueries({ queryKey: ['menu'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ویرایش منو');
    },
  });
  return updateMenu;
};

export const useDeleteMenu = () => {
  const { token } = useSelector((state) => state.auth);
  const queryclient = useQueryClient();

  const deleteMenu = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(
        `http://localhost:5257/api/MyMenu/DeleteMenu/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('منو با موفقیت حذف شد');
      queryclient.invalidateQueries({ queryKey: ['menu'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در حذف منو');
    },
  });
  return deleteMenu;
};
