import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { use } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import API_HOST from '../../../API/api';

const BASE_API = `http://localhost:5257/api/Role`;

export const useGetRoles = ({
  search,
  page,
  pageSize,
  isGlobalAccess,
  companyId,
} = {}) => {
  const { token } = useSelector((state) => state.auth);

  const getRoles = useQuery({
    queryKey: [
      'roles',
      token,
      search,
      page,
      pageSize,
      isGlobalAccess,
      companyId,
    ],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, page, pageSize, isGlobalAccess, companyId },
      });
      return res.data;
    },
  });
  return getRoles;
};
// ------------------------------------------

export const useCreateRole = () => {
  const { token } = useSelector((state) => state.auth);
  const queryclient = useQueryClient();

  const createRole = useMutation({
    mutationFn: async (form) => {
      const res = await axios.post(`${BASE_API}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('نقش با موفقیت ایجاد شد');
      queryclient.invalidateQueries({ queryKey: ['roles', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ایجاد نقش');
    },
  });
  return createRole;
};
// ------------------------------------------
export const useDeleteRole = () => {
  const { token } = useSelector((state) => state.auth);
  const queryclient = useQueryClient();

  const deleteRole = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`${BASE_API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('نقش با موفقیت حذف شد');
      queryclient.invalidateQueries({ queryKey: ['roles', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در حذف نقش');
    },
  });
  return deleteRole;
};
// ------------------------------------------

export const useUpdateRole = () => {
  const { token } = useSelector((state) => state.auth);
  const queryclient = useQueryClient();

  const updateReport = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axios.put(`${BASE_API}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('نقش با موفقیت ویرایش شد');
      queryclient.invalidateQueries({ queryKey: ['roles', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ویرایش نقش');
    },
  });
  return updateReport;
};
// ------------------------------------------
export const useGetRoleId = (id) => {
  const { token } = useSelector((state) => state.auth);

  return useQuery({
    queryKey: ['roles', token, id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/${id}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
};

export const useGetRolePermissions = (id) => {
  const { token } = useSelector((state) => state.auth);

  return useQuery({
    queryKey: ['role-permissions', token, id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}/${id}/permissions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
};

export const useUpdateRolePermissions = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axios.put(`${BASE_API}/${id}/permissions`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: (_, { id }) => {
      toast.success('دسترسی منوها با موفقیت ذخیره شد');
      queryClient.invalidateQueries({ queryKey: ['role-permissions'] });
    },
    onError: (e) => {
      toast.error(e?.response?.data?.message || 'خطا در ذخیره دسترسی‌ها');
    },
  });
};

// assign-role-to-user
export const useAssignRoleToUser = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createRole = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${BASE_API}/assign-to-user`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('نقش با موفقیت اختصاص داده شد.');
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
    onError: (error) => {
      toast.error(error.response.data.message || 'خطا در اختصاص نقش به کاربر');
    },
  });
  return createRole;
};
// ------------------------------------------

export const useRemoveFromRoleUser = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const removeRoleFromUser = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${BASE_API}/remove-from-user`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('نقش با موفقیت حذف شد');
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
    onError: (error) => {
      toast.error(error.response.data.message || 'خطا در حذف نقش از کاربر');
    },
  });
  return removeRoleFromUser;
};
// ------------------------------------------

export const useAssignRoleToUserInCompany = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const createRoleToCompany = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        `${BASE_API}/assign-role-to-user-in-company`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('اختصاص نقش به کاربر در شرکت با موفقیت انجام شد');
      queryClient.invalidateQueries({ queryKey: ['roles', token] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'عملیات با خطا مواجه شد');
    },
  });
  return createRoleToCompany;
};
// ------------------------------------------

export const useRemoveRoleToUserInCompany = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const deleteCompany = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        `${BASE_API}/remove-role-from-user-in-company`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('عملیات با موفقیت انجام شد');
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'عملیات با خطا مواجه شد');
    },
  });
  return deleteCompany;
};
// ------------------------------------------

export const useRemoveRoleToUserInUnit = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const removeUnit = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        `${BASE_API}/remove-role-from-user-in-unit`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('عملیات با موفقیت انجام شد');
      queryClient.invalidateQueries({ queryKey: ['roles', token] });
    },
    onError: (e) => {
      toast.error(e?.response?.data?.message || 'خطا در انجام عملیات');
    },
  });
  return removeUnit;
};
// ------------------------------------------
