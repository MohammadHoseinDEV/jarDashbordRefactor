import React, { useState } from 'react';
import { usePermission } from '../../../../../permission/usePermission';
import { useGetShifts } from '../../../../../hooks/shift/shiftApi';
import { MENU_URL } from '../../../../../permission/menuKeys';

import ShiftHeader from '../../../components/shift/template/ShiftHeader';
import ShiftForm from '../../../components/shift/module/ShiftForm';
import ShiftTable from '../../../components/shift/template/ShiftTable';
import { HashLoader } from 'react-spinners';
import ShiftDelete from '../../../components/shift/module/Shiftdelete';

function AdminShift() {
  const [filter, setFilter] = useState({
    search: '',
    pattern: '',
    companyId: '',
    departmentId: '',
    page: 1,
    pageSize: 10,
    isActive: true,
    status: 'all',
  });
  const [modal, setModal] = useState({
    open: false,
    delete: false,
    shift: null,
  });

  const { canCreate, canEdit, canDelete, guardCreate, guardEdit, guardDelete } =
    usePermission(MENU_URL.ADMIN_SHIFT, 'شیفت');

  const openCreate = guardCreate(() => {
    setModal({ open: true, delete: false, shift: null });
  });

  const openEdit = guardEdit((shift) => {
    setModal({ open: true, delete: false, shift });
  });

  const openDelete = guardDelete((shift) => {
    setModal({ open: false, delete: true, shift });
  });

  const closeModal = () =>
    setModal({ open: false, delete: false, shift: null });

  const { data: shifts, isLoading, isError } = useGetShifts(filter);

  const totalPages = shifts?.totalPages ?? 1;
  const totalCount = shifts?.totalCount;

  return (
    <div className="h-screen overflow-hidden rounded-[15px] bg-[#0F090C]/30 text-white">
      <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-black/70">
        <ShiftHeader
          shifts={shifts}
          filter={filter}
          setFilter={setFilter}
          canCreate={canCreate}
          openCreate={openCreate}
          totalCount={totalCount}
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
              <ShiftTable
                shifts={shifts}
                canEdit={canEdit}
                canDelete={canDelete}
                openEdit={openEdit}
                openDelete={openDelete}
              />
            </div>
          </div>
        )}
      </div>

      <ShiftForm
        isModalOpen={modal.open}
        selectedShift={modal.shift}
        onclose={closeModal}
      />
      <ShiftDelete
        isModalOpen={modal.delete}
        selectedShift={modal.shift}
        onClose={closeModal}
      />
    </div>
  );
}

export default AdminShift;
