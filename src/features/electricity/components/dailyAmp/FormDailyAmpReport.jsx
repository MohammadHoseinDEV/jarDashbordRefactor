import React, { useEffect, useState } from 'react';

import logo from '../../../../assets/images/logo.png';
import close from '../../../../assets/images/close.png';

import { FiCheck } from 'react-icons/fi';
import { toShamsi } from '../../../../Time/date';
import { useGetMenu } from '../../../../hooks/menu/menuApi';
import { findMenu } from '../../../../utils/rbac';
import {
  useGetImageSign,
  useGetPermissionSignature,
} from '../../../../hooks/user/userApi';
import { useSelector } from 'react-redux';
import { useGetSignatureId } from '../../../../hooks/Signature/Signature';
import { useGetProfile } from '../../../../hooks/profile/profile';
import {
  useRegistrationSignProducerDailyAmpReport,
  useRegistrationSignSupervisorDailyAmp,
} from '../../Api/dailyAmp/dailyAmp';
import { useSignatureAccess } from '../../../../hooks/userSignatureAccess';
import { MENU_URL } from '../../../../permission/menuKeys';
import { LuPencil } from 'react-icons/lu';
import { IoCloseSharp } from 'react-icons/io5';
import { useGetCompanyLogo } from '../../../../hooks/company/companiApi';

