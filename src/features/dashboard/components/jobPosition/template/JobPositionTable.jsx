import React from 'react';
import JobPositionAction from '../module/JobPositionAction';
import { useGetFullAccess } from '../../../../../hooks/auth/authApi';

function JobPositionTable({ job, canEdit, canDelete, openEdit, openDelete }) {
  const { data: permission } = useGetFullAccess();

  return (
    <div className="mt-3 hidden md:block">
      <table className="relative w-full table-fixed border-separate border-spacing-y-0">
        <thead className="sticky top-0 bg-[#0b0c12] text-white/70">
          <tr className="4xl:text-[25px] md:text-sm 2xl:text-base">
            <th className="4xl:py-5 rounded-tr-[10px] border-t border-r border-b border-white/30 py-3 max-2xl:py-2">
              ردیف
              
            </th>
            <th className="border-t border-b border-white/30">کد جایگاه </th>

            <th className="border-t border-b border-white/30">نام جایگاه </th>
            <th className="border-t border-b border-white/30">سطح جایگاه </th>

            <th className="border-t border-b border-white/30">دپارتمان </th>
            <th className="border-t border-b border-white/30">شرکت </th>
            <th className="border-t border-b border-white/30">وضعیت</th>
            <th className="rounded-tl-[10px] border-t border-b border-l border-white/30">
              عملیات
            </th>
          </tr>
        </thead>
        <tbody>
          {job?.items?.map((e, index) => {
            return (
              <tr key={e.id} className="text-center">
                <td className="size-5 border-b border-white/20">
                  <p className="4xl:text-[20px] m-auto w-fit rounded-[10px] border border-white/10 bg-[#131720] px-2 py-1 font-[AvenirLTProMedium] text-white/70 md:text-xs 2xl:text-base">
                    {index + 1}
                  </p>
                </td>
                <td className="4xl:text-[28px] border-b border-white/20 md:text-[12px]">
                  <p className="mx-5 rounded-lg border border-[#32a3de]/40 bg-[#182228] font-[Vazirmatn] text-[#32a3de] 2xl:text-base">
                    {e?.code}
                  </p>
                </td>
                <td className="4xl:text-[28px] border-b border-white/20 font-[SamimBold] text-white md:text-xs 2xl:text-base">
                  {e?.title}
                </td>
                <td className="size-5 border-b border-white/20">
                  <p className="4xl:text-[20px] rounded-[10px] border border-white/10 bg-[#131720] py-1 font-[AvenirLTProMedium] text-white/70 md:text-xs 2xl:text-base">
                    {e?.level}
                  </p>
                </td>
                <td className="4xl:text-[28px] border-b border-white/20 py-5 font-[Vazirmatn] font-semibold text-white md:text-xs 2xl:text-base">
                  {e?.departmentName ?? '___'}
                </td>
                <td className="4xl:text-[28px] border-b border-white/20 py-5 font-[Vazirmatn] font-semibold text-white md:text-xs 2xl:text-base">
                  {e?.companyName ?? '___'}
                </td>
                <td className="4xl:text-[28px] border-b border-white/20 md:text-[12px]">
                  <p className="rounded-lg border border-[#32a3de]/40 bg-[#182228] font-[Vazirmatn] text-[#32a3de] 2xl:text-base">
                    {e?.isActive === true ? 'فعال' : 'غیرفعال'}
                  </p>
                </td>
                <td className="border-b border-white/20">
                  <JobPositionAction
                    job={e}
                    canEdit={canEdit}
                    openEdit={openEdit}
                    openDelete={openDelete}
                    canDelete={canDelete}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default JobPositionTable;
