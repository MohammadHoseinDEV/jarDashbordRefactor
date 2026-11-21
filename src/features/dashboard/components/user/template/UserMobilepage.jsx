import React from 'react';
import { FaUserAlt, FaUserTie } from 'react-icons/fa';
import { FaD } from 'react-icons/fa6';
import { FiEdit } from 'react-icons/fi';
import { GiPathDistance } from 'react-icons/gi';
import { MdDeleteOutline } from 'react-icons/md';
import { PiFactoryDuotone } from 'react-icons/pi';
import { TbBuildingFactory } from 'react-icons/tb';
import { ImUser } from 'react-icons/im';

import UserAction from '../module/UserAction';

function UserMobilepage({
  user,
  canEdit,
  openEdit,
  canDelete,
  openDelete,
  openShift,
  openSignature,
  filter,
}) {
  return (
    <div className="block w-full md:hidden print:hidden">
      {user?.data?.length > 0 ? (
        user?.data?.map((e, index) => {
          return (
            <div
              key={e.id}
              className="mx-2 mt-2 mb-5 rounded-[10px] border border-white/30"
            >
              <div className="mx-1 my-3 grid grid-cols-4 border-b border-white/50 px-2 pb-2">
                <div className="col-span-3 flex items-center space-x-3">
                  <p className="rounded-full bg-[#2b2a2ab2] p-4 text-white">
                    <FaUserAlt />
                  </p>
                  <p className="flex flex-col space-y-0.5">
                    <span className="text- font-[Vazirmatn] text-lg font-semibold">
                      {e?.fullName}
                    </span>
                    <span className="font-[Vazirmatn] text-xs text-white/60">
                      {e?.jobPositionTitle}
                    </span>
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="rounded-lg border border-[#32a3de]/40 bg-[#182228] p-1 font-[Vazirmatn] font-semibold text-[#32a3de] 2xl:text-base">
                    {e?.isActive === true ? 'فعال' : 'غیرفعال'}
                  </p>
                  <p className="flex items-center">
                    <UserAction
                      report={e}
                      canEdit={canEdit}
                      openEdit={openEdit}
                      openDelete={openDelete}
                      canDelete={canDelete}
                      openShift={openShift}
                      openSignature={openSignature}
                    />
                  </p>
                </div>
              </div>
              <div className="mx-1 my-2 grid grid-cols-2">
                <div className="flex items-center space-x-2">
                  <p className="text-white/50">
                    <FaD />
                  </p>
                  <div className="flex flex-col space-y-1">
                    <p className="text-white/50">نام دپارتمان</p>
                    <div>
                      {e?.departmentRoles?.length > 0 ? (
                        <p>
                          {e?.departmentRoles?.map((d) => d.departmentName)}
                        </p>
                      ) : (
                        <p className="text-white/60">___</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-white/50">
                    <TbBuildingFactory />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="text-white/50"> نام شرکت</p>
                    <div>
                      {e?.companies?.length > 0 ? (
                        <p>{e?.companies?.map((d) => d.companyName)}</p>
                      ) : (
                        <p className="text-white/60">___</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-y-1 space-x-2">
                  <p className="text-white/50">
                    <FaUserTie />
                  </p>
                  <div className="flex flex-col space-y-1">
                    <p className="text-white/50">مدیر مستقیم</p>
                    <p>
                      {e?.managerName || (
                        <span className="text-white/50">___</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="border-b border-white/20 py-10 text-center text-white/60 md:text-sm 2xl:text-base">
          {filter.search
            ? `نتیجه‌ای برای «${filter.search}» پیدا نشد`
            : 'کاربری ثبت نشده است'}
        </div>
      )}
    </div>
  );
}

export default UserMobilepage;
