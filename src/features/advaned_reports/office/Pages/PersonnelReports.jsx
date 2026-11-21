import { useEffect, useState } from 'react';

import plus from '../../../../assets/images/plus.png';
import close from '../../../../assets/images/close.png';
import men from '../../../../assets/images/men.png';
import women from '../../../../assets/images/women.png';
import shift from '../../../../assets/images/shift.png';
import graduation from '../../../../assets/images/graduation.png';
import organization from '../../../../assets/images/organization.png';

import { useGetUser } from '../../../../hooks/user/userApi';

function PersonnelReports() {
  const [mobile, setMobile] = useState(false);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // get pixel width screen
  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // ---------------------------

  const {
    data: user,
    isLoading,
    isError,
  } = useGetUser({ page, pageSize, search });

  const maleCount = user?.data.filter((u) => u.gender === 0).length;
  const femaleCount = user?.data.filter((u) => u.gender === 1).length;

  return (
    <div className="rounded-[15px] bg-[#0F090C]/30 p-6 text-white">
      {mobile ? (
        <div></div>
      ) : (
        <div>
          <div className="rounded-[15px] bg-[#0F090C]/40 p-6 text-white">
            <div className="flex items-center justify-center overflow-hidden rounded-2xl border border-white/50 bg-[#0F090c]/30 p-3">
              <h1 className="font-[SamimBold] text-xl">گزارش وضعیت پرسنل</h1>
            </div>

            {/* top div */}
            <div className="flex items-center justify-between pt-5">
              <div className="grid h-[120px] w-[300px] grid-cols-2 rounded-[20px] border bg-linear-to-bl from-cyan-800 to-white">
                <div className="flex items-center justify-center">
                  <img src={men} alt="men" width={120} />
                </div>
                <div>
                  <p className="mt-2 text-center font-[SamimBold] text-[15px] text-black">
                    تعداد پرسنل مرد
                  </p>
                  <p className="text-center font-[AvenirLTProMedium] text-[70px] text-black">
                    {maleCount}
                  </p>
                </div>
              </div>
              <div className="grid h-[120px] w-[300px] grid-cols-2 rounded-[20px] border bg-linear-to-bl from-white to-fuchsia-600">
                <div className="flex items-center justify-center">
                  <img src={women} alt="women" width={85} />
                </div>
                <div>
                  <p className="mt-2 text-center font-[SamimBold] text-[15px] text-black">
                    تعداد پرسنل خانم
                  </p>
                  <p className="text-center font-[AvenirLTProMedium] text-[70px] text-black">
                    {femaleCount}
                  </p>
                </div>
              </div>

              <div className="grid h-[120px] w-[300px] grid-cols-2 rounded-[20px] border bg-linear-to-bl from-white to-fuchsia-600">
                <div className="flex items-center justify-center">
                  <img src={shift} alt="shift" width={85} />
                </div>
                <div>
                  <p className="mt-2 text-center font-[SamimBold] text-[15px] text-black">
                    تعداد پرسنل شیفت
                  </p>
                  <p className="text-center font-[AvenirLTProMedium] text-[70px] text-black">
                    81
                  </p>
                </div>
              </div>
              <div className="grid h-[120px] w-[300px] grid-cols-2 rounded-[20px] border bg-linear-to-bl from-white to-fuchsia-600">
                <div className="flex items-center justify-center">
                  <img src={shift} alt="shift" width={85} />
                </div>
                <div>
                  <p className="mt-2 text-center font-[SamimBold] text-[15px] text-black">
                    تعداد پرسنل شیفت
                  </p>
                  <p className="text-center font-[AvenirLTProMedium] text-[70px] text-black">
                    82
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between space-x-23 px-5">
            <div className="w-full rounded-[20px] border bg-linear-to-bl from-white to-fuchsia-600 py-3 pr-5">
              <div>
                <img src={graduation} alt="graduation" width={120} />
              </div>
              <div></div>
            </div>
            <div className="w-full rounded-[20px] border bg-linear-to-bl from-white to-fuchsia-600 py-3 pr-5">
              <div>
                <img src={organization} alt="organization" width={120} />
              </div>
              <div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonnelReports;
