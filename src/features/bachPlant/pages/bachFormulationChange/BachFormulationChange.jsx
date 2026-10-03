import React, { lazy, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { can, getPerm } from '../../../../utils/rbac';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';

import { useGetProfile } from '../../../../hooks/profile/profile';
import { useGetBachFormulation } from '../../Api/bachFormulationChange';
import { useGetProducts } from '../../../product_wareHouse/Api/productsApi';

const CreateBachFormulationChange = lazy(
  () =>
    import('../../components/bachFormulationChange/module/CreateBachFormulationChange')
);

const FormBachformulationChange = lazy(
  () =>
    import('../../components/bachFormulationChange/module/FormBachformulationChange')
);

const HeaderPage = lazy(
  () => import('../../components/bachFormulationChange/template/HeaderPage')
);

const TableFormulationPage = lazy(
  () =>
    import('../../components/bachFormulationChange/template/TableFormulationPage')
);

const Pagination = lazy(() => import('../../../../pagination/Pagination'));

const EditBachFormulationChange = lazy(
  () =>
    import('../../components/bachFormulationChange/module/EditBachFormulationChange')
);

const DeleteBachFormulation = lazy(
  () =>
    import('../../components/bachFormulationChange/module/DeleteBachFormulation')
);

function BachFormulationChange() {
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
  const [selectedFormulation, setSelectedFormulation] = useState(null);

  const perm = useMemo(
    () => getPerm(userMenus, 'batch-formulation-change-report'),
    [userMenus]
  );

  const canCreate = can(perm, 'create');
  const canEdit = can(perm, 'edit');
  const canDelete = can(perm, 'delete');

  const openCreate = (e) => {
    if (!canCreate) return toast.warning('دسترسی ایجاد گزارش ندارید');
    setOpenCreateModal(true);
    setSelectedFormulation(e);
  };

  const openEdit = (e) => {
    if (!canEdit) return toast.warning('دسترسی ویرایش گزارش ندارید');

    setOpenEditModal(true);
    setSelectedFormulation(e);
  };

  const askDelete = (e) => {
    if (!canDelete) return toast.warning('دسترسی حذف گزارش ندارید');

    setOpenDeleteModal(true);
    setSelectedFormulation(e);
  };

  const { data: profile } = useGetProfile();

  const findcompany = profile?.data?.companyRoles?.find(
    (c) => c.companyId
  )?.companyId;

  const {
    data: bach,
    isLoading,
    isError,
  } = useGetBachFormulation({ search, page, pageSize, companyId: findcompany });

  const { data: bachAll } = useGetBachFormulation({ companyId: findcompany });

  const allReport = bach?.items?.length;

  const allSigend = bachAll?.items?.filter(
    (m) => m.isManagementSigned === true
  )?.length;

  const withoutSignedFurnace = bachAll?.items?.filter(
    (m) => m.isFurnaceSupervisorSigned === false
  )?.length;

  const withoutSignedProduction = bachAll?.items?.filter(
    (m) =>
      m.isProductionManagerSigned === false &&
      m.isFurnaceSupervisorSigned === true
  )?.length;

  const withoutSigendProductionEngineering = bachAll?.items?.filter(
    (m) =>
      m.isProductionManagerSigned === true &&
      m.isFurnaceSupervisorSigned === true &&
      m.isProductionEngineeringSigned === false
  )?.length;

  const withoutSigendManager = bachAll?.items?.filter(
    (m) =>
      m.isProductionManagerSigned === true &&
      m.isFurnaceSupervisorSigned === true &&
      m.isProductionEngineeringSigned === true &&
      m.isManagementSigned === false
  )?.length;

  const filteredData = useMemo(() => {
    if (filterStatus === 'all') return bach?.items;

    return bachAll?.items?.filter((e) => {
      if (filterStatus === 'confirmed') return e.isManagementSigned === true;
      if (filterStatus === 'production')
        return e.isProductionManagerSigned === false;

      if (filterStatus === 'furnace')
        return (
          e.isProductionManagerSigned === true &&
          e.isFurnaceSupervisorSigned === false
        );

      if (filterStatus === 'engineering')
        return (
          e.isProductionManagerSigned === true &&
          e.isFurnaceSupervisorSigned === true &&
          e.isProductionEngineeringSigned === false
        );

      if (filterStatus === 'manager')
        return (
          e.isProductionManagerSigned === true &&
          e.isFurnaceSupervisorSigned === true &&
          e.isProductionEngineeringSigned === true &&
          e.isManagementSigned === false
        );
    });
  }, [bach, bachAll, filterStatus]);

  const totalPages = bach?.totalPages ?? 1;

  return (
    <div className="h-screen overflow-hidden rounded-[15px] bg-[#0F090C]/30 text-white">
      <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-black/70">
        <HeaderPage
          openCreate={openCreate}
          canCreate={canCreate}
          allReport={allReport}
          allSigend={allSigend}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          search={search}
          setSearch={setSearch}
          openFilterMobile={openFilterMobile}
          setOpenFilterMobile={setOpenFilterMobile}
          withoutSignedProduction={withoutSignedProduction}
          withoutSignedFurnace={withoutSignedFurnace}
          withoutSigendProductionEngineering={
            withoutSigendProductionEngineering
          }
          withoutSigendManager={withoutSigendManager}
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
              <TableFormulationPage
                filteredData={filteredData}
                profile={profile}
                findcompany={findcompany}
                canEdit={canEdit}
                canDelete={canDelete}
                openEdit={openEdit}
                askDelete={askDelete}
                setOpenFormReport={setOpenForm}
                setSelectedFormulation={setSelectedFormulation}
              />
            </div>
          </div>
        )}
        <div
          className={`w-full shrink-0 ${filterStatus === 'confirmed' || filterStatus === 'pending' || filterStatus === 'unSign' ? 'opacity-0' : ''}`}
        >
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      </div>

      <CreateBachFormulationChange
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
      />

      <EditBachFormulationChange
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        selectedFormulation={selectedFormulation}
        setSelectedFormulation={setSelectedFormulation}
      />

      <DeleteBachFormulation
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        selectedFormulation={selectedFormulation}
      />

      <FormBachformulationChange
        openForm={openForm}
        setOpenForm={setOpenForm}
        selectedFormulation={selectedFormulation}
        setSelectedFormulation={setSelectedFormulation}
      />
    </div>
  );
}

export default BachFormulationChange;
