import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import logo from '../../../../assets/images/logo.png';
import close from '../../../../assets/images/close.png';
import { toShamsi } from '../../../../Time/date';
import { useGetMenu } from '../../../../hooks/menu/menuApi';
import { findMenu } from '../../../../utils/rbac';
import {
  useGetImageSign,
  useGetPermissionSignature,
} from '../../../../hooks/user/userApi';
import { useGetProfile } from '../../../../hooks/profile/profile';
import { useGetSignatureId } from '../../../../hooks/Signature/Signature';
import {
  useCreateSignProducer,
  useCreateSignSupervisor,
} from '../../Api/earthWell/earthWell';
import { useGetCompanyLogo } from '../../../../hooks/company/companiApi';
import { MENU_URL } from '../../../../permission/menuKeys';
import { useSignatureAccess } from '../../../../hooks/userSignatureAccess';
import { LuPencil } from 'react-icons/lu';
import { IoCloseSharp } from 'react-icons/io5';

function FormEarthWell({ openForm, setOpenForm, selectedEarthWell }) {
  const { userInfo } = useSelector((state) => state.auth);

  const [openCode, setOpenCode] = useState(false);
  const [password, setPassword] = useState('');
  const [signatureType, setSignatureType] = useState(null);

  const handleOpenSignatureModal = (type) => {
    setSignatureType(type);
    setOpenCode(true);
  };
  const closeHandler = () => {
    setOpenForm(false);
  };
  // --------------------------------------------------------
  // Logo
  const { data: companyLogo } = useGetCompanyLogo(
    selectedEarthWell?.companyId,
    openForm && !!selectedEarthWell?.companyId
  );

  const logoSrc =
    companyLogo?.success && companyLogo?.imageBase64
      ? `data:${companyLogo.contentType};base64,${companyLogo.imageBase64}`
      : logo;
  // --------------------------------------------------------
  // Sign
  const { canSign } = useSignatureAccess(MENU_URL.VISIT_EARTH_WELL);
  const canSignExecutor = canSign('executor');
  const canSignSuperVisor = canSign('pm-supervisor');

  const { data: signExecutor } = useGetImageSign(
    selectedEarthWell?.executorSignedByUserId
  );
  const { data: signSupervisor } = useGetImageSign(
    selectedEarthWell?.pmSupervisorSignedByUserId
  );

  const executorSignature = signExecutor?.data?.signatureImageBase64;
  const supervisorSignature = signSupervisor?.data?.signatureImageBase64;

  const createSignProducer = useCreateSignProducer();
  const createSignSupervisor = useCreateSignSupervisor();

  const handleSubmitSign = () => {
    if (signatureType === 'executor') {
      createSignProducer.mutate(
        {
          id: selectedEarthWell?.id,
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
    if (signatureType === 'pm-supervisor') {
      createSignSupervisor.mutate(
        {
          id: selectedEarthWell?.id,
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
        className={`relative transform rounded-[15px] bg-white p-6 text-white shadow-2xl transition-all duration-300 ${
          openForm
            ? 'translate-y-0 scale-110 opacity-100 max-2xl:scale-70 max-md:scale-58 print:scale-97 '
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="h-[749px] w-[560px] bg-white text-black print:scale-87">
          <div className="grid grid-cols-4">
            <div className="flex items-center justify-center border">
              <img
                src={logoSrc}
                alt="logo"
                className="h-12 w-22 object-contain"
              />
            </div>
            <div className="col-span-2 flex items-center justify-center border-t border-b border-l">
              <h1 className="font-[SamimBold] text-[14px]">
                بازدید ماهیانه چاه های ارت
              </h1>
            </div>
            <div className="flex flex-col justify-center border-t border-b border-l pr-2 text-[11px]">
              <p className="space-x-1">
                <span className="font-[SamimBold]">کد سند :</span>
                <span className="font-[AvenirLTProHeavy]">F1105</span>
              </p>
              <p className="space-x-1">
                <span className="font-[SamimBold]">شماره ویرایش :</span>
                <span className="font-[AvenirLTProHeavy]">00</span>
              </p>
              <p className="space-x-1">
                <span className="font-[SamimBold]">تاریخ ویرایش :</span>
                <span className="font-[AvenirLTProHeavy]">1401/05/01</span>
              </p>
            </div>
          </div>
          <div className="my-1 flex items-center justify-around">
            <p className="flex items-center justify-center space-x-1 text-[10px]">
              <span>تاریخ :</span>
              <span className="font-[AvenirLTProMedium]">
                {toShamsi(selectedEarthWell?.inspectionDate)}
              </span>
            </p>
            <p className="flex items-center justify-center space-x-1 text-[10px]">
              <span>شماره :</span>
              <span className="font-[AvenirLTProMedium]">
                {selectedEarthWell?.inspectionNumber}
              </span>
            </p>
          </div>
          <div className="border-l">
            <table className="w-full">
              <thead className="border-t border-b">
                <tr className="bg-gray-300 text-[12px]">
                  <th className="w-8 border-r border-l">شماره چاه</th>
                  <th className="w-45 border-l">محل</th>
                  <th className="w-10 border-l">نتیجه</th>
                  <th className="">توضیحات</th>
                </tr>
              </thead>
              <tbody>
                {selectedEarthWell?.items?.map((e, index) => (
                  <tr key={index} className="h-[42px]">
                    <td className="border-r border-b border-l text-center font-[AvenirLTProMedium] text-[12px]">
                      {e?.wellNumber}
                    </td>
                    <td className="border-b border-l px-0.5 py-2 text-center text-[10px] font-bold">
                      {e?.wellLocation}
                    </td>
                    <td className="border-b border-l text-center text-[13px] font-bold">
                      {e?.inspectionResult === true ? 'OK' : 'N.OK'}
                    </td>
                    <td className="border-b text-center text-[10.5px] font-bold">
                      {e?.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 grid grid-cols-2 justify-center gap-5 text-center">
            <div
              className={`relative flex h-20 cursor-progress flex-col items-center justify-center space-y-2 rounded-xl border border-black/30 ${selectedEarthWell?.isExecutorSigned ? 'border-green-500/15 bg-green-500/8 transition-all delay-150 duration-200 hover:bg-green-500/12' : 'bg-black/5 transition-all delay-100 duration-150 hover:bg-black/10'}`}
            >
              <p className="space-x-1 text-xs">
                <span>امضاء مجری :</span>
                <span className="font-[Vazirmatn] font-semibold">
                  {selectedEarthWell?.executorSignedByFullName}
                </span>
              </p>
              <p>
                {executorSignature ? (
                  <img
                    src={`data:image/png;base64,${executorSignature}`}
                    alt="signature"
                    className="absolute right-1/3 bottom-0 h-20 object-contain"
                  />
                ) : canSignExecutor && !selectedEarthWell?.isExecutorSigned ? (
                  <button
                    onClick={() => handleOpenSignatureModal('executor')}
                    className="flex cursor-pointer items-center space-x-2 rounded-xl border-r-6 border-r-red-500 bg-black/85 px-4 py-2 text-sm text-white transition-all delay-150 duration-200 hover:-translate-y-0.5 hover:bg-black"
                  >
                    <span>ثبت امضاء</span>
                    <LuPencil />
                  </button>
                ) : null}
              </p>
            </div>
            <div
              className={`relative flex h-20 cursor-progress flex-col items-center justify-center space-y-2 rounded-xl border border-black/30 ${selectedEarthWell?.isPMSupervisorSigned ? 'border-green-500/15 bg-green-500/8 transition-all delay-150 duration-200 hover:bg-green-500/12' : 'bg-black/5 transition-all delay-100 duration-150 hover:bg-black/10'}`}
            >
              <p className="text-xs">
                <span>امضاء سرپرست P.M :</span>
                <span className="font-[Vazirmatn] font-semibold">
                  {selectedEarthWell?.pmSupervisorSignedByFullName}
                </span>
              </p>
              <p>
                {supervisorSignature ? (
                  <img
                    src={`data:image/png;base64,${supervisorSignature}`}
                    alt="signature"
                    className="absolute bottom-0 left-1/3 h-20 object-contain"
                  />
                ) : canSignSuperVisor &&
                  !selectedEarthWell?.isPMSupervisorSigned ? (
                  <button
                    onClick={() => handleOpenSignatureModal('pm-supervisor')}
                    className="flex cursor-pointer items-center space-x-2 rounded-xl border-r-6 border-r-red-500 bg-black/85 px-4 py-2 text-sm text-white transition-all delay-150 duration-200 hover:-translate-y-0.5 hover:bg-black"
                  >
                    <span>ثبت امضاء</span>
                    <LuPencil />
                  </button>
                ) : null}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-0 z-50 flex h-screen items-center justify-center overflow-auto p-4 transition-opacity duration-300 ${
          openCode
            ? 'pointer-events-auto opacity-100 '
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          onClick={() => {
            setOpenCode(false);
          }}
        />
        <div
          className={`no-scrollbar relative flex max-h-[90vh] transform flex-col overflow-auto rounded-[15px] bg-linear-to-b from-[#1c1c1c] to-[#0c0c0c] px-6 py-4 text-white shadow-2xl transition-all duration-300 ${
            openCode
              ? ' translate-y-0 scale-100 opacity-100'
              : '-translate-y-10 scale-0 opacity-0'
          }`}
        >
          <div className="flex items-center justify-between pb-5">
            <h1>کد امضاء</h1>
            <p
              onClick={() => {
                setOpenCode(false);
              }}
              className="5xl:size-12 5xl:text-[35px] flex size-7 cursor-pointer items-center justify-center rounded-lg text-[16px] text-white/50 transition-all delay-75 duration-100 hover:bg-white/10 hover:text-white"
            >
              <span>
                <IoCloseSharp />
              </span>
            </p>
          </div>
          <input
            type="text"
            autoComplete="off"
            placeholder="ثبت کدامضاء"
            name="signaturePassword"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="m-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
          />
          <div className="flex items-center justify-end">
            <button
              onClick={handleSubmitSign}
              className={`cursor-pointer rounded-xl bg-orange-700/95 px-5 py-3 font-[Vazirmatn] text-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50 ${password === '' ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              تایید
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormEarthWell;
