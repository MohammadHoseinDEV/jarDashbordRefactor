import React from 'react';
import { FaUnlock } from 'react-icons/fa';
import { FaStripeS } from 'react-icons/fa6';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';

function SystemMobilePage({
  sys,
  selectedSystem,
  setSelectedSystem,
  canEdit,
  openEdit,
  canDelete,
  openDelete,
}) {
  return (
    <div className="block w-full md:hidden print:hidden">
      {sys?.systems?.map((e, index) => (
        <div
          key={e.id}
          className="mx-2 mt-2 mb-5 rounded-[10px] border border-white/30"
        >
          <div className="mx-1 my-3 flex items-center justify-between border-b border-white/50 px-2 pb-2">
            <div className="flex items-center space-x-3">
              <p className="rounded-full bg-[#2b2a2ab2] p-4 text-white">
                <FaStripeS />
              </p>
              <p className="flex flex-col space-y-0.5">
                <span className="text- font-[Vazirmatn] text-lg font-semibold">
                  {e?.name}
                </span>
                <span className="font-[Vazirmatn] text-xs text-white/60">
                  {e?.companyName}
                </span>
              </p>
            </div>
            <div className="font-[Vazirmatn] 2xl:text-base">
              {e?.isActive === true ? (
                <p className="rounded-lg border border-green-900 bg-green-700/15 px-2 text-green-500">
                  فعال
                </p>
              ) : (
                <p className="rounded-lg border border-red-900 bg-red-700/10 px-2 text-red-500">
                  غیرفعال
                </p>
              )}
            </div>
          </div>

          <div className="mx-2 grid grid-cols-7 gap-2">
            <button
              onClick={() => openEdit(e)}
              className={`col-span-5 mb-2 flex cursor-pointer items-center justify-center space-x-1 rounded-[10px] p-1 font-[Samim] ${
                canEdit
                  ? 'cursor-pointer bg-linear-to-bl from-green-500/10 to-green-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                  : 'hidden bg-white/5 opacity-50'
              }`}
            >
              <p className="text-xl text-green-600">
                <FiEdit />
              </p>
              <span className="pl-4">ویرایش</span>
            </button>

            <button
              onClick={() => openDelete(e)}
              className={`col-span-2 mb-2 flex cursor-pointer items-center justify-center rounded-[10px] p-2 font-[Samim] ${
                canDelete
                  ? 'cursor-pointer bg-linear-to-bl from-red-500/10 to-red-800/50 transition-all delay-100 duration-150 ease-in-out hover:scale-106'
                  : 'hidden bg-white/5 opacity-50'
              }`}
            >
              <p className="text-lg text-red-600">
                <RiDeleteBin6Line />
              </p>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SystemMobilePage;
