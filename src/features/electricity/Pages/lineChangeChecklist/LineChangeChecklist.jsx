import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { can, getPerm } from '../../../../utils/rbac';
import { toast } from 'react-toastify';
import { useGetLinechangeCheckList } from '../../Api/LineChangeCheckList/lineChangeCheckList';
import { useGetProfile } from '../../../../hooks/profile/profile';
import { HashLoader } from 'react-spinners';

import FormLineChangeCheckList from '../../components/lineChangeChecklist/module/FormLineChangeCheckList';
import HeaderPageLineChangeCheckList from '../../components/lineChangeChecklist/template/HeaderPageLineChangeCheckList';
import CreateLinechangeCheckList from '../../components/lineChangeChecklist/module/CreateLinechangeCheckList';
import TablePageLinechangeCheckList from '../../components/lineChangeChecklist/template/TablePageLinechangeCheckList';
import EditLineChangeCheckList from '../../components/lineChangeChecklist/module/EditLineChangeCheckList';
import DeleteLineChangeCheckList from '../../components/lineChangeChecklist/module/DeleteLineChangeCheckList';
import { useGetFullAccess } from '../../../../hooks/auth/authApi';

function LineChangeChecklist() {
  const { menus: userMenus } = useSelector((s) => s.auth);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [openFilterMobile, setOpenFilterMobile] = useState(false);
  const [selectedCheckList, setSelectedCheckList] = useState(null);

  const perm = useMemo(
    () => getPerm(userMenus, 'line-change-checklist'),
    [userMenus]
  );

  const canCreate = can(perm, 'create');
  const canEdit = can(perm, 'edit');
  const canDelete = can(perm, 'delete');

  const openCreate = (e) => {
    if (!canCreate) return toast.warning('دسترسی ایجاد گزارش ندارید');
    setOpenCreateModal(true);
    setSelectedCheckList(e);
  };

  const openEdit = (e) => {
    if (!canEdit) return toast.warning('دسترسی ویرایش گزارش ندارید');

    setOpenEditModal(true);
    setSelectedCheckList(e);
  };

  const askDelete = (e) => {
    if (!canDelete) return toast.warning('دسترسی حذف گزارش ندارید');

    setOpenDeleteModal(true);
    setSelectedCheckList(e);
  };

  const { data: profile } = useGetProfile();

  const { data: permission } = useGetFullAccess();

  const findCompany = permission?.companies?.[0]?.id;

  const {
    data: checkList,
    isLoading,
    isError,
  } = useGetLinechangeCheckList({
    search,
    page,
    pageSize,
    companyId: findCompany,
  });

  const allReport = checkList?.data?.totalCount;

  const allConfirmed = checkList?.data?.items?.filter(
    (c) => c?.isOperationsSupervisorSigned === true
  ).length;

  const allRejected = checkList?.data?.items?.filter(
    (c) =>
      c.isOperationsSupervisorSigned === false &&
      c.isShiftSupervisorSigned === true
  ).length;

  const withoutSigned = checkList?.data?.items?.filter(
    (c) =>
      c?.isOperationsSupervisorSigned === false &&
      c.isShiftSupervisorSigned === false
  ).length;

  const filteredData = useMemo(() => {
    if (filterStatus === 'all') return checkList?.data?.items;

    return checkList?.data?.items?.filter((c) => {
      if (filterStatus === 'confirmed')
        return c?.isOperationsSupervisorSigned === true;

      if (filterStatus === 'reject')
        return (
          c?.isOperationsSupervisorSigned === false &&
          c.isShiftSupervisorSigned === true
        );

      if (filterStatus === 'Unsigned')
        return (
          c?.isOperationsSupervisorSigned === false &&
          c.isShiftSupervisorSigned === false
        );
    });
  }, [filterStatus, checkList]);

  const countReport = checkList?.data?.items?.length;
  const totalPages = checkList?.data?.totalPages ?? 1;

  return (
    <div className="h-screen overflow-hidden rounded-[15px] bg-[#0F090C]/30 text-white">
      <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-black/70">
        <HeaderPageLineChangeCheckList
          openCreate={openCreate}
          canCreate={canCreate}
          allReport={allReport}
          allConfirmed={allConfirmed}
          allRejected={allRejected}
          withoutSigned={withoutSigned}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          search={search}
          setSearch={setSearch}
          countReport={countReport}
          openFilterMobile={openFilterMobile}
          setOpenFilterMobile={setOpenFilterMobile}
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
          <div className="no-scrollbar 5xl:mt-5 flex min-h-0 w-full overflow-x-hidden overflow-y-auto">
            <div className="mx-3 w-full max-md:hidden">
              <TablePageLinechangeCheckList
                filteredData={filteredData}
                search={search}
                canEdit={canEdit}
                canDelete={canDelete}
                openEdit={openEdit}
                askDelete={askDelete}
                setOpenFormReport={setOpenForm}
                setSelectedCheckList={setSelectedCheckList}
              />
            </div>
          </div>
        )}
      </div>

      <CreateLinechangeCheckList
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
      />

      <EditLineChangeCheckList
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        selectedCheckList={selectedCheckList}
        setSelectedCheckList={setSelectedCheckList}
      />

      <FormLineChangeCheckList
        openForm={openForm}
        setOpenForm={setOpenForm}
        selectedCheckList={selectedCheckList}
        setSelectedCheckList={setSelectedCheckList}
      />

      <DeleteLineChangeCheckList
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        selectedCheckList={selectedCheckList}
      />
    </div>
  );
}

export default LineChangeChecklist;
