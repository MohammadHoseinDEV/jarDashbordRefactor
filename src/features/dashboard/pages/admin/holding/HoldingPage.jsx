import React, { useState } from 'react';
import HeaderHoldingPage from '../../../components/holding/template/HeaderHoldingPage';
import { useGetHolding } from '../../../../../hooks/holding/holding';
import { useSelector } from 'react-redux';
import { usePermission } from '../../../../../permission/usePermission';
import { MENU_URL } from '../../../../../permission/menuKeys';
import FormHoldingPage from '../../../components/holding/module/FormHoldingPage';
import { HashLoader } from 'react-spinners';
import TableHoldingPage from '../../../components/holding/template/TableHoldingPage';
import DeleteHoldingPage from '../../../components/holding/module/DeleteHoldingPage';
import MobileHoldingPage from '../../../components/holding/template/MobileHoldingPage';

function HoldingPage() {
  const { token, menus: userMenus } = useSelector((state) => state.auth);

  const [search, setSearch] = useState('');
  const [code, setCode] = useState('');
  const [page, setPage] = useState(1);
  const [isActive, setIsActive] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [selectedHolding, setSelectedHolding] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [openFilterMobile, setOpenFilterMobile] = useState(false);

  const {
    canCreate,
    canEdit,
    canDelete,
    canView,
    guardCreate,
    guardEdit,
    guardDelete,
    guardView,
  } = usePermission(MENU_URL.ADMIN_ROLES, 'هلدینگ');

  const openCreate = guardCreate(() => {
    setIsModalOpen(true);
  });

  const openEdit = guardEdit((hol) => {
    setSelectedHolding(hol);
    setIsModalOpen(true);
  });

  const openDelete = guardDelete((hol) => {
    setSelectedHolding(hol);
    setIsDeleteModal(true);
  });

  const openView = guardView((hol) => {
    setSelectedHolding(hol);
    setIsAssignModalOpen(true);
  });

  const {
    data: holding,
    isLoading,
    isError,
  } = useGetHolding({ search, code, isActive, page, pageSize });

  const totalCount = holding?.totalCount;

  return (
    <div className="h-screen overflow-hidden rounded-[15px] bg-[#0F090C]/30 text-white">
      <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-black/70">
        <HeaderHoldingPage
          openCreate={openCreate}
          canCreate={canCreate}
          search={search}
          setSearch={setSearch}
          totalCount={totalCount}
          holding={holding}
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
            <div className="mx-2 hidden sm:block md:w-full">
              <TableHoldingPage
                holding={holding}
                selectedHolding={selectedHolding}
                setSelectedHolding={setSelectedHolding}
                canEdit={canEdit}
                openEdit={openEdit}
                canDelete={canDelete}
                openDelete={openDelete}
              />
            </div>
            <MobileHoldingPage
              holding={holding}
              selectedHolding={selectedHolding}
              setSelectedHolding={setSelectedHolding}
              canEdit={canEdit}
              openEdit={openEdit}
              canDelete={canDelete}
              openDelete={openDelete}
            />
          </div>
        )}
      </div>

      <FormHoldingPage
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedHolding={selectedHolding}
        setSelectedHolding={setSelectedHolding}
      />
      <DeleteHoldingPage
        selectedHolding={selectedHolding}
        setSelectedHolding={setSelectedHolding}
        isDeleteModal={isDeleteModal}
        setIsDeleteModal={setIsDeleteModal}
      />
    </div>
  );
}

export default HoldingPage;
