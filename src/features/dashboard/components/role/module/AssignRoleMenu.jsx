import React, { useEffect, useMemo, useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { LuShieldCheck } from 'react-icons/lu';
import { toast } from 'react-toastify';

import { useGetMenu } from '../../../../../hooks/menu/menuApi';
import {
  useGetRolePermissions,
  useUpdateRolePermissions,
} from '../../../../../hooks/role/role';

const defaultPerm = {
  canView: false,
  canCreate: false,
  canEdit: false,
  canDelete: false,
};

const fullPerm = {
  canView: true,
  canCreate: true,
  canEdit: true,
  canDelete: true,
};

const LOCKED_MENU_URLS_FOR_SUPERADMIN = ['admin', 'admin-menus', 'admin-roles'];

function AssignRoleMenu({
  isAssignModalOpen,
  setIsAssignModalOpen,
  selectedRole,
  setSelectedRole,
}) {
  const [menuPerms, setMenuPerms] = useState({});

  const closeHandler = () => {
    setIsAssignModalOpen(false);
    setSelectedRole(null);
    setMenuPerms({});
  };

  const { data: menus, isLoading } = useGetMenu({
    pageSize: 10000,
  });

  const { data: roleMenus, isLoading: isMenuLoading } = useGetRolePermissions(
    selectedRole?.id
  );

  const {
    mutateAsync: savePermissions,
    isPending,
    isLoading: isMutating,
  } = useUpdateRolePermissions();

  const isSaving = isPending ?? isMutating ?? false;

  const flatList = useMemo(() => {
    const flatten = (list) =>
      (list || []).flatMap((menu) => [menu, ...flatten(menu.subMenus)]);

    return flatten(menus?.menus);
  }, [menus]);

  const isSuperAdminRole = selectedRole?.name === 'SuperAdmin';

  const isLockedMenu = (menu) => {
    return (
      isSuperAdminRole &&
      LOCKED_MENU_URLS_FOR_SUPERADMIN.includes(menu?.url || '')
    );
  };

  useEffect(() => {
    if (!isAssignModalOpen) return;
    if (!selectedRole?.id) return;
    if (!Array.isArray(flatList)) return;

    const next = {};

    for (const menu of flatList) {
      if (!menu?.id) continue;
      next[menu.id] = { ...defaultPerm };
    }

    const list = Array.isArray(roleMenus) ? roleMenus : roleMenus?.menus;

    if (Array.isArray(list)) {
      for (const roleMenu of list) {
        if (!roleMenu?.menuId) continue;

        next[roleMenu.menuId] = {
          canView: !!roleMenu.canView,
          canCreate: !!roleMenu.canCreate,
          canEdit: !!roleMenu.canEdit,
          canDelete: !!roleMenu.canDelete,
        };
      }
    }

    if (isSuperAdminRole) {
      for (const menu of flatList) {
        if (LOCKED_MENU_URLS_FOR_SUPERADMIN.includes(menu?.url)) {
          next[menu.id] = { ...fullPerm };
        }
      }
    }

    setMenuPerms(next);
  }, [
    isAssignModalOpen,
    selectedRole?.id,
    isSuperAdminRole,
    flatList,
    roleMenus,
  ]);

  const getPerm = (menuId) => {
    return menuPerms[menuId] ?? defaultPerm;
  };

  const hasActiveChild = (menu) =>
    (menu?.subMenus || []).some(
      (sub) => getPerm(sub.id).canView || hasActiveChild(sub)
    );

  const setPerm = (menuId, permission, value) => {
    setMenuPerms((prev) => {
      const current = prev[menuId] ?? defaultPerm;

      const next = {
        ...current,
        [permission]: value,
      };

      if (permission === 'canView' && value === false) {
        next.canCreate = false;
        next.canEdit = false;
        next.canDelete = false;
      }

      if (
        ['canCreate', 'canEdit', 'canDelete'].includes(permission) &&
        value === true
      ) {
        next.canView = true;
      }

      return {
        ...prev,
        [menuId]: next,
      };
    });
  };

  const toggleSingleMenuPermission = (menu) => {
    if (!menu?.id) return;
    if (isLockedMenu(menu)) return;

    setMenuPerms((prev) => {
      const current = prev[menu.id] ?? defaultPerm;

      const allEnabled =
        current.canView &&
        current.canCreate &&
        current.canEdit &&
        current.canDelete;

      return {
        ...prev,
        [menu.id]: {
          canView: !allEnabled,
          canCreate: !allEnabled,
          canEdit: !allEnabled,
          canDelete: !allEnabled,
        },
      };
    });
  };

  const saveAssignMenus = async () => {
    if (!selectedRole?.id) {
      toast.error('نقش انتخاب نشده است');
      return;
    }

    if (!Array.isArray(flatList)) {
      toast.error('لیست منوها دریافت نشده است');
      return;
    }

    try {
      const menusPayload = flatList.map((menu) => {
        const permission = menuPerms[menu.id] ?? defaultPerm;

        if (isLockedMenu(menu)) {
          return { menuId: menu.id, ...fullPerm };
        }

        if (menu.subMenus?.length > 0) {
          const active = hasActiveChild(menu);

          return {
            menuId: menu.id,
            canView: active,
            canCreate: active && !!permission.canCreate,
            canEdit: active && !!permission.canEdit,
            canDelete: active && !!permission.canDelete,
          };
        }

        return {
          menuId: menu.id,
          canView: !!permission.canView,
          canCreate: !!permission.canCreate,
          canEdit: !!permission.canEdit,
          canDelete: !!permission.canDelete,
        };
      });

      await savePermissions({
        id: selectedRole.id,
        data: {
          menus: menusPayload,
          widgets: [],
        },
      });

      closeHandler();
    } catch (error) {
      console.error('SAVE ROLE MENUS ERROR:', error);
    }
  };

  const permButtons = [
    { key: 'canView', label: 'مشاهده' },
    { key: 'canCreate', label: 'ایجاد' },
    { key: 'canEdit', label: 'ویرایش' },
    { key: 'canDelete', label: 'حذف' },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center overflow-auto p-4 transition-opacity duration-300 ${
        isAssignModalOpen
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={closeHandler}
      />

      <div
        className={`no-scrollbar relative flex max-h-[90vh] w-full max-w-5xl transform flex-col overflow-auto rounded-[15px] bg-linear-to-b from-[#1c1c1c] to-[#0c0c0c] p-2 text-white shadow-2xl transition-all duration-300 md:px-6 md:py-4 ${
          isAssignModalOpen
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="4xl:text-3xl rounded-full bg-white/15 p-3">
              <LuShieldCheck />
            </p>

            <h1 className="4xl:text-3xl pr-1.5 font-[Vazirmatn] text-sm font-semibold md:text-xl">
              دسترسی منو برای نقش {selectedRole?.name}
            </h1>
          </div>

          <button
            type="button"
            onClick={closeHandler}
            className="4xl:size-3xl 5xl:text-[35px] flex size-7 cursor-pointer items-center justify-center rounded-lg text-[16px] text-white/50 transition-all delay-75 duration-100 hover:bg-white/10 hover:text-white"
          >
            <IoCloseSharp />
          </button>
        </div>

        {isLoading || isMenuLoading ? (
          <p className="mt-6 text-center font-[Vazirmatn] text-sm text-white/50">
            در حال دریافت اطلاعات...
          </p>
        ) : (
          <div className="mt-4">
            {menus?.menus?.map((menu) => {
              const locked = isLockedMenu(menu);
              const active = hasActiveChild(menu);

              return (
                <div
                  key={menu.id}
                  className="my-2 rounded-xl bg-linear-to-tl from-[#1c1c1c] to-[#0c0c0c] p-2 font-[Vazirmatn]"
                >
                  <div className="flex items-center justify-between pb-2">
                    <p
                      className={`4xl:text-3xl text-xl transition-colors ${
                        active ? 'text-orange-400' : 'text-white'
                      }`}
                    >
                      {menu?.title}
                    </p>

                    <div className="flex items-center gap-2">
                      {active && (
                        <span className="rounded bg-orange-500/20 px-2 py-1 text-xs text-orange-400">
                          فعال
                        </span>
                      )}

                      {locked && (
                        <span className="rounded bg-white/10 px-2 py-1 text-xs text-white/50">
                          قفل
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pr-2">
                    {menu.subMenus?.map((subMenu) => {
                      const perm = getPerm(subMenu.id);
                      const subMenuLocked = isLockedMenu(subMenu);

                      return (
                        <div
                          key={subMenu.id}
                          className="my-2 space-y-2 rounded-lg bg-white/10 p-3 md:grid md:grid-cols-3"
                        >
                          <div className="flex items-center font-[Vazirmatn] font-semibold">
                            <p
                              className="4xl:text-2xl cursor-pointer text-white/60 hover:text-white"
                              onClick={() =>
                                toggleSingleMenuPermission(subMenu)
                              }
                            >
                              {subMenu?.title}
                            </p>
                          </div>

                          <div className="col-span-2 flex items-center justify-between">
                            {permButtons.map(({ key, label }) => (
                              <button
                                key={key}
                                type="button"
                                disabled={subMenuLocked}
                                onClick={() =>
                                  setPerm(subMenu.id, key, !perm[key])
                                }
                                className={`4xl:text-xl cursor-pointer rounded-lg px-2 py-1 disabled:cursor-not-allowed ${
                                  perm[key]
                                    ? 'bg-orange-500/80 text-black'
                                    : 'bg-inherit text-white/50'
                                }`}
                              >
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={closeHandler}
            disabled={isSaving}
            className="cursor-pointer rounded-xl bg-white/10 px-5 py-2 font-[Vazirmatn] transition-all hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            انصراف
          </button>

          <button
            type="button"
            onClick={saveAssignMenus}
            disabled={isSaving || isLoading || isMenuLoading}
            className="cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-5 py-2 font-[Vazirmatn] transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          >
            {isSaving ? 'در حال ذخیره...' : 'ذخیره دسترسی‌ها'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssignRoleMenu;
