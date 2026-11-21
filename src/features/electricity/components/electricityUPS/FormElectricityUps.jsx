import React, { useEffect, useMemo, useState } from 'react';

import logo from '../../../../assets/images/logo.png';
import close from '../../../../assets/images/close.png';
import { useGetMenu } from '../../../../hooks/menu/menuApi';
import {
  useGetImageSign,
  useGetPermissionSignature,
} from '../../../../hooks/user/userApi';
import { useSelector } from 'react-redux';
import { findMenu } from '../../../../utils/rbac';
import { useGetSignatureId } from '../../../../hooks/Signature/Signature';
import { useGetProfile } from '../../../../hooks/profile/profile';
import { toShamsi } from '../../../../Time/date';
import {
  useCreateSignExecutor,
  useCreateSignSupervisor,
} from '../../Api/electricityUPS/electricityUps';
import { useGetCompanyLogo } from '../../../../hooks/company/companiApi';
import { useSignatureAccess } from '../../../../hooks/userSignatureAccess';
import { MENU_URL } from '../../../../permission/menuKeys';
import { LuPencil } from 'react-icons/lu';

const GROUP_COLS = 'grid grid-cols-[36px_1fr_1fr]';

const show = (v) => (v === null || v === undefined || v === '' ? '' : v);

function FormElectricityUps({
  openFormReport,
  setOpenFormReport,
  selectedReport,
}) {
  const { userInfo } = useSelector((state) => state.auth);

  const [selectedExecutor, setSelectedExecutor] = useState(null);
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [openCode, setOpenCode] = useState(false);
  const [password, setPassword] = useState('');
  const [signatureType, setSignatureType] = useState(null);

  const rows = useMemo(() => {
    const arr = [...(selectedReport?.section1Items ?? [])];

    while (arr.length < 33) {
      arr.push({});
    }

    return arr.slice(0, 33);
  }, [selectedReport]);

  const row = useMemo(() => {
    const arr = [...(selectedReport?.section2Items ?? [])];

    while (arr.length < 4) {
      arr.push({});
    }

    return arr.slice(0, 4);
  }, [selectedReport]);

  const closeHandler = () => {
    setOpenFormReport(false);
  };

  const handleOpenSignatureModal = (type) => {
    setSignatureType(type);
    setOpenCode(true);
  };
  // ----------------------------------------

  // --------------------------------------------------------
  // Logo
  const { data: companyLogo } = useGetCompanyLogo(
    selectedReport?.companyId,
    openFormReport && !!selectedReport?.companyId
  );

  const logoSrc =
    companyLogo?.success && companyLogo?.imageBase64
      ? `data:${companyLogo.contentType};base64,${companyLogo.imageBase64}`
      : logo;
  // --------------------------------------------------------

  const { canSign } = useSignatureAccess(MENU_URL.UPS_BATTERY_VOLTAGE_REPORT);

  const canSignExecutor = canSign('executor');
  const canSignSuperVisor = canSign('supervisor');

  const { data: signExecutor } = useGetImageSign(
    selectedReport?.executorSignedByUserId
  );
  const { data: signSupervisor } = useGetImageSign(
    selectedReport?.supervisorSignedByUserId
  );

  const executorSignature = signExecutor?.data?.signatureImageBase64;
  const supervisorSignature = signSupervisor?.data?.signatureImageBase64;

  const createSignExecutor = useCreateSignExecutor();
  const createSignSupervisor = useCreateSignSupervisor();

  const handleSubmitSignature = () => {
    if (signatureType === 'executor') {
      createSignExecutor.mutate(
        {
          id: selectedReport?.id,
          signaturePassword: password,
        },
        {
          onSuccess: () => {
            setOpenCode(false);
            setOpenFormReport(false);
          },
        }
      );
    }

    if (signatureType === 'supervisor') {
      createSignSupervisor.mutate(
        {
          id: selectedReport?.id,
          signaturePassword: password,
        },
        {
          onSuccess: () => {
            setOpenCode(false);
            setOpenFormReport(false);
          },
        }
      );
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 print:p-0 ${
        openFormReport
          ? 'pointer-events-auto opacity-100 '
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={closeHandler}
      />
      <div
        className={`relative transform rounded-[15px] bg-white p-2 text-white shadow-2xl transition-all duration-300 print:scale-87! print:p-0 ${
          openFormReport
            ? '4xl:scale-160 translate-y-0 scale-65 opacity-100 xl:scale-75 2xl:scale-100 print:shadow-none '
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div
          className="border-2 text-black"
          style={{ width: '148mm', minHeight: '210mm' }}
        >
          <div className="grid grid-cols-8 border-b">
            <div className="col-span-2 flex items-center justify-center border-l">
              <img
                src={logoSrc}
                alt="logo"
                className="h-12 w-22 object-contain"
              />
            </div>
            <div className="col-span-4 flex items-center justify-center border-l">
              <h1 className="font-[SamimBold] text-[20px]">
                ولتاژگیری باطریهای UPS
              </h1>
            </div>
            <div className="col-span-2 flex flex-col justify-center pr-2">
              <p className="space-x-1 text-[11px]">
                <span className="font-[SamimBold]">کد سند :</span>
                <span className="font-[AvenirLTProHeavy]">F1102</span>
              </p>
              <p className="space-x-1 text-[11px]">
                <span className="font-[SamimBold]">شماره بازنگری :</span>
                <span className="font-[AvenirLTProHeavy]">00</span>
              </p>
              <p className="space-x-1 text-[11px]">
                <span className="font-[SamimBold]">تاریخ بازنگری :</span>
                <span className="font-[AvenirLTProHeavy]">1401/05/01</span>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between space-x-1 p-1">
            <p className="flex items-center justify-center space-x-1">
              <span className="font-[Samim] text-[10px] font-bold">
                تاریخ :
              </span>
              <span className="font-[AvenirLTProBook] text-[10px] font-semibold">
                {toShamsi(selectedReport?.readingDate)}
              </span>
            </p>
            <p className="flex items-center justify-center space-x-1">
              <span className="font-[Samim] text-[10px] font-bold">
                نام و نام خانوادگی :
              </span>
              <span className="font-[VazirLight] text-[10px] font-bold">
                {selectedReport?.personnelName}
              </span>
            </p>
            <p className="flex items-center justify-center space-x-1">
              <span className="font-[Samim] text-[10px] font-bold">شیفت :</span>
              <span className="font-[VazirLight] text-[10px] font-bold">
                {selectedReport?.shiftName}
              </span>
            </p>
            <p className="flex items-center justify-center space-x-1">
              <span className="font-[Samim] text-[10px] font-bold">
                شماره :
              </span>
              <span className="font-[AvenirLTProBook] text-[10px] font-semibold">
                {selectedReport?.readingNumber}
              </span>
            </p>
          </div>

          <div className="mx-2 grid grid-cols-3 border-t border-l bg-gray-500/40 text-[12px]">
            {[0, 1, 2].map((g) => (
              <div key={g} className={GROUP_COLS}>
                <p className="flex items-center justify-center border-r border-b border-l font-semibold">
                  ردیف
                </p>
                <p className="flex items-center justify-center border-b font-semibold">
                  ولتاژ A
                </p>
                <p className="flex items-center justify-center border-r border-b font-semibold">
                  ولتاژ B
                </p>
              </div>
            ))}
          </div>

          <div className="mx-2 grid min-h-60 grid-cols-3 border-l">
            {rows.map((m, index) => (
              <div key={index} className={GROUP_COLS}>
                <p className="flex h-7 items-center justify-center border-r border-b border-l font-[AvenirLTProBook]">
                  {index + 1}
                </p>
                <span className="flex h-7 items-center justify-center border-b font-[AvenirLTProMedium] text-[12px]">
                  {show(m?.voltage)}
                </span>
                <span className="flex h-7 items-center justify-center border-r border-b font-[AvenirLTProMedium] text-[12px]">
                  {show(m?.voltage1)}
                </span>
              </div>
            ))}
          </div>

          <div className="m-2">
            <div className="grid grid-cols-9 border-t bg-gray-500/40">
              <p className="col-span-1 flex items-center justify-center border-r border-b border-l font-bold">
                ردیف
              </p>
              <p className="col-span-4 flex items-center justify-center border-b border-l font-[AvenirLTProBook] font-bold">
                G1
              </p>
              <p className="col-span-4 flex items-center justify-center border-b border-l font-[AvenirLTProBook] font-bold">
                G2
              </p>
            </div>

            {row.map((m, index) => (
              <div key={index} className="grid h-8 grid-cols-9">
                <span className="col-span-1 flex items-center justify-center border-r border-b border-l font-[AvenirLTProBook]">
                  {index + 1}
                </span>
                <span className="col-span-4 flex items-center justify-center border-b border-l font-[AvenirLTProMedium]">
                  {show(m?.g1)}
                </span>
                <span className="col-span-4 flex items-center justify-center border-b border-l font-[AvenirLTProMedium]">
                  {show(m?.g2)}
                </span>
              </div>
            ))}
          </div>
          <div className="mx-2 mt-5 grid grid-cols-2 justify-center gap-5 text-center">
            <div
              className={`relative flex h-30 cursor-progress flex-col items-center justify-center space-y-2 rounded-xl border border-black/30 ${selectedReport?.isExecutorSigned ? 'border-green-500/15 bg-green-500/8 transition-all delay-150 duration-200 hover:bg-green-500/12' : 'bg-black/5 transition-all delay-100 duration-150 hover:bg-black/10'}`}
            >
              <p className="space-x-1 text-xs">
                <span>نام و امضاء تهیه کننده :</span>
                <span className="font-[Vazirmatn] font-semibold">
                  {selectedReport?.executorSignedByFullName}
                </span>
              </p>
              <p>
                {executorSignature ? (
                  <img
                    src={`data:image/png;base64,${executorSignature}`}
                    alt="signature"
                    className="absolute right-1/3 bottom-0 h-30 object-contain"
                  />
                ) : canSignExecutor && !selectedReport?.isExecutorSigned ? (
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
              className={`relative flex h-30 cursor-progress flex-col items-center justify-center space-y-2 rounded-xl border border-black/30 ${selectedReport?.supervisorSignedByUserId ? 'border-green-500/15 bg-green-500/8 transition-all delay-150 duration-200 hover:bg-green-500/12' : 'bg-black/5 transition-all delay-100 duration-150 hover:bg-black/10'}`}
            >
              <p className="text-xs">
                <span>نام و امضاء تایید کننده :</span>
                <span className="font-[Vazirmatn] font-semibold">
                  {selectedReport?.supervisorSignedByFullName}
                </span>
              </p>
              <p>
                {supervisorSignature ? (
                  <img
                    src={`data:image/png;base64,${supervisorSignature}`}
                    alt="signature"
                    className="absolute bottom-0 left-1/3 h-30 object-contain"
                  />
                ) : canSignSuperVisor &&
                  !selectedReport?.supervisorSignedByUserId ? (
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
          openCode ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          onClick={() => {
            setOpenCode(false);
          }}
        />
        <div
          className={`relative transform rounded-[15px] bg-linear-to-br from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
            openCode
              ? 'translate-y-0 scale-100 opacity-100'
              : '-translate-y-10 scale-95 opacity-0'
          }`}
        >
          <div className="flex items-center justify-between pb-5">
            <h1>کد امضاء</h1>
            <span
              onClick={() => {
                setOpenCode(false);
              }}
              className="cursor-pointer rounded-[10px] bg-white/80 p-1.5 text-[30px] text-red-500 transition-all delay-100 duration-75 ease-in-out hover:bg-black"
            >
              <img src={close} alt="close" width={20} />
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
            onClick={handleSubmitSignature}
            className="float-left mt-2 cursor-pointer rounded-[10px] bg-green-500 p-2 transition-all delay-75 duration-100 hover:bg-green-700"
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormElectricityUps;
