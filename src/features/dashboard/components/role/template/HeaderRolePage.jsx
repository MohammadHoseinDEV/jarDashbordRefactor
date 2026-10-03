import React from 'react';
import {
  FaCheck,
  FaClipboardList,
  FaDownload,
  FaFilter,
  FaPlus,
} from 'react-icons/fa';
import { FiBell, FiCalendar, FiSearch } from 'react-icons/fi';
import { MdNoteAdd, MdNumbers } from 'react-icons/md';
import { getToday, toShamsi } from '../../../../../Time/date';
import { TbReport } from 'react-icons/tb';

function HeaderRolePage({
  canCreate,
  openCreate,
  search,
  setSearch,
  totalCount,
  roles,
  filterStatus,
  setFilterStatus,
  totalGlobalCount,
  totalInternalCount,
  openFilterMobile,
  setOpenFilterMobile,
  filterAccess,
}) {
  return (
    <div className="w-full">
      {/* Title & Deatails */}
      <div className="mx-2 mt-1 flex items-center justify-between border-b border-white/30 pb-2">
        {/* Title */}
        <div className="flex w-full items-center justify-between space-x-5 text-white md:flex md:w-fit md:items-center">
          <p className="4xl:size-12 hidden size-10 rounded-[10px] bg-[#e54c00] md:flex md:size-8 md:items-center md:justify-center">
            <span className="4xl:text-[30px] md:text-xl">
              <FaClipboardList />
            </span>
          </p>
          <p className="hidden w-3 opacity-0 max-md:block"></p>
          <p className="4xl:text-[25px] font-[Vazirmatn] text-xl font-semibold md:text-lg">
            مدیریت نقش ها
          </p>
          <p className="block pt-1 text-xl md:hidden">
            <FiBell />
          </p>
        </div>
        {/* Details */}
        <div className="hidden space-x-5 pl-5 text-white md:flex md:items-center md:justify-center">
          <p className="flex items-center space-x-1">
            <span className="4xl:text-[25px] text-[#d84f15]">
              <FiCalendar />
            </span>
            <span className="4xl:text-[20px] font-[Vazirmatn] font-semibold md:text-xs xl:text-sm">
              تاریخ :
            </span>
            <span className="4xl:text-[20px] flex items-center font-[Vazirmatn] font-semibold md:text-xs xl:text-sm">
              {toShamsi(getToday)}
            </span>
          </p>
        </div>
      </div>

      {/* Add Reports & Excel */}
      <div className="4xl:my-3 mx-2 mt-1 hidden items-center justify-between md:flex 2xl:my-2">
        <div className="flex items-center text-white">
          <button
            onClick={openCreate}
            className={`group flex items-center justify-center gap-2 rounded-xl py-2 font-[Samim] md:px-3 2xl:px-4 ${
              canCreate
                ? 'cursor-pointer bg-white/10 hover:bg-white/15'
                : 'cursor-not-allowed bg-white/5 opacity-50'
            }`}
          >
            <p className="4xl:text-2xl relative cursor-pointer transition-all delay-150 duration-200 ease-in-out after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-white/50 after:transition-all after:duration-700 after:ease-out hover:scale-105 hover:after:w-full md:text-sm">
              افزودن نقش
            </p>
            <p className="4xl:text-[30px] text-[#d84f15] transition-all delay-150 duration-700 ease-in-out group-hover:rotate-360 md:text-lg 2xl:text-2xl">
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

      {/* data reports */}
      <div className="mt-1 hidden grid-cols-3 gap-2 space-x-2 md:mx-2 md:grid">
        <div
          onClick={() => setFilterStatus('all')}
          className="flex cursor-pointer rounded-[10px] border border-[#be4615]/50 transition-all delay-100 duration-200 ease-in-out hover:scale-105 md:py-1 2xl:py-2"
        >
          <div className="4xl:p-3 4xl:text-[30px] my-auto p-2 md:p-2 md:text-[16px] 2xl:text-[18px]">
            <p className="4xl:size-15 flex size-11 items-center justify-center rounded-[10px] bg-[#be4615]/25 text-[#be4615] md:size-8 2xl:size-10">
              <MdNumbers />
            </p>
          </div>
          <p className="my-auto border-l-2 border-[#f35714]/70 md:h-10 2xl:h-13"></p>
          <div className="my-auto px-2">
            <p className="font-[AvenirLTProHeavy] font-extrabold text-white md:text-xl 2xl:text-2xl">
              {totalCount}
            </p>
            <p className="4xl:text-[20px] text-white/60 md:text-sm 2xl:text-lg">
              کل نقش ها
            </p>
          </div>
        </div>
        {filterAccess && (
          <div className="col-span-2 grid grid-cols-2 gap-2">
            <div
              onClick={() => setFilterStatus('global')}
              className="flex cursor-pointer rounded-[10px] border border-[#a6e3a1]/50 py-2 transition-all delay-100 duration-200 ease-in-out hover:scale-105 md:py-1 2xl:py-2"
            >
              <div className="4xl:p-3 4xl:text-[30px] my-auto p-2 md:p-2 md:text-[16px] 2xl:text-[18px]">
                <p className="4xl:size-15 flex size-11 items-center justify-center rounded-[10px] bg-[#1e2625]/25 text-[#a6e3a1] md:size-8 2xl:size-10">
                  <FaCheck />
                </p>
              </div>
              <p className="my-auto border-l-2 border-[#a6e3a1] md:h-10 2xl:h-13"></p>
              <div className="my-auto px-2">
                <p className="font-[AvenirLTProHeavy] font-extrabold text-white md:text-xl 2xl:text-2xl">
                  {totalGlobalCount}
                </p>
                <p className="4xl:text-[20px] text-white/60 md:text-sm 2xl:text-lg">
                  نقش سراسری
                </p>
              </div>
            </div>

            <div
              onClick={() => setFilterStatus('internal')}
              className="flex cursor-pointer rounded-[10px] border border-[#14f3ec]/50 py-2 transition-all delay-100 duration-200 ease-in-out hover:scale-105 md:py-1 2xl:py-2"
            >
              <div className="4xl:p-3 4xl:text-[30px] my-auto p-2 md:p-2 md:text-[16px] 2xl:text-[18px]">
                <p className="4xl:size-15 flex size-11 items-center justify-center rounded-[10px] bg-[#14f3ec]/25 text-[#14f3ec] md:size-8 2xl:size-10">
                  <MdNumbers />
                </p>
              </div>
              <p className="my-auto border-l-2 border-[#14f3ec] md:h-10 2xl:h-13"></p>
              <div className="my-auto px-2">
                <p className="font-[AvenirLTProHeavy] font-extrabold text-white md:text-2xl xl:text-2xl">
                  {totalInternalCount}
                </p>
                <p className="4xl:text-[20px] text-white/60 md:text-sm 2xl:text-lg">
                  نقش داخلی
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search & Filter */}
      <div className="mx-2 mt-1 hidden items-center justify-between md:flex">
        <div className="col-span-4 flex items-center space-x-1 pr-5">
          <p className="4xl:text-[40px] text-[#e54c00] md:text-xl 2xl:text-2xl">
            <TbReport />
          </p>
          <p className="4xl:text-[25px] font-[SamimBold] text-white md:text-[15px] 2xl:text-xl">
            لیست نقش ها
          </p>
        </div>
        <div className="col-span-2 flex items-center justify-center space-x-2 md:py-1 2xl:py-2">
          {filterAccess && (
            <div className="flex items-center space-x-1 rounded-[10px] border border-white/20 bg-[#07090f] px-2 py-1 text-white/50">
              <p
                onClick={() => setFilterStatus('all')}
                className={`4xl:text-[20px] cursor-pointer rounded-[10px] px-4 py-1 transition-all duration-200 ease-out md:my-1 md:text-[12px] 2xl:text-base ${
                  filterStatus === 'all'
                    ? 'scale-108 bg-[#f35714] text-white'
                    : 'scale-100 hover:text-white'
                } `}
              >
                همه
              </p>

              <p
                onClick={() => {
                  setFilterStatus('global');
                }}
                className={`4xl:text-[20px] cursor-pointer rounded-[10px] px-4 py-1 transition-all duration-200 ease-out md:my-1 md:text-[12px] 2xl:text-base ${
                  filterStatus === 'global'
                    ? 'scale-108 bg-[#f35714] text-white'
                    : 'scale-100 hover:text-white'
                } `}
              >
                سراسری
              </p>
              <p
                onClick={() => {
                  setFilterStatus('internal');
                }}
                className={`4xl:text-[20px] cursor-pointer rounded-[10px] px-4 py-1 transition-all duration-200 ease-out md:my-1 md:text-[12px] 2xl:text-base ${
                  filterStatus === 'internal'
                    ? 'scale-108 bg-[#f35714] text-white'
                    : 'scale-100 hover:text-white'
                } `}
              >
                داخلی
              </p>
            </div>
          )}
          <div className="4xl:mx-2">
            <input
              type="text"
              value={search}
              placeholder="جستجو..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="4xl:py-3.5 4xl:placeholder:text-[20px] 4xl:w-[40vh] w-[30vh] rounded-[10px] border border-white/20 bg-[#07090f] py-3 placeholder:pr-2 placeholder:text-white/50 md:text-xs 2xl:pr-2 2xl:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="mx-2 mt-2 md:hidden">
        {/* Search input */}
        <div className="relative my-2 grid grid-cols-4 gap-2">
          <div className="col-span-3">
            <input
              type="text"
              value={search}
              placeholder="جستجو در نقش ها ..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="mb-3 h-10 w-full rounded-[10px] border border-white/10 bg-white/5 pr-8 font-[Vazirmatn] text-sm font-semibold"
            />
            <p className="absolute top-3 right-2 text-white/50">
              <FiSearch />
            </p>
          </div>
          <div
            onClick={openCreate}
            className={`flex h-10 items-center justify-center gap-1 rounded-xl border border-white/10 whitespace-nowrap ${
              canCreate
                ? 'cursor-pointer bg-white/10 hover:bg-white/15'
                : 'cursor-not-allowed bg-white/5 opacity-50'
            }`}
          >
            <p className="4xl:text-2xl relative cursor-pointer font-[Vazirmatn] text-sm font-semibold md:text-sm">
              افزودن نقش
            </p>
            <p className="4xl:text-[30px] text-lg text-[#d84f15] md:text-lg 2xl:text-2xl">
              <MdNoteAdd />
            </p>
          </div>
        </div>
        {/* Filters */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <p className="font-[AvenirLTProMedium]">
              {filterStatus === 'all' && totalCount}
              {filterStatus === 'global' && totalGlobalCount}
              {filterStatus === 'internal' && totalInternalCount}
            </p>
            <p className="font-[Vazirmatn] text-sm font-semibold">
              نقش یافت شد
            </p>
          </div>

          {filterAccess && (
            <div
              onClick={() => {
                setOpenFilterMobile(!openFilterMobile);
              }}
              className="relative pl-2 font-[Vazirmatn] text-sm font-semibold"
            >
              <p>فیلتر</p>

              {openFilterMobile && (
                <div className="absolute top-1 left-11 z-999 flex w-max flex-col justify-center space-y-2 overflow-auto rounded-[10px] border border-white/10 bg-linear-to-b from-[#1c1c1c] to-[#0c0c0c] px-2 py-1 font-[Vazirmatn]">
                  <p
                    onClick={() => {
                      setFilterStatus('all');
                    }}
                    className={`ml-1 rounded-[10px] ${filterStatus === 'all' ? 'bg-gray-200/10 p-1.5 text-white ' : ''}`}
                  >
                    کل نقش ها
                  </p>
                  <p
                    onClick={() => setFilterStatus('global')}
                    className={`ml-1 rounded-[10px] ${filterStatus === 'global' ? 'bg-gray-200/10 p-1.5 text-white ' : ''}`}
                  >
                    نقش های سراسری
                  </p>
                  <p
                    onClick={() => setFilterStatus('internal')}
                    className={`ml-1 rounded-[10px] ${filterStatus === 'internal' ? 'bg-gray-200/10 p-1.5 text-white ' : ''}`}
                  >
                    نقش های داخلی
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderRolePage;
