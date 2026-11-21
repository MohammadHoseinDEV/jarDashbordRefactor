import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import API_HOST from '../../../API/api';

const BASE_API = `http://localhost:5257/api/Shift`;

const useGetShifts = ({
  companyId,
  departmentId,
  search,
  pattern,
  page,
  pageSize,
  isActive,
} = {}) => {
  const { token } = useSelector((state) => state.auth);

  const getShifts = useQuery({
    queryKey: [
      'shifts',
      token,
      companyId,
      departmentId,
      search,
      pattern,
      page,
      pageSize,
      isActive,
    ],
    queryFn: async () => {
      const res = await axios.get(`${BASE_API}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          companyId,
          departmentId,
          search,
          pattern,
          page,
          pageSize,
          isActive,
        },
      });
      return res.data;
    },
  });
  return getShifts;
};

export const useCreateShift = () => {
  const { token } = useSelector((state) => state.auth);
  const queryclient = useQueryClient();

  const createShift = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${BASE_API}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('ایجاد شیفت با موفقیت انجام شد');
      queryclient.invalidateQueries({ queryKey: ['shifts'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در ایجاد شیفت');
    },
  });
  return createShift;
};

export const useUpdateShift = () => {
  const { token } = useSelector((state) => state.auth);
  const queryclient = useQueryClient();

  const updateShift = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axios.put(`${BASE_API}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('شیفت با موفقیت ویرایش شد');
      queryclient.invalidateQueries({ queryKey: ['shifts'] });
    },
    onError: (e) => {
      toast.error('خطا در ویرایش شیفت');
    },
  });
  return updateShift;
};

export const usedeleteShift = () => {
  const { token } = useSelector((state) => state.auth);
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      return await axios.delete(`${BASE_API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast.success('شیفت با موفقیت حذف شد');
      queryclient.invalidateQueries({ queryKey: ['shifts'] });
    },
    onError: (e) => {
      toast.error(e?.response?.data?.message || 'خطا در حذف شیفت');
    },
  });
};

const useShiftsAssignments = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const shiftAssignment = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${BASE_API}/assignments`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('عملیات با موفقیت انجام شد');
      queryClient.invalidateQueries({ queryKey: ['shifts'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در انجام عملیات');
    },
  });
  return shiftAssignment;
};

const useUnAssignShift = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const useUnAssign = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${BASE_API}/unassign`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('شیفت با موفقیت حذف شد');
      queryClient.invalidateQueries({ queryKey: ['shifts'], exact: false });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در انجام عملیات');
    },
  });
  return useUnAssign;
};

const useShiftTransfer = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const shiftTransfer = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${BASE_API}/transfer`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('عملیات با موفقیت انجام شد');
      queryClient.invalidateQueries({ queryKey: ['shifts', token] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (e) => {
      toast.error(e.response.data.message || 'خطا در انجام عملیات');
    },
  });
  return shiftTransfer;
};

export {
  useGetShifts,
  useShiftsAssignments,
  useShiftTransfer,
  useUnAssignShift,
};
