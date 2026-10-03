import { useEffect, useState } from 'react';
import { TiThMenuOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Logo from '../../../../assets/images/logoJar.png';
import SidebarHome from './SidebarHome';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const { userInfo } = useSelector((state) => state.auth);
  const [mobile, setMobile] = useState(false);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleResize = () => setMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={`relative flex h-screen flex-col overflow-hidden rounded-[15px] bg-black/70 transition-all duration-500 max-sm:absolute max-sm:bg-[#000000] print:hidden! ${
        isOpen
          ? ' w-[15%] max-xl:w-50 max-sm:z-50 max-sm:m-auto max-sm:w-full'
          : 'w-[4%] max-sm:w-0'
      }`}
    >
      {/* Toggle Icon */}
      <div className="relative mb-2 h-16 shrink-0">
        <TiThMenuOutline
          className="5xl:text-[40px] 5xl:left-7 absolute top-0.5 left-6 my-3 cursor-pointer text-3xl text-white transition-all duration-500 hover:scale-110 hover:text-[#FF5C5C] max-2xl:left-3 max-md:fixed max-md:top-1 max-md:right-1 max-md:pb-1 max-md:text-[25px]"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
      </div>

      {/* Logo - User */}
      <div className="flex shrink-0 flex-col items-center justify-center">
        <Link to="/dashboard">
          <img
            src={Logo}
            alt="logo"
            className={`rounded-full transition-all delay-75 duration-100 hover:scale-110 ${
              isOpen
                ? '5xl:size-25 h-20 w-20 max-2xl:size-15 max-xl:size-15'
                : '5xl:size-18 h-12 w-12'
            }`}
            onClick={() => {
              if (mobile) {
                setIsOpen(false);
              } else {
                setIsOpen(false);
              }
            }}
          />
        </Link>

        {/* Welcome text */}
        <p
          className={`5xl:text-[23px] mt-4 pb-2 text-center font-[SamimBold] text-[15px] text-[#ffffffc9] transition-all ease-in-out max-2xl:text-[11px] max-xl:text-[10px] max-sm:text-[20px] ${
            isOpen
              ? 'translate-y-0 border-b border-gray-500 opacity-100 delay-800 duration-100'
              : 'pointer-events-none h-0 translate-x-20 opacity-0'
          }`}
        >
          {userInfo?.gender === 0
            ? `جناب آقای ${userInfo?.firstName} ${userInfo?.lastName} خوش آمدید.`
            : `سرکار خانم ${userInfo?.firstName} ${userInfo?.lastName} خوش آمدید.`}
        </p>
      </div>

      <div className="no-scrollbar min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
        {/* RBAC MENU */}
        <SidebarHome
          isOpen={isOpen}
          onClose={closeSidebar}
          userInfo={userInfo}
          mobile={mobile}
          setMobile={setMobile}
        />
      </div>
    </div>
  );
}

export default Sidebar;
