import React, { useEffect, useState } from 'react';

import close from '../../../../assets/images/close.png';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { useUpdateBiweeklyAmp } from '../../Api/BiWeeklyAmp/biWeeklyAmp';
import { IoCloseSharp } from 'react-icons/io5';

const deviceList = [
  { id: 1, name: 'الکتروگیربکس اسکروکانوایر ترازو مواد رنگی' },
  { id: 2, name: 'الکتروگیربکس اسکرو آهک' },
  { id: 3, name: 'الکتروگیربکس اسکرو دولومیت' },
  { id: 4, name: 'الکتروگیربکس اسکرو مواد بی رنگ' },
  { id: 5, name: 'الکتروگیربکس اسکرو مواد نیترات' },
  { id: 6, name: 'الکتروگیربکس اسکرو مواد سولفات' },
  { id: 7, name: 'نوار سیلیس زیر فیدر' },
  { id: 8, name: 'نوار سیلیس مواد ریزی (ثابت)' },
  { id: 9, name: 'الکترو گیربکس باز کننده اندازه ی طول پلاستیک ' },
  { id: 10, name: 'الکترو گیربکس باز کننده رول یک  شرینک' },
  { id: 11, name: 'الکترو گیربکس باز کننده رول دو  شرینک' },
  { id: 12, name: 'الکترو گیربکس کانوایر  شرینک' },
  { id: 13, name: 'فن وکیوم شرینک' },
  { id: 14, name: 'الکتروگیربکس هدایت کننده پلاستیک' },
  { id: 15, name: 'نوار گردان شاتل' },
  { id: 16, name: 'موتور دستگاه شوک' },
  { id: 17, name: 'کانوایر شیرینگ تونلی1' },
  { id: 18, name: 'کانوایر شیرینگ تونلی2' },
  { id: 19, name: 'فن سیر کوله بالای شیرینگ تونلی1' },
  { id: 20, name: 'فن سیر کوله بالای شیرینگ تونلی2' },
  { id: 21, name: 'الکترو فن سردخانه خط 1-1' },
  { id: 22, name: 'الکترو فن سردخانه خط 1-2' },
  { id: 23, name: 'الکترو فن سردخانه خط 1-3' },
  { id: 24, name: 'الکترو فن سردخانه خط 1-4' },
  { id: 25, name: 'الکترو فن سردخانه خط 1-5' },
  { id: 26, name: 'الکترو فن سردخانه خط 1-6' },
  { id: 27, name: 'الکترو فن سردخانه خط 2-1' },
  { id: 28, name: 'الکترو فن سردخانه خط 2-2' },
  { id: 29, name: 'الکترو فن سردخانه خط2-3' },
  { id: 30, name: 'الکترو فن سردخانه خط 2-4' },
  { id: 31, name: 'الکترو فن سردخانه خط 2-5' },
  { id: 32, name: 'الکترو فن سردخانه خط 2-6' },
  { id: 33, name: 'الکترو فن سردخانه خط 3-1' },
  { id: 34, name: 'الکترو فن سردخانه خط 3-2' },
  { id: 35, name: 'الکترو فن سردخانه خط 3-3' },
  { id: 36, name: 'الکترو فن سردخانه خط 3-4' },
  { id: 37, name: 'الکترو فن سردخانه خط 3-5' },
  { id: 38, name: 'الکترو فن سردخانه خط 3-6' },
  { id: 39, name: 'الکترو گیربکس کانوایر پالت بر 1 خط شرینک' },
  { id: 40, name: 'الکترو گیربکس کانوایر پالت بر 2 خط شرینک' },
  { id: 41, name: 'الکترو گیربکس کانوایر پالت بر 3 خط شرینک' },
  { id: 42, name: 'الکترو گیربکس کانوایر پالت بر 4 خط شرینک' },
  { id: 43, name: 'الکترو گیربکس کانوایر پالت بر 5 خط شرینک' },
  { id: 44, name: 'الکترو گیربکس کانوایر پالت بر 6 خط شرینک' },
  { id: 45, name: 'الکترو گیربکس کانوایر پالت بر 7 خط شرینک' },
  { id: 46, name: 'الکترو گیربکس کانوایر پالت بر 8 خط شرینک' },
  { id: 47, name: 'الکترو گیربکس کانوایر پالت بر 9 خط شرینک' },
  { id: 48, name: 'الکترو گیربکس کانوایر پالت بر 10 خط شرینک' },
  { id: 49, name: 'الکترو گیربکس کانوایر پالت بر 11 خط شرینک' },
  { id: 50, name: 'الکترو گیربکس کانوایر پالت بر 12 خط شرینک' },
  { id: 51, name: 'الکترو گیربکس کانوایر پالت بر 13 خط شرینک' },
  { id: 52, name: 'الکترو گیربکس کانوایر پالت بر 14 خط شرینک' },
  { id: 53, name: 'الکتروموتور سلفن پیچ اصلی' },
  { id: 54, name: 'الکترو گیربکس 1 سلفون پیچ لیفتر' },
  { id: 55, name: 'الکترو گیربکس 2 سلفون پیچ چرخشی سازه' },
  { id: 56, name: 'الکترو گیربکس لیفتر شرینک' },
  { id: 57, name: 'الکترو گیربکس پلاستیک بازکن عرض 1 شرینک' },
  { id: 58, name: 'الکترو گیربکس پلاستیک بازکن عرض 2 شرینک' },
  { id: 59, name: 'الکتروگیربکس کانوایر تسمه کش عمودی' },
  { id: 60, name: 'الکتروموتور آسانسور تسمه کش عمودی' },
  { id: 61, name: 'الکترو گیربکس چرخشی پالت تسمه کشی عمودی' },
  { id: 62, name: 'الکتروموتور بازویی 1تسمه کش عمودی' },
  { id: 63, name: 'الکتروموتور بازویی 2 تسمه کش عمودی' },
  { id: 64, name: 'الکترو موتور آسانسور تسمه کش افقی' },
  { id: 65, name: 'الکتروگیربکس 3تسمه کش افقی' },
  { id: 66, name: 'الکتروگیربکس 1 کانوایر بسته بندی خط 1' },
  { id: 67, name: 'الکتروگیربکس 2 کانوایر بسته بندی خط 1' },
  { id: 68, name: 'الکتروگیربکس 3 کانوایر بسته بندی خط 1' },
  { id: 69, name: 'الکتروگیربکس 4 کانوایر بسته بندی خط 1' },
  { id: 70, name: 'الکتروگیربکس 5 کانوایر بسته بندی خط 1' },
  { id: 71, name: 'الکتروگیربکس 6 کانوایر بسته بندی خط 1' },
  { id: 72, name: 'الکتروگیربکس 7 کانوایر بسته بندی خط 1' },
  { id: 73, name: 'الکتروگیربکس 8 کانوایر بسته بندی خط 1' },
  { id: 74, name: 'الکتروگیربکس 9 کانوایر بسته بندی خط 1' },
  { id: 75, name: 'الکتروگیربکس 10 کانوایر بسته بندی خط 1' },
  { id: 76, name: 'الکتروگیربکس 11 کانوایر بسته بندی خط 1' },
  { id: 77, name: 'الکتروگیربکس 12 کانوایر بسته بندی خط 1' },
  { id: 78, name: 'الکتروگیربکس 13 کانوایر بسته بندی خط 1' },
  { id: 79, name: 'الکتروگیربکس 14 کانوایر بسته بندی خط 1' },
  { id: 80, name: 'الکتروگیربکس 15 کانوایر بسته بندی خط 1' },
  { id: 81, name: 'الکتروگیربکس 16 کانوایر بسته بندی خط 1' },
  { id: 82, name: 'الکتروگیربکس 17 کانوایر بسته بندی خط 1' },
  { id: 83, name: 'الکتروگیربکس 1 کانوایر بسته بندی خط 2' },
  { id: 84, name: 'الکتروگیربکس 2 کانوایر بسته بندی خط 2' },
  { id: 85, name: 'الکتروگیربکس 3 کانوایر بسته بندی خط 2' },
  { id: 86, name: 'الکتروگیربکس 4 کانوایر بسته بندی خط 2' },
  { id: 87, name: 'الکتروگیربکس 6 کانوایر بسته بندی خط 1' },
  { id: 88, name: 'الکتروگیربکس 5 کانوایر بسته بندی خط 2' },
  { id: 89, name: 'الکتروگیربکس 6 کانوایر بسته بندی خط 2' },
  { id: 90, name: 'الکتروگیربکس 7 کانوایر بسته بندی خط 2' },
  { id: 91, name: 'الکتروگیربکس 8 کانوایر بسته بندی خط 2' },
  { id: 92, name: 'الکتروگیربکس 9 کانوایر بسته بندی خط 2' },
  { id: 93, name: 'الکتروگیربکس 10 کانوایر بسته بندی خط 2' },
  { id: 94, name: 'الکتروگیربکس 11 کانوایر بسته بندی خط 2' },
  { id: 95, name: 'الکتروگیربکس 12 کانوایر بسته بندی خط 2' },
  { id: 96, name: 'الکتروگیربکس 13 کانوایر بسته بندی خط 2' },
  { id: 97, name: 'الکتروگیربکس 14 کانوایر بسته بندی خط 2' },
  { id: 98, name: 'الکتروگیربکس 15 کانوایر بسته بندی خط 2' },
  { id: 99, name: 'الکتروگیربکس 16 کانوایر بسته بندی خط 2' },
  { id: 100, name: 'الکتروگیربکس 17 کانوایر بسته بندی خط 2' },
  { id: 101, name: 'الکتروگیربکس 1 کانوایر بسته بندی خط 3' },
  { id: 102, name: 'الکتروگیربکس 2 کانوایر بسته بندی خط 3' },
  { id: 103, name: 'الکتروگیربکس 3 کانوایر بسته بندی خط 3' },
  { id: 104, name: 'الکتروگیربکس 4 کانوایر بسته بندی خط 3' },
  { id: 105, name: 'الکتروگیربکس 5 کانوایر بسته بندی خط 3' },
  { id: 106, name: 'الکتروگیربکس 6 کانوایر بسته بندی خط 3' },
  { id: 107, name: 'الکتروگیربکس 7 کانوایر بسته بندی خط 3' },
  { id: 108, name: 'الکتروگیربکس 8 کانوایر بسته بندی خط 3' },
  { id: 109, name: 'الکتروگیربکس 9 کانوایر بسته بندی خط 3' },
  { id: 110, name: 'الکتروگیربکس 10 کانوایر بسته بندی خط 3' },
  { id: 111, name: 'الکتروگیربکس 11کانوایر بسته بندی خط 3' },
  { id: 112, name: 'الکتروگیربکس 12کانوایر بسته بندی خط 3' },
  { id: 113, name: 'الکتروگیربکس 13کانوایر بسته بندی خط 3' },
  { id: 114, name: 'الکتروگیربکس 14 کانوایر بسته بندی خط 3' },
  { id: 115, name: 'الکتروگیربکس 15 کانوایر بسته بندی خط 3' },
  { id: 116, name: 'الکتروگیربکس 16 کانوایر بسته بندی خط 3' },
  { id: 117, name: 'الکتروگیربکس 17 کانوایر بسته بندی خط 3' },
  { id: 118, name: 'الکترو گیربکس آسانسور 1 ماشین شاتل' },
  { id: 119, name: 'الکترو گیربکس آسانسور 2 ماشین شاتل' },
  { id: 120, name: 'الکترو گیربکس رفت و برگشت  ماشین شاتل' },
  { id: 121, name: 'الکترو گیربکس کانوایر ماشین شاتل2-1' },
  { id: 122, name: 'الکترو گیربکس کانوایر ماشین شالل1-2' },
  { id: 123, name: 'فن سقف فورهارث1-1 خط1 ' },
  { id: 124, name: 'فن سقف فورهارث2-1 خط1' },
  { id: 125, name: 'فن سقف فورهارث1-2 خط2' },
  { id: 126, name: 'فن سقف فورهارث2-2 خط2' },
  { id: 127, name: 'فن سقف فورهارث1-3 خط3' },
  { id: 128, name: 'فن سقف فورهارث2-3 خط3' },
  { id: 129, name: 'فن کف فورهارث خط1' },
  { id: 130, name: 'فن کف فورهارث خط2' },
  { id: 131, name: 'فن کف فورهارث خط3' },
  { id: 132, name: 'یونیت روغن ماشین IS خط1' },
  { id: 133, name: 'یونیت روغن ماشین IS خط2' },
  { id: 134, name: 'یونیت روغن ماشین IS خط3' },
  { id: 135, name: 'همزن آب صابون خط1' },
  { id: 136, name: 'همزن آب صابون خط2' },
  { id: 137, name: 'همزن آب صابون خط3' },
  { id: 138, name: 'تراش  CNC شماره C' },
  { id: 139, name: 'فرز  CNC شماره E' },
  { id: 140, name: 'تراش  CNC شماره A' },
  { id: 141, name: 'فرز  CNC شماره C' },
  { id: 142, name: 'فرز  CNC شماره A' },
  { id: 143, name: 'فرز  CNC شماره B' },
  { id: 144, name: 'فرز  CNC شماره D' },
  { id: 145, name: 'تراش  CNC شماره B' },
  { id: 146, name: 'فرز  CNC شماره F' },
  { id: 147, name: 'تراش CNC شماره D' },
  { id: 148, name: 'گاندریل' },
  { id: 149, name: 'دریل ستونی' },
  { id: 150, name: 'تراش یونیورسال سبزC' },
  { id: 151, name: 'تراش یونیورسال قرمز مشکی A' },
  { id: 152, name: 'تراش یونیورسال قرمز مشکی B' },
  { id: 153, name: 'سوپردریل' },
  { id: 154, name: 'فرز MANUAL' },
  { id: 155, name: 'هواکش میز پولیش' },
  { id: 156, name: 'چهارنظام' },
  { id: 157, name: 'الکترو میزگردان شات پلاس' },
  { id: 158, name: 'الکترو گیربکس الواتر شات پلاس' },
  { id: 159, name: 'الکترو فن موتور پرتاپ ساچمه' },
  { id: 160, name: 'الکترو موتور موتور ویبراتور' },
  { id: 161, name: ' الکتروگیربکس میزگردان قطعه شور' },
  { id: 162, name: 'الکتروگیربکس پمپ آب قطعه شور' },
];
function EditBiWeeklyAmp({
  openEditModal,
  setOpenEditModal,
  selectedBiWeeklyAmp,
  setSelectedBiWeeklyAmp,
}) {
  const [form, setForm] = useState({
    companyId: '',
    id: '',
    reportDate: '',
    shiftName: '',
    personnelName: '',
    shiftFlags: 0,
    items: deviceList.map((d, index) => ({
      id: '',
      deviceName: d?.name,
      frequency: 0,
      power: 0,
      t: 0,
      s: 0,
      r: 0,
      orderIndex: 0,
    })),
  });

  useEffect(() => {
    if (!selectedBiWeeklyAmp) return;

    setForm({
      companyId: selectedBiWeeklyAmp?.companyId,
      id: selectedBiWeeklyAmp.id,
      reportDate: selectedBiWeeklyAmp.reportDate,
      shiftName: selectedBiWeeklyAmp.shiftName,
      personnelName: selectedBiWeeklyAmp.personnelName,
      shiftFlags: selectedBiWeeklyAmp.shiftFlags,
      items: selectedBiWeeklyAmp?.items?.length
        ? selectedBiWeeklyAmp.items.map((e) => ({
            id: e.id,
            deviceName: e.deviceName,
            frequency: e.frequency,
            power: e.power,
            t: e.t,
            s: e.s,
            r: e.r,
            orderIndex: e.orderIndex,
          }))
        : deviceList.map((d) => ({
            id: '',
            deviceName: d.name,
            frequency: 0,
            power: 0,
            t: 0,
            s: 0,
            r: 0,
            orderIndex: 0,
          })),
    });
  }, [selectedBiWeeklyAmp, openEditModal]);

  const handleItemChange = (index, field, value) => {
    setForm((prev) => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, items };
    });
  };

  const closeHandler = () => {
    setOpenEditModal(false);
    setSelectedBiWeeklyAmp(null);
  };

  const updateReport = useUpdateBiweeklyAmp();

  const submitHandler = (e) => {
    e.preventDefault();
    updateReport.mutate(
      { id: selectedBiWeeklyAmp?.id, form },
      {
        onSuccess: () => {
          closeHandler();
        },
      }
    );
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center overflow-auto p-4 transition-opacity duration-300 ${
        openEditModal
          ? 'pointer-events-auto opacity-100 '
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={closeHandler}
      />
      <div
        className={`no-scrollbar relative flex max-h-[90vh] transform flex-col overflow-auto rounded-[15px] bg-linear-to-b from-[#1c1c1c] to-[#0c0c0c] px-6 py-4 text-white shadow-2xl transition-all duration-300 ${
          openEditModal
            ? ' translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="flex shrink-0 items-center justify-between pb-5">
          <h2 className="font-[SamimBold] text-[20px] max-md:text-[15px]">
            ویرایش گزارش هفتگی آمپر گیری
          </h2>
          <p
            onClick={closeHandler}
            className="5xl:size-12 5xl:text-[35px] flex size-7 cursor-pointer items-center justify-center rounded-lg text-[16px] text-white/50 transition-all delay-75 duration-100 hover:bg-white/10 hover:text-white"
          >
            <span>
              <IoCloseSharp />
            </span>
          </p>
        </div>
        <form
          id="BiweeklyAmpForms"
          onSubmit={submitHandler}
          className="no-scrollbar flex min-h-0 flex-col overflow-x-hidden overflow-y-auto max-md:max-h-[70vh]"
        >
          {/* Personnel Details */}
          <div className="grid grid-cols-3 gap-2 max-md:flex max-md:flex-col">
            <label htmlFor="reportDate" className="flex flex-col">
              تاریخ
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                placeholder="تاریخ ثبت گزارش"
                format="YYYY/MM/DD"
                calendarPosition="bottom-center"
                onChange={(value) => {
                  setForm({
                    ...form,
                    reportDate: value
                      ? value.toDate().toISOString().split('T')[0]
                      : '',
                  });
                }}
                value={form.reportDate ? new Date(form.reportDate) : ''}
                inputClass="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
            <label htmlFor="shiftName" className="flex flex-col">
              نام شیفت
              <input
                type="text"
                readOnly
                value={form.shiftName || ''}
                className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
            <label htmlFor="personnelName">
              نام و نام خانوادگی
              <input
                type="text"
                name="personnelName"
                readOnly
                value={form.personnelName || ''}
                className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
          </div>
          {/* Daily Work */}
          <div className="mt-4 grid grid-cols-4 gap-4 max-md:grid-cols-2 max-md:gap-2">
            <label
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all max-md:text-[14px] ${
                form.shiftFlags === 2
                  ? 'border-white bg-white text-black'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[20px]`}
            >
              <input
                type="radio"
                name="shiftFlags"
                value={2}
                checked={form.shiftFlags === 2}
                onChange={() =>
                  setForm({
                    ...form,
                    shiftFlags: 2,
                  })
                }
                className="hidden"
              />
              روز کاری اول
            </label>
            <label
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all max-md:text-[14px] ${
                form.shiftFlags === 4
                  ? 'border-white bg-white text-black'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[20px]`}
            >
              <input
                type="radio"
                name="shiftFlags"
                value={4}
                checked={form.shiftFlags === 4}
                onChange={() =>
                  setForm({
                    ...form,
                    shiftFlags: 4,
                  })
                }
                className="hidden"
              />
              روز کاری دوم
            </label>
            <label
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all max-md:text-[13px] ${
                form.shiftFlags === 6
                  ? 'border-white bg-white text-black'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[20px]`}
            >
              <input
                type="radio"
                name="shiftFlags"
                value={6}
                checked={form.shiftFlags === 6}
                onChange={() =>
                  setForm({
                    ...form,
                    shiftFlags: 6,
                  })
                }
                className="hidden"
              />
              شب کاری اول
            </label>
            <label
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all max-md:text-[13px] ${
                form.shiftFlags === 8
                  ? 'border-white bg-white text-black'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[20px]`}
            >
              <input
                type="radio"
                name="shiftFlags"
                value={8}
                checked={form.shiftFlags === 8}
                onChange={() =>
                  setForm({
                    ...form,
                    shiftFlags: 8,
                  })
                }
                className="hidden"
              />
              شب کاری دوم
            </label>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-[12px] max-md:grid-cols-1">
            {form.items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-4 rounded-[10px] border p-2"
              >
                <label
                  htmlFor="deviceName"
                  className="flex flex-col font-[SamimBold]"
                >
                  نام دستگاه
                  <input
                    type="text"
                    value={item.deviceName || ''}
                    readOnly
                    className="mt-1 rounded-xl bg-white/10 p-3 font-[Samim] text-white outline-none"
                  />
                </label>
                <label
                  htmlFor="frequency"
                  className="flex flex-col font-[SamimBold]"
                >
                  فرکانس
                  <input
                    type="number"
                    step="0.001"
                    placeholder="فرکانس"
                    value={item.frequency ?? 0}
                    onChange={(e) =>
                      handleItemChange(index, 'frequency', e.target.value)
                    }
                    className="mt-1 rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-white outline-none"
                    onWheel={(e) => e.currentTarget.blur()}
                  />
                </label>
                <label
                  htmlFor="power"
                  className="flex flex-col font-[SamimBold]"
                >
                  توان
                  <input
                    type="number"
                    step="0.001"
                    placeholder="توان"
                    value={item.power ?? 0}
                    onChange={(e) =>
                      handleItemChange(index, 'power', e.target.value)
                    }
                    className="mt-1 rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-white outline-none"
                    onWheel={(e) => e.currentTarget.blur()}
                  />
                </label>
                <label htmlFor="t" className="flex flex-col font-[SamimBold]">
                  T
                  <input
                    type="number"
                    step="0.001"
                    placeholder="t"
                    value={item.t ?? 0}
                    onChange={(e) =>
                      handleItemChange(index, 't', e.target.value)
                    }
                    className="rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-white outline-none"
                    onWheel={(e) => e.currentTarget.blur()}
                  />
                </label>
                <label htmlFor="s" className="flex flex-col font-[SamimBold]">
                  S
                  <input
                    type="number"
                    step="0.001"
                    placeholder="s"
                    value={item.s ?? 0}
                    onChange={(e) =>
                      handleItemChange(index, 's', e.target.value)
                    }
                    className="rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-white outline-none"
                    onWheel={(e) => e.currentTarget.blur()}
                  />
                </label>
                <label htmlFor="r" className="flex flex-col font-[SamimBold]">
                  R
                  <input
                    type="number"
                    step="0.001"
                    placeholder="r"
                    value={item.r ?? 0}
                    onChange={(e) =>
                      handleItemChange(index, 'r', e.target.value)
                    }
                    className="rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-white outline-none"
                    onWheel={(e) => e.currentTarget.blur()}
                  />
                </label>
              </div>
            ))}
          </div>
        </form>
        <div className="col-span-3 mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={closeHandler}
            className="cursor-pointer rounded-xl bg-white/10 px-5 py-3 font-[Vazirmatn] text-sm transition hover:bg-white/20"
          >
            انصراف
          </button>
          <button
            type="submit"
            form="BiweeklyAmpForms"
            className="cursor-pointer rounded-xl bg-orange-700/95 px-5 py-3 font-[Vazirmatn] text-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ثبت گزارش
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditBiWeeklyAmp;
