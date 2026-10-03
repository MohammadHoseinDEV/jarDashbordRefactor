import { useState } from 'react';
import { Link } from 'react-router-dom';

import background from '../../../assets/images/background.jpg';
import Logo from '../../../assets/images/logoKaveh.jpg';

import { SyncLoader } from 'react-spinners';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaChevronLeft } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { FiLogIn } from 'react-icons/fi';
import { BsPersonPlus } from 'react-icons/bs';

function LoginPageJsx({
  submitHandler,
  personnelCode,
  password,
  setPersonnelCode,
  setPassword,
  loading,
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    // loginPage
    <div className="relative flex h-screen w-screen max-sm:overflow-hidden">
      {/* background */}
      <div className="m-auto flex items-center justify-center">
        <img
          src={background}
          alt="Jar-Login"
          className="absolute h-screen w-screen object-cover max-sm:h-screen max-sm:w-screen"
        />
        {/* blur background */}
        <p className="absolute size-full bg-[#09090e]/80 max-md:bg-[#101017]/70"></p>
        {/* login div */}
        <div className="max-17:scale-80 absolute grid w-[900px] grid-cols-2 rounded-[15px] border border-white/10 transition delay-75 duration-100 ease-in-out max-2xl:scale-95 max-xl:scale-70 max-xl:hover:scale-72 max-md:flex max-md:w-[350px] max-md:scale-95 max-md:flex-col max-md:border-none max-md:hover:scale-95">
          <div className="relative h-full w-full rounded-r-[15px] bg-linear-to-br from-[#12121d]/85 via-[#11111c]/85 to-[#12121e]/85 max-md:hidden">
            <div className="absolute top-5 left-0 h-35 w-35 rounded-full bg-[#4e2b1f] blur-[60px]"></div>
            <div>
              <div className="flex items-center space-x-4">
                <img
                  src={Logo}
                  alt=""
                  width={75}
                  className="mt-5 mr-8 rounded-full"
                />
                <h1 className="pt-10 font-[SamimBold] text-[20px] font-bold text-white">
                  سامانه یکپارچه گروه صنعتی کاوه
                </h1>
              </div>
            </div>
            <div className="relative m-auto mt-10 size-70 rounded-full border border-[#5e3113]">
              <span className="absolute -top-2 left-34 size-3 rounded-full bg-[#a85117]"></span>
              <span className="absolute top-16 right-3 size-3 rounded-full bg-[#a85117]"></span>
              <span className="absolute top-52 right-4 size-3 rounded-full bg-[#a85117]"></span>
              <span className="absolute top-68 left-34 size-3 rounded-full bg-[#a85117]"></span>
              <span className="absolute top-52 left-4 size-3 rounded-full bg-[#a85117]"></span>
              <span className="absolute top-16 left-3 size-3 rounded-full bg-[#a85117]"></span>
              <div className="m-auto mt-10 size-50 rounded-full border border-dashed border-[#5e3113]">
                <div className="relative m-auto mt-11 size-25 rounded-[20px] border border-[#974b1f] bg-[#bf5b18]/30">
                  <div className="absolute -top-3 -left-5 h-35 w-35 rounded-full bg-[#4e2b1f]/50 blur-2xl"></div>

                  <p className="mt-5 flex items-center justify-center text-[50px] text-[#f86700]">
                    <FiUser />
                  </p>
                </div>
              </div>
            </div>
            <div className="mx-15">
              <div className="space-y-2 pt-8 text-center">
                <h1 className="font-[SamimBold] text-[17px] font-bold text-white">
                  به سامانه یکپارچه گروه صنعتی کاوه خوش آمدید
                </h1>
                <span className="font-[VazirLight] text-[18px] text-white/30">
                  برای دسترسی به پنل پرسنلی، وارد شوید یا ثبت نام کنید
                </span>
                <p></p>
              </div>
            </div>
            <div className="rigth-0 absolute bottom-5 h-35 w-35 rounded-full bg-[#4e2b1f] blur-[60px]"></div>
          </div>

          <div className="hidden space-y-5 max-md:block max-md:flex-col">
            <div className="flex items-center justify-center">
              <img src={Logo} alt="logo" width={70} />
            </div>
            <div className="flex flex-col items-center justify-center space-y-1 pb-5">
              <p className="text-[20px] text-white">
                سامانه یکپارچه کاویان جار ساچی
              </p>
              <p className="text-[16px] text-white/70"> به سامانه خوش آمدید</p>
            </div>
          </div>
          <div className="z-10 rounded-l-[15px] border-r bg-[#0f0f18]/90 max-md:rounded-[20px] max-md:border max-md:border-white/30 max-md:bg-[#3a3a3dd6]">
            {/* login & register buttons */}
            <div className="mx-15 mt-15 grid grid-cols-2 rounded-[15px] border border-white/15 bg-[#181821] p-1 max-md:mx-6 max-md:mt-5 max-md:bg-[#3a3a3dd6]">
              <Link to={'/login'}>
                <div className="rounded-[15px] bg-[#42271d] py-3.5 max-md:flex max-md:items-center max-md:justify-center max-md:space-x-1 max-md:bg-[#ef6f12]">
                  <p className="hidden text-white max-md:block">
                    <FiLogIn />
                  </p>
                  <p className="flex cursor-pointer items-center justify-center font-[SamimBold] text-white transition delay-150 duration-300 ease-in-out hover:scale-110">
                    ورود
                  </p>
                </div>
              </Link>
              <Link to={'/register'}>
                <div className="col-span-1 flex items-center justify-center py-3.5 max-md:space-x-1">
                  <p className="hidden text-white/30 max-md:block">
                    <BsPersonPlus />
                  </p>
                  <p className="flex cursor-pointer items-center justify-center rounded-[15px] font-[SamimBold] text-white/30 transition delay-150 duration-300 ease-in-out hover:scale-110">
                    ثبت نام
                  </p>
                </div>
              </Link>
            </div>
            <div className="mx-15 mt-8 space-y-2 max-md:hidden">
              <h1 className="font-[VazirLight] text-[25px] font-bold text-white">
                ورود به حساب
              </h1>
              <p className="font-[VazirLight] text-white/30">
                کد پرسنلی و رمز عبور خود را وارد کنید
              </p>
            </div>
            {/* login form */}
            <form className="mt-8" onSubmit={submitHandler}>
              <div className="flex flex-col items-center justify-center space-y-[30px] max-md:items-center max-md:space-y-3 max-md:pb-2">
                <label
                  htmlFor="personnelCode"
                  className="flex flex-col font-[Samim] font-bold text-white/60 max-md:text-white/25"
                >
                  کد پرسنلی
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={personnelCode}
                    onChange={(event) => setPersonnelCode(event.target.value)}
                    placeholder="کد پرسنلی خود را وارد کنید"
                    className="mt-2 h-[50px] w-[350px] rounded-[10px] border border-white/15 bg-[#181821] pr-5 text-right font-[AvenirLTProMedium] text-[19px] transition delay-150 duration-300 outline-none placeholder:pl-4 placeholder:text-left placeholder:font-[Samim] placeholder:text-white/60 hover:scale-105 hover:placeholder:text-[#ff6a00b9] focus:border-[#FF6B00] focus:placeholder:text-[#ff6a00b9] max-md:w-[300px] max-md:bg-[#3a3a3dd6] max-md:placeholder:text-right max-md:placeholder:text-gray-400"
                  />
                </label>
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="flex flex-col font-[Samim] font-bold text-white/60 max-md:text-white/25"
                  >
                    رمز عبور
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="رمز عبور"
                      className="mt-2 h-[50px] w-[350px] rounded-[10px] border border-white/15 bg-[#181821] pr-5 text-right font-[AvenirLTProMedium] text-[19px] transition delay-150 duration-300 outline-none placeholder:pl-15 placeholder:text-left placeholder:font-[Samim] placeholder:text-white/60 hover:scale-105 hover:placeholder:text-[#ff6a00b9] focus:border-[#FF6B00] focus:placeholder:text-[#ff6a00b9] max-md:w-[300px] max-md:bg-[#3a3a3dd6] max-md:placeholder:text-right max-md:placeholder:text-gray-400"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-2/3 left-3 -translate-y-1/2 cursor-pointer transition hover:scale-110"
                  >
                    <p className="text-[30px] text-white/20">
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </p>
                  </button>
                </div>
              </div>
              <Link to={'/forgetpassword'}>
                <div className="mx-15 mt-5 max-md:mx-8 max-md:text-left">
                  <span className="cursor-pointer font-[Samim] text-[16px] font-bold text-[#f97116] transition-all delay-100 duration-150 ease-in-out hover:text-[17px] max-md:w-full">
                    فراموشی رمز عبور؟
                  </span>
                </div>
              </Link>
              <div className="flex items-center justify-center">
                <button className="my-10 flex h-[45px] w-[350px] cursor-pointer items-center justify-center rounded-[15px] bg-[#e56113] bg-linear-to-r from-[#f16c15] to-[#c9470d] shadow-[#e56113] transition delay-150 duration-300 hover:scale-110 hover:bg-[#D9D9D9] max-sm:m-auto max-sm:my-10 max-sm:w-[300px]">
                  {loading ? (
                    <SyncLoader
                      color="#000"
                      cssOverride={{}}
                      loading
                      margin={1}
                      size={15}
                      speedMultiplier={1}
                    />
                  ) : (
                    <>
                      <p className="flex items-center justify-center space-x-2 pr-[5px] font-[SamimBold] text-white">
                        <span>ورود به سامانه</span>
                        <span>
                          <FaChevronLeft />
                        </span>
                      </p>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPageJsx;
