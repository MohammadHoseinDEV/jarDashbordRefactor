import React, { useState } from 'react';
import { FiCalendar } from 'react-icons/fi';
import { normalizeTime, toShamsi } from '../../../../../Time/date';
import { CiClock2 } from 'react-icons/ci';
import { useGetUser } from '../../../../../hooks/user/userApi';

import ReportLinechangecheckList from '../module/ReportLinechangecheckList';

function TablePageLinechangeCheckList({
  filteredData,
  search,
  canEdit,
  canDelete,
  openEdit,
  askDelete,
  setOpenFormReport,
  setSelectedCheckList,
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100000);
  const { data: user } = useGetUser({ pageSize });
  return (
    <div>
      <table className="w-full border-separate border-spacing-y-0 max-md:hidden">
        <thead className="bg-[#0b0c12] text-white/70">
          <tr className="5xl:text-[25px] max-2xl:text-[12px]">
            <th className="5xl:py-5 rounded-tr-[10px] border-t border-r border-b border-white/30 py-3 pr-5 max-2xl:py-2">
              ردیف
            </th>
            <th className="border-t border-b border-white/30">شماره خط</th>

            <th className="border-t border-b border-white/30">
              نام و نام خانوادگی
            </th>
            <th className="border-t border-b border-white/30">شیفت</th>
            <th className="border-t border-b border-white/30">شماره گزارش</th>

            <th className="border-t border-b border-white/30">تاریخ گزارش</th>

            <th className="border-t border-b border-white/30">
              تاریخ امضاء سرپرست
            </th>
            <th className="5xl:w-70 w-55 border-t border-b border-white/30 max-2xl:w-50">
              وضعیت
            </th>

            <th className="rounded-tl-[10px] border-t border-b border-l border-white/30">
              عملیات
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.length > 0 ? (
            filteredData?.map((e, index) => {
              const findUser = user?.data?.find((u) => u.id === e.createdBy);
              return (
                <tr key={e.id} className="text-center">
                  <td className="size-5 border-b border-white/20">
                    <p className="5xl:text-[20px] my-3 mr-5 rounded-[10px] border border-white/10 bg-[#131720] py-1 font-[AvenirLTProMedium] text-white/70 max-2xl:text-[12px]">
                      {index + 1}
                    </p>
                  </td>
                  <td className="5xl:text-[28px] border-b border-white/20 max-2xl:text-[12px]">
                    <p className="mx-1 rounded-[10px] border border-[#32a3de]/40 bg-[#182228] font-[AvenirLTProBook] text-[#32a3de]">
                      {e?.lineName}
                    </p>
                  </td>

                  <td className="5xl:text-[28px] border-b border-white/20 max-2xl:text-[12px]">
                    <p className="mx-1 rounded-[10px]">{findUser?.fullName}</p>
                  </td>

                  <td className="5xl:text-[28px] border-b border-white/20 max-2xl:text-[12px]">
                    <p className="mx-1 rounded-[10px]">{e?.description}</p>
                  </td>
                  <td className="5xl:text-[28px] border-b border-white/20 max-2xl:text-[12px]">
                    <p className="mx-1 rounded-[10px] border border-[#32a3de]/40 bg-[#182228] font-[AvenirLTProBook] text-[#32a3de]">
                      {e?.checklistNumber}
                    </p>
                  </td>
                  <td className="5xl:text-[28px] flex items-center justify-center border-b border-white/20 py-5 font-[AvenirLTProBook] text-white max-2xl:text-[12px]">
                    <p className="5xl:text-[30px] pl-2 text-[20px] text-[#863515] max-2xl:text-[15px]">
                      <FiCalendar />
                    </p>

                    {toShamsi(e?.checklistDate)}
                  </td>

                  <td className="5xl:text-[28px] border-b border-white/20 max-2xl:text-[12px]">
                    <div className="flex items-center justify-center space-x-2">
                      <p className="5xl:text-[30px] text-[20px] text-[#863515] max-2xl:text-[15px]">
                        <FiCalendar />
                      </p>
                      <p className="font-[AvenirLTProBook] text-white">
                        {toShamsi(e?.operationsSupervisorSignedAt)}
                      </p>
                    </div>
                  </td>
                  <td className="border-b border-white/20 max-2xl:text-[12px]">
                    {(() => {
                      if (e?.isOperationsSupervisorSigned === true) {
                        return (
                          <p className="rounded-[10px] bg-[#1b4025]/50 py-1 text-[#3cbb30]">
                            تکمیل شده
                          </p>
                        );
                      }
                      if (e?.isShiftSupervisorSigned === false) {
                        return (
                          <p className="5xl:py-2 5xl:text-[20px] rounded-[10px] bg-[#f30437]/70 py-1 text-white">
                            بدون امضاء
                          </p>
                        );
                      }
                      if (e?.isOperationsSupervisorSigned === false) {
                        return (
                          <p className="5xl:py-2 5xl:text-[20px] rounded-[10px] border bg-[#262627]/70 py-1 text-[#f9e2af]">
                            در انتظار امضاء سرپرست
                          </p>
                        );
                      }
                    })()}
                  </td>
                  <td className="border-b border-white/20">
                    <ReportLinechangecheckList
                      report={e}
                      canEdit={canEdit}
                      canDelete={canDelete}
                      openEdit={openEdit}
                      askDelete={askDelete}
                      setOpenFormReport={setOpenFormReport}
                      setSelectedCheckList={setSelectedCheckList}
                      findUser={findUser}
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={9}
                className="border-b border-white/20 py-10 text-center text-white/60 md:text-sm 2xl:text-base"
              >
                {search
                  ? `نتیجه‌ای برای «${search}» پیدا نشد`
                  : 'گزارشی ثبت نشده است'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TablePageLinechangeCheckList;
