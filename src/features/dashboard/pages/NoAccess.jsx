import React from 'react';

import background from '../../../assets/images/Dark.jpg';
import { useAuthExpiry } from '../../../hooks/useAuthExpiry';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../auth/Slice/authSlice';
import { Navigate } from 'react-router-dom';
import { useGetProfile } from '../../../hooks/profile/profile';

function NoAccess() {
  useAuthExpiry();

  const { token } = useSelector((state) => state.auth);
  const { data: profiles } = useGetProfile();

  const dispatch = useDispatch();
  if (!token) return <Navigate to={'/login'} replace />;

  return (
    <div className="relative min-h-screen w-screen overflow-hidden">
      <img
        src={background}
        alt="Jar Background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute z-10 flex h-full w-full flex-col items-center justify-center bg-black/75">
        <p className="flex flex-col space-y-4 rounded-[10px] bg-linear-to-br from-black/50 to-gray-600/50 px-3 py-5 text-center text-white">
          <span className="font-[SamimBold]">
            برای دریافت دسترسی های مربوط به خود با واحد فناوری اطلاعات هماهنگ
            کنید.
          </span>

          <span className="font-[SamimBold]">
            (بعد از هماهنگی با واحد فناوری اطلاعات برای دریافت دسترسی های مورد
            نیاز، ابتدا خارج شده و مجدد برای ورود اقدام بفرمایید.)
          </span>
          <button
            onClick={() => {
              dispatch(logout());
            }}
            className="m-auto cursor-pointer rounded-xl bg-red-500 px-4 py-2 font-[Samim] transition-all delay-75 duration-150 ease-in-out hover:scale-110 hover:bg-red-600 active:scale-95"
          >
            خروج
          </button>
        </p>
      </div>
    </div>
  );
}

export default NoAccess;
