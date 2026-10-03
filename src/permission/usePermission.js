// src/hooks/permission/usePermission.js
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { can, getPerm } from '../utils/rbac';

export function usePermission(menuUrl, entityName = 'این مورد') {
  const userMenus = useSelector((state) => state.auth.menus);
  const perm = useMemo(() => getPerm(userMenus, menuUrl), [userMenus, menuUrl]);

  const canView = can(perm, 'view');
  const canCreate = can(perm, 'create');
  const canEdit = can(perm, 'edit');
  const canDelete = can(perm, 'delete');

  const guard =
    (hasAccess, actionLabel, callback) =>
    (...args) => {
      if (!hasAccess)
        return toast.error(`شما دسترسی ${actionLabel} ${entityName} ندارید`);
      callback?.(...args);
    };

  return {
    canView,
    canCreate,
    canEdit,
    canDelete,
    guardCreate: (cb) => guard(canCreate, 'ایجاد', cb),
    guardEdit: (cb) => guard(canEdit, 'ویرایش', cb),
    guardDelete: (cb) => guard(canDelete, 'حذف', cb),
    guardView: (cb) => guard(canView, 'نمایش', cb),
  };
}
