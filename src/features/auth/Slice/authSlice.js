import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import API_HOST from '../../../../API/api';

const initialState = {
  token: Cookies.get('token') || null,

  loading: false,
  error: null,

  userInfo: null,

  // permissions payload from /user-permissions
  permissions: null,
  roles: [],
  menus: [],
  units: [],
  companies: [],
  widgets: [],

  // forgot/reset flow
  userId: null,
  resetSuccess: false,
};

/**
 * Login
 */
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ personnelCode, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5257/api/Auth/login`,
        {
          personnelCode,
          password,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'خطا در ورود');
    }
  }
);

/**
 * Register
 */
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5257/api/Auth/register`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || 'خطا در ثبت نام'
      );
    }
  }
);

/**
 * Forgot Password (step 1)
 */
export const forgetPasswordUser = createAsyncThunk(
  'auth/forgetPasswordUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5257/api/Auth/forgot-password`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || 'خطا در تایید اطلاعات'
      );
    }
  }
);

/**
 * Reset Password (step 2)
 */
export const resetPasswordUser = createAsyncThunk(
  'auth/resetPasswordUser',
  async ({ newPassword, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5257/api/Auth/reset-password`,
        {
          newPassword,
          userId,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || 'خطا در تغییر رمز عبور'
      );
    }
  }
);

/**
 * Fetch user permissions
 */
export const fetchUserPermissions = createAsyncThunk(
  'auth/fetchUserPermissions',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5257/api/Auth/user-permissions`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      // If token is invalid/expired, you may want to force logout in UI
      return rejectWithValue(
        error?.response?.data?.message || 'خطا در دریافت دسترسی‌ها'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userInfo = null;

      state.permissions = null;
      state.roles = [];
      state.menus = [];
      state.units = [];
      state.companies = [];
      state.widgets = [];

      state.userId = null;
      state.resetSuccess = false;

      state.loading = false;
      state.error = null;

      Cookies.remove('token');
      toast.warning('از حساب کاربری خود خارج شدید');
    },

    setToken: (state, action) => {
      state.token = action.payload;
      Cookies.set('token', action.payload, { expires: 30 });
      toast.success('توکن ذخیره شد');
    },

    clearAuthError: (state) => {
      state.error = null;
    },

    clearResetSuccess: (state) => {
      state.resetSuccess = false;
    },
  },

  extraReducers: (builder) => {
    // ---- LOGIN ----
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.resetSuccess = false;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;

      const payload = action.payload;
      if (!payload?.token) {
        state.error = 'پاسخ ورود نامعتبر است';
        toast.error(state.error);
        return;
      }

      state.token = payload.token;
      Cookies.set('token', payload.token);

      state.userInfo = payload.userInfo ?? null;

      state.roles = payload.roles || [];
      state.menus = payload.menus || [];
      state.units = payload.units || [];
      state.companies = payload.companies || [];
      state.widgets = payload.widgets || [];

      toast.success('با موفقیت وارد شدید');
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.token = null;
      state.userInfo = null;
      state.error = action.payload || 'خطا در ورود';
      toast.error(state.error);
    });

    // ---- REGISTER ----
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.resetSuccess = false;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;

      const payload = action.payload;
      // if backend returns token on register
      if (payload?.token) {
        state.token = payload.token;
        Cookies.set('token', payload.token, { expires: 30 });
      }

      state.userInfo = payload?.userInfo ?? null;

      toast.success('ثبت نام با موفقیت انجام شد');
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'خطا در ثبت نام';
      toast.error(state.error);
    });

    // ---- FORGOT PASSWORD ----
    builder.addCase(forgetPasswordUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.resetSuccess = false;
    });

    builder.addCase(forgetPasswordUser.fulfilled, (state, action) => {
      state.loading = false;

      const payload = action.payload;
      if (payload?.userId) {
        state.userId = payload.userId;
        toast.success('اطلاعات تایید شد');
      } else {
        state.error = 'پاسخ فراموشی رمز نامعتبر است';
        toast.error(state.error);
      }
    });

    builder.addCase(forgetPasswordUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'خطا در تایید اطلاعات';
      toast.error(state.error);
    });

    // ---- RESET PASSWORD ----
    builder.addCase(resetPasswordUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.resetSuccess = false;
    });

    builder.addCase(resetPasswordUser.fulfilled, (state) => {
      state.loading = false;
      state.resetSuccess = true;
      toast.success('رمز عبور شما با موفقیت تغییر کرد');
    });

    builder.addCase(resetPasswordUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'خطا در تغییر رمز عبور';
      toast.error(state.error);
    });

    // ---- USER PERMISSIONS ----
    builder.addCase(fetchUserPermissions.pending, (state) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(fetchUserPermissions.fulfilled, (state, action) => {
      state.loading = false;
      state.permissions = action.payload;
      state.userPermisson = action.payload;

      state.userInfo = {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        gender: action.payload.gender,
        personnelCode: action.payload.personnelCode,
        userId: action.payload.userId,
      };

      state.roles = action.payload.roles || [];
      state.companies = action.payload.companies || [];
      state.units = action.payload.units || [];
      state.menus = action.payload.menus || [];
      state.widgets = action.payload.widgets || [];
    });

    builder.addCase(fetchUserPermissions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message || 'خطا در دریافت دسترسی‌ها';
    });
  },
});

export const selectTokenExpiration = (state) => {
  const token = state.auth.token;
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
};

export const { logout, setToken, clearAuthError, clearResetSuccess } =
  authSlice.actions;

export default authSlice.reducer;
