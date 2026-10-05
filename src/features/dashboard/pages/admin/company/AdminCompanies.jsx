import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { usePermission } from '../../../../../permission/usePermission';
import { MENU_URL } from '../../../../../permission/menuKeys';
import { useGetCompanies } from '../../../../../hooks/company/companiApi';
import HeaderCompanyPage from '../../../components/company/template/HeaderCompanyPage';
import { useGetFullAccess } from '../../../../../hooks/auth/authApi';
import { HashLoader } from 'react-spinners';
import CompanyTable from '../../../components/company/template/CompanyTable';
import CompanyMobilePage from '../../../components/company/template/CompanyMobilePage';
import { useGetDepartment } from '../../../../../hooks/depratment/department';
import CompanyForm from '../../../components/company/module/CompanyForm';
import CompanyDelete from '../../../components/company/module/CompanyDelete';

function AdminCompanies() {
  const { token, menus: userMenus } = useSelector((state) => state.auth);

  const [search, setSearch] = useState('');
  const [departmentId, setdepartmentId] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [openFilterMobile, setOpenFilterMobile] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const { canCreate, canEdit, canDelete, guardCreate, guardEdit, guardDelete } =
    usePermission(MENU_URL.ADMIN_COMPANY, 'کمپانی');

  const openCreate = guardCreate(() => {
    setIsModalOpen(true);
  });

  const openEdit = guardEdit((com) => {
    setSelectedCompany(com);
    setIsModalOpen(true);
  });

  const openDelete = guardDelete((com) => {
    setSelectedCompany(com);
    setIsDeleteModalOpen(true);
  });

  const {
    data: company,
    isLoading,
    isError,
  } = useGetCompanies({ search, page, pageSize, departmentId });

  const { data: access } = useGetFullAccess();

  const totalpage = company?.totalPages ?? 1;
  const totalCount = company?.totalCount;

  const { data: dep } = useGetDepartment();

  const { data: userPermission } = useGetFullAccess();

  const filterglobalAccess = userPermission?.isGlobalAccess === true;

  return (
    <div className="h-screen overflow-hidden rounded-[15px] bg-[#0F090C]/30 text-white">
      <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-black/70">
        <HeaderCompanyPage
          openCreate={openCreate}
          canCreate={canCreate}
          search={search}
          setSearch={setSearch}
          departmentId={departmentId}
          setdepartmentId={setdepartmentId}
          totalCount={totalCount}
          company={company}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          openFilterMobile={openFilterMobile}
          setOpenFilterMobile={setOpenFilterMobile}
          dep={dep}
          filterglobalAccess={filterglobalAccess}
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
              <CompanyTable
                company={company}
                selectedCompany={selectedCompany}
                setSelectedCompany={setSelectedCompany}
                canEdit={canEdit}
                openEdit={openEdit}
                canDelete={canDelete}
                openDelete={openDelete}
                search={search}
              />
            </div>
            <CompanyMobilePage
              company={company}
              selectedCompany={selectedCompany}
              setSelectedCompany={setSelectedCompany}
              canEdit={canEdit}
              openEdit={openEdit}
              canDelete={canDelete}
              openDelete={openDelete}
              dep={dep}
            />
          </div>
        )}
      </div>
      <CompanyForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
      />
      <CompanyDelete
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
      />
    </div>
  );
}

export default AdminCompanies;
