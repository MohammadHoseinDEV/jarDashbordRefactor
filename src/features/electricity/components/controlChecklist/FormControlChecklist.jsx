import React, { useEffect, useState } from 'react';

import logo from '../../../../assets/images/logo.png';
import close from '../../../../assets/images/close.png';

import { toShamsi } from '../../../../Time/date';
import {
  useCreateSignProducerControlChecklist,
  useCreateSignSupervisorControlChecklist,
} from '../../Api/controlChecklist/controlChecklist';
import { useSelector } from 'react-redux';
import { useGetMenu } from '../../../../hooks/menu/menuApi';
import { findMenu } from '../../../../utils/rbac';
import {
  useGetImageSign,
  useGetPermissionSignature,
} from '../../../../hooks/user/userApi';
import { useGetProfile } from '../../../../hooks/profile/profile';
import { useGetSignatureId } from '../../../../hooks/Signature/Signature';
import { useSignatureAccess } from '../../../../hooks/userSignatureAccess';
import { MENU_URL } from '../../../../permission/menuKeys';
import { useGetCompanyLogo } from '../../../../hooks/company/companiApi';
import { LuPencil } from 'react-icons/lu';
import { IoCloseSharp } from 'react-icons/io5';

function FormControlChecklist({
  openForm,
  setOpenForm,
  selectedControlChecklist,
}) {
  const { userInfo } = useSelector((state) => state.auth);
  const [openCode, setOpenCode] = useState(false);
  const [password, setPassword] = useState('');
  const [signatureType, setSignatureType] = useState(null);

  const handleOpenSignatureModal = (type) => {
    setSignatureType(type);
    setOpenCode(true);
  };
  const shiftLabel = {
    2: 'روز کاری اول',
    4: 'روز کاری دوم',
    6: 'شب کاری اول',
    8: 'شب کاری دوم',
  };

  const closeHandler = () => {
    setOpenForm(false);
  };

  // --------------------------------------------------------
  // Logo
  const { data: companyLogo } = useGetCompanyLogo(
    selectedControlChecklist?.companyId,
    openForm && !!selectedControlChecklist?.companyId
  );

  const logoSrc =
    companyLogo?.success && companyLogo?.imageBase64
      ? `data:${companyLogo.contentType};base64,${companyLogo.imageBase64}`
      : logo;
  // --------------------------------------------------------

  const { canSign } = useSignatureAccess(MENU_URL.CONTROL_CHECKLIST_REPORT);
  const canSignExecutor = canSign('executor');
  const canSignSuperVisor = canSign('supervisor');

  const { data: signExecutor } = useGetImageSign(
    selectedControlChecklist?.executorSignedByUserId
  );
  const { data: signSupervisor } = useGetImageSign(
    selectedControlChecklist?.supervisorSignedByUserId
  );

  const executorSignature = signExecutor?.data?.signatureImageBase64;
  const supervisorSignature = signSupervisor?.data?.signatureImageBase64;

  const createSignProducer = useCreateSignProducerControlChecklist();
  const createSignSupervisor = useCreateSignSupervisorControlChecklist();

  const handleSubmitSign = () => {
    if (signatureType === 'executor') {
      createSignProducer.mutate(
        {
          id: selectedControlChecklist?.id,
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
    if (signatureType === 'supervisor') {
      createSignSupervisor.mutate(
        {
          id: selectedControlChecklist?.id,
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
        className={`relative transform rounded-[15px] bg-white p-2 text-white shadow-2xl transition-all duration-300 print:shadow-none ${
          openForm
            ? 'translate-y-0 scale-110 opacity-100 max-2xl:scale-70 max-md:scale-60 print:scale-120 '
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div
          className="border bg-white text-black"
          style={{ width: '148mm', minHeight: '205mm' }}
        >
          {/* Header */}
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
                چک لیست کنترل اتاق های پست،توزیع و فرمان
              </h1>
            </div>
            <div className="flex flex-col justify-center border-t border-b border-l pr-2 text-[11px]">
              <p className="space-x-1">
                <span className="font-[SamimBold]">کد سند :</span>
                <span className="font-[AvenirLTProHeavy]">F1104</span>
              </p>
              <p className="space-x-1">
                <span className="font-[SamimBold]">شماره ویرایش :</span>
                <span className="font-[AvenirLTProHeavy]">03</span>
              </p>
              <p className="space-x-1">
                <span className="font-[SamimBold]">تاریخ ویرایش :</span>
                <span className="font-[AvenirLTProHeavy]">1403/10/02</span>
              </p>
            </div>
          </div>
          {/* Date-ReportNumber-Shift */}
          <div className="mt-3 flex items-center justify-around border text-[12px]">
            <p className="flex items-center justify-center space-x-1 text-[10px]">
              <span>تاریخ :</span>
              <span className="font-[AvenirLTProMedium]">
                {toShamsi(selectedControlChecklist?.checklistDate)}
              </span>
            </p>
            <p className="flex items-center justify-center space-x-1 text-[10px]">
              <span>شماره :</span>
              <span className="font-[AvenirLTProHeavy]">
                {selectedControlChecklist?.checklistNumber}
              </span>
            </p>
            <p className="flex items-center justify-center space-x-1 text-[10px]">
              <span>شیفت :</span>
              <span className="flex items-center justify-center font-semibold">
                {`${selectedControlChecklist?.shiftName} _ ${shiftLabel[selectedControlChecklist?.shiftFlags]}`}
              </span>
            </p>
          </div>
          <div className="border-r border-l">
            <table className="w-full">
              <thead className="border-b">
                <tr className="bg-gray-300 text-[12px]">
                  <th className="w-8 border-l">ردیف</th>
                  <th className="w-50 border-l">نام تجهیز</th>
                  <th className="w-27 border-l">محل قرارگیری</th>
                  <th className="w-8 border-l">دما</th>
                  <th className="w-8 border-l">آمپر</th>
                  <th className="w-17 border-l">بازدید ظاهری</th>
                  <th>Set Point</th>
                </tr>
              </thead>
              <tbody>
                {selectedControlChecklist?.items?.map((c, index) => (
                  <tr key={index}>
                    <td className="border-b border-l text-center font-[AvenirLTProMedium] text-[12px]">
                      {index + 1}
                    </td>
                    <td className="border-b border-l text-center text-[10.5px] font-bold">
                      {c?.equipmentName}
                    </td>
                    <td className="border-b border-l text-center text-[10px] font-bold">
                      {c?.location}
                    </td>
                    <td className="border-b border-l text-center font-[AvenirLTProMedium] text-[10px] font-bold">
                      {c?.temperature}
                    </td>
                    <td className="border-b border-l text-center font-[AvenirLTProMedium] text-[10px] font-bold">
                      {c?.ampere}
                    </td>
                    <td className="border-b border-l text-center font-[AvenirLTProMedium] text-[10px] font-bold">
                      {c?.visualInspection}
                    </td>
                    <td className="border-b text-center font-[AvenirLTProMedium] text-[10px] font-bold">
                      {c?.setpoint}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="h-10 px-1">
              <p className="text-[12px] font-bold">توضیحات :</p>
              <p className="font-[VazirLight] text-[11px]">
                {selectedControlChecklist?.description}
              </p>
            </div>
            {/* <div className="flex justify-around pt-2">
              <div className="flex items-center space-x-1">
                <p className="text-[12px]">امضاء مجری :</p>
                <p>
                  {selectedSignProducer ? (
                    <img
                      src={`data:image/png;base64,${selectedSignProducer}`}
                      alt="signature"
                      className="fixed right-45 bottom-6 h-15 w-30"
                    />
                  ) : canSignProducer ? (
                    <button
                      onClick={() => handleOpenSignatureModal('producer')}
                      className="mr-3 cursor-pointer rounded-[10px] bg-linear-to-br from-cyan-400 to-black/10 p-2 transition-all delay-75 duration-100 ease-in-out hover:scale-110"
                    >
                      ثبت امضاء
                    </button>
                  ) : (
                    <span className="rounded-[10px] bg-red-500 p-1 text-[10px]">
                      عدم دسترسی
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <p className="text-[12px]">امضاء سرپرست :</p>
                <p>
                  {selectedSignSupervisor ? (
                    <img
                      src={`data:image/png;base64,${selectedSignSupervisor}`}
                      alt="signature"
                      width={100}
                      className="fixed bottom-6 left-10"
                    />
                  ) : canSignSupervisor ? (
                    <button
                      onClick={() => handleOpenSignatureModal('supervisor')}
                      className="mr-3 cursor-pointer rounded-[10px] bg-linear-to-br from-cyan-400 to-black/10 p-2 transition-all delay-75 duration-100 ease-in-out hover:scale-110"
                    >
                      ثبت امضاء
                    </button>
                  ) : (
                    <span className="rounded-[10px] bg-red-500 p-1 text-[10px]">
                      عدم دسترسی
                    </span>
                  )}
                </p>
              </div>
            </div> */}
            <div className="mt-5 grid grid-cols-2 justify-center gap-5 text-center">
              <div
                className={`relative flex h-20 cursor-progress flex-col items-center justify-center space-y-2 rounded-xl border border-black/30 print:border-none ${selectedControlChecklist?.isExecutorSigned ? 'border-green-500/15 bg-green-500/8 transition-all delay-150 duration-200 hover:bg-green-500/12' : 'bg-black/5 transition-all delay-100 duration-150 hover:bg-black/10'}`}
              >
                <p className="space-x-1 text-xs">
                  <span>نام و امضاء تهیه کننده :</span>
                  <span className="font-[Vazirmatn] font-semibold">
                    {selectedControlChecklist?.executorSignedByFullName}
                  </span>
                </p>
                <p>
                  {executorSignature ? (
                    <img
                      src={`data:image/png;base64,${executorSignature}`}
                      alt="signature"
                      className="absolute right-1/3 bottom-0 h-20 object-contain"
                    />
                  ) : canSignExecutor &&
                    !selectedControlChecklist?.isExecutorSigned ? (
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
                className={`relative flex h-20 cursor-progress flex-col items-center justify-center space-y-2 rounded-xl border border-black/30 print:border-none ${selectedControlChecklist?.isSupervisorSigned ? 'border-green-500/15 bg-green-500/8 transition-all delay-150 duration-200 hover:bg-green-500/12' : 'bg-black/5 transition-all delay-100 duration-150 hover:bg-black/10'}`}
              >
                <p className="text-xs">
                  <span>نام و امضاء تایید کننده :</span>
                  <span className="font-[Vazirmatn] font-semibold">
                    {selectedControlChecklist?.supervisorSignedByFullName}
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
                    !selectedControlChecklist?.isSupervisorSigned ? (
                    <button
                      onClick={() => handleOpenSignatureModal('supervisor')}
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
      </div>
      {/* Code */}
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
            placeholder="ثبت کدامضاء"
            autoComplete="off"
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

export default FormControlChecklist;
