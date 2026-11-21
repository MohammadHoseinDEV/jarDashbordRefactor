import React, { useState } from 'react';
import { FaClipboardList, FaHashtag } from 'react-icons/fa';
import { FiBell, FiCalendar, FiSearch } from 'react-icons/fi';
import { getToday, toShamsi } from '../../../../../Time/date';
import { MdNoteAdd } from 'react-icons/md';
import { TbReport } from 'react-icons/tb';

function ProcssValidationHeader({
  process,
  filter,
  setFilter,
  canCreate,
  openCreate,
  totalCount,
}) {
  const [openFilterMobile, setOpenFilterMobile] = useState(false);

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
            فرم استعلام صحه گذاری فرایند
          </p>
          <p className="block pt-1 text-xl md:hidden">
            <FiBell />
          </p>
        </div>
        {/* Details */}
        <div className="flex items-center space-x-5 pl-5 text-white max-md:hidden">
          <p className="flex space-x-1 text-[12px]">
            <span className="text-[17px] text-[#d84f15]">
              <FiCalendar />
            </span>
            <span className="font-[SamimBold] text-[12px]">تاریخ ویرایش :</span>
            <span className="font-[AvenirLTProMedium] text-[12px]">
              1401/10/15
            </span>
          </p>
          <p className="space-x-1 text-[12px]">
            <span className="font-[SamimBold]">شماره ویرایش :</span>
            <span className="font-[AvenirLTProMedium]">01</span>
          </p>
          <p className="space-x-1 text-[12px]">
            <span className="font-[SamimBold]">کد سند :</span>
            <span className="font-[AvenirLTProMedium]">F0714</span>
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
              افزودن گزارش
            </p>
            <p className="4xl:text-[30px] text-[#d84f15] transition-all delay-150 duration-700 ease-in-out group-hover:rotate-360 md:text-lg 2xl:text-2xl">
              <MdNoteAdd />
            </p>
          </button>
        </div>
        <div className="4xl:mx-2 flex items-center space-x-2"></div>
        {/* <div className="flex items-center justify-end space-x-2 pt-2 pl-5 opacity-0">
                                  <button className="flex items-center justify-center rounded-[10px] bg-[#0e1117] px-4 py-2 text-[13px] text-white/70">
                                    <FaDownload />
                                    <span className="pr-2">خروجی اکسل</span>
                                  </button>
                                  <button className="flex items-center justify-center rounded-[10px] bg-[#f35714] px-4 py-2 text-[13px] text-white">
                                    <FaFilter />
                                    <span className="pr-2">فیلتر پیشرفته</span>
                                  </button>
                                </div> */}
      </div>

      {/* data reports */}
      <div className="mt-1 hidden grid-cols-3 gap-2 space-x-2 md:mx-2 md:grid">
        <div
          onClick={() => setFilter((f) => ({ ...f, status: 'all', page: 1 }))}
          className="flex cursor-pointer rounded-[10px] border border-[#be4615]/50 transition-all delay-100 duration-200 ease-in-out hover:scale-105 md:py-1 2xl:py-2"
        >
          <div className="4xl:p-3 4xl:text-[30px] my-auto p-2 md:p-2 md:text-[16px] 2xl:text-[18px]">
            <p className="4xl:size-15 flex size-11 items-center justify-center rounded-[10px] bg-[#be4615]/25 text-[#be4615] md:size-8 2xl:size-10">
              <FaHashtag />
            </p>
          </div>
          <p className="my-auto border-l-2 border-[#f35714]/70 md:h-10 2xl:h-13"></p>
          <div className="my-auto px-2">
            <p className="font-[AvenirLTProHeavy] font-extrabold text-white md:text-xl 2xl:text-2xl">
              {totalCount}
            </p>
            <p className="4xl:text-[20px] text-white/60 md:text-sm 2xl:text-lg">
              کل گزارش ها
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="mx-2 mt-1 flex items-center justify-between max-md:hidden">
        <div className="col-span-4 flex items-center space-x-1 pr-5">
          <p className="text-[30px] text-[#e54c00]">
            <TbReport />
          </p>
          <p className="font-[SamimBold] text-[20px] text-white">
            لیست گزارشات
          </p>
        </div>
        <div className="col-span-2 flex items-center space-x-3 py-2">
          {/* <div className="flex items-center space-x-2 rounded-[10px] border border-white/20 bg-[#07090f] px-2 text-white/50">
            <p
              onClick={() => setFilterStatus('all')}
              className={`my-1 cursor-pointer rounded-[10px] px-4 py-1 transition-all duration-200 ease-out ${
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
              className={`my-1 cursor-pointer rounded-[10px] px-4 py-1 transition-all duration-200 ease-out ${
                filterStatus === 'confirmed'
                  ? 'scale-108 bg-[#f35714] text-white'
                  : 'scale-100 hover:text-white'
              } `}
            >
              امضاء شده
            </p>
            <p
              onClick={() => {
                setFilterStatus('pending');
              }}
              className={`my-1 cursor-pointer rounded-[10px] px-4 py-1 transition-all duration-200 ease-out ${
                filterStatus === 'pending'
                  ? 'scale-108 bg-[#f35714] text-white'
                  : 'scale-100 hover:text-white'
              } `}
            >
              درانتظار
            </p>
            <p
              onClick={() => {
                setFilterStatus('unSign');
              }}
              className={`my-1 cursor-pointer rounded-[10px] px-4 py-1 transition-all duration-200 ease-out ${
                filterStatus === 'unSign'
                  ? 'scale-108 bg-[#f35714] text-white'
                  : 'scale-100 hover:text-white'
              } `}
            >
              بدون امضاء
            </p>
          </div> */}
          <div>
            <input
              type="text"
              value={filter.search}
              placeholder="جستجو گزارش..."
              onChange={(e) => {
                setFilter((f) => ({ ...f, search: e.target.value, page: 1 }));
              }}
              className="4xl:py-3.5 4xl:placeholder:text-[20px] 4xl:w-[60vh] rounded-[10px] border border-white/20 bg-white/5 py-3 pr-2 placeholder:pr-2 placeholder:text-white/50 md:w-[30vh] md:text-xs 2xl:w-[50vh] 2xl:pr-2 2xl:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="mx-2 mt-2 md:hidden">
        {/* Search input */}
        <div className="relative my-2 grid grid-cols-3 gap-2">
          <div className="col-span-2">
            <input
              type="text"
              value={filter.search}
              placeholder="جستجو در گزارش ها     ..."
              onChange={(e) => {
                setFilter((f) => ({ ...f, search: e.target.value, page: 1 }));
              }}
              className="h-10 w-full rounded-[10px] border border-white/10 bg-white/5 pr-8 font-[Vazirmatn] text-xs font-semibold"
            />
            <p className="absolute top-3 right-2 text-white/50">
              <FiSearch />
            </p>
          </div>
          <div
            onClick={openCreate}
            className={`col-span-1 flex h-10 items-center justify-center gap-1 rounded-xl border border-white/10 whitespace-nowrap ${
              canCreate
                ? 'cursor-pointer bg-white/10 hover:bg-white/15'
                : 'cursor-not-allowed bg-white/5 opacity-50'
            }`}
          >
            <p className="4xl:text-2xl relative cursor-pointer font-[Vazirmatn] text-[12px] font-semibold md:text-sm">
              افزودن گزارش
            </p>
            <p className="4xl:text-[30px] text-lg text-[#d84f15] md:text-lg 2xl:text-2xl">
              <MdNoteAdd />
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <p className="font-[AvenirLTProMedium]">{totalCount}</p>
            <p className="font-[Vazirmatn] text-sm font-semibold">
              گزارش یافت شد
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcssValidationHeader;
