import React, { useState } from 'react';
import UnitAction from '../module/UnitAction';
import { FaAngleDown } from 'react-icons/fa';

function UnitTable({
  unit,
  selectedUnit,
  setSelectedUnit,
  canEdit,
  openEdit,
  canDelete,
  openDelete,
  search,
}) {
  const [openSubUnit, setOpenSubUnit] = useState(false);
  return (
    <div>
      <div className="mt-2 hidden md:block">
        <table className="relative w-full border-separate border-spacing-y-0">
          <thead className="sticky top-0 bg-[#0b0c12] text-white/70">
            <tr className="4xl:text-[25px] md:text-sm 2xl:text-base">
              <th className="4xl:py-5 rounded-tr-[10px] border-t border-r border-b border-white/30 py-3 pr-5 max-2xl:py-2">
                ردیف
              </th>
              <th className="border-t border-b border-white/30">نام واحد </th>
              <th className="border-t border-b border-white/30">کد واحد</th>
              <th className="border-t border-b border-white/30">نام شرکت</th>
              <th className="border-t border-b border-white/30">وضعیت </th>

              <th className="rounded-tl-[10px] border-t border-b border-l border-white/30">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {unit?.units?.length > 0 ? (
              unit?.units?.map((e, index) => {
                const hasSub = e?.subUnits?.length > 0;
                return (
                  <React.Fragment key={e.id}>
                    <tr className="text-center">
                      <td className="size-5 border-b border-white/20">
                        <div className="my-3 mr-5 flex items-center gap-2">
                          {hasSub && (
                            <button
                              type="button"
                              onClick={() => setOpenSubUnit(!openSubUnit)}
                              aria-expanded={openSubUnit}
                              className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-white/70 transition hover:bg-white/10 hover:text-white"
                            >
                              <FaAngleDown
                                className={`transition-transform ${openSubUnit ? '' : '-rotate-90'}`}
                              />
                            </button>
                          )}

                          <p className="4xl:text-[20px] flex-1 rounded-[10px] border border-white/10 bg-[#131720] px-2 py-1 font-[AvenirLTProMedium] text-white/70 md:text-xs 2xl:text-base">
                            {index + 1}
                          </p>
                        </div>
                      </td>

                      <td className="4xl:text-[28px] border-b border-white/20 font-[SamimBold] text-white md:text-xs 2xl:text-base">
                        {e?.name}
                      </td>
                      <td className="4xl:text-[28px] border-b border-white/20 px-3 md:text-[12px]">
                        <p className="rounded-lg border border-[#32a3de]/40 bg-[#182228] font-[Vazirmatn] text-[#32a3de] 2xl:text-base">
                          {e?.code}
                        </p>
                      </td>
                      <td className="4xl:text-[28px] border-b border-white/20 font-[SamimBold] text-white md:text-xs 2xl:text-base">
                        {e?.companyName}
                      </td>

                      <td className="4xl:text-[28px] border-b border-white/20 md:text-[12px]">
                        <div className="font-[Vazirmatn] 2xl:text-base">
                          {e?.isActive === true ? (
                            <p className="rounded-lg border border-green-600/50 bg-green-700/20 text-green-500">
                              فعال
                            </p>
                          ) : (
                            <p className="rounded-lg border border-red-600/50 bg-red-700/20 text-red-500">
                              غیرفعال
                            </p>
                          )}
                        </div>
                      </td>

                      <td className="border-b border-white/20">
                        <UnitAction
                          report={e}
                          selected={selectedUnit}
                          setSelected={setSelectedUnit}
                          canEdit={canEdit}
                          openEdit={openEdit}
                          openDelete={openDelete}
                          canDelete={canDelete}
                        />
                      </td>
                    </tr>

                    {openSubUnit &&
                      e?.subUnits?.map((s, i) => (
                        <tr key={s.id} className="text-center">
                          <td className="size-5 border-b border-white/20">
                            <p className="4xl:text-[20px] my-3 mr-auto w-fit flex-1 rounded-[10px] border border-white/10 bg-[#131720] px-2 py-1 font-[AvenirLTProMedium] text-white/70 md:text-xs 2xl:text-base">
                              {index + 1}.{i + 1}
                            </p>
                          </td>
                          <td className="4xl:text-[28px] border-b border-white/20 font-[SamimBold] text-white md:text-xs 2xl:text-base">
                            {s?.name}
                          </td>
                          <td className="4xl:text-[28px] border-b border-white/20 px-3 md:text-[12px]">
                            <p className="rounded-lg border border-[#32a3de]/40 bg-[#182228] font-[Vazirmatn] text-[#32a3de] 2xl:text-base">
                              {s?.code}
                            </p>
                          </td>
                          <td className="4xl:text-[28px] border-b border-white/20 font-[SamimBold] text-white md:text-xs 2xl:text-base">
                            {s?.companyName}
                          </td>
                          <td className="4xl:text-[28px] border-b border-white/20 md:text-[12px]">
                            <div className="font-[Vazirmatn] 2xl:text-base">
                              {s?.isActive === true ? (
                                <p className="rounded-lg border border-green-600/50 bg-green-700/20 text-green-500">
                                  فعال
                                </p>
                              ) : (
                                <p className="rounded-lg border border-red-600/50 bg-red-700/20 text-red-500">
                                  غیرفعال
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="border-b border-white/20">
                            <UnitAction
                              report={s}
                              selected={selectedUnit}
                              setSelected={setSelectedUnit}
                              canEdit={canEdit}
                              openEdit={openEdit}
                              openDelete={openDelete}
                              canDelete={canDelete}
                            />
                          </td>
                        </tr>
                      ))}
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="border-b border-white/20 py-10 text-center text-white/60 md:text-sm 2xl:text-base"
                >
                  {search
                    ? `نتیجه‌ای برای «${search}» پیدا نشد`
                    : 'واحدی ثبت نشده است'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UnitTable;
