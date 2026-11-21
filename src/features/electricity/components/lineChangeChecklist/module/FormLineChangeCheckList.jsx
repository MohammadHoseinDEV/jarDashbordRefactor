import React, { useEffect, useState } from 'react';
import FormLineChangeCheckListJsx from '../template/FormLineChangeCheckListJsx';
import { useGetMenu } from '../../../../../hooks/menu/menuApi';
import { findMenu } from '../../../../../utils/rbac';
import {
  useGetImageSign,
  useGetPermissionSignature,
} from '../../../../../hooks/user/userApi';
import { useSelector } from 'react-redux';
import { useGetProfile } from '../../../../../hooks/profile/profile';
import { useGetSignatureId } from '../../../../../hooks/Signature/Signature';
import {
  useCreateSignOperationSupervisor,
  useCreateSignShiftSupervisor,
} from '../../../Api/LineChangeCheckList/lineChangeCheckList';
import { useGetCompanyLogo } from '../../../../../hooks/company/companiApi';

import logo from '../../../../../assets/images/logo.png';
import { useSignatureAccess } from '../../../../../hooks/userSignatureAccess';
import { MENU_URL } from '../../../../../permission/menuKeys';

function FormLineChangeCheckList({
  openForm,
  setOpenForm,
  selectedCheckList,
  setSelectedCheckList,
}) {
  const { userInfo } = useSelector((state) => state.auth);

  const [selectedShiftSupervisor, setSelectedShiftSupervisor] = useState(null);
  const [selectedOperationSupervisor, setSelectedOperationSupervisor] =
    useState(null);
  const [openCode, setOpenCode] = useState(false);
  const [password, setPassword] = useState('');
  const [signatureType, setSignatureType] = useState(null);

  const closeHandler = () => {
    setOpenForm(false);
    setSelectedCheckList(null);
  };

  const handleOpenSignatureModal = (type) => {
    setSignatureType(type);
    setOpenCode(true);
  };

  // --------------------------------------------------------
  // Logo
  const { data: companyLogo } = useGetCompanyLogo(
    selectedCheckList?.companyId,
    openForm && !!selectedCheckList?.companyId
  );

  const logoSrc =
    companyLogo?.success && companyLogo?.imageBase64
      ? `data:${companyLogo.contentType};base64,${companyLogo.imageBase64}`
      : logo;
  // --------------------------------------------------------

  const { canSign } = useSignatureAccess(MENU_URL.LINE_CHANGE_CHECKLIST);

  const canSignExecutor = canSign('shift-supervisor');
  const canSignSuperVisor = canSign('operations-supervisor');

  const { data: signExecutor } = useGetImageSign(
    selectedCheckList?.shiftSupervisorSignedByUserId
  );
  const { data: signSupervisor } = useGetImageSign(
    selectedCheckList?.operationsSupervisorSignedByUserId
  );

  const executorSignature = signExecutor?.data?.signatureImageBase64;
  const supervisorSignature = signSupervisor?.data?.signatureImageBase64;

  const createSignShiftSupervisor = useCreateSignShiftSupervisor();
  const createSignOperationSupervisor = useCreateSignOperationSupervisor();

  const handleSubmitSign = (e) => {
    e.preventDefault();

    if (signatureType === 'shift-supervisor') {
      createSignShiftSupervisor.mutate(
        {
          id: selectedCheckList?.id,
          signaturePassword: password,
        },
        {
          onSuccess: () => {
            setOpenCode(false);
            setOpenForm(false);
          },
        }
      );
    }

    if (signatureType === 'operations-supervisor') {
      createSignOperationSupervisor.mutate(
        {
          id: selectedCheckList?.id,
          signaturePassword: password,
        },
        {
          onSuccess: () => {
            setOpenCode(false);
            setOpenForm(false);
          },
        }
      );
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        openForm
          ? 'pointer-events-auto opacity-100 '
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={closeHandler}
      />
      <div
        className={`relative transform bg-white p-3 text-white shadow-2xl transition-all duration-300 max-md:p-2 max-sm:rotate-90 print:scale-85! print:p-0 ${
          openForm
            ? '5xl:scale-138 translate-y-0 scale-95 opacity-100 max-2xl:scale-78 max-xl:scale-75 max-md:scale-60 print:shadow-none '
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div
          className="border bg-white text-black"
          style={{ width: '297mm', minHeight: '210mm' }}
        >
          <FormLineChangeCheckListJsx
            selectedCheckList={selectedCheckList}
            handleSubmitSign={handleSubmitSign}
            openCode={openCode}
            setOpenCode={setOpenCode}
            setPassword={setPassword}
            handleOpenSignatureModal={handleOpenSignatureModal}
            logoSrc={logoSrc}
            canSignExecutor={canSignExecutor}
            executorSignature={executorSignature}
            canSignSuperVisor={canSignSuperVisor}
            supervisorSignature={supervisorSignature}
          />
        </div>
      </div>
    </div>
  );
}

export default FormLineChangeCheckList;
