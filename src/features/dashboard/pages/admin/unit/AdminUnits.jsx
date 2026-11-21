import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { usePermission } from '../../../../../permission/usePermission';
import { MENU_URL } from '../../../../../permission/menuKeys';
import { useGetUnit } from '../../../../../hooks/unit/unitApi';
import UnitHeader from '../../../components/unit/template/UnitHeader';
import UnitForm from '../../../components/unit/module/UnitForm';
import { HashLoader } from 'react-spinners';
import UnitTable from '../../../components/unit/template/UnitTable';
import Pagination from '../../../../../pagination/Pagination';
import { useGetCompanies } from '../../../../../hooks/company/companiApi';
import { useGetFullAccess } from '../../../../../hooks/auth/authApi';
import DeleteUnit from '../../../components/unit/module/DeleteUnit';
import UnitMobile from '../../../components/unit/template/UnitMobile';

function AdminUnits() {
  const { token, menus: userMenus } = useSelector((state) => state.auth);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [code, setcode] = useState('');
  const [companyId, setcompanyId] = useState('');
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
  } = useGetUnit({ search, page, pageSize, code, companyId });

  const { data: company } = useGetCompanies({ pageSize: 999999999 });

  const { data: userPermisson } = useGetFullAccess();

  const AccessToFilter = userPermisson?.isGlobalAccess === true;

  const totalPages = unit?.totalPages ?? 1;
  const totalCount = unit?.totalCount;

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
          company={company}
          companyId={companyId}
          setcompanyId={setcompanyId}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          openFilterMobile={openFilterMobile}
          setOpenFilterMobile={setOpenFilterMobile}
          AccessToFilter={AccessToFilter}
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
              <UnitTable
                unit={unit}
                selectedUnit={selectedUnit}
                setSelectedUnit={setSelectedUnit}
                canEdit={canEdit}
                openEdit={openEdit}
                canDelete={canDelete}
                openDelete={openDelete}
                search={search}
              />
            </div>
            <UnitMobile
              unit={unit}
              selectedUnit={selectedUnit}
              setSelectedUnit={setSelectedUnit}
              canEdit={canEdit}
              openEdit={openEdit}
              canDelete={canDelete}
              openDelete={openDelete}
            />
          </div>
        )}
        <div
          className={`w-full shrink-0 ${filterStatus === 'confirmed' || filterStatus === 'pending' || filterStatus === 'unSign' ? 'opacity-0' : ''}`}
        >
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      </div>
      <UnitForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedUnit={selectedUnit}
        setSelectedUnit={setSelectedUnit}
      />

      <DeleteUnit
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        selectedUnit={selectedUnit}
        setSelectedUnit={setSelectedUnit}
      />
    </div>
  );
}

export default AdminUnits;
