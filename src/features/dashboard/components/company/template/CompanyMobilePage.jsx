import React from 'react';
import { FaD } from 'react-icons/fa6';
import { FiEdit } from 'react-icons/fi';
import { GiPathDistance } from 'react-icons/gi';
import { MdDeleteOutline } from 'react-icons/md';
import { PiFactoryDuotone } from 'react-icons/pi';

function CompanyMobilePage({
  company,
  selectedCompany,
  setSelectedCompany,
  canEdit,
  openEdit,
  canDelete,
  openDelete,
  dep,
}) {
  const companies = company?.companies || [];
  return (
    <div className="block w-full md:hidden print:hidden">
      {companies?.map((e, index) => {
        const departments = dep?.departments?.find(
          (d) => d.id === e.departmentId
        );
        return (
          <div
            key={e.id}
            className="mx-2 mt-2 mb-5 rounded-[10px] border border-white/30"
          >
            <div className="mx-1 my-3 flex items-center justify-between border-b border-white/50 px-2 pb-2">
              <div className="flex items-center space-x-3">
                <p className="rounded-full bg-[#2b2a2ab2] p-4 text-white">
                  <PiFactoryDuotone />
                </p>
                <p className="flex flex-col space-y-0.5">
                  <span className="text- font-[Vazirmatn] text-lg font-semibold">
                    {e?.name}
                  </span>
                  <span className="font-[Vazirmatn] text-xs text-white/60">
                    {e?.code}
                  </span>
                </p>
              </div>
              <div className="flex items-center rounded-lg border border-[#32a3de]/40 bg-[#182228] p-1 font-[Vazirmatn] font-semibold text-[#32a3de] 2xl:text-base">
                {e?.isActive === true ? 'فعال' : 'غیرفعال'}
              </div>
            </div>
            <div className="mx-1 my-2 grid grid-cols-2">
              <div className="flex items-center space-x-2">
                <p className="text-white/50">
                  <FaD />
                </p>
                <p className="flex flex-col space-y-1">
                  <span className="text-white/50">نام دپارتمان</span>
                  <span>{departments?.name}</span>
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-white/50">
                  <FaD />
                </p>
                <p className="flex flex-col space-y-1">
                  <span className="text-white/50">کد دپارتمان</span>
                  <span>{departments?.code}</span>
                </p>
              </div>

              <div className="flex items-center space-y-1 space-x-2">
                <p className="text-white/50">
                  <GiPathDistance />
                </p>
                <p className="flex flex-col space-y-1">
                  <span className="text-white/50">آدرس</span>
                  <span>{e?.address}</span>
                </p>
              </div>
              <div></div>
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
                <p className="text-xl text-red-600">
                  <MdDeleteOutline />
                </p>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CompanyMobilePage;
