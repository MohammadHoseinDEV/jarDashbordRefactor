import React from 'react';
import {
  FaCheck,
  FaClipboardList,
  FaDownload,
  FaFilter,
  FaPlus,
} from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { FiBell, FiCalendar, FiSearch } from 'react-icons/fi';
import { MdNoteAdd, MdNumbers } from 'react-icons/md';
import { SiAltiumdesigner } from 'react-icons/si';
import { TbReport } from 'react-icons/tb';

function HeaderPage({
  openCreate,
  canCreate,
  allReport,
  allSigend,
  filterStatus,
  setFilterStatus,
  search,
  setSearch,
  openFilterMobile,
  setOpenFilterMobile,
  withoutSignedProduction,
  withoutSignedFurnace,
  withoutSigendProductionEngineering,
  withoutSigendManager,
}) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="rounded-[10px] p-[5px] max-md:w-full">
        {/* Title & Deatails */}
        <div className="mx-2 mt-1 flex items-center justify-between border-b border-white/30 pb-3 max-2xl:pb-1">
          {/* Title */}
          <div className="flex items-center space-x-5 text-white max-md:w-full max-md:justify-between">
            <p className="5xl:size-12 flex size-10 items-center justify-center rounded-[10px] bg-[#e54c00] max-2xl:size-8 max-md:hidden">
              <span className="5xl:text-[30px] text-[22px] max-2xl:text-[19px]">
                <FaClipboardList />
              </span>
            </p>
            <p className="hidden w-3 opacity-0 max-md:block"></p>
            <p className="5xl:text-[25px] font-[SamimBold] text-[20px] max-2xl:text-[13px] max-md:flex max-md:items-center max-md:justify-center max-md:text-center max-md:text-[14px]">
              فرم تغییرات وزنی فرمولاسیون بچ
            </p>
            <p className="hidden max-md:block max-md:pt-1 max-md:text-[20px]">
              <FiBell />
            </p>
          </div>
          {/* Details */}
          <div className="flex items-center space-x-5 pl-5 text-white max-md:hidden">
            <p className="flex items-center space-x-1">
              <span className="5xl:text-[25px] text-[17px] text-[#d84f15] max-2xl:text-[15px]">
                <FiCalendar />
              </span>
              <span className="5xl:text-[20px] font-[SamimBold] text-[12px] max-2xl:text-[10px]">
                تاریخ ویرایش :
              </span>
              <span className="5xl:text-[20px] font-[AvenirLTProMedium] text-[12px] max-2xl:text-[10px]">
                1404/04/02
              </span>
            </p>
            <p className="5xl:text-[20px] space-x-1 text-[12px] max-2xl:text-[10px]">
              <span className="font-[SamimBold]">شماره ویرایش :</span>
              <span className="font-[AvenirLTProMedium]">02</span>
            </p>
            <p className="5xl:text-[20px] space-x-1 text-[12px] max-2xl:text-[10px]">
              <span className="font-[SamimBold]">کد سند :</span>
              <span className="font-[AvenirLTProMedium]">F0505</span>
            </p>
          </div>
        </div>
        
        {/* Add Reports & Excel */}
        <div className="mx-2 mt-1 flex items-center justify-between max-md:hidden">
          <div className="flex items-center pt-2 text-white max-2xl:pt-0">
            <button
              onClick={openCreate}
              className={`group flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-[Samim] max-2xl:px-3 ${
                canCreate
                  ? 'cursor-pointer bg-white/10 hover:bg-white/15'
                  : 'cursor-not-allowed bg-white/5 opacity-50'
              }`}
            >
              <p className="5xl:text-[25px] relative cursor-pointer transition-all delay-150 duration-200 ease-in-out after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-white/50 after:transition-all after:duration-700 after:ease-out hover:scale-105 hover:after:w-full max-2xl:text-[12px]">
                افزودن فرم
              </p>
              <p className="5xl:text-[30px] text-[25px] text-[#d84f15] transition-all delay-150 duration-700 ease-in-out group-hover:rotate-360 max-2xl:text-[20px]">
                <MdNoteAdd />
              </p>
            </button>
          </div>
          <div className="flex items-center justify-end space-x-2 pt-2 pl-5 opacity-0">
            <button className="flex items-center justify-center rounded-[10px] bg-[#0e1117] px-4 py-2 text-[13px] text-white/70">
              <FaDownload />
              <span className="pr-2">خروجی اکسل</span>
            </button>
            <button className="flex items-center justify-center rounded-[10px] bg-[#f35714] px-4 py-2 text-[13px] text-white">
              <FaFilter />
              <span className="pr-2">فیلتر پیشرفته</span>
            </button>
          </div>
        </div>
      </div>
      {/* data reports */}
      <div className="mx-10 mt-1 grid grid-cols-6 gap-2 space-x-2 max-2xl:mx-5 max-2xl:gap-0 max-md:hidden">
        <div
          onClick={() => setFilterStatus('all')}
          className="col-span-1 flex cursor-pointer rounded-[10px] border border-[#be4615]/50 py-2 transition-all delay-100 duration-200 ease-in-out hover:scale-105 max-2xl:py-1"
        >
          <div className="5xl:p-3 5xl:text-[30px] my-auto p-2 text-[18px] max-2xl:text-[16px] max-lg:p-2 max-lg:text-[15px]">
            <p className="5xl:size-15 flex size-11 items-center justify-center rounded-[10px] bg-[#be4615]/25 text-[#be4615] max-2xl:size-8 max-lg:size-8">
              <MdNumbers />
            </p>
          </div>
          <p className="my-auto h-13 border-l-2 border-[#f35714]/70 max-2xl:h-10"></p>
          <div className="my-auto px-2">
            <p className="font-[AvenirLTProHeavy] text-[25px] font-extrabold text-white max-2xl:text-[20px]">
              {allReport}
            </p>
            <p className="5xl:text-[20px] text-[15px] text-white/60 max-2xl:text-[12px] max-lg:pb-2 max-lg:text-[10px]">
              کل فرم ها
            </p>
          </div>
        </div>
        <div
          onClick={() => setFilterStatus('confirmed')}
          className="flex cursor-pointer rounded-[10px] border border-[#a6e3a1]/50 py-2 transition-all delay-100 duration-200 ease-in-out hover:scale-105 max-2xl:py-1"
        >
          <div className="5xl:p-3 5xl:text-[30px] my-auto p-2 text-[20px] max-lg:p-2 max-lg:text-[15px]">
            <p className="5xl:size-15 flex size-11 items-center justify-center rounded-[10px] bg-[#1e2625]/25 text-[#a6e3a1] max-2xl:size-8 max-lg:size-8">
              <FaCheck />
            </p>
          </div>
          <p className="my-auto h-13 border-l-2 border-[#a6e3a1] max-2xl:h-10"></p>
          <div className="my-auto px-2">
            <p className="font-[AvenirLTProHeavy] text-[25px] font-extrabold text-white">
              {allSigend}
            </p>
            <p className="5xl:text-[20px] text-[15px] text-white/60 max-2xl:text-[12px] max-lg:pb-2 max-lg:text-[10px]">
              فرم های امضاء شده
            </p>
          </div>
        </div>

        <div
          onClick={() => setFilterStatus('furnace')}
          className="col-span-1 flex cursor-pointer rounded-[10px] border border-[#14f3ec]/50 py-2 transition-all delay-100 duration-200 ease-in-out hover:scale-105 max-2xl:py-1"
        >
          <div className="5xl:p-3 5xl:text-[30px] my-auto p-2 text-[18px] max-2xl:text-[16px] max-lg:p-2 max-lg:text-[15px]">
            <p className="5xl:size-15 flex size-11 items-center justify-center rounded-[10px] bg-[#14f3ec]/25 text-[#14f3ec] max-2xl:size-8 max-lg:size-8">
              <MdNumbers />
            </p>
          </div>
          <p className="my-auto h-13 border-l-2 border-[#14f3ec] max-2xl:h-10"></p>
          <div className="my-auto px-2">
            <p className="font-[AvenirLTProHeavy] text-[25px] font-extrabold text-white max-2xl:text-[20px]">
              {withoutSignedFurnace}
            </p>
            <p className="5xl:text-[20px] text-[15px] text-white/60 max-2xl:text-[9px] max-lg:pb-2 max-lg:text-[10px]">
              فرم های بدون امضاء کوره
            </p>
          </div>
        </div>
        <div
          onClick={() => setFilterStatus('production')}
          className="flex cursor-pointer rounded-[10px] border border-white py-2 transition-all delay-100 duration-200 ease-in-out hover:scale-105 max-2xl:py-1"
        >
          <div className="5xl:p-3 5xl:text-[30px] my-auto p-2 text-[20px] max-lg:p-2 max-lg:text-[15px]">
            <p className="flex size-11 items-center justify-center rounded-[10px] bg-[#251d26]/25 text-white max-2xl:size-8 max-lg:size-8">
              <FaXmark />
            </p>
          </div>
          <p className="my-auto h-13 border-l-2 border-white max-2xl:h-10"></p>
          <div className="my-auto px-2">
            <p className="font-[AvenirLTProHeavy] text-[25px] font-extrabold text-white">
              {withoutSignedProduction}
            </p>
            <p className="5xl:text-[20px] text-[15px] text-white/60 max-2xl:text-center max-2xl:text-[10px] max-lg:pb-2 max-lg:text-[10px]">
              فرم های بدون امضاء تولید
            </p>
          </div>
        </div>
        <div
          onClick={() => setFilterStatus('engineering')}
          className="flex cursor-pointer rounded-[10px] border border-amber-300 py-2 transition-all delay-100 duration-200 ease-in-out hover:scale-105 max-2xl:py-1"
        >
          <div className="5xl:p-3 5xl:text-[30px] my-auto p-2 text-[20px] max-lg:p-2 max-lg:text-[15px]">
            <p className="5xl:size-15 flex size-11 items-center justify-center rounded-[10px] bg-[#262627]/25 text-amber-300 max-2xl:size-8 max-lg:size-8">
              <FaXmark />
            </p>
          </div>
          <p className="my-auto h-13 border-l-2 border-amber-300 max-2xl:h-10"></p>
          <div className="my-auto px-2">
            <p className="font-[AvenirLTProHeavy] text-[25px] font-extrabold text-white">
              {withoutSigendProductionEngineering}
            </p>
            <p className="5xl:text-[19px] text-[14px] text-white/60 max-2xl:text-center max-2xl:text-[9px] max-lg:pb-2 max-lg:text-[10px]">
              فرم های بدون امضاء مهندسی تولید
            </p>
          </div>
        </div>

        <div
          onClick={() => setFilterStatus('manager')}
          className="flex cursor-pointer rounded-[10px] border border-red-500 py-2 transition-all delay-100 duration-200 ease-in-out hover:scale-105 max-2xl:py-1"
        >
          <div className="5xl:p-3 5xl:text-[30px] my-auto p-2 text-[20px] max-lg:p-2 max-lg:text-[15px]">
            <p className="flex size-11 items-center justify-center rounded-[10px] bg-[#251d26]/25 text-red-500 max-2xl:size-8 max-lg:size-8">
              <FaXmark />
            </p>
          </div>
          <p className="my-auto h-13 border-l-2 border-red-500 max-2xl:h-10"></p>
          <div className="my-auto px-2">
            <p className="font-[AvenirLTProHeavy] text-[25px] font-extrabold text-white">
              {withoutSigendManager}
            </p>
            <p className="5xl:text-[20px] text-[15px] text-white/60 max-2xl:text-center max-2xl:text-[10px] max-lg:pb-2 max-lg:text-[10px]">
              فرم های بدون امضاء مدیریت
            </p>
          </div>
        </div>
      </div>
      {/* Search & Filter */}
      <div className="mx-2 mt-1 flex items-center justify-between max-md:hidden">
        <div className="col-span-4 flex items-center space-x-1 pr-5">
          <p className="5xl:text-[40px] text-[30px] text-[#e54c00] max-2xl:text-[20px]">
            <TbReport />
          </p>
          <p className="5xl:text-[25px] font-[SamimBold] text-[20px] text-white max-2xl:text-[15px]">
            لیست گزارشات
          </p>
        </div>
        <div className="col-span-2 flex items-center justify-center space-x-2 py-2 max-2xl:py-1">
          <div className="flex items-center space-x-1 rounded-[10px] border border-white/20 bg-[#07090f] px-2 py-1 text-white/50">
            <p
              onClick={() => setFilterStatus('all')}
              className={`5xl:text-[20px] my-1.5 cursor-pointer rounded-[10px] px-4 py-1 transition-all duration-200 ease-out max-2xl:my-1 max-2xl:text-[12px] ${
                filterStatus === 'all'
                  ? 'scale-108 bg-[#f35714] text-white'
                  : 'scale-100 hover:text-white'
              } `}
            >
              همه
            </p>
            <p
              onClick={() => {
                setFilterStatus('confirmed');
              }}
              className={`5xl:text-[20px] my-1.5 cursor-pointer rounded-[10px] px-4 py-1 transition-all duration-200 ease-out max-2xl:my-1 max-2xl:text-[12px] ${
                filterStatus === 'confirmed'
                  ? 'scale-108 bg-[#f35714] text-white'
                  : 'scale-100 hover:text-white'
              } `}
            >
              امضاء شده
            </p>
            <p
              onClick={() => {
                setFilterStatus('production');
              }}
              className={`5xl:text-[20px] my-1.5 cursor-pointer rounded-[10px] px-4 py-1 transition-all duration-200 ease-out max-2xl:my-1 max-2xl:text-[12px] ${
                filterStatus === 'production'
                  ? 'scale-108 bg-[#f35714] text-white'
                  : 'scale-100 hover:text-white'
              } `}
            >
              تولید
            </p>
            <p
              onClick={() => {
                setFilterStatus('furnace');
              }}
              className={`5xl:text-[20px] my-1.5 cursor-pointer rounded-[10px] px-4 py-1 transition-all duration-200 ease-out max-2xl:my-1 max-2xl:text-[12px] ${
                filterStatus === 'furnace'
                  ? 'scale-108 bg-[#f35714] text-white'
                  : 'scale-100 hover:text-white'
              } `}
            >
              کوره
            </p>
            <p
              onClick={() => {
                setFilterStatus('engineering');
              }}
              className={`5xl:text-[20px] my-1.5 cursor-pointer rounded-[10px] px-4 py-1 transition-all duration-200 ease-out max-2xl:my-1 max-2xl:text-[12px] ${
                filterStatus === 'engineering'
                  ? 'scale-108 bg-[#f35714] text-white'
                  : 'scale-100 hover:text-white'
              } `}
            >
              مهندسی تولید
            </p>

            <p
              onClick={() => {
                setFilterStatus('manager');
              }}
              className={`5xl:text-[20px] my-1.5 cursor-pointer rounded-[10px] px-4 py-1 transition-all duration-200 ease-out max-2xl:my-1 max-2xl:text-[12px] ${
                filterStatus === 'manager'
                  ? 'scale-108 bg-[#f35714] text-white'
                  : 'scale-100 hover:text-white'
              } `}
            >
              مدیریت
            </p>
          </div>
          <div className="5xl:mx-2">
            <input
              type="text"
              value={search}
              placeholder="جستجو..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="5xl:py-3.5 5xl:placeholder:text-[20px] 5xl:w-[40vh] w-[30vh] rounded-[10px] border border-white/20 bg-[#07090f] py-3 placeholder:pr-2 placeholder:text-white/50 max-2xl:text-[12px]"
            />
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="mx-2 hidden max-md:block">
        <div className="my-3 rounded-[10px] border border-[#3a35a0] bg-linear-to-l from-[#201c66] to-[#1d1952] p-2">
          {/* Logo & Title Mobile */}
          <div className="flex items-center space-x-2">
            <p className="rounded-[10px] bg-[#4f46e5] p-2">
              <SiAltiumdesigner />
            </p>
            <p className="text-[13px] font-bold">فرم تغییرات فرمولاسیون بچ </p>
          </div>
          {/* Details Report */}
          <div className="mt-2 grid grid-cols-3 gap-3">
            <p className="flex flex-col items-center justify-center rounded-[10px] bg-[#343181] py-2">
              <span className="text-[11px] font-bold text-[#5e7ef8]">
                کد سند
              </span>
              <span className="text-[] font-[AvenirLTProMedium]">F0505</span>
            </p>
            <p className="flex flex-col items-center justify-center rounded-[10px] bg-[#343181] py-2">
              <span className="text-[11px] font-bold text-[#5e7ef8]">
                شماره ویرایش
              </span>
              <span className="font-[AvenirLTProMedium]">02</span>
            </p>
            <p className="flex flex-col items-center justify-center rounded-[10px] bg-[#343181] py-2">
              <span className="text-[11px] font-bold text-[#5e7ef8]">
                تاریخ ویرایش
              </span>
              <span className="font-[AvenirLTProMedium]">1404/04/02</span>
            </p>
          </div>
        </div>
        {/* Search input */}
        <div className="relative flex w-full justify-between gap-1">
          <div>
            <input
              type="text"
              value={search}
              placeholder="جستجو در گزارش ها ..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="mb-3 h-11 rounded-[10px] border border-[#2c3050] bg-[#22263a] pr-8 font-bold"
            />
            <p className="absolute top-3 right-2 text-white/50">
              <FiSearch />
            </p>
          </div>
          <div
            onClick={openCreate}
            className={`flex h-11 items-center gap-1 rounded-xl px-3 whitespace-nowrap ${
              canCreate
                ? 'cursor-pointer bg-white/10 hover:bg-white/15'
                : 'cursor-not-allowed bg-white/5 opacity-50'
            }`}
          >
            <p className="font-[SamimBold] text-[13px]">افزودن فرم</p>
            <p className="text-[10px]">
              <FaPlus />
            </p>
          </div>
        </div>
        {/* Filters */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center space-x-1 text-[#6b75a0]">
            <p className="font-[AvenirLTProMedium]">
              {filterStatus === 'all' && allReport}
              {filterStatus === 'confirmed' && allSigend}
              {filterStatus === 'production' && withoutSignedProduction}
              {filterStatus === 'furnace' && withoutSignedFurnace}
              {filterStatus === 'engineering' &&
                withoutSigendProductionEngineering}
              {filterStatus === 'manager' && withoutSigendManager}
            </p>
            <p className="font-semibold">گزارش یافت شد</p>
          </div>

          <div
            onClick={() => {
              setOpenFilterMobile(!openFilterMobile);
            }}
            className="relative pl-2 text-[#6b75a0]"
          >
            <p>فیلتر</p>

            {openFilterMobile && (
              <div className="absolute top-1 left-11 flex h-53 w-65 flex-col justify-center space-y-2 overflow-auto rounded-[10px] border border-[#3a35a0] bg-linear-to-l from-[#201c66] to-[#1d1952] pr-1">
                <p
                  onClick={() => {
                    setFilterStatus('all');
                  }}
                  className={`ml-1 rounded-[10px] ${filterStatus === 'all' ? 'bg-gray-200/10 p-1.5 text-white ' : ''}`}
                >
                  کل فرم ها
                </p>
                <p
                  onClick={() => setFilterStatus('confirmed')}
                  className={`ml-1 rounded-[10px] ${filterStatus === 'confirmed' ? 'bg-gray-200/10 p-1.5 text-white ' : ''}`}
                >
                  فرم های امضاء شده
                </p>
                <p
                  onClick={() => setFilterStatus('production')}
                  className={`ml-1 rounded-[10px] ${filterStatus === 'production' ? 'bg-gray-200/10 p-1.5 text-white ' : ''}`}
                >
                  فرم های امضاء نشده تولید
                </p>
                <p
                  onClick={() => setFilterStatus('furnace')}
                  className={`ml-1 rounded-[10px] ${filterStatus === 'furnace' ? 'bg-gray-200/10 p-1.5 text-white ' : ''}`}
                >
                  فرم های امضاء نشده کوره
                </p>
                <p
                  onClick={() => setFilterStatus('engineering')}
                  className={`ml-1 rounded-[10px] ${filterStatus === 'engineering' ? 'bg-gray-200/10 p-1.5 text-white ' : ''}`}
                >
                  فرم های امضاء نشده مهندسی تولید
                </p>

                <p
                  onClick={() => setFilterStatus('manager')}
                  className={`ml-1 rounded-[10px] ${filterStatus === 'manager' ? 'bg-gray-200/10 p-1.5 text-white ' : ''}`}
                >
                  فرم های امضاء نشده مدیرکارخانه
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderPage;
