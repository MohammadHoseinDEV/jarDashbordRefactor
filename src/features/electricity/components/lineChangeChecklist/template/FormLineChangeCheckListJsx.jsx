import React from 'react';

import close from '../../../../../assets/images/close.png';
import { normalizeTime, toShamsi } from '../../../../../Time/date';
import { LuPencil } from 'react-icons/lu';

function FormLineChangeCheckListJsx({
  selectedCheckList,
  handleSubmitSign,
  openCode,
  setOpenCode,
  setPassword,
  handleOpenSignatureModal,
  logoSrc,
  canSignExecutor,
  executorSignature,
  canSignSuperVisor,
  supervisorSignature,
}) {
  return (
    <div>
      {/* Header */}
      <div className="grid grid-cols-5">
        <div className="flex items-center justify-center border-b border-l">
          <img src={logoSrc} alt="logo" className="h-12 w-22 object-contain" />
        </div>
        <div className="col-span-3 flex items-center justify-center border-b border-l">
          <h1 className="font-[SamimBold] text-[18px]">
            چک لیست تعویض خط IS واحد برق
          </h1>
        </div>
        <div className="flex flex-col justify-center border-b pr-2 text-[11px]">
          <p className="space-x-1">
            <span className="font-[SamimBold]">کد سند :</span>
            <span className="font-[AvenirLTProHeavy]">F0614</span>
          </p>
          <p className="space-x-1">
            <span className="font-[SamimBold]">شماره ویرایش :</span>
            <span className="font-[AvenirLTProHeavy]">01</span>
          </p>
          <p className="space-x-1">
            <span className="font-[SamimBold]">تاریخ ویرایش :</span>
            <span className="font-[AvenirLTProHeavy]">1402/02/15</span>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-around border-b text-[12px]">
        <div className="flex items-center justify-center space-x-1">
          <p className="font-[SamimBold]">خط :</p>
          <p className="font-[AvenirLTProBook]">
            {selectedCheckList?.lineName}
          </p>
        </div>
        <div className="flex items-center justify-center space-x-1">
          <p className="font-[SamimBold]">شیفت :</p>
          <p>{selectedCheckList?.shiftName}</p>
        </div>
        <div className="flex items-center justify-center space-x-1">
          <p className="font-[SamimBold]">تاریخ :</p>
          <p className="font-[AvenirLTProBook]">
            {toShamsi(selectedCheckList?.checklistDate)}
          </p>
        </div>
        <div className="flex items-center justify-center space-x-1">
          <p className="font-[SamimBold]">ساعت :</p>
          <p className="font-[AvenirLTProBook]">
            {normalizeTime(selectedCheckList?.checklistTime)}
          </p>
        </div>
      </div>
      <div>
        <table className="w-full border-separate border-spacing-y-0 max-md:hidden">
          <thead className="bg-gray-300/50 text-black">
            <tr>
              <th className="border-b border-l px-1">عملیات</th>
              <th className="border-b border-l px-0.5">وضعیت</th>
              <th className="border-b border-l px-1">توضیحات</th>
              <th className="border-b px-0.5">مجری</th>
            </tr>
          </thead>
          <tbody>
            {selectedCheckList?.items?.map((l) => (
              <tr className="" key={l?.id}>
                <td className="h-9 border-b border-l pr-1 text-[14px] font-bold">
                  {l?.operationName}
                </td>

                <td className="border-b border-l px-0.5 text-center text-[15px]">
                  {l?.isCompleted === false ? 'N.OK' : 'OK'}
                </td>
                <td className="w-110 border-b border-l pr-0.5 text-start text-[12px]">
                  {/* {l?.description} */}
                </td>
                <td className="w-22 border-b text-center text-[13px] font-bold">
                  {l?.executorName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="grid grid-cols-2 pt-6">
        <div className="flex items-center space-x-1 pr-1">
          <p className="flex items-center font-bold">
            امضاءسرشیفت واحد بهره بردار :
          </p>
          <p className="flex items-center">
            {selectedShiftSupervisor ? (
              <img
                src={`data:image/png;base64,${selectedShiftSupervisor}`}
                alt="signature"
                className="fixed right-60 bottom-3 h-20 w-40"
              />
            ) : canSignShiftSupervisor ? (
              <button
                onClick={() => handleOpenSignatureModal('shiftSupervisor')}
                className="mr-3 flex cursor-pointer items-center justify-center rounded-[10px] bg-linear-to-br from-cyan-400 to-black/10 p-1 text-[12px] transition-all delay-75 duration-100 ease-in-out hover:scale-110"
              >
                ثبت امضاء
              </button>
            ) : (
              <span className="rounded-[10px] bg-red-500 p-1 text-[10px] print:hidden">
                عدم دسترسی
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center space-x-2 pr-1">
          <p className="font-bold">امضاء سرپرست واحد عملیاتی :</p>
          <p className="flex items-center">
            {selectedOperationSupervisor ? (
              <img
                src={`data:image/png;base64,${selectedOperationSupervisor}`}
                alt="signature"
                className="fixed bottom-3 left-45 h-20 w-40"
              />
            ) : canSignOperationsSupervisor ? (
              <button
                onClick={() => handleOpenSignatureModal('operationSupervisor')}
                className="mr-3 cursor-pointer rounded-[10px] bg-linear-to-br from-cyan-400 to-black/10 p-1 text-[12px] transition-all delay-75 duration-100 ease-in-out hover:scale-110"
              >
                ثبت امضاء
              </button>
            ) : (
              <span className="rounded-[10px] bg-red-500 p-1 text-[10px] print:hidden">
                عدم دسترسی
              </span>
            )}
          </p>
        </div>
      </div> */}

      <div className="m-2 flex items-center justify-around gap-5 text-center">
        <div
          className={`relative flex h-20 cursor-progress flex-col items-center justify-center space-y-2 rounded-xl border border-black/30 px-10 ${selectedCheckList?.isShiftSupervisorSigned ? 'border-green-500/15 bg-green-500/8 transition-all delay-150 duration-200 hover:bg-green-500/12' : 'bg-black/5 transition-all delay-100 duration-150 hover:bg-black/10'}`}
        >
          <p className="space-x-1 text-xs">
            <span>امضاءسرشیفت واحد بهره بردار :</span>
            <span className="font-[Vazirmatn] font-semibold">
              {selectedCheckList?.shiftSupervisorSignedByFullName}
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
              !selectedCheckList?.isShiftSupervisorSigned ? (
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
          className={`relative flex h-20 cursor-progress flex-col items-center justify-center space-y-2 rounded-xl border border-black/30 px-10 ${selectedCheckList?.isOperationsSupervisorSigned ? 'border-green-500/15 bg-green-500/8 transition-all delay-150 duration-200 hover:bg-green-500/12' : 'bg-black/5 transition-all delay-100 duration-150 hover:bg-black/10'}`}
        >
          <p className="text-xs">
            <span>امضاء سرپرست واحد عملیاتی :</span>
            <span className="font-[Vazirmatn] font-semibold">
              {selectedCheckList?.operationsSupervisorSignedByFullName}
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
              !selectedCheckList?.isOperationsSupervisorSigned ? (
              <button
                onClick={() =>
                  handleOpenSignatureModal('operations-supervisor')
                }
                className="flex cursor-pointer items-center space-x-2 rounded-xl border-r-6 border-r-red-500 bg-black/85 px-4 py-2 text-sm text-white transition-all delay-150 duration-200 hover:-translate-y-0.5 hover:bg-black"
              >
                <span>ثبت امضاء</span>
                <LuPencil />
              </button>
            ) : null}
          </p>
        </div>
      </div>

      {/* open Code */}
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
              : '-translate-y-10 scale-0 opacity-0'
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
            onClick={handleSubmitSign}
            className="float-left mt-2 cursor-pointer rounded-[10px] bg-green-500 p-2 transition-all delay-75 duration-100 hover:bg-green-700"
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormLineChangeCheckListJsx;
