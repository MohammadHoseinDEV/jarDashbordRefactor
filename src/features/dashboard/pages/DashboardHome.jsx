import { useDispatch, useSelector } from 'react-redux';
import { lazy, Suspense, useEffect, useState } from 'react';
import { logout } from '../../auth/Slice/authSlice';
import { Navigate } from 'react-router-dom';
import { useGetProfile } from '../../../hooks/profile/profile';
import { useGetElectricalReports } from '../../work-Report/Api/Electrical/electrical';
import { toShamsi } from '../../../Time/date';

import electrical from '../../../assets/images/electrical.png';
import com from '../../../assets/images/com.png';
import { CiClock1, CiLogout } from 'react-icons/ci';
import { GiElectric } from 'react-icons/gi';
import { FcElectricalSensor } from 'react-icons/fc';
import { TbLogout } from 'react-icons/tb';
import { CgProfile } from 'react-icons/cg';
import { FiLogOut } from 'react-icons/fi';

const Profile = lazy(() => import('../components/Profile/Profile'));

function DashboardHome() {
  const { token, userInfo } = useSelector((state) => state.auth);

  const [openExit, setOpenExit] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: profiles } = useGetProfile();

  if (!token) return <Navigate to="/login" replace />;

  const {
    data: electricals,
    isLoading,
    isError,
  } = useGetElectricalReports({ search, page, pageSize });

  const lastReport = electricals?.data?.items[0];

  if (
    profiles?.data?.companyRoles?.length === 0 &&
    profiles?.data?.identityRoles?.length === 0 &&
    profiles?.data?.units?.length === 0
  )
    return <Navigate to="/no-access" replace />;

  const isSuperAdmin = profiles?.data?.identityRoles?.some(
    (p) => p.roleId === 'cfa79204-d797-4241-8630-55fcc1b2f721'
  );

  const managerWidget = profiles?.data?.identityRoles.some(
    (r) => r.roleId === 'cfa79204-d797-4241-8630-55fcc1b2f721'
  );

  return (
    <div className="no-scrollbar relative flex h-full justify-between">
      <style>{`
        @keyframes wiggle {
          0%, 90%, 100% { transform: rotate(0deg); }
          92% { transform: rotate(-10deg); }
          94% { transform: rotate(10deg); }
          96% { transform: rotate(-6deg); }
          98% { transform: rotate(6deg); }
        }
      `}</style>
      {/* {managerWidget === true && (
        <div className="mt-5 flex gap-5 max-md:hidden">
          <div className="flex flex-wrap gap-4">
            {lastReport ? (
              <>
                <div className="rounded-2xl border border-white/20 bg-[#0F090C]/50 p-2 shadow-xl">
                  <div className="mt-2 mb-3 flex items-center space-x-2">
                    <p>
                      <img src={com} alt="com" width={25} />
                    </p>
                    <p className="space-x-1 text-white">
                      <span className="font-[SamimBold]">
                        آمپر کمپرسور شماره
                      </span>
                      <span className="font-[AvenirLTProMedium]">1</span>
                    </p>
                  </div>
                  <Gauge
                    value={lastReport.airCompressor1_Ampere}
                    max={900}
                    className="font-[SamimBold] text-white"
                  />
                  <p className="border-b border-white/30"></p>
                  <div className="grid grid-cols-3">
                    <div className="my-1 flex flex-col items-center border-l border-white/30 px-2">
                      <p className="flex flex-col items-center text-white">
                        <span className="text-[20px]">
                          <CiClock1 />
                        </span>
                        <span className="text-[12px]">آخرین بروزرسانی</span>
                      </p>
                      <p className="font-[AvenirLTProMedium] text-white">
                        {toShamsi(lastReport.reportDate)}
                      </p>
                    </div>
                    <div className="my-1 flex flex-col items-center justify-center border-l border-white/50">
                      <p className="flex flex-col items-center text-white">
                        <span className="text-[20px]">
                          <GiElectric />
                        </span>
                        <span className="text-[13px]">هرتز</span>
                      </p>
                      <p className="font-[AvenirLTProMedium] text-white">
                        {lastReport.airCompressor1_Hertz}
                      </p>
                    </div>
                    <div className="border=l my-1 flex flex-col items-center border-white/50">
                      <p className="flex flex-col items-center text-white">
                        <span className="text-[20px]">
                          <FcElectricalSensor />
                        </span>
                        <span className="text-[13px]">وضعیت</span>
                      </p>
                      <div className="font-[Samim]">
                        {lastReport.airCompressor1_Ampere === 0 ? (
                          <p className="rounded-[10px] bg-red-600 px-2 py-0.5 text-red-100">
                            غیرفعال
                          </p>
                        ) : (
                          <p className="rounded-[10px] bg-green-800 px-2 py-0.5 text-green-400">
                            فعال
                          </p>
                        )}
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </>
            ) : (
              <p className="font-[Samim] text-white">
                در حال بارگذاری داده‌ها...
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-4">
            {lastReport ? (
              <>
                <div className="rounded-2xl border border-white/20 bg-[#0F090C]/50 p-2 shadow-xl">
                  <div className="mt-2 mb-3 flex items-center space-x-2">
                    <p>
                      <img src={com} alt="com" width={25} />
                    </p>
                    <p className="space-x-1 text-white">
                      <span className="font-[SamimBold]">
                        آمپر کمپرسور شماره
                      </span>
                      <span className="font-[AvenirLTProMedium]">2</span>
                    </p>
                  </div>
                  <Gauge
                    value={lastReport.airCompressor2_Ampere}
                    max={900}
                    className="font-[SamimBold] text-white"
                  />
                  <p className="border-b border-white/30"></p>
                  <div className="grid grid-cols-3">
                    <div className="my-1 flex flex-col items-center border-l border-white/30 px-2">
                      <p className="flex flex-col items-center text-white">
                        <span className="text-[20px]">
                          <CiClock1 />
                        </span>
                        <span className="text-[12px]">آخرین بروزرسانی</span>
                      </p>
                      <p className="font-[AvenirLTProMedium] text-white">
                        {toShamsi(lastReport.reportDate)}
                      </p>
                    </div>
                    <div className="my-1 flex flex-col items-center justify-center border-l border-white/50">
                      <p className="flex flex-col items-center text-white">
                        <span className="text-[20px]">
                          <GiElectric />
                        </span>
                        <span className="text-[13px]">هرتز</span>
                      </p>
                      <p className="font-[AvenirLTProMedium] text-white">
                        {lastReport.airCompressor2_Hertz}
                      </p>
                    </div>
                    <div className="border=l my-1 flex flex-col items-center border-white/50">
                      <p className="flex flex-col items-center text-white">
                        <span className="text-[20px]">
                          <FcElectricalSensor />
                        </span>
                        <span className="text-[13px]">وضعیت</span>
                      </p>
                      <div className="font-[Samim]">
                        {lastReport.airCompressor2_Ampere === 0 ? (
                          <p className="rounded-[10px] bg-red-600 px-2 py-0.5 text-red-100">
                            غیرفعال
                          </p>
                        ) : (
                          <p className="rounded-[10px] bg-green-800 px-2 py-0.5 text-green-400">
                            فعال
                          </p>
                        )}
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </>
            ) : (
              <p className="font-[Samim] text-white">
                در حال بارگذاری داده‌ها...
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-4">
            {lastReport ? (
              <>
                <div className="rounded-2xl border border-white/20 bg-[#0F090C]/50 p-2 shadow-xl">
                  <div className="mt-2 mb-3 flex items-center space-x-2">
                    <p>
                      <img src={com} alt="com" width={25} />
                    </p>
                    <p className="space-x-1 text-white">
                      <span className="font-[SamimBold]">
                        آمپر کمپرسور شماره
                      </span>
                      <span className="font-[AvenirLTProMedium]">3</span>
                    </p>
                  </div>
                  <Gauge
                    value={lastReport.airCompressor3_Ampere}
                    max={900}
                    className="font-[SamimBold] text-white"
                  />
                  <p className="border-b border-white/30"></p>
                  <div className="grid grid-cols-3">
                    <div className="my-1 flex flex-col items-center border-l border-white/30 px-2">
                      <p className="flex flex-col items-center text-white">
                        <span className="text-[20px]">
                          <CiClock1 />
                        </span>
                        <span className="text-[12px]">آخرین بروزرسانی</span>
                      </p>
                      <p className="font-[AvenirLTProMedium] text-white">
                        {toShamsi(lastReport.reportDate)}
                      </p>
                    </div>
                    <div className="my-1 flex flex-col items-center justify-center border-l border-white/50">
                      <p className="flex flex-col items-center text-white">
                        <span className="text-[20px]">
                          <GiElectric />
                        </span>
                        <span className="text-[13px]">هرتز</span>
                      </p>
                      <p className="font-[AvenirLTProMedium] text-white">
                        {lastReport.airCompressor3_Hertz}
                      </p>
                    </div>
                    <div className="border=l my-1 flex flex-col items-center border-white/50">
                      <p className="flex flex-col items-center text-white">
                        <span className="text-[20px]">
                          <FcElectricalSensor />
                        </span>
                        <span className="text-[13px]">وضعیت</span>
                      </p>
                      <div className="font-[Samim]">
                        {lastReport.airCompressor3_Ampere === 0 ? (
                          <p className="rounded-[10px] bg-red-600 px-2 py-0.5 text-red-100">
                            غیرفعال
                          </p>
                        ) : (
                          <p className="rounded-[10px] bg-green-800 px-2 py-0.5 text-green-400">
                            فعال
                          </p>
                        )}
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </>
            ) : (
              <p className="font-[Samim] text-white">
                در حال بارگذاری داده‌ها...
              </p>
            )}
          </div>
        </div>
      )} */}

      <div></div>
      <div className="4xl:pt-2 flex justify-end rounded-2xl">
        <div className="absolute top-2 flex space-x-2 pl-5 text-white">
          <span
            onClick={() => setOpenProfile(true)}
            className="animate-wiggle-inline my-auto cursor-pointer rounded-full bg-white p-1 transition-all delay-100 duration-200 ease-in-out hover:scale-110"
            style={{ animation: 'wiggle 3s ease-in-out infinite' }}
          >
            <CgProfile className="5xl:size-15 size-9 text-black" />
          </span>
          <span
            onClick={() => setOpenExit(true)}
            className="animate-wiggle-inline my-auto flex cursor-pointer items-center justify-center rounded-full bg-white p-1 transition-all delay-100 duration-200 ease-in-out hover:scale-110"
            style={{ animation: 'wiggle 3s ease-in-out infinite' }}
          >
            <FiLogOut className="5xl:size-15 flex size-9 text-center text-black" />
          </span>
        </div>
        <div className="absolute bottom-0 left-0 my-auto w-100 items-center rounded-[10px] px-2 py-1 text-center font-[Vazirmatn] font-semibold text-white/50">
          <p>پشتیبانی و توسعه واحد فناوری اطلاعات کاویان جار ساچی</p>
        </div>

        {/* exit Modal */}
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
            openExit ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
            onClick={() => {
              setOpenExit(false);
            }}
          />
          <div
            className={`relative transform rounded-[15px] bg-[#0F090C] p-6 text-white shadow-2xl transition-all duration-300 ${
              openExit
                ? 'translate-y-0 scale-100 opacity-100'
                : '-translate-y-10 scale-95 opacity-0'
            }`}
          >
            <h1 className="5xl:text-[25px] font-[SamimBold] text-lg">
              خروج از حساب کاربری
            </h1>
            <p className="5xl:text-[25px] mt-4 font-[Samim] text-white/80">
              {userInfo?.gender === 0
                ? `آقای ${userInfo?.firstName} ${userInfo?.lastName}، آیا از خروج از حساب کاربری خود اطمینان دارید؟`
                : `خانم ${userInfo?.firstName} ${userInfo?.lastName}، آیا از خروج از حساب کاربری خود اطمینان دارید؟`}
            </p>
            <div className="5xl:text-[25px] mt-6 flex justify-end gap-2">
              <button
                onClick={() => setOpenExit(false)}
                className="cursor-pointer rounded-xl bg-white/10 px-4 py-2 font-[Samim] transition-all delay-75 duration-150 ease-in-out hover:scale-110 hover:bg-white/15 active:scale-95"
              >
                انصراف
              </button>
              <button
                onClick={() => dispatch(logout())}
                className="cursor-pointer rounded-xl bg-red-500 px-4 py-2 font-[Samim] transition-all delay-75 duration-150 ease-in-out hover:scale-110 hover:bg-red-600 active:scale-95"
              >
                خروج
              </button>
            </div>
          </div>
        </div>

        {/* Profile Modal */}
        <Profile openProfile={openProfile} setOpenProfile={setOpenProfile} />
      </div>
    </div>
  );
}

export default DashboardHome;
