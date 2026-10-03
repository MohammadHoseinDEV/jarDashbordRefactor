import React, { lazy, useState } from 'react';
import { useSelector } from 'react-redux';
import { MENU_URL } from '../../../../../permission/menuKeys';
import { usePermission } from '../../../../../permission/usePermission';
import { useGetDepartment } from '../../../../../hooks/depratment/department';
import { useGetProfile } from '../../../../../hooks/profile/profile';
import HeaderDepartmentPage from '../../../components/department/template/HeaderDepartmentPage';
import FormDepartment from '../../../components/department/module/FormDepartment';

function DepartmentPage() {
  const { token, menus: userMenus } = useSelector((state) => state.auth);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [code, setcode] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [openFilterMobile, setOpenFilterMobile] = useState(false);
  const [selectedDepartment, setselectedDepartment] = useState(null);

  const {
    canCreate,
    canEdit,
    canDelete,
    canView,
    guardCreate,
    guardEdit,
    guardDelete,
    guardView,
  } = usePermission(MENU_URL.ADMIN_ROLES, 'دپارتمان');

  const openCreate = guardCreate(() => {
    setIsModalOpen(true);
  });

  const openEdit = guardEdit((role) => {
    setselectedDepartment(role);
    setIsModalOpen(true);
  });

  const openDelete = guardDelete((role) => {
    setselectedDepartment(role);
    setIsDeleteModalOpen(true);
  });

  const openView = guardView((role) => {
    setselectedDepartment(role);
    setIsAssignModalOpen(true);
  });

  const {
    data: dep,
    isLoading,
    isError,
  } = useGetDepartment({
    search,
    page,
    pageSize,
    code,
  });

  const totalPages = dep?.totalPages ?? 1;
  const totalCount = dep?.totalCount;

  return (
    <div className="h-screen overflow-hidden rounded-[15px] bg-[#0F090C]/30 text-white">
      <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-black/70">
        <HeaderDepartmentPage
          openCreate={openCreate}
          canCreate={canCreate}
          search={search}
          setSearch={setSearch}
          totalCount={totalCount}
          dep={dep}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          openFilterMobile={openFilterMobile}
          setOpenFilterMobile={setOpenFilterMobile}
        />
      </div>
      <FormDepartment
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedDepartment={selectedDepartment}
        setselectedDepartment={setselectedDepartment}
      />
    </div>
  );
}

export default DepartmentPage;
