import React from 'react';
import { FiCalendar, FiClock, FiEdit, FiUser } from 'react-icons/fi';
import { HiHashtag } from 'react-icons/hi';
import { IoTimeOutline } from 'react-icons/io5';
import { toShamsi } from '../../../../../Time/date';
import { FaUnlock } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';

function MobileRolePage({
  filterData,
  selectedRole,
  setSelectedRole,
  canEdit,
  openEdit,
  canDelete,
  openDelete,
  openView,
  canView,
}) {
  return (
    <div className="block w-full md:hidden print:hidden">
      {filterData?.map((e, index) => (
        <div
          key={e.id}
          className="mx-2 mt-2 mb-5 rounded-[10px] border border-white/30"
        >
          <div className="mx-1 my-3 flex items-center justify-between border-b border-white/50 px-2 pb-2">
            <div className="flex items-center space-x-3">
              <p className="rounded-full bg-[#2b2a2ab2] p-4 text-white">
                <FiUser />
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
            <div className="flex items-center rounded-lg bg-white p-1 font-[Vazirmatn] font-semibold text-black">
              {e?.isGlobalAccess === true ? 'سراسری' : 'داخلی'}
            </div>
          </div>

          <div className="mx-2 grid grid-cols-7 gap-2">
            <button
              onClick={() => openEdit(e)}
              className={`col-span-3 mb-2 flex cursor-pointer items-center justify-center space-x-1 rounded-[10px] p-1 font-[Samim] ${
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
              onClick={() => {
                openView(true);
                setSelectedRole(e);
              }}
              className="col-span-3 mb-2 flex cursor-pointer items-center justify-center space-x-1 rounded-[10px] bg-linear-to-b from-[#1c1c1c] to-[#0c0c0c] p-1 px-7 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-106"
            >
              <p className="text-[#e54c00]">
                <FaUnlock />
              </p>
              <p>مشاهده</p>
            </button>
            <button
              onClick={() => openDelete(e)}
              className={`mb-2 flex cursor-pointer items-center justify-center rounded-[10px] p-2 font-[Samim] ${
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

export default MobileRolePage;
