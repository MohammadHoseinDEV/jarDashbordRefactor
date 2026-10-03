import React, { lazy } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchUserPermissions } from '../../../../auth/Slice/authSlice';
import { useGetCompanies } from '../../../../../hooks/company/companiApi';
import { usePermission } from '../../../../../permission/usePermission';
import { MENU_URL } from '../../../../../permission/menuKeys';
import { useGetProfile } from '../../../../../hooks/profile/profile';
import { useGetMenu } from '../../../../../hooks/menu/menuApi';
import {
  useCreateRole,
  useGetRoles,
  useUpdateRole,
} from '../../../../../hooks/role/role';

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';
import axios from 'axios';

import API_HOST from '../../../../../../API/api';

const Pagination = lazy(() => import('../../../../../pagination/Pagination'));
const HeaderRolePage = lazy(
  () => import('../../../components/role/template/HeaderRolePage')
);
const FormRole = lazy(() => import('../../../components/role/module/FormRole'));

const TableRolePage = lazy(
  () => import('../../../components/role/template/TableRolePage')
);

const DeleteRole = lazy(
  () => import('../../../components/role/module/DeleteRole')
);

const AssignRoleMenu = lazy(
  () => import('../../../components/role/module/AssignRoleMenu')
);

const MobileRolePage = lazy(
  () => import('../../../components/role/template/MobileRolePage')
);

