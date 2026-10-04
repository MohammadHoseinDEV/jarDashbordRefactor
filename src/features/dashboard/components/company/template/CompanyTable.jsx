import React from 'react';
import CompanyAction from '../module/CompanyAction';
import { useGetDepartment } from '../../../../../hooks/depratment/department';

function CompanyTable({
  company,
  selectedCompany,
  setSelectedCompany,
  canEdit,
  openEdit,
  canDelete,
  openDelete,
  search,
}) {
  const { data: dep } = useGetDepartment();

  const companies = company?.companies || [];
  const departments = dep?.departments || [];

  return (
    <div>
      <div className="mt-2 hidden md:block">
        <table className="relative w-full border-separate border-spacing-y-0">
          <thead className="sticky top-0 bg-[#0b0c12] text-white/70">
            <tr className="4xl:text-[25px] md:text-sm 2xl:text-base">
              <th className="4xl:py-5 rounded-tr-[10px] border-t border-r border-b border-white/30 py-3 pr-5 max-2xl:py-2">
                ردیف
              </th>
              <th className="border-t border-b border-white/30">کد </th>
              <th className="border-t border-b border-white/30">نام شرکت</th>
              <th className="border-t border-b border-white/30">وضعیت</th>
              <th className="border-t border-b border-white/30">آدرس</th>
              <th className="border-t border-b border-white/30">دپارتمان</th>
              <th className="border-t border-b border-white/30">کد دپارتمان</th>

              <th className="rounded-tl-[10px] border-t border-b border-l border-white/30">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {companies.length > 0 ? (
              companies.map((e, index) => {
                const department = departments?.find(
                  (d) => d.id === e.departmentId
                );

                return (
                  <tr key={e.id} className="text-center">
                    <td className="size-5 border-b border-white/20">
                      <p className="4xl:text-[20px] my-3 mr-5 rounded-[10px] border border-white/10 bg-[#131720] py-1 font-[AvenirLTProMedium] text-white/70 md:text-xs 2xl:text-base">
                        {index + 1}
                      </p>
                    </td>
                    <td className="4xl:text-[28px] border-b border-white/20 px-3 md:text-[12px]">
                      <p className="rounded-lg border border-[#32a3de]/40 bg-[#182228] font-[Vazirmatn] text-[#32a3de] 2xl:text-base">
                        {e?.code}
                      </p>
                    </td>
                    <td className="4xl:text-[28px] border-b border-white/20 font-[SamimBold] text-white md:text-xs 2xl:text-base">
                      {e?.name}
                    </td>

                    <td className="4xl:text-[28px] border-b border-white/20 md:text-[12px]">
                      <p className="rounded-lg border border-[#32a3de]/40 bg-[#182228] font-[Vazirmatn] text-[#32a3de] 2xl:text-base">
                        {e?.isActive === true ? 'فعال' : 'غیرفعال'}
                      </p>
                    </td>

                    <td className="4xl:text-[28px] border-b border-white/20 font-[SamimBold] text-white md:text-xs 2xl:text-base">
                      {e?.address}
                    </td>
                    <td className="4xl:text-[28px] border-b border-white/20 font-[SamimBold] text-white md:text-xs 2xl:text-base">
                      {department?.isActive === true ? (
                        <p>{department?.name}</p>
                      ) : (
                        'غیرفعال'
                      )}
                    </td>
                    <td className="4xl:text-[28px] border-b border-white/20 md:text-[12px]">
                      <p className="rounded-lg border border-[#32a3de]/40 bg-[#182228] font-[Vazirmatn] text-[#32a3de] 2xl:text-base">
                        {department?.isActive === true ? (
                          <span>{department?.code}</span>
                        ) : (
                          'غیرفعال'
                        )}
                      </p>
                    </td>

                    <td className="border-b border-white/20">
                      <CompanyAction
                        report={e}
                        selected={selectedCompany}
                        setSelected={setSelectedCompany}
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
                    : 'شرکتی ثبت نشده است'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CompanyTable;
