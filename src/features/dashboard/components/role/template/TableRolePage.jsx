import React from 'react';
import { FiCalendar } from 'react-icons/fi';
import { toShamsi } from '../../../../../Time/date';
import ReportRollAction from '../module/ReportRollAction';

function TableRolePage({
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
    <div className="hidden md:block">
      <table className="relative w-full border-separate border-spacing-y-0">
        <thead className="sticky top-0 bg-[#0b0c12] text-white/70">
          <tr className="4xl:text-[25px] md:text-sm 2xl:text-base">
            <th className="4xl:py-5 rounded-tr-[10px] border-t border-r border-b border-white/30 py-3 pr-5 max-2xl:py-2">
              ردیف
            </th>
            <th className="border-t border-b border-white/30">نام نقش ها </th>
            <th className="border-t border-b border-white/30">دسترسی</th>

            <th className="border-t border-b border-white/30">شرکت </th>
            <th className="rounded-tl-[10px] border-t border-b border-l border-white/30">
              عملیات
            </th>
          </tr>
        </thead>
        <tbody>
          {filterData?.map((e, index) => {
            return (
              <tr key={e.id} className="text-center">
                <td className="size-5 border-b border-white/20">
                  <p className="4xl:text-[20px] my-3 mr-5 rounded-[10px] border border-white/10 bg-[#131720] py-1 font-[AvenirLTProMedium] text-white/70 md:text-xs 2xl:text-base">
                    {index + 1}
                  </p>
                </td>
                <td className="4xl:text-[28px] border-b border-white/20 font-[SamimBold] text-white md:text-xs 2xl:text-base">
                  {e?.name}
                </td>
                <td className="4xl:text-[28px] border-b border-white/20 md:text-[12px]">
                  <p className="rounded-lg border border-[#32a3de]/40 bg-[#182228] font-[Vazirmatn] text-[#32a3de] 2xl:text-base">
                    {e?.isGlobalAccess === true ? 'سراسری' : 'داخلی'}
                  </p>
                </td>
                <td className="4xl:text-[28px] border-b border-white/20 py-5 font-[Vazirmatn] text-white md:text-xs 2xl:text-base">
                  {e?.companyName ?? '___'}
                </td>

                <td className="border-b border-white/20">
                  <ReportRollAction
                    report={e}
                    selected={selectedRole}
                    setSelected={setSelectedRole}
                    canEdit={canEdit}
                    openEdit={openEdit}
                    openDelete={openDelete}
                    canDelete={canDelete}
                    canView={canView}
                    openView={openView}
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

export default TableRolePage;