function AdminRoles() {
  const [form, setForm] = useState({
    roleName: '',
    isGlobalAccess: true,
    companyId: '',
  });
  const { token, menus: userMenus } = useSelector((state) => state.auth);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchCompany, setSearchCompany] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assignRole, setAssignRole] = useState(null);
  const [menuPerms, setMenuPerms] = useState({});
  const [selectedRole, setSelectedRole] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [openFilterMobile, setOpenFilterMobile] = useState(false);

  const resetForm = () => {
    setForm({ roleName: '', isGlobalAccess: true, companyId: '' });
  };

  const {
    canCreate,
    canEdit,
    canDelete,
    canView,
    guardCreate,
    guardEdit,
    guardDelete,
    guardView,
  } = usePermission(MENU_URL.ADMIN_ROLES, 'نقش');

  const openCreate = guardCreate(() => {
    resetForm();
    setIsModalOpen(true);
  });

  const openEdit = guardEdit((role) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  });

  const openDelete = guardDelete((role) => {
    setSelectedRole(role);
    setIsDeleteModalOpen(true);
  });

  const openView = guardView((role) => {
    setSelectedRole(role);
    setIsAssignModalOpen(true);
  });

  const { data: profile } = useGetProfile();
  const findcompany = profile?.data?.companyRoles?.find(
    (c) => c.companyId
  )?.companyId;

  const filterAccess =
    profile?.data?.identityRoles?.some((p) => p?.isGlobalAccess === true) ||
    profile?.data?.companyRole?.some((p) => p?.isGlobalAccess === true);

  const isGlobalAccessFilter = useMemo(() => {
    if (filterStatus === 'global') return true;
    if (filterStatus === 'internal') return false;
    return undefined;
  }, [filterStatus]);

  const {
    data: roles,
    isLoading,
    isError,
  } = useGetRoles({
    search,
    page,
    pageSize,
    isGlobalAccess: isGlobalAccessFilter,
    companyId: findcompany,
  });

  const { data: menus, isLoading: loading } = useGetMenu({ pageSize: 10000 });

  const flatList = useMemo(() => {
    const flatten = (list) =>
      (list || []).flatMap((menu) => [menu, ...flatten(menu.subMenus)]);

    return flatten(menus?.menus);
  }, [menus]);

  const { data: globalRolesData } = useGetRoles({
    pageSize: 1,
    isGlobalAccess: true,
    companyId: findcompany,
  });

  const { data: internalRolesData } = useGetRoles({
    pageSize: 1,
    isGlobalAccess: false,
    companyId: findcompany,
  });

  const totalGlobalCount = globalRolesData?.totalCount ?? 0;
  const totalInternalCount = internalRolesData?.totalCount ?? 0;

  const filterData = useMemo(() => {
    if (filterStatus === 'all') return roles?.roles;

    return roles?.roles?.filter((r) => {
      if (filterStatus === 'global') return r.isGlobalAccess === true;

      if (filterStatus === 'internal') return r.isGlobalAccess === false;
    });
  }, [roles, filterStatus]);

  const totalPages = roles?.totalPages ?? 1;
  const totalCount = roles?.totalCount;

  const createRoles = useCreateRole();
  const updateRoles = useUpdateRole();

  const createRole = () => {
    createRoles.mutate(form, {
      onSuccess: () => {
        resetForm();
        setIsModalOpen(false);
      },
    });
  };

  const updateRole = async () => {
    updateRoles.mutate(
      { id: editing.id, form },
      {
        onSuccess: () => {
          setIsModalOpen(false);
        },
      }
    );
  };

  const { data: company } = useGetCompanies();

  const getCompany = useMemo(() => {
    const none = { id: '', name: 'انتخاب شرکت', isActive: true };

    return [
      none,
      ...(company?.companies ?? []).map((c) => ({
        id: c.id,
        name: c.name,
        isActive: c.isActive,
      })),
    ];
  }, [company]);

  const filterCompany = useMemo(() => {
    const q = searchCompany.trim().toLowerCase();
    if (!q) return getCompany;

    return getCompany.filter((c) => (c?.name || '').toLowerCase().includes(q));
  }, [searchCompany, getCompany]);

  const selectedCompany = useMemo(() => {
    return getCompany.find((c) => c.id === form.companyId) || getCompany[0];
  }, [getCompany, form.companyId]);

  // ----------------------***-------------------------------

  return (
    <div className="h-screen overflow-hidden rounded-[15px] bg-[#0F090C]/30 text-white">
      <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-black/70">
        <HeaderRolePage
          openCreate={openCreate}
          canCreate={canCreate}
          search={search}
          setSearch={setSearch}
          totalCount={totalCount}
          roles={roles}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterData={filterData}
          totalGlobalCount={totalGlobalCount}
          totalInternalCount={totalInternalCount}
          openFilterMobile={openFilterMobile}
          setOpenFilterMobile={setOpenFilterMobile}
          filterAccess={filterAccess}
        />

        {isLoading ? (
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center space-y-5">
            <HashLoader color="#ffffff" size={80} speedMultiplier={1.5} />
            <p className="pt-10 text-[20px]">لطفا منتظر بمانید😎</p>
          </div>
        ) : isError ? (
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center space-y-5 text-[30px]">
            خطا در دریافت اطلاعات 😟
          </div>
        ) : (
          <div className="no-scrollbar 4xl:mt-5 flex min-h-0 w-full overflow-x-hidden overflow-y-auto">
            <div className="mx-3 hidden sm:block md:w-full">
              <TableRolePage
                filterData={filterData}
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
                canEdit={canEdit}
                openEdit={openEdit}
                canDelete={canDelete}
                openDelete={openDelete}
                openView={openView}
                canView={canView}
              />
            </div>
            <MobileRolePage
              filterData={filterData}
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
              canEdit={canEdit}
              openEdit={openEdit}
              canDelete={canDelete}
              openDelete={openDelete}
              openView={openView}
              canView={canView}
            />
          </div>
        )}

        <div
          className={`w-full shrink-0 ${filterStatus === 'confirmed' || filterStatus === 'pending' || filterStatus === 'unSign' ? 'opacity-0' : ''}`}
        >
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      </div>

      <FormRole
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        company={company}
      />

      <DeleteRole
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />

      <AssignRoleMenu
        isAssignModalOpen={isAssignModalOpen}
        setIsAssignModalOpen={setIsAssignModalOpen}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />
    </div>
  );
}

export default AdminRoles;
