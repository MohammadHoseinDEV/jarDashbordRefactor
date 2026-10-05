import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { usePermission } from '../../../../../permission/usePermission';
import { MENU_URL } from '../../../../../permission/menuKeys';
import { useGetUnit } from '../../../../../hooks/unit/unitApi';
import UnitHeader from '../../../components/unit/template/UnitHeader';
import UnitForm from '../../../components/unit/module/UnitForm';

function AdminUnits() {
  const { token, menus: userMenus } = useSelector((state) => state.auth);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [code, setcode] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [openFilterMobile, setOpenFilterMobile] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const { canCreate, canEdit, canDelete, guardCreate, guardEdit, guardDelete } =
    usePermission(MENU_URL.ADMIN_UNITS, 'واحد');

  const openCreate = guardCreate(() => {
    setIsModalOpen(true);
  });

  const openEdit = guardEdit((unit) => {
    setSelectedUnit(unit);
    setIsModalOpen(true);
  });

  const openDelete = guardDelete((unit) => {
    setSelectedUnit(unit);
    setIsDeleteModalOpen(true);
  });

  const {
    data: unit,
    isLoading,
    isError,
  } = useGetUnit({ search, page, pageSize, code });

  const totalPages = unit?.totalPages ?? 1;
  const totalCount = unit?.totalCount;

  console.log(unit);

  return (
    <div className="h-screen overflow-hidden rounded-[15px] bg-[#0F090C]/30 text-white">
      <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-black/70">
        <UnitHeader
          openCreate={openCreate}
          canCreate={canCreate}
          search={search}
          setSearch={setSearch}
          totalCount={totalCount}
          unit={unit}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          openFilterMobile={openFilterMobile}
          setOpenFilterMobile={setOpenFilterMobile}
        />
      </div>
      <UnitForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedUnit={selectedUnit}
        setSelectedUnit={setSelectedUnit}
      />
    </div>
  );
}

export default AdminUnits;
