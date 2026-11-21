import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { can, getPerm } from '../../../../utils/rbac';
import { toast } from 'react-toastify';
import { useGetProfile } from '../../../../hooks/profile/profile';
import {
  useGetAllMoldFieldValidation,
  useGetMoldFieldValidation,
} from '../../Api/moldFieldValidation';
import HeaderPage from '../../components/moldFieldValidation/template/HeaderPage';
import { HashLoader } from 'react-spinners';
import TableMoldFieldValidation from '../../components/moldFieldValidation/template/TableMoldFieldValidation';
import MobileMoldFieldValidation from '../../components/moldFieldValidation/template/MobileMoldFieldValidation';
import Pagination from '../../../../pagination/Pagination';
import CreateModFieldValidation from '../../components/moldFieldValidation/module/CreateModFieldValidation';
import EditMoldFieldValidation from '../../components/moldFieldValidation/module/EditMoldFieldValidation';
import DeleteMoldFieldValidation from '../../components/moldFieldValidation/module/DeleteMoldFieldValidation';
import FormMoldFieldValidation from '../../components/moldFieldValidation/module/FormMoldFieldValidation';

function MoldFieldValidation() {
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
  const [selectedMold, setSelectedMold] = useState(null);

  const perm = useMemo(
    () => getPerm(userMenus, 'mold-field-validation-form'),
    [userMenus]
  );

  const canCreate = can(perm, 'create');
  const canEdit = can(perm, 'edit');
  const canDelete = can(perm, 'delete');

  const openCreate = (e) => {
    if (!canCreate) return toast.warning('دسترسی ایجاد گزارش ندارید');
    setOpenCreateModal(true);
    setSelectedMold(e);
  };

  const openEdit = (e) => {
    if (!canEdit) return toast.warning('دسترسی ویرایش گزارش ندارید');

    setOpenEditModal(true);
    setSelectedMold(e);
  };

  const askDelete = (e) => {
    if (!canDelete) return toast.warning('دسترسی حذف گزارش ندارید');

    setOpenDeleteModal(true);
    setSelectedMold(e);
  };

  const { data: profile } = useGetProfile();
  const isSuperAdmin = profile?.data?.identityRoles?.some(
    (p) => p.roleId === 'cfa79204-d797-4241-8630-55fcc1b2f721'
  );

  const isDesignManager = profile?.data?.companyRoles?.some(
    (p) => p.roleId === 'fa1367da-ab36-44ef-b018-8e9911f1279e'
  );

  const {
    data: mold,
    isLoading,
    isError,
  } = useGetMoldFieldValidation({ search, page, pageSize });
  const { data: moldAll } = useGetAllMoldFieldValidation();
  const allReport = mold?.data?.totalCount;
  const allConfirmed = moldAll?.data?.filter(
    (d) => d.isDesignerSigned === true
  ).length;

  const allProductionManager = moldAll?.data?.filter(
    (d) => d.isProductionManagerSigned === false
  ).length;

  const allPendingDesigner = moldAll?.data?.filter(
    (d) => d.isDesignerSigned === false && d.isProductionManagerSigned === true
  ).length;

  const filteredData = useMemo(() => {
    if (filterStatus === 'all') return mold?.data?.items;

    return moldAll?.data?.filter((e) => {
      if (filterStatus === 'confirmed') return e.isDesignerSigned === true;

      if (filterStatus === 'productionManager')
        return e.isProductionManagerSigned === false;

      if (filterStatus === 'pendingDesigner')
        return (
          e.isDesignerSigned === false && e.isProductionManagerSigned === true
        );

      return true;
    });
  }, [filterStatus, mold, moldAll]);

  const countReport = mold?.data?.items?.length;
  const totalPages = mold?.data?.totalPages ?? 1;

  return (
    <div className="h-screen overflow-hidden rounded-[15px] bg-[#0F090C]/30 text-white">
      <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-black/70">
        <HeaderPage
          openCreate={openCreate}
          canCreate={canCreate}
          allReport={allReport}
          allConfirmed={allConfirmed}
          allPendingDesigner={allPendingDesigner}
          allProductionManager={allProductionManager}
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
              <TableMoldFieldValidation
                filteredData={filteredData}
                canEdit={canEdit}
                canDelete={canDelete}
                openEdit={openEdit}
                askDelete={askDelete}
                setOpenFormReport={setOpenForm}
                setSelectedReport={setSelectedMold}
              />
            </div>
            <MobileMoldFieldValidation
              filteredData={filteredData}
              openEdit={openEdit}
              canEdit={canEdit}
              setOpenEditModal={setOpenEditModal}
              profile={profile}
              isDesignManager={isDesignManager}
              isSuperAdmin={isSuperAdmin}
              canDelete={canDelete}
              askDelete={askDelete}
              setSelectedMold={setSelectedMold}
              setOpenForm={setOpenForm}
            />
          </div>
        )}
        <div
          className={`w-full shrink-0 ${filterStatus === 'confirmed' || filterStatus === 'pending' || filterStatus === 'pendingDesigner' || filterStatus === 'productionManager' ? 'opacity-0' : ''}`}
        >
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      </div>
      <CreateModFieldValidation
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
      />
      <EditMoldFieldValidation
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        selectedMold={selectedMold}
        setSelectedMold={setSelectedMold}
      />
      <DeleteMoldFieldValidation
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        selectedMold={selectedMold}
      />

      <FormMoldFieldValidation
        openForm={openForm}
        setOpenForm={setOpenForm}
        selectedMold={selectedMold}
        setSelectedMold={setSelectedMold}
      />
    </div>
  );
}

export default MoldFieldValidation;
