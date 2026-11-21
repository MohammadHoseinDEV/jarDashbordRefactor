import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetMenu } from '../../../../hooks/menu/menuApi';
import { findMenu } from '../../../../utils/rbac';
import {
  useGetImageSign,
  useGetPermissionSignature,
  useGetUser,
} from '../../../../hooks/user/userApi';
import { useGetSignatureId } from '../../../../hooks/Signature/Signature';
import { useGetProfile } from '../../../../hooks/profile/profile';
import {
  useCreateSignProducer,
  useCreateSignSupervisor,
} from '../../Api/BiWeeklyAmp/biWeeklyAmp';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import logo from '../../../../assets/images/logo.png';
import { FiCheck } from 'react-icons/fi';
import { toShamsi } from '../../../../Time/date';
import { useSignatureAccess } from '../../../../hooks/userSignatureAccess';
import { MENU_URL } from '../../../../permission/menuKeys';
import { LuPencil } from 'react-icons/lu';
import { IoCloseSharp } from 'react-icons/io5';
import { useGetCompanyLogo } from '../../../../hooks/company/companiApi';
function FormBiWeeklyAmp({ openForm, setOpenForm, selectedBiWeeklyAmp }) {
  const { userInfo } = useSelector((state) => state.auth);

  const [page, setPage] = useState(1);
  const [openCode, setOpenCode] = useState(false);
  const [password, setPassword] = useState('');
  const [signatureType, setSignatureType] = useState(null);

  // --------------------------------------------------------
  // Logo
  const { data: companyLogo } = useGetCompanyLogo(
    selectedBiWeeklyAmp?.companyId,
    openForm && !!selectedBiWeeklyAmp?.companyId
  );

  const logoSrc =
    companyLogo?.success && companyLogo?.imageBase64
      ? `data:${companyLogo.contentType};base64,${companyLogo.imageBase64}`
      : logo;
  // --------------------------------------------------------

  const { canSign } = useSignatureAccess(MENU_URL.BIWEEKLY_AMP);

  const canSignExecutor = canSign('executor');
  const canSignSuperVisor = canSign('supervisor');

  const { data: signExecutor } = useGetImageSign(
    selectedBiWeeklyAmp?.executorSignedByUserId
  );
  const { data: signSupervisor } = useGetImageSign(
    selectedBiWeeklyAmp?.supervisorSignedByUserId
  );

  const executorSignature = signExecutor?.data?.signatureImageBase64;
  const supervisorSignature = signSupervisor?.data?.signatureImageBase64;

  // ---------------------------------------------------------------------
  const closeHandler = () => {
    setOpenForm(false);
  };

  const handleOpenSignatureModal = (type) => {
    setSignatureType(type);
    setOpenCode(true);
  };
  // ---------------------------------------------------------------------

  const sliceWeeklyAmpPage1 = selectedBiWeeklyAmp?.items?.slice(0, 36);
  const sliceWeeklyAmpPage2 = selectedBiWeeklyAmp?.items?.slice(36, 72);
  const sliceWeeklyAmpPage3 = selectedBiWeeklyAmp?.items?.slice(72, 108);
  const sliceWeeklyAmpPage4 = selectedBiWeeklyAmp?.items?.slice(108, 144);
  const sliceWeeklyAmpPage5 = selectedBiWeeklyAmp?.items?.slice(144);

  const createSignProducer = useCreateSignProducer();
  const createSignSupervisor = useCreateSignSupervisor();

  const handleSubmitSign = () => {
    if (signatureType === 'executor') {
      createSignProducer.mutate(
        {
          id: selectedBiWeeklyAmp?.id,
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
          id: selectedBiWeeklyAmp?.id,
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
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        openForm
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0 print:pointer-events-auto! print:opacity-100!'
      }`}
    >
      <div className="z-50 print:hidden">
        <button
          onClick={() => {
            setPage(page - 1);
          }}
          disabled={page === 1}
          className={`flex size-10 cursor-pointer items-center justify-center rounded-[10px] bg-blue-300 px-2 py-1 transition-all delay-75 duration-100 hover:scale-110 ${page === 1 && 'cursor-not-allowed opacity-50 '}`}
        >
          <GrLinkNext />
        </button>
      </div>
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px] print:hidden!"
        onClick={() => {
          setOpenForm(false);
        }}
      />
      <div
        className={`relative transform rounded-[15px] bg-white p-3 text-white shadow-2xl transition-all duration-300 ${
          openForm
            ? 'translate-y-0 scale-77 opacity-100 max-2xl:scale-60 max-md:ml-9 max-md:scale-45 print:mx-auto print:scale-105 '
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="perspective-[2000px] print:scale-85">
          <div className={`relative h-[297mm] w-[210mm] border`}>
            {page === 1 && (
              <div className="absolute inset-0 bg-white text-black backface-hidden">
                {/* Header */}
                <div className="grid grid-cols-5 border-t border-r border-l">
                  <div className="flex items-center justify-center border-b border-l">
                    <img
                      src={logoSrc}
                      alt="logo"
                      className="h-12 w-22 object-contain"
                    />
                  </div>
                  <div className="col-span-3 flex items-center justify-center border-b border-l">
                    <h1 className="font-[SamimBold] text-[20px]">
                      فرم گزارش 15 روزه آمپرگیری
                    </h1>
                  </div>
                  <div className="flex flex-col justify-center border-b pr-1">
                    <p className="space-x-1">
                      <span className="font-[SamimBold] text-[13px]">
                        کد سند :
                      </span>
                      <span className="font-[AvenirLTProHeavy] text-[13px]">
                        F1103
                      </span>
                    </p>
                    <p className="space-x-1">
                      <span className="font-[SamimBold] text-[13px]">
                        شماره ویرایش :
                      </span>
                      <span className="font-[AvenirLTProHeavy] text-[13px]">
                        03
                      </span>
                    </p>
                    <p className="space-x-1">
                      <span className="font-[SamimBold] text-[13px]">
                        تاریخ ویرایش :
                      </span>
                      <span className="font-[AvenirLTProHeavy] text-[13px]">
                        1404/05/11
                      </span>
                    </p>
                  </div>
                </div>
                {/* Daily-Weekly-15 days */}
                <div className="my-1 flex items-center justify-center space-x-10 text-[10px]">
                  <div className="flex space-x-2">
                    <p>روزانه</p>
                    <p className="flex size-4 items-center justify-center rounded-full border-2 bg-white text-[13px] text-black"></p>
                  </div>
                  <div className="flex space-x-2">
                    <p>هفتگی</p>
                    <p className="flex size-4 items-center justify-center rounded-full border-2 bg-white text-[13px] text-black"></p>
                  </div>
                  <div className="flex space-x-2">
                    <p>15 روزه</p>
                    <p className="flex size-4 items-center justify-center rounded-full border-2 bg-white text-[13px] text-black">
                      <FiCheck />
                    </p>
                  </div>
                </div>
                {/* Date-ReportNumber-Shift */}
                <div className="flex items-center justify-around border-t border-r border-b border-l py-0.5 text-[13px]">
                  <div className="flex items-center justify-center space-x-1">
                    <p>تاریخ :</p>
                    <p className="font-[AvenirLTProMedium]">
                      {toShamsi(selectedBiWeeklyAmp?.reportDate)}
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <p>شماره :</p>
                    <p className="font-[AvenirLTProHeavy]">
                      {selectedBiWeeklyAmp?.reportNumber}
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <p>نام شیفت :</p>
                    <p className="font-semibold">
                      {selectedBiWeeklyAmp?.shiftName}
                    </p>
                  </div>
                </div>
                {/* Header Table */}
                <div className="grid grid-cols-2 border-r border-l text-center">
                  <div className="grid grid-cols-10 border-l bg-gray-300 font-bold">
                    <p className="border-r border-b border-l text-center text-[12px]">
                      ردیف
                    </p>
                    <p className="col-span-4 border-b border-l text-[12px]">
                      نام دستگاه
                    </p>
                    <p className="flex items-center justify-center border-b border-l text-[12px]">
                      فرکانس
                    </p>
                    <p className="border-b border-l text-[12px]">توان</p>
                    <p className="border-b border-l text-[12px]">T</p>
                    <p className="border-b border-l text-[12px]">S</p>
                    <p className="border-b text-[12px]">R</p>
                  </div>
                  <div className="grid grid-cols-10 bg-gray-300 text-center font-bold">
                    <p className="border-r border-b text-[12px]">ردیف</p>
                    <p className="col-span-4 border-r border-b border-l text-[12px]">
                      نام دستگاه
                    </p>
                    <p className="border-b border-l text-[12px]">فرکانس</p>
                    <p className="border-b border-l text-[12px]">توان</p>
                    <p className="border-b border-l text-[12px]">T</p>
                    <p className="border-b border-l text-[12px]">S</p>
                    <p className="border-b border-l text-[12px]">R</p>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  {sliceWeeklyAmpPage1?.map((a, index) => (
                    <div key={a.id} className="h-[53px]">
                      <div className="grid h-full grid-cols-10 border-r border-b border-l">
                        <p className="flex items-center justify-center border-l font-[AvenirLTProHeavy]">
                          {index + 1}
                        </p>
                        <p className="col-span-4 flex items-center justify-center border-l px-1 text-center font-[SamimBold] text-[14px]">
                          {a.deviceName}
                        </p>
                        <p className="flex items-center justify-center border-l text-center font-[AvenirLTProHeavy]">
                          {a.frequency}
                        </p>
                        <p className="flex items-center justify-center border-l text-center font-[AvenirLTProHeavy]">
                          {a.power}
                        </p>
                        <p className="flex items-center justify-center border-l text-center font-[AvenirLTProHeavy]">
                          {a.t}
                        </p>
                        <p className="flex items-center justify-center border-l text-center font-[AvenirLTProHeavy]">
                          {a.s}
                        </p>
                        <p className="flex items-center justify-center text-center font-[AvenirLTProHeavy]">
                          {a.r}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {page === 2 && (
              <div className="absolute inset-0 bg-white text-black backface-hidden">
                {/* Header */}
                <div className="grid grid-cols-5 border-t border-r border-l">
                  <div className="flex items-center justify-center border-b border-l">
                    <img
                      src={logoSrc}
                      alt="logo"
                      className="h-12 w-22 object-contain"
                    />
                  </div>
                  <div className="col-span-3 flex items-center justify-center border-b border-l">
                    <h1 className="font-[SamimBold] text-[20px]">
                      فرم گزارش 15 روزه آمپرگیری
                    </h1>
                  </div>
                  <div className="flex flex-col justify-center border-b pr-1">
                    <p className="space-x-1">
                      <span className="font-[SamimBold] text-[13px]">
                        کد سند :
                      </span>
                      <span className="font-[AvenirLTProHeavy] text-[13px]">
                        F1103
                      </span>
                    </p>
                    <p className="space-x-1">
                      <span className="font-[SamimBold] text-[13px]">
                        شماره ویرایش :
                      </span>
                      <span className="font-[AvenirLTProHeavy] text-[13px]">
                        03
                      </span>
                    </p>
                    <p className="space-x-1">
                      <span className="font-[SamimBold] text-[13px]">
                        تاریخ ویرایش :
                      </span>
                      <span className="font-[AvenirLTProHeavy] text-[13px]">
                        1404/05/11
                      </span>
                    </p>
                  </div>
                </div>
                {/* Daily-Weekly-15 days */}
                <div className="my-1 flex items-center justify-center space-x-10 text-[10px]">
                  <div className="flex space-x-2">
                    <p>روزانه</p>
                    <p className="flex size-4 items-center justify-center rounded-full border-2 bg-white text-[13px] text-black"></p>
                  </div>
                  <div className="flex space-x-2">
                    <p>هفتگی</p>
                    <p className="flex size-4 items-center justify-center rounded-full border-2 bg-white text-[13px] text-black"></p>
                  </div>
                  <div className="flex space-x-2">
                    <p>15 روزه</p>
                    <p className="flex size-4 items-center justify-center rounded-full border-2 bg-white text-[13px] text-black">
                      <FiCheck />
                    </p>
                  </div>
                </div>
                {/* Date-ReportNumber-Shift */}
                <div className="flex items-center justify-around border py-0.5 text-[13px]">
                  <div className="flex items-center justify-center space-x-1">
                    <p>تاریخ :</p>
                    <p className="font-[AvenirLTProMedium]">
                      {toShamsi(selectedBiWeeklyAmp?.reportDate)}
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <p>شماره :</p>
                    <p className="font-[AvenirLTProHeavy]">
                      {selectedBiWeeklyAmp?.reportNumber}
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <p>نام شیفت :</p>
                    <p className="font-semibold">
                      {selectedBiWeeklyAmp?.shiftName}
                    </p>
                  </div>
                </div>
                {/* Header Table */}
                <div className="grid grid-cols-2 border-r border-l text-center">
                  <div className="grid grid-cols-10 border-l bg-gray-300 font-bold">
                    <p className="border-r border-b border-l text-center text-[12px]">
                      ردیف
                    </p>
                    <p className="col-span-4 border-b border-l text-[12px]">
                      نام دستگاه
                    </p>
                    <p className="flex items-center justify-center border-b border-l text-[12px]">
                      فرکانس
                    </p>
                    <p className="border-b border-l text-[12px]">توان</p>
                    <p className="border-b border-l text-[12px]">T</p>
                    <p className="border-b border-l text-[12px]">S</p>
                    <p className="border-b text-[12px]">R</p>
                  </div>
                  <div className="grid grid-cols-10 bg-gray-300 text-center font-bold">
                    <p className="border-r border-b text-[12px]">ردیف</p>
                    <p className="col-span-4 border-r border-b border-l text-[12px]">
                      نام دستگاه
                    </p>
                    <p className="border-b border-l text-[12px]">فرکانس</p>
                    <p className="border-b border-l text-[12px]">توان</p>
                    <p className="border-b border-l text-[12px]">T</p>
                    <p className="border-b border-l text-[12px]">S</p>
                    <p className="border-b border-l text-[12px]">R</p>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  {sliceWeeklyAmpPage2?.map((a, index) => (
                    <div key={a.id} className="h-[53px]">
                      <div className="grid h-full grid-cols-10 border-r border-b border-l">
                        <p className="flex items-center justify-center border-l font-[AvenirLTProHeavy]">
                          {index + 37}
                        </p>
                        <p className="col-span-4 flex items-center justify-center border-l px-1 text-center font-[SamimBold] text-[14px]">
                          {a.deviceName}
                        </p>
                        <p className="flex items-center justify-center border-l text-center font-[AvenirLTProHeavy]">
                          {a.frequency}
                        </p>
                        <p className="flex items-center justify-center border-l text-center font-[AvenirLTProHeavy]">
                          {a.power}
                        </p>
                        <p className="flex items-center justify-center border-l text-center font-[AvenirLTProHeavy]">
                          {a.t}
                        </p>
                        <p className="flex items-center justify-center border-l text-center font-[AvenirLTProHeavy]">
                          {a.s}
                        </p>
                        <p className="flex items-center justify-center text-center font-[AvenirLTProHeavy]">
                          {a.r}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {page === 3 && (
              <div className="absolute inset-0 bg-white text-black backface-hidden">
                {/* Header */}
                <div className="grid grid-cols-5 border-t border-r border-l">
                  <div className="flex items-center justify-center border-b border-l">
                    <img
                      src={logoSrc}
                      alt="logo"
                      className="h-12 w-22 object-contain"
                    />
                  </div>
                  <div className="col-span-3 flex items-center justify-center border-b border-l">
                    <h1 className="font-[SamimBold] text-[20px]">
                      فرم گزارش 15 روزه آمپرگیری
                    </h1>
                  </div>
                  <div className="flex flex-col justify-center border-b pr-1">
                    <p className="space-x-1">
                      <span className="font-[SamimBold] text-[13px]">
                        کد سند :
                      </span>
                      <span className="font-[AvenirLTProHeavy] text-[13px]">
                        F1103
                      </span>
                    </p>
                    <p className="space-x-1">
                      <span className="font-[SamimBold] text-[13px]">
                        شماره ویرایش :
                      </span>
                      <span className="font-[AvenirLTProHeavy] text-[13px]">
                        03
                      </span>
                    </p>
                    <p className="space-x-1">
                      <span className="font-[SamimBold] text-[13px]">
                        تاریخ ویرایش :
                      </span>
                      <span className="font-[AvenirLTProHeavy] text-[13px]">
                        1404/05/11
                      </span>
                    </p>
                  </div>
                </div>
                {/* Daily-Weekly-15 days */}
                <div className="my-1 flex items-center justify-center space-x-10 text-[10px]">
                  <div className="flex space-x-2">
                    <p>روزانه</p>
                    <p className="flex size-4 items-center justify-center rounded-full border-2 bg-white text-[13px] text-black"></p>
                  </div>
                  <div className="flex space-x-2">
                    <p>هفتگی</p>
                    <p className="flex size-4 items-center justify-center rounded-full border-2 bg-white text-[13px] text-black"></p>
                  </div>
                  <div className="flex space-x-2">
                    <p>15 روزه</p>
                    <p className="flex size-4 items-center justify-center rounded-full border-2 bg-white text-[13px] text-black">
                      <FiCheck />
                    </p>
                  </div>
                </div>
                {/* Date-ReportNumber-Shift */}
                <div className="flex items-center justify-around border py-0.5 text-[13px]">
                  <div className="flex items-center justify-center space-x-1">
                    <p>تاریخ :</p>
                    <p className="font-[AvenirLTProMedium]">
                      {toShamsi(selectedBiWeeklyAmp?.reportDate)}
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <p>شماره :</p>
                    <p className="font-[AvenirLTProHeavy]">
                      {selectedBiWeeklyAmp?.reportNumber}
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <p>نام شیفت :</p>
                    <p className="font-semibold">
                      {selectedBiWeeklyAmp?.shiftName}
                    </p>
                  </div>
                </div>
                {/* Header Table */}
                <div className="grid grid-cols-2 border-r border-l text-center">
                  <div className="grid grid-cols-10 border-l bg-gray-300 font-bold">
                    <p className="border-r border-b border-l text-center text-[12px]">
                      ردیف
                    </p>
                    <p className="col-span-4 border-b border-l text-[12px]">
                      نام دستگاه
                    </p>
                    <p className="flex items-center justify-center border-b border-l text-[12px]">
                      فرکانس
                    </p>
                    <p className="border-b border-l text-[12px]">توان</p>
                    <p className="border-b border-l text-[12px]">T</p>
                    <p className="border-b border-l text-[12px]">S</p>
                    <p className="border-b text-[12px]">R</p>
                  </div>
                  <div className="grid grid-cols-10 bg-gray-300 text-center font-bold">
                    <p className="border-r border-b text-[12px]">ردیف</p>
                    <p className="col-span-4 border-r border-b border-l text-[12px]">
                      نام دستگاه
                    </p>
                    <p className="border-b border-l text-[12px]">فرکانس</p>
                    <p className="border-b border-l text-[12px]">توان</p>
                    <p className="border-b border-l text-[12px]">T</p>
                    <p className="border-b border-l text-[12px]">S</p>
                    <p className="border-b border-l text-[12px]">R</p>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  {sliceWeeklyAmpPage3?.map((a, index) => (
                    <div key={a.id} className="h-[53px]">
                      <div className="grid h-full grid-cols-10 border-r border-b border-l">
                        <p className="flex items-center justify-center border-l font-[AvenirLTProHeavy]">
                          {index + 73}
                        </p>
                        <p className="col-span-4 flex items-center justify-center border-l px-1 text-center font-[SamimBold] text-[14px]">
                          {a.deviceName}
                        </p>
                        <p className="flex items-center justify-center border-l text-center font-[AvenirLTProHeavy]">
                          {a.frequency}
                        </p>
                        <p className="flex items-center justify-center border-l text-center font-[AvenirLTProHeavy]">
                          {a.power}
                        </p>
                        <p className="flex items-center justify-center border-l text-center font-[AvenirLTProHeavy]">
                          {a.t}
                        </p>
                        <p className="flex items-center justify-center border-l text-center font-[AvenirLTProHeavy]">
                          {a.s}
                        </p>
                        <p className="flex items-center justify-center text-center font-[AvenirLTProHeavy]">
                          {a.r}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {page === 4 && (
              <div className="absolute inset-0 bg-white text-black backface-hidden">
                {/* Header */}
                <div className="grid grid-cols-5 border-t border-r border-l">
                  <div className="flex items-center justify-center border-b border-l">
                    <img
                      src={logoSrc}
                      alt="logo"
                      className="h-12 w-22 object-contain"
                    />
                  </div>
                  <div className="col-span-3 flex items-center justify-center border-b border-l">
                    <h1 className="font-[SamimBold] text-[20px]">
                      فرم گزارش 15 روزه آمپرگیری
                    </h1>
                  </div>
                  <div className="flex flex-col justify-center border-b pr-1">
                    <p className="space-x-1">
                      <span className="font-[SamimBold] text-[13px]">
                        کد سند :
                      </span>
                      <span className="font-[AvenirLTProHeavy] text-[13px]">
                        F1103
                      </span>
                    </p>
                    <p className="space-x-1">
                      <span className="font-[SamimBold] text-[13px]">
                        شماره ویرایش :
                      </span>
                      <span className="font-[AvenirLTProHeavy] text-[13px]">
                        03
                      </span>
                    </p>
                    <p className="space-x-1">
                      <span className="font-[SamimBold] text-[13px]">
                        تاریخ ویرایش :
                      </span>
                      <span className="font-[AvenirLTProHeavy] text-[13px]">
                        1404/05/11
                      </span>
                    </p>
                  </div>
                </div>
                {/* Daily-Weekly-15 days */}
                <div className="my-1 flex items-center justify-center space-x-10 text-[10px]">
                  <div className="flex space-x-2">
                    <p>روزانه</p>
                    <p className="flex size-4 items-center justify-center rounded-full border-2 bg-white text-[13px] text-black"></p>
                  </div>
                  <div className="flex space-x-2">
                    <p>هفتگی</p>
                    <p className="flex size-4 items-center justify-center rounded-full border-2 bg-white text-[13px] text-black"></p>
                  </div>
                  <div className="flex space-x-2">
                    <p>15 روزه</p>
                    <p className="flex size-4 items-center justify-center rounded-full border-2 bg-white text-[13px] text-black">
                      <FiCheck />
                    </p>
                  </div>
                </div>
                {/* Date-ReportNumber-Shift */}
                <div className="flex items-center justify-around border py-0.5 text-[13px]">
                  <div className="flex items-center justify-center space-x-1">
                    <p>تاریخ :</p>
                    <p className="font-[AvenirLTProMedium]">
                      {toShamsi(selectedBiWeeklyAmp?.reportDate)}
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <p>شماره :</p>
                    <p className="font-[AvenirLTProHeavy]">
                      {selectedBiWeeklyAmp?.reportNumber}
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <p>نام شیفت :</p>
                    <p className="font-semibold">
                      {selectedBiWeeklyAmp?.shiftName}
                    </p>
                  </div>
                </div>
                {/* Header Table */}
                <div className="grid grid-cols-2 border-r border-l text-center">
                  <div className="grid grid-cols-10 border-l bg-gray-300 font-bold">
                    <p className="border-r border-b border-l text-center text-[12px]">
                      ردیف
                    </p>
                    <p className="col-span-4 border-b border-l text-[12px]">
                      نام دستگاه
                    </p>
                    <p className="flex items-center justify-center border-b border-l text-[12px]">
                      فرکانس
                    </p>
                    <p className="border-b border-l text-[12px]">توان</p>
                    <p className="border-b border-l text-[12px]">T</p>
                    <p className="border-b border-l text-[12px]">S</p>
                    <p className="border-b text-[12px]">R</p>
                  </div>
                  <div className="grid grid-cols-10 bg-gray-300 text-center font-bold">
                    <p className="border-r border-b text-[12px]">ردیف</p>
                    <p className="col-span-4 border-r border-b border-l text-[12px]">
                      نام دستگاه
                    </p>
                    <p className="border-b border-l text-[12px]">فرکانس</p>
                    <p className="border-b border-l text-[12px]">توان</p>
                    <p className="border-b border-l text-[12px]">T</p>
                    <p className="border-b border-l text-[12px]">S</p>
                    <p className="border-b border-l text-[12px]">R</p>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  {sliceWeeklyAmpPage4?.map((a, index) => (
                    <div key={a.id} className="h-[53px]">
                      <div className="grid h-full grid-cols-10 border-r border-b border-l">
                        <p className="flex items-center justify-center border-l font-[AvenirLTProHeavy]">
                          {index + 109}
                        </p>
                        <p className="col-span-4 flex items-center justify-center border-l px-1 text-center font-[SamimBold] text-[14px]">
                          {a.deviceName}
                        </p>
                        <p className="flex items-center justify-center border-l text-center font-[AvenirLTProHeavy]">
                          {a.frequency}
                        </p>
                        <p className="flex items-center justify-center border-l text-center font-[AvenirLTProHeavy]">
                          {a.power}
                        </p>
                        <p className="flex items-center justify-center border-l text-center font-[AvenirLTProHeavy]">
                          {a.t}
                        </p>
                        <p className="flex items-center justify-center border-l text-center font-[AvenirLTProHeavy]">
                          {a.s}
                        </p>
                        <p className="flex items-center justify-center text-center font-[AvenirLTProHeavy]">
                          {a.r}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {page === 5 && (
              <div className="absolute inset-0 bg-white text-black backface-hidden">
                {/* Header */}
                <div className="grid grid-cols-5 border-t border-r border-l">
                  <div className="flex items-center justify-center border-b border-l">
                    <img
                      src={logoSrc}
                      alt="logo"
                      className="h-12 w-22 object-contain"
                    />
                  </div>
                  <div className="col-span-3 flex items-center justify-center border-b border-l">
                    <h1 className="font-[SamimBold] text-[20px]">
                      فرم گزارش 15 روزه آمپرگیری
                    </h1>
                  </div>
                  <div className="flex flex-col justify-center border-b pr-1">
                    <p className="space-x-1">
                      <span className="font-[SamimBold] text-[13px]">
                        کد سند :
                      </span>
                      <span className="font-[AvenirLTProHeavy] text-[13px]">
                        F1103
                      </span>
                    </p>
                    <p className="space-x-1">
                      <span className="font-[SamimBold] text-[13px]">
                        شماره ویرایش :
                      </span>
                      <span className="font-[AvenirLTProHeavy] text-[13px]">
                        03
                      </span>
                    </p>
                    <p className="space-x-1">
                      <span className="font-[SamimBold] text-[13px]">
                        تاریخ ویرایش :
                      </span>
                      <span className="font-[AvenirLTProHeavy] text-[13px]">
                        1404/05/11
                      </span>
                    </p>
                  </div>
                </div>
                {/* Daily-Weekly-15 days */}
                <div className="my-1 flex items-center justify-center space-x-10 text-[10px]">
                  <div className="flex space-x-2">
                    <p>روزانه</p>
                    <p className="flex size-4 items-center justify-center rounded-full border-2 bg-white text-[13px] text-black"></p>
                  </div>
                  <div className="flex space-x-2">
                    <p>هفتگی</p>
                    <p className="flex size-4 items-center justify-center rounded-full border-2 bg-white text-[13px] text-black"></p>
                  </div>
                  <div className="flex space-x-2">
                    <p>15 روزه</p>
                    <p className="flex size-4 items-center justify-center rounded-full border-2 bg-white text-[13px] text-black">
                      <FiCheck />
                    </p>
                  </div>
                </div>
                {/* Date-ReportNumber-Shift */}
                <div className="flex items-center justify-around border py-0.5 text-[13px]">
                  <div className="flex items-center justify-center space-x-1">
                    <p>تاریخ :</p>
                    <p className="font-[AvenirLTProMedium]">
                      {toShamsi(selectedBiWeeklyAmp?.reportDate)}
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <p>شماره :</p>
                    <p className="font-[AvenirLTProHeavy]">
                      {selectedBiWeeklyAmp?.reportNumber}
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <p>نام شیفت :</p>
                    <p className="font-semibold">
                      {selectedBiWeeklyAmp?.shiftName}
                    </p>
                  </div>
                </div>
                {/* Header Table */}
                <div className="grid grid-cols-2 border-r border-l text-center">
                  <div className="grid grid-cols-10 border-l bg-gray-300 font-bold">
                    <p className="border-r border-b border-l text-center text-[12px]">
                      ردیف
                    </p>
                    <p className="col-span-4 border-b border-l text-[12px]">
                      نام دستگاه
                    </p>
                    <p className="flex items-center justify-center border-b border-l text-[12px]">
                      فرکانس
                    </p>
                    <p className="border-b border-l text-[12px]">توان</p>
                    <p className="border-b border-l text-[12px]">T</p>
                    <p className="border-b border-l text-[12px]">S</p>
                    <p className="border-b text-[12px]">R</p>
                  </div>
                  <div className="grid grid-cols-10 bg-gray-300 text-center font-bold">
                    <p className="border-r border-b text-[12px]">ردیف</p>
                    <p className="col-span-4 border-r border-b border-l text-[12px]">
                      نام دستگاه
                    </p>
                    <p className="border-b border-l text-[12px]">فرکانس</p>
                    <p className="border-b border-l text-[12px]">توان</p>
                    <p className="border-b border-l text-[12px]">T</p>
                    <p className="border-b border-l text-[12px]">S</p>
                    <p className="border-b border-l text-[12px]">R</p>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  {sliceWeeklyAmpPage5?.map((a, index) => (
                    <div key={a.id} className="h-[62px]">
                      <div className="grid h-full grid-cols-10 border-r border-b border-l">
                        <p className="flex items-center justify-center border-l font-[AvenirLTProHeavy]">
                          {index + 145}
                        </p>
                        <p className="col-span-4 flex items-center justify-center border-l px-1 text-center font-[SamimBold] text-[14px]">
                          {a.deviceName}
                        </p>
                        <p className="flex items-center justify-center border-l text-center font-[AvenirLTProHeavy]">
                          {a.frequency}
                        </p>
                        <p className="flex items-center justify-center border-l text-center font-[AvenirLTProHeavy]">
                          {a.power}
                        </p>
                        <p className="flex items-center justify-center border-l text-center font-[AvenirLTProHeavy]">
                          {a.t}
                        </p>
                        <p className="flex items-center justify-center border-l text-center font-[AvenirLTProHeavy]">
                          {a.s}
                        </p>
                        <p className="flex items-center justify-center text-center font-[AvenirLTProHeavy]">
                          {a.r}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-2 justify-center gap-5 text-center">
                  <div
                    className={`relative flex h-25 cursor-progress flex-col items-center justify-center space-y-2 rounded-xl border border-black/30 ${selectedBiWeeklyAmp?.isExecutorSigned ? 'border-green-500/15 bg-green-500/8 transition-all delay-150 duration-200 hover:bg-green-500/12' : 'bg-black/5 transition-all delay-100 duration-150 hover:bg-black/10'}`}
                  >
                    <p className="space-x-1 text-xs">
                      <span>نام و امضاء تهیه کننده :</span>
                      <span className="font-[Vazirmatn] font-semibold">
                        {selectedBiWeeklyAmp?.executorSignedByFullName}
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
                        !selectedBiWeeklyAmp?.isExecutorSigned ? (
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
                    className={`relative flex h-25 cursor-progress flex-col items-center justify-center space-y-2 rounded-xl border border-black/30 ${selectedBiWeeklyAmp?.isSupervisorSigned ? 'border-green-500/15 bg-green-500/8 transition-all delay-150 duration-200 hover:bg-green-500/12' : 'bg-black/5 transition-all delay-100 duration-150 hover:bg-black/10'}`}
                  >
                    <p className="text-xs">
                      <span>نام و امضاء تایید کننده :</span>
                      <span className="font-[Vazirmatn] font-semibold">
                        {selectedBiWeeklyAmp?.supervisorSignedByFullName}
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
                        !selectedBiWeeklyAmp?.isSupervisorSigned ? (
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
            )}
          </div>

          <div className="flex justify-center space-x-5 text-black print:hidden">
            <p className="hidden max-md:block">
              <button
                onClick={() => {
                  setPage(page - 1);
                }}
                disabled={page === 1}
                className={`flex size-10 cursor-pointer items-center justify-center rounded-[10px] bg-blue-300 px-2 py-1 transition-all delay-75 duration-100 hover:scale-110 ${page === 1 && 'cursor-not-allowed opacity-50 '}`}
              >
                <GrLinkNext />
              </button>
            </p>
            <p className="rounded-[10px] bg-blue-300 px-2 py-1 font-[AvenirLTProHeavy]">
              {page}
            </p>
            <p className="hidden max-md:block">
              <button
                onClick={() => {
                  setPage(page + 1);
                }}
                disabled={page === 5}
                className={`flex size-10 cursor-pointer items-center justify-center rounded-[10px] bg-blue-300 px-2 py-1 transition-all delay-75 duration-100 hover:scale-110 ${page === 5 && 'cursor-not-allowed opacity-50 '}`}
              >
                <GrLinkPrevious />
              </button>
            </p>
          </div>
        </div>
      </div>
      <div className="z-50 max-md:hidden print:hidden">
        <button
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={page === 5}
          className={`flex size-10 cursor-pointer items-center justify-center rounded-[10px] bg-blue-300 px-2 py-1 transition-all delay-75 duration-100 hover:scale-110 ${page === 5 && 'cursor-not-allowed opacity-50 '}`}
        >
          <GrLinkPrevious />
        </button>
      </div>
      {/* open Code */}
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
              className="cursor-pointer rounded-xl bg-orange-700/95 px-5 py-3 font-[Vazirmatn] text-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              تایید
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormBiWeeklyAmp;
