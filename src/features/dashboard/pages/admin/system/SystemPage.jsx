import React, { lazy, useState } from 'react';
import { useSelector } from 'react-redux';
import { MENU_URL } from '../../../../../permission/menuKeys';
import { usePermission } from '../../../../../permission/usePermission';
import { useGetSystem } from '../../../../../hooks/system/system';
import { useGetFullAccess } from '../../../../../hooks/auth/authApi';
import SystemHeader from '../../../components/system/template/SystemHeader';
import { HashLoader } from 'react-spinners';

const SystemTable = lazy(
  () => import('../../../components/system/template/SystemTable')
);

const SystemForm = lazy(
  () => import('../../../components/system/module/SystemForm')
);

const SystemDelete = lazy(
  () => import('../../../components/system/module/Systemdelete')
);

const SystemMobilePage = lazy(
  () => import('../../../components/system/template/SystemMobilePage')
);

function SystemPage() {
  const { token, menus: userMenus } = useSelector((state) => state.auth);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [unitId, setUnitId] = useState('');
  const [code, setCode] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [openFilterMobile, setOpenFilterMobile] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState(null);

  const { canCreate, canEdit, canDelete, guardCreate, guardEdit, guardDelete } =
    usePermission(MENU_URL.ADMIN_SYSTEM, 'سیستم');

  const openCreate = guardCreate(() => {
    setIsModalOpen(true);
  });

  const openEdit = guardEdit((sys) => {
    setSelectedSystem(sys);
    setIsModalOpen(true);
  });

  const openDelete = guardDelete((sys) => {
    setSelectedSystem(sys);
    setIsDeleteModalOpen(true);
  });

  const {
    data: sys,
    isLoading,
    isError,
  } = useGetSystem({ unitId, search, code, page, pageSize });

  const { data: permission } = useGetFullAccess();

  const totalPages = sys?.totalPages ?? 1;
  const totalCount = sys?.totalCount;

  return (
    <div className="h-screen overflow-hidden rounded-[15px] bg-[#0F090C]/30 text-white">
      <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-black/70">
        <SystemHeader
          openCreate={openCreate}
          canCreate={canCreate}
          search={search}
          setSearch={setSearch}
          totalCount={totalCount}
          sys={sys}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
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
          <div className="no-scrollbar 4xl:mt-5 flex min-h-0 w-full overflow-x-hidden overflow-y-auto">
            <div className="mx-3 hidden sm:block md:w-full">
              <SystemTable
                sys={sys}
                permission={permission}
                selectedSystem={selectedSystem}
                setSelectedSystem={setSelectedSystem}
                canEdit={canEdit}
                openEdit={openEdit}
                canDelete={canDelete}
                openDelete={openDelete}
                search={search}
              />
            </div>
            <SystemMobilePage
              sys={sys}
              selectedSystem={selectedSystem}
              setSelectedSystem={setSelectedSystem}
              canEdit={canEdit}
              openEdit={openEdit}
              canDelete={canDelete}
              openDelete={openDelete}
            />
          </div>
        )}
      </div>
      <SystemForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedSystem={selectedSystem}
        setSelectedSystem={setSelectedSystem}
      />

      <SystemDelete
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        selectedSystem={selectedSystem}
        setSelectedSystem={setSelectedSystem}
      />
    </div>
  );
}

export default SystemPage;
