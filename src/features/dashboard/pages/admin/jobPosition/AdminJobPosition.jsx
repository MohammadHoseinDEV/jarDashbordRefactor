import React, { lazy, useState } from 'react';

import { MENU_URL } from '../../../../../permission/menuKeys';
import { usePermission } from '../../../../../permission/usePermission';
import { useJobPositions } from '../../../../../hooks/jobPosition/jobPosition';

import { HashLoader } from 'react-spinners';
import { useGetFullAccess } from '../../../../../hooks/auth/authApi';

const JobPositionHeader = lazy(
  () => import('../../../components/jobPosition/template/JobPositionHeader')
);

const JobPositionForm = lazy(
  () => import('../../../components/jobPosition/module/JobPositionForm')
);
const JobPositionTable = lazy(
  () => import('../../../components/jobPosition/template/JobPositionTable')
);
const JobPositionDelete = lazy(
  () => import('../../../components/jobPosition/module/JobPositionDelete')
);
const JobPositionMobile = lazy(
  () => import('../../../components/jobPosition/template/JobPositionMobile')
);
function AdminJobPosition() {
  const [filter, setFilter] = useState({
    search: '',
    status: 'all',
    page: 1,
    pageSize: 10,
    departmentId: '',
    companyId: '',
  });
  const [modal, setModal] = useState({ open: false, delete: false, job: null });

  const { canCreate, canEdit, canDelete, guardCreate, guardEdit, guardDelete } =
    usePermission(MENU_URL.ADMIN_JOB_POSITION, 'جایگاه شغلی');

  const openCreate = guardCreate(() => {
    setModal({ open: true, delete: false, job: null });
  });

  const openEdit = guardEdit((job) => {
    setModal({ open: true, delete: false, job });
  });

  const openDelete = guardDelete((job) => {
    setModal({ open: false, delete: true, job });
  });

  const closeModal = () => setModal({ open: false, delete: false, job: null });
  const { data: job, isLoading, isError } = useJobPositions(filter);
  const { data: permission } = useGetFullAccess();

  const findDepartment = permission?.departments?.find((d) => d.id)?.id;

  const totalPages = job?.totalPages ?? 1;
  const totalCount = job?.totalCount;

  return (
    <div className="h-screen overflow-hidden rounded-[15px] bg-[#0F090C]/30 text-white">
      <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-black/70">
        <JobPositionHeader
          job={job}
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
              <JobPositionTable
                job={job}
                canEdit={canEdit}
                canDelete={canDelete}
                openEdit={openEdit}
                openDelete={openDelete}
              />
            </div>
            <JobPositionMobile
              job={job}
              canEdit={canEdit}
              canDelete={canDelete}
              openEdit={openEdit}
              openDelete={openDelete}
            />
          </div>
        )}
      </div>
      <JobPositionForm
        isModalOpen={modal.open}
        selectedJob={modal.job}
        onClose={closeModal}
      />
      <JobPositionDelete
        isModalOpen={modal.delete}
        selectedJob={modal.job}
        onClose={closeModal}
      />
    </div>
  );
}

export default AdminJobPosition;
