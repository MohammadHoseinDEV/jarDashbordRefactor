import React, { lazy, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { can, getPerm } from '../../../../utils/rbac';
import { useGetProfile } from '../../../../hooks/profile/profile';
import {
  useGetAllProductWeightStandard,
  useGetProductWeightStandard,
} from '../../Api/productWeightStandardForm';
import { HashLoader } from 'react-spinners';

const HeaderPage = lazy(
  () => import('../../components/productWeightStandardForm/template/HeaderPage')
);
const TablePage = lazy(
  () => import('../../components/productWeightStandardForm/template/TablePage')
);
const CreateProductWeightStandard = lazy(
  () =>
    import('../../components/productWeightStandardForm/module/CreateProductWeightStandard')
);

const EditProductionWeightStandard = lazy(
  () =>
    import('../../components/productWeightStandardForm/module/EditProductionWeightStandard')
);
const DeleteProductionWeight = lazy(
  () =>
    import('../../components/productWeightStandardForm/module/DeleteProductionWeight')
);
const FormProductionWeightStandard = lazy(
  () =>
    import('../../components/productWeightStandardForm/module/FormProductionWeightStandard')
);
const MobilePage = lazy(
  () => import('../../components/productWeightStandardForm/template/MobilePage')
);
import { toast } from 'react-toastify';

function ProductWeightStandardForm() {
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
  const [selectedProductWeigth, setSelectedProductWeigth] = useState(null);

  const perm = useMemo(
    () => getPerm(userMenus, 'product-weight-standard-form'),
    [userMenus]
  );

  const canCreate = can(perm, 'create');
  const canEdit = can(perm, 'edit');
  const canDelete = can(perm, 'delete');

  const openCreate = (e) => {
    if (!canCreate) return toast.warning('دسترسی ایجاد گزارش ندارید');
    setOpenCreateModal(true);
    setSelectedProductWeigth(e);
  };

  const openEdit = (e) => {
    if (!canEdit) return toast.warning('دسترسی ویرایش گزارش ندارید');

    setOpenEditModal(true);
    setSelectedProductWeigth(e);
  };

  const askDelete = (e) => {
    if (!canDelete) return toast.warning('دسترسی حذف گزارش ندارید');

    setOpenDeleteModal(true);
    setSelectedProductWeigth(e);
  };

  const { data: profile } = useGetProfile();
  const isSuperAdmin = profile?.data?.identityRoles?.some(
    (p) => p.roleId === 'cfa79204-d797-4241-8630-55fcc1b2f721'
  );

  const isDesignManager = profile?.data?.companyRoles?.some(
    (p) => p.roleId === 'fa1367da-ab36-44ef-b018-8e9911f1279e'
  );

  const {
    data: standard,
    isLoading,
    isError,
  } = useGetProductWeightStandard({ search, page, pageSize });
  const { data: standardAll } = useGetAllProductWeightStandard();

  const allReport = standard?.data?.totalCount;

  const allConfirmed = standardAll?.data?.filter(
    (d) => d.isFactoryManagerSigned === true
  ).length;

  const allProductionManager = standardAll?.data?.filter(
    (d) => d.isProductionSupervisorSigned === false
  ).length;

  const allProductionPlaning = standardAll?.data?.filter(
    (d) =>
      d.isProductionSupervisorSigned === true &&
      d.isProductionPlannerSigned === false
  ).length;

  const allPendingDesigner = standardAll?.data?.filter(
    (d) =>
      d.isDesignerSigned === false &&
      d.isProductionSupervisorSigned === true &&
      d.isProductionPlannerSigned === true
  ).length;

  const allFactoryManager = standardAll?.data?.filter(
    (d) =>
      d.isFactoryManagerSigned === false &&
      d.isProductionPlannerSigned === true &&
      d.isProductionSupervisorSigned === true &&
      d.isDesignerSigned === true
  ).length;

  const filteredData = useMemo(() => {
    if (filterStatus === 'all') return standard?.data?.items;

    return standardAll?.data?.filter((e) => {
      if (filterStatus === 'confirmed')
        return e.isFactoryManagerSigned === true;

      if (filterStatus === 'productionManager')
        return e.isProductionSupervisorSigned === false;

      if (filterStatus === 'productionPlaning')
        return (
          e.isProductionSupervisorSigned === true &&
          e.isProductionPlannerSigned === false
        );

      if (filterStatus === 'pendingDesigner')
        return (
          e.isDesignerSigned === false &&
          e.isProductionSupervisorSigned === true &&
          e.isProductionPlannerSigned === true
        );

      if (filterStatus === 'factoryManager')
        return (
          e.isFactoryManagerSigned === false &&
          e.isProductionPlannerSigned === false &&
          e.isProductionSupervisorSigned === true &&
          e.isDesignerSigned === true
        );
      return true;
    });
  }, [filterStatus, standard, standardAll]);

  const countReport = standard?.data?.items?.length;
  const totalPages = standard?.data?.totalPages ?? 1;

  return (
    <div className="h-screen overflow-hidden rounded-[15px] bg-[#0F090C]/30 text-white">
      <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-black/70">
        <HeaderPage
          openCreate={openCreate}
          canCreate={canCreate}
          allReport={allReport}
          allConfirmed={allConfirmed}
          allProductionManager={allProductionManager}
          allProductionPlaning={allProductionPlaning}
          allPendingDesigner={allPendingDesigner}
          allFactoryManager={allFactoryManager}
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
              <TablePage
                filteredData={filteredData}
                canEdit={canEdit}
                canDelete={canDelete}
                openEdit={openEdit}
                askDelete={askDelete}
                setOpenFormReport={setOpenForm}
                setSelectedProductWeigth={setSelectedProductWeigth}
              />
            </div>
            <MobilePage
              filteredData={filteredData}
              canEdit={canEdit}
              profile={profile}
              isDesignManager={isDesignManager}
              isSuperAdmin={isSuperAdmin}
              canDelete={canDelete}
              askDelete={askDelete}
              openEdit={openEdit}
              setOpenForm={setOpenForm}
              setSelectedProductWeigth={setSelectedProductWeigth}
            />
          </div>
        )}
      </div>

      <CreateProductWeightStandard
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
      />
      <EditProductionWeightStandard
      
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        selectedProductWeigth={selectedProductWeigth}
        setSelectedProductWeigth={setSelectedProductWeigth}
      />
      <DeleteProductionWeight
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        selectedProductWeigth={selectedProductWeigth}
      />
      <FormProductionWeightStandard
        openForm={openForm}
        setOpenForm={setOpenForm}
        selectedProductWeigth={selectedProductWeigth}
        setSelectedProductWeigth={setSelectedProductWeigth}
      />
    </div>
  );
}

export default ProductWeightStandardForm;