function FormDailyAmpReport({ openForm, setOpenForm, selectedDailyAmp }) {
  const { userInfo } = useSelector((state) => state.auth);

  const [openCode, setOpenCode] = useState(false);
  const [password, setPassword] = useState('');
  const [signatureType, setSignatureType] = useState(null);

  // --------------------------------------------------------
  // Logo
  const { data: companyLogo } = useGetCompanyLogo(
    selectedDailyAmp?.companyId,
    openForm && !!selectedDailyAmp?.companyId
  );

  const logoSrc =
    companyLogo?.success && companyLogo?.imageBase64
      ? `data:${companyLogo.contentType};base64,${companyLogo.imageBase64}`
      : logo;
  // --------------------------------------------------------

  const { canSign } = useSignatureAccess(MENU_URL.DAILY_AMP_REPORT);

  const canSignExecutor = canSign('shift-supervisor');
  const canSignSuperVisor = canSign('supervisor');

  const { data: signExecutor } = useGetImageSign(
    selectedDailyAmp?.shiftSupervisorSignedByUserId
  );
  const { data: signSupervisor } = useGetImageSign(
    selectedDailyAmp?.supervisorSignedByUserId
  );

  const executorSignature = signExecutor?.data?.signatureImageBase64;
  const supervisorSignature = signSupervisor?.data?.signatureImageBase64;

  const createSignExecutor = useRegistrationSignProducerDailyAmpReport();
  const createSignSupervisor = useRegistrationSignSupervisorDailyAmp();

  const handleOpenSignatureModal = (type) => {
    setSignatureType(type);
    setOpenCode(true);
  };
  const closeHandler = () => {
    setOpenForm(false);
  };
  // ---------------------------------------------------------------------

  const handleSubmitSign = () => {
    if (signatureType === 'shift-supervisor') {
      createSignExecutor.mutate(
        {
          id: selectedDailyAmp?.id,
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
          id: selectedDailyAmp?.id,
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
        className={`relative transform rounded-[15px] border border-black bg-white p-6 text-white shadow-2xl transition-all duration-300 print:rotate-0${
          openForm
            ? 'translate-y-0 scale-130 opacity-100 max-2xl:scale-95 max-md:scale-60 max-sm:rotate-90 print:mb-3 print:scale-90 print:shadow-none '
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div
          className="bg-white text-black"
          style={{ width: '205mm', minHeight: '148mm' }}
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
              <h1 className="font-[SamimBold] text-[20px]">
                جدول گزارش آمپرگیری
              </h1>
            </div>
            
            <div className="flex flex-col justify-center border-t border-b border-l pr-2 text-[11px]">
              <p className="space-x-1">
                <span className="font-[SamimBold]">کد سند :</span>
                <span className="font-[AvenirLTProHeavy]">F1103</span>
              </p>
              <p className="space-x-1">
                <span className="font-[SamimBold]">شماره ویرایش :</span>
                <span className="font-[AvenirLTProHeavy]">01</span>
              </p>
              <p className="space-x-1">
                <span className="font-[SamimBold]">تاریخ ویرایش :</span>
                <span className="font-[AvenirLTProHeavy]">1402/11/15</span>
              </p>
            </div>
          </div>
          {/* Daily-Weekly-15 days */}
          <div className="my-1 flex items-center justify-center space-x-10 text-[10px]">
            <div className="flex space-x-2">
              <p>روزانه</p>
              <p className="flex size-4 items-center justify-center rounded-full border-2 bg-white text-[13px] text-black">
                <FiCheck />
              </p>
            </div>
            <div className="flex space-x-2">
              <p>هفتگی</p>
              <p className="flex size-4 items-center justify-center rounded-full border-2 bg-white text-black"></p>
            </div>
            <div className="flex space-x-2">
              <p>پانزده روزه</p>
              <p className="flex size-4 items-center justify-center rounded-full border-2 bg-white text-black"></p>
            </div>
          </div>
          {/* Date-ReportNumber-Shift */}
          <div className="flex items-center justify-around border py-0.5 text-[15px]">
            <div className="flex items-center justify-center space-x-1 text-[10px]">
              <p>تاریخ :</p>
              <p className="font-[AvenirLTProMedium]">
                {toShamsi(selectedDailyAmp?.reportDate)}
              </p>
            </div>
            <div className="flex items-center justify-center space-x-1 text-[10px]">
              <p>شماره :</p>
              <p className="font-[AvenirLTProHeavy]">
                {selectedDailyAmp?.reportNumber}
              </p>
            </div>
            <div className="flex items-center justify-center space-x-1 text-[10px]">
              <p>نام شیفت :</p>
              <p className="font-semibold">{selectedDailyAmp?.shiftName}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 border-b text-center">
            <div className="flex items-center border-l bg-gray-300 text-center font-bold">
              <p className="w-10 border-r border-l text-[12px]">ردیف</p>
              <p className="w-[169px] border-l text-[12px]">نام دستگاه</p>
              <p className="w-[55px] border-l text-[12px]">فرکانس</p>
              <p className="w-[31px] border-l text-[12px]">توان</p>
              <p className="w-[30px] border-l text-[12px]">T</p>
              <p className="w-[30px] border-l text-[12px]">S</p>
              <p className="w-[30px] text-[12px]">R</p>
            </div>
            <div className="flex items-center bg-gray-300 text-center font-bold">
              <p className="w-[39px] border-r border-l text-[12px]">ردیف</p>
              <p className="w-[170px] border-l text-[12px]">نام دستگاه</p>
              <p className="w-[55px] border-l text-[12px]">فرکانس</p>
              <p className="w-[30px] border-l text-[12px]">توان</p>
              <p className="w-[30px] border-l text-[12px]">T</p>
              <p className="w-[30px] border-l text-[12px]">S</p>
              <p className="w-[33px] border-l text-[12px]">R</p>
            </div>
          </div>
          <div className="grid grid-cols-2">
            {selectedDailyAmp?.items?.map((d, index) => (
              <div key={d.id} className="h-5">
                <div className="flex border-r border-b border-l">
                  <p className="flex w-[39px] items-center justify-center border-l pt-1 font-[AvenirLTProMedium] text-[10px]">
                    {index + 1}
                  </p>
                  <p className="flex w-[170px] items-center border-l pr-1 text-[10px]">
                    {d?.deviceName}
                  </p>
                  <p className="flex w-[55px] items-center justify-center border-l text-center font-[AvenirLTProMedium] text-[10px]">
                    {d?.frequency}
                  </p>
                  <p className="flex w-[31px] items-center justify-center border-l text-center font-[AvenirLTProMedium] text-[10px]">
                    {d?.power}
                  </p>
                  <p className="flex w-[30px] items-center justify-center border-l text-center font-[AvenirLTProMedium] text-[10px]">
                    {d?.r}
                  </p>

                  <p className="flex w-[30px] items-center justify-center border-l text-center font-[AvenirLTProMedium] text-[10px]">
                    {d?.s}
                  </p>
                  <p className="flex w-8 items-center justify-center text-center font-[AvenirLTProMedium] text-[10px]">
                    {d?.t}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 justify-center gap-5 text-center">
            <div
              className={`relative flex h-25 cursor-progress flex-col items-center justify-center space-y-2 rounded-xl border border-black/30 ${selectedDailyAmp?.isShiftSupervisorSigned ? 'border-green-500/15 bg-green-500/8 transition-all delay-150 duration-200 hover:bg-green-500/12' : 'bg-black/5 transition-all delay-100 duration-150 hover:bg-black/10'}`}
            >
              <p className="space-x-1 text-xs">
                <span>نام و امضاء تهیه کننده :</span>
                <span className="font-[Vazirmatn] font-semibold">
                  {selectedDailyAmp?.shiftSupervisorSignedByFullName}
                </span>
              </p>
              <p>
                {executorSignature ? (
                  <img
                    src={`data:image/png;base64,${executorSignature}`}
                    alt="signature"
                    className="absolute right-1/3 bottom-0 h-25 object-contain"
                  />
                ) : canSignExecutor &&
                  !selectedDailyAmp?.isShiftSupervisorSigned ? (
                  <button
                    onClick={() => handleOpenSignatureModal('shift-supervisor')}
                    className="flex cursor-pointer items-center space-x-2 rounded-xl border-r-6 border-r-red-500 bg-black/85 px-4 py-2 text-sm text-white transition-all delay-150 duration-200 hover:-translate-y-0.5 hover:bg-black"
                  >
                    <span>ثبت امضاء</span>
                    <LuPencil />
                  </button>
                ) : null}
              </p>
            </div>
            <div
              className={`relative flex h-25 cursor-progress flex-col items-center justify-center space-y-2 rounded-xl border border-black/30 ${selectedDailyAmp?.isSupervisorSigned ? 'border-green-500/15 bg-green-500/8 transition-all delay-150 duration-200 hover:bg-green-500/12' : 'bg-black/5 transition-all delay-100 duration-150 hover:bg-black/10'}`}
            >
              <p className="text-xs">
                <span>نام و امضاء تایید کننده :</span>
                <span className="font-[Vazirmatn] font-semibold">
                  {selectedDailyAmp?.supervisorSignedByFullName}
                </span>
              </p>
              <p>
                {supervisorSignature ? (
                  <img
                    src={`data:image/png;base64,${supervisorSignature}`}
                    alt="signature"
                    className="absolute bottom-0 left-1/3 h-25 object-contain"
                  />
                ) : canSignSuperVisor &&
                  !selectedDailyAmp?.isSupervisorSigned ? (
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
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
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
          className={`relative w-full transform rounded-[15px] bg-linear-to-b from-[#1c1c1c] to-[#0c0c0c] p-6 text-white shadow-2xl transition-all duration-300 md:w-fit ${
            openCode
              ? 'translate-y-0 scale-100 opacity-100'
              : '-translate-y-10 scale-0 opacity-0'
          }`}
        >
          <div className="flex items-center justify-between pb-5">
            <h1>کد امضاء</h1>
            <span
              onClick={() => {
                setOpenCode(false);
              }}
              className="4xl:text-3xl flex size-7 cursor-pointer items-center justify-center rounded-lg text-[16px] text-white/50 transition-all delay-75 duration-100 hover:bg-white/10 hover:text-white"
            >
              <IoCloseSharp />
            </span>
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
          <button
            onClick={handleSubmitSign}
            className="float-left mt-2 cursor-pointer rounded-xl bg-orange-700/95 px-5 py-3 font-[Vazirmatn] text-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormDailyAmpReport;
