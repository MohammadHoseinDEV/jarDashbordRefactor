import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { fetchUserPermissions } from '../../../auth/Slice/authSlice';

export default function PrivateRoute() {
  const dispatch = useDispatch();
  const { token, permissions, loading, menus } = useSelector((s) => s.auth);

  useEffect(() => {
    if (token && !loading && !permissions) {
      dispatch(fetchUserPermissions(token));
    }
  }, [token, permissions, loading, dispatch]);

  if (!token) return <Navigate to="/login" replace />;

  if (loading || !permissions)
    return <div className="p-6 text-white">در حال بارگذاری...</div>;

  const noMenus = !menus?.length;
  if (noMenus && !permissions.isGlobalAccess)
    return <Navigate to="/no-access" replace />;

  return <Outlet />;
}
