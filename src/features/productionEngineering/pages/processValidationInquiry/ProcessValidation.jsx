import React, { lazy, useState } from 'react';
import { usePermission } from '../../../../permission/usePermission';
import { MENU_URL } from '../../../../permission/menuKeys';
import { useGetProcessValidation } from '../../Api/processValidation';
import FormValidation from '../../components/processValidationInquiry/module/FormValidation';

const ProcssValidationHeader = lazy(
  () =>
    import('../../components/processValidationInquiry/template/ProcssValidationHeader')
);

function ProcessValidation() {
  const [filter, setFilter] = useState({
    search: '',
    page: 1,
    pageSize: 10,
    companyId: '',
    isRequesterSigned: true,
    isQCSupervisorSigned: true,
    isFinalProductionSupervisorSigned: true,
  });

  const [modal, setModal] = useState({
    open: false,
    delete: false,
    valid: null,
  });

  const { canCreate, canEdit, canDelete, guardCreate, guardEdit, guardDelete } =
    usePermission(MENU_URL.PROCESS_VALIDATION_INQUERY, 'فرم صحه گذاری');

  const openCreate = guardCreate(() => {
    setModal({ open: true, delete: false, valid: null });
  });

  const openEdit = guardEdit((valid) => {
    setModal({ open: true, delete: false, valid });
  });

  const openDelete = guardDelete((valid) => {
    setModal({ open: false, delete: true, valid });
  });

  const closeModal = () =>
    setModal({ open: false, delete: false, valid: null });

  const { data: process, isLoading, isError } = useGetProcessValidation(filter);

  const totalPages = process?.totalPages ?? 1;
  const totalCount = process?.totalCount ?? 0;

  return (
    <div className="h-screen overflow-hidden rounded-[15px] bg-[#0F090C]/30 text-white">
      <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-black/70">
        <ProcssValidationHeader
          process={process}
          filter={filter}
          setFilter={setFilter}
          canCreate={canCreate}
          openCreate={openCreate}
          totalCount={totalCount}
        />
      </div>
      <FormValidation
        isModalOpen={modal.open}
        selectedValidation={modal.valid}
        onClose={closeModal}
      />
    </div>
  );
}

export default ProcessValidation;
