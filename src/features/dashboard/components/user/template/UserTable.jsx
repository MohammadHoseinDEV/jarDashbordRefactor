import React, { lazy } from 'react';

const UserAction = lazy(() => import('../module/UserAction'));

function UserTable({
  user,
  canEdit,
  openEdit,
  canDelete,
  openDelete,
  filter,
  openShift,
  openSignature,
}) {
  return (
    <div className="mt-3 hidden md:block">
      <table className="relative w-full border-separate border-spacing-y-0">
        <thead className="sticky top-0 bg-[#0b0c12] text-white/70">
          <tr className="4xl:text-[25px] md:text-sm 2xl:text-base">
            <th className="4xl:py-5 rounded-tr-[10px] border-t border-r border-b border-white/30 py-3 max-2xl:py-2">
              کد پرسنلی
            </th>
            <th className="border-t border-b border-white/30">
              نام و نام خانوادگی
            </th>
            <th className="border-t border-b border-white/30">کد ملی</th>
            <th className="border-t border-b border-white/30">شماره همراه</th>
            <th className="border-t border-b border-white/30">واحد</th>

            <th className="border-t border-b border-white/30">شرکت </th>
            <th className="border-t border-b border-white/30">جایگاه شغلی </th>
            <th className="border-t border-b border-white/30">مدیر مستقیم</th>
            <th className="border-t border-b border-white/30">وضعیت</th>

            <th className="rounded-tl-[10px] border-t border-b border-l border-white/30">
              عملیات
            </th>
          </tr>
        </thead>
        <tbody>
          {user?.data?.length > 0 ? (
            user?.data?.map((e, index) => {
              return (
                <tr key={e.id} className="text-center">
                  <td className="4xl:text-[28px] border-b border-white/20 font-[AvenirLTProMedium] md:text-xs 2xl:text-base">
                    <p className="mx-auto flex w-fit items-center justify-center rounded-lg border border-[#32a3de]/40 bg-[#182228] px-2 font-[Vazirmatn] text-[#32a3de]">
                      {e?.personnelCode}
                    </p>
                  </td>
                  <td className="4xl:text-[28px] border-b border-white/20 font-[Vazirmatn] font-semibold text-white md:text-xs 2xl:text-base">
                    {e?.fullName}
                  </td>
                  <td className="4xl:text-[28px] border-b border-white/20 font-[AvenirLTProMedium] text-white md:text-xs 2xl:text-base">
                    <p className="justify-centerfont-[Vazirmatn] mx-auto flex w-fit items-center rounded-lg border border-[#32a3de]/40 bg-[#182228] px-2 text-[#32a3de]">
                      {e?.nationalCode}
                    </p>
                  </td>
                  <td className="4xl:text-[28px] border-b border-white/20 font-[AvenirLTProMedium] text-white md:text-xs 2xl:text-base">
                    <p className="f justify-centeront-[Vazirmatn] mx-auto flex w-fit items-center rounded-lg border border-[#32a3de]/40 bg-[#182228] px-2 text-[#32a3de]">
                      {e?.mobileNumber}
                    </p>
                  </td>
                  <td className="4xl:text-[28px] border-b border-white/20 py-5 font-[Vazirmatn] font-semibold text-white md:text-xs 2xl:text-base">
                    {e?.systems?.length > 0 ? (
                      <p>{e?.systems?.map((d) => d.unitName)}</p>
                    ) : (
                      <p className="text-white/60">بدون واحد</p>
                    )}
                  </td>
                  <td className="4xl:text-[28px] border-b border-white/20 py-5 font-[Vazirmatn] font-semibold text-white md:text-xs 2xl:text-base">
                    {e?.systems?.length > 0 ? (
                      <p>{e?.systems?.map((d) => d.companyName)}</p>
                    ) : (
                      <p className="text-white/60">بدون شرکت</p>
                    )}
                  </td>
                  <td className="4xl:text-[28px] border-b border-white/20 py-5 font-[Vazirmatn] font-semibold text-white md:text-xs 2xl:text-base">
                    {e?.jobPositionTitle ?? (
                      <p className="text-white/60">بدون جایگاه</p>
                    )}
                  </td>
                  <td className="4xl:text-[28px] border-b border-white/20 py-5 font-[Vazirmatn] font-semibold text-white md:text-xs 2xl:text-base">
                    {e?.managerName ?? (
                      <p className="text-white/60">بدون مدیر</p>
                    )}
                  </td>
                  <td className="4xl:text-[28px] border-b border-white/20 md:text-[12px]">
                    <p className="mx-auto flex w-fit items-center justify-center rounded-lg border border-[#32a3de]/40 bg-[#182228] px-2 font-[Vazirmatn] text-[#32a3de]">
                      {e?.isActive === true ? 'فعال' : 'غیرفعال'}
                    </p>
                  </td>

                  <td className="border-b border-white/20">
                    <UserAction
                      report={e}
                      canEdit={canEdit}
                      openEdit={openEdit}
                      openDelete={openDelete}
                      canDelete={canDelete}
                      openShift={openShift}
                      openSignature={openSignature}
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={10}
                className="border-b border-white/20 py-10 text-center text-white/60 md:text-sm 2xl:text-base"
              >
                {filter.search
                  ? `نتیجه‌ای برای «${filter.search}» پیدا نشد`
                  : 'کاربری ثبت نشده است'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
