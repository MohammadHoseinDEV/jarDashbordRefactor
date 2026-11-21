import React from 'react';
import EducationAction from '../module/EducationAction';

function EducationTable({
  edu,
  selectedEducation,
  setSelectedEducation,
  canEdit,
  openEdit,
  canDelete,
  openDelete,
  search,
}) {
  return (
    <div className="mt-3 hidden md:block">
      <table className="relative w-full border-separate border-spacing-y-0">
        <thead className="sticky top-0 bg-[#0b0c12] text-white/70">
          <tr className="4xl:text-[25px] md:text-sm 2xl:text-base">
            <th className="4xl:py-5 rounded-tr-[10px] border-t border-r border-b border-white/30 py-3 pr-5 max-2xl:py-2">
              ردیف
            </th>

            <th className="border-t border-b border-white/30">نام مدرک </th>
            <th className="border-t border-b border-white/30">وضعیت</th>

            <th className="rounded-tl-[10px] border-t border-b border-l border-white/30">
              عملیات
            </th>
          </tr>
        </thead>
        <tbody>
          {edu?.length > 0 ? (
            edu?.map((e, index) => {
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
                    <p className="m-auto w-fit rounded-lg font-[Vazirmatn] 2xl:text-base">
                      {e?.isActive === true ? (
                        <p className="rounded-lg border border-green-500 bg-green-700/20 px-2 py-0.5 text-green-500">
                          فعال
                        </p>
                      ) : (
                        <p className="rounded-lg border border-red-500 bg-red-700/20 px-2 py-0.5 text-red-500">
                          غیرفعال
                        </p>
                      )}
                    </p>
                  </td>

                  <td className="border-b border-white/20">
                    <EducationAction
                      report={e}
                      selected={selectedEducation}
                      setSelected={setSelectedEducation}
                      canEdit={canEdit}
                      openEdit={openEdit}
                      openDelete={openDelete}
                      canDelete={canDelete}
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={5}
                className="border-b border-white/20 py-10 text-center text-white/60 md:text-sm 2xl:text-base"
              >
                {search
                  ? `نتیجه‌ای برای «${search}» پیدا نشد`
                  : 'مدرکی ثبت نشده است'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EducationTable;
