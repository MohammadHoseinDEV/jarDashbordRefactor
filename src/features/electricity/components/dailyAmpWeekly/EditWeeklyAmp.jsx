import React, { useEffect, useState } from 'react';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { useUpdateWeeklyAmp } from '../../Api/dailyAmpWeekly/WeeklyAmp';
import { IoCloseSharp } from 'react-icons/io5';

const deviceList = [
  { id: 1, name: 'توزیع کننده خط1' },
  { id: 2, name: 'توزیع کننده خط2' },
  { id: 3, name: 'توزیع کننده خط3' },
  { id: 4, name: 'الکتروگیربکس تیوب خط 1' },
  { id: 5, name: 'الکتروگیربکس تیوب خط 2' },
  { id: 6, name: 'الکتروگیربکس تیوب خط 3' },
  { id: 7, name: 'الکتروگیربکس کانوایر ماشین خط 1' },
  { id: 8, name: 'الکتروگیربکس کانوایر ماشین خط 2' },
  { id: 9, name: 'الکتروگیربکس کانوایر ماشین خط 3' },
  { id: 10, name: 'الکتروگیربکس همزن خط 1 ' },
  { id: 11, name: 'الکتروگیربکس همزن خط 2' },
  { id: 12, name: 'الکتروگیربکس همزن خط 3' },
  { id: 13, name: 'سروموتور پلانجر فیدر خط 1' },
  { id: 14, name: 'سروموتور پلانجر فیدر خط 2' },
  { id: 15, name: 'سروموتور پلانجر فیدر خط 3' },
  { id: 16, name: 'سروموتور راست قیچی فیدر خط 1' },
  { id: 17, name: 'سروموتور چپ قیچی فیدر خط 1' },
  { id: 18, name: 'سروموتور راست قیچی فیدر خط 2' },
  { id: 19, name: 'سروموتور چپ قیچی فیدر خط 2' },
  { id: 20, name: 'سروموتور راست قیچی فیدر خط 3' },
  { id: 21, name: 'سروموتور چپ قیچی فیدر خط 3' },
  { id: 22, name: 'سروموتور ترانسفر خط 1' },
  { id: 23, name: 'سروموتور ترانسفر خط 2' },
  { id: 24, name: 'سروموتور ترانسفر خط 3' },
  { id: 25, name: 'سروموتور up/down استاکر خط 1' },
  { id: 26, name: 'سروموتور for/rev استاکر خط 1' },
  { id: 27, name: 'سروموتور  up/down استاکر خط 2' },
  { id: 28, name: 'سروموتور  for/rev استاکر خط 2' },
  { id: 29, name: 'سروموتور  up/down استاکر خط 3' },
  { id: 30, name: 'سروموتور  for/rev  استاکر خط 3' },
  { id: 31, name: 'سروموتور کراس کانوایر خط 1' },
  { id: 32, name: 'سروموتور کراس کانوایر خط 2' },
  { id: 33, name: 'سروموتور کراس کانوایر خط 3' },
  { id: 34, name: 'الکترو موتور  درایر 1' },
  { id: 35, name: 'الکتروموتور  درایر 2' },
  { id: 36, name: 'الکترو گیربکس بچ شارژر راست' },
  { id: 37, name: 'الکتروگیر بکس بچ شارژر چپ' },
  { id: 38, name: 'الکتروموتور فن1-1سیرکوله گرمخانه خط 1' },
  { id: 39, name: 'الکتروموتور فن2-1سیرکوله گرمخانه خط 1' },
  { id: 40, name: 'الکترو موتور فن 3_1 سیرکوله گرمخانه خط 1' },
  { id: 41, name: 'الکترو موتور فن 2-1 سیرکوله گرمخانه خط 1' },
  { id: 42, name: 'الکترو موتور فن 2-2 سیرکوله گرمخانه خط 1' },
  { id: 43, name: 'الکتروموتور فن 3-1 سیرکوله گرمخانه خط 1' },
  { id: 44, name: 'الکتروموتور فن 3-2 سیرکوله گرمخانه خط 1' },
  { id: 45, name: 'الکتروموتور فن 4 سیرکوله گرمخانه خط 1' },
  { id: 46, name: 'الکتروموتور فن 5 سیرکوله گرمخانه خط 1' },
  { id: 73, name: 'الکتروموتور فن 6 سیرکوله گرمخانه خط 1' },
  { id: 74, name: 'الکتروموتور فن 7 سیرکوله گرمخانه خط 1' },
  { id: 75, name: 'الکتروموتور فن 8-1 سیرکوله گرمخانه خط 1' },
  { id: 76, name: 'الکتروموتور فن 8-2 سیرکوله گرمخانه خط 1' },
  { id: 47, name: 'الکتروموتور فن 1-1 سیرکوله گرمخانه خط 2' },
  { id: 48, name: 'الکتروموتور فن2-1سیرکوله گرمخانه خط 2' },
  { id: 49, name: 'الکتروموتور فن 1-3 سیرکوله گرمخانه خط 2' },
  { id: 50, name: 'الکتروموتور فن 2-1 سیرکوله گرمخانه خط 2' },
  { id: 51, name: 'الکتروموتور فن 2-2 سیرکوله گرمخانه خط 2' },
  { id: 52, name: 'الکتروموتور فن 3-1 سیرکوله گرمخانه خط 2' },
  { id: 53, name: 'الکتروموتور فن 3-2 سیرکوله گرمخانه خط 2' },
  { id: 54, name: 'الکتروموتور فن 4 سیرکوله گرمخانه خط 2' },
  { id: 55, name: 'الکتروموتور فن 5 سیرکوله گرمخانه خط 2' },
  { id: 56, name: 'الکتروموتور فن 6 سیرکوله گرمخانه خط 2' },
  { id: 57, name: 'الکتروموتور فن 7 سیرکوله گرمخانه خط 2' },
  { id: 58, name: 'الکتروموتور فن 8-1 سیرکوله گرمخانه خط 2' },
  { id: 59, name: 'الکتروموتور فن 8-2 سیرکوله گرمخانه خط 2' },
  { id: 60, name: 'الکتروموتور فن 1-1 سیرکوله گرمخانه خط 3' },
  { id: 61, name: 'الکتروموتور فن 1-2 سیرکوله گرمخانه خط 3' },
  { id: 62, name: 'الکتروموتور فن 1-3 سیرکوله گرمخانه خط 3' },
  { id: 63, name: 'الکتروموتور فن 2-1 سیرکوله گرمخانه خط 3' },
  { id: 64, name: 'الکتروموتور فن 2-2 سیرکوله گرمخانه خط 3' },
  { id: 65, name: 'الکتروموتور فن 3-1 سیرکوله گرمخانه خط 3' },
  { id: 66, name: 'الکتروموتور فن 3-2 سیرکوله گرمخانه خط 3' },
  { id: 67, name: 'الکتروموتور فن 4 سیرکوله گرمخانه خط 3' },
  { id: 68, name: 'الکتروموتور فن 5 سیرکوله گرمخانه خط 3' },
  { id: 69, name: 'الکتروموتور فن 6 سیرکوله گرمخانه خط 3' },
  { id: 70, name: 'الکتروموتور فن 7 سیرکوله گرمخانه خط 3' },
  { id: 71, name: 'الکتروموتور فن 8-1 سیرکوله گرمخانه خط 3' },
  { id: 72, name: 'الکتروموتور فن 8-2 سیرکوله گرمخانه خط 3' },
  { id: 77, name: 'الکتروگیربکس  کانوایر 2 پالتایزر خط 1' },
  { id: 78, name: 'الکتروگیربکس  کانوایر 3 پالتایزر خط1' },
  { id: 79, name: 'الکتروگیربکس  کانوایر 4 پالتایزر خط1' },
  { id: 80, name: 'الکتروگیربکس  کانوایر 5 پالتایزر خط1' },
  { id: 81, name: 'الکتروگیربکس  کانوایر 6 پالتایزر خط1' },
  { id: 82, name: 'الکتروگیربکس  کانوایر 7 پالتایزر خط1' },
  { id: 83, name: 'الکتروگیربکس بغل گیر پالتایزر خط 1' },
  { id: 84, name: 'الکتروگیربکس صفحه لغزان پالتایزر خط 1' },
  { id: 85, name: 'الکتروگیربکس چرخش بغل گیر پالتایزر خط 1' },
  { id: 86, name: 'الکتروگیربکس کانوایر قبل بغلگیر پالتایزر خط 1' },
  { id: 87, name: 'الکتروگیربکس پارکینگ روبه جلو پالتایزر خط 1' },
  { id: 88, name: 'الکتروگیربکس پارکینگ روبه عقب پالتایزرخط 1' },
  { id: 89, name: 'الکتروگیربکس عقب وجلوکارتون پالتایزرخط1' },
  { id: 90, name: 'الکتروگیربکس عقب وجلوردیف کن پالتایزرخط1' },
  { id: 91, name: 'الکتروگیربکس بالا و پایین ردیفکن پالتایزرخط1' },
  { id: 92, name: 'الکتروگیربکس بالاپایین کارتون پالتایزر خط1' },
  { id: 93, name: 'الکتروگیربکس کانوایر ورودی ردیف کن خط 1' },
  { id: 94, name: 'الکتروگیربکس کانوایر پشت جکها پالتایزر 1' },
  { id: 95, name: 'الکتروگیربکس پالت بردار پالتایزر خط 1' },
  { id: 96, name: 'الکتروگیربکس انتقال دهنده پالت خط 1' },
  { id: 97, name: 'الکتروگیربکس کانوایر بین جکها خط 1' },
  { id: 98, name: 'الکتروگیربکس کانوایر 1 پالتایزر خط 1' },
  { id: 99, name: 'نوارنقاله برگشتی شیشه خط 1' },
  { id: 100, name: 'نوارنقاله برگشتی شیشه خط 2' },
  { id: 101, name: 'نوارنقاله برگشتی شیشه خط 3' },
  { id: 103, name: 'الکتروگیربکس آسانسور پالتایزر خط1' },
  { id: 104, name: 'الکتروگیربکس بغل گیر پالتایزر خط 2' },
  { id: 105, name: 'الکتروگیربکس صفحه لغزان پالتایزر خط 2' },
  { id: 106, name: 'الکتروگیربکس چرخش بغلگیر پالتایزر خط 2' },
  { id: 107, name: 'الکتروگیربکس کانوایر قبل بغلگیر پالتایزر خط 2' },
  { id: 108, name: 'الکتروگیربکس پارکینگ روبه جلو پالتایزر خط 2' },
  { id: 109, name: 'الکتروگیربکس پارکینگ روبه عقب پالتایزر خط 2' },
  { id: 110, name: 'الکتروگیربکس عقب وجلوکارتون پالتایزرخط2' },
  { id: 111, name: 'الکتروگیربکس عقب وجلوردیف کن پالتایزرخط2' },
  { id: 112, name: 'الکتروگیربکس بالا و پایین ردیفکن پالتایزرخط2' },
  { id: 113, name: 'الکتروگیربکس بالاپایین کارتون پالتایزر خط2' },
  { id: 114, name: 'الکتروگیربکس کانوایر ورودی ردیف کن خط 2' },
  { id: 115, name: 'الکتروگیربکس کانوایر پشت جکها پالتایزر 2' },
  { id: 116, name: 'الکتروگیربکس پالت بردار پالتایزر خط 2' },
  { id: 117, name: 'الکتروگیربکس انتقال دهنده پالت خط 2' },
  { id: 118, name: 'الکتروگیربکس کانوایر بین جکها خط 2' },
  { id: 119, name: 'الکتروگیربکس کانوایر 1 پالتایزر خط 2' },
  { id: 120, name: 'الکتروگیربکس  کانوایر 2 پالتایزر خط 2' },
  { id: 121, name: 'الکتروگیربکس  کانوایر 3 پالتایزر خط2' },
  { id: 122, name: 'الکتروگیربکس  کانوایر 4 پالتایزر خط2' },
  { id: 123, name: 'الکتروگیربکس  کانوایر 5 پالتایزر خط2' },
  { id: 124, name: 'الکتروگیربکس  کانوایر 6 پالتایزر خط2' },
  { id: 125, name: 'الکتروگیربکس  کانوایر 7 پالتایزر خط2' },
  { id: 126, name: 'الکتروگیربکس آسانسور پالتایزر خط2' },
  { id: 127, name: 'الکتروگیربکس بغل گیر پالتایزر خط 3' },
  { id: 128, name: 'الکتروگیربکس صفحه لغزان پالتایزر خط 3' },
  { id: 129, name: 'الکتروگیربکس چرخش بغلگیر پالتایزر خط 3' },
  { id: 130, name: 'الکتروگیربکس کانوایر قبل بغلگیر پالتایزر خط 3' },
  { id: 131, name: 'الکتروگیربکس پارکینگ روبه جلو پالتایزر خط 3' },
  { id: 132, name: 'الکتروگیربکس پارکینگ روبه عقب پالتایزر خط 3' },
  { id: 133, name: 'الکتروگیربکس عقب وجلوکارتون پالتایزرخط3' },
  { id: 134, name: 'الکتروگیربکس عقب وجلوردیف کن پالتایزرخط3' },
  { id: 135, name: 'الکتروگیربکس بالا و پایین ردیفکن پالتایزرخط3' },
  { id: 136, name: 'الکتروگیربکس کانوایر ورودی ردیف کن خط 3' },
  { id: 139, name: 'الکتروگیربکس کانوایر پشت جکها پالتایزر 3' },
  { id: 140, name: 'الکتروگیربکس پالت بردار پالتایزر خط 3' },
  { id: 141, name: 'الکتروگیربکس انتقال دهنده پالت خط 3' },
  { id: 142, name: 'الکتروگیربکس کانوایر بین جکها خط 3' },
  { id: 143, name: 'الکتروگیربکس کانوایر 1 پالتایزر خط 3' },
  { id: 144, name: 'الکتروگیربکس کانوایر 2 پالتایزر خط 3' },
  { id: 145, name: 'الکتروگیربکس کانوایر 3 پالتایزر خط 3' },
  { id: 146, name: 'الکتروگیربکس کانوایر 4 پالتایزر خط 3' },
  { id: 147, name: 'الکتروگیربکس کانوایر 5 پالتایزر خط 3' },
  { id: 148, name: 'الکتروگیربکس کانوایر 6 پالتایزر خط 3' },
  { id: 149, name: 'الکتروگیربکس کانوایر 7 پالتایزر خط 3' },
  { id: 150, name: 'الکتروگیربکس اسکرابر' },
  { id: 151, name: 'کولینگ تاور' },
  { id: 152, name: 'الکتروگیربکس نوار نقاله اسکرابر' },
  { id: 153, name: 'الکتروگیربکس آسانسور پالتایزر خط3' },
  { id: 154, name: 'الکتروگیربکس نوار نقاله کانال' },
  { id: 155, name: 'الکتروگیربکس نوار نقاله 6211' },
  { id: 156, name: 'الکتروگیربکس نوار نقاله 6311' },
  { id: 157, name: 'الکتروگیربکس نوار نقاله 9111' },
  { id: 158, name: 'الکتروگیربکس نوار نقاله 6131 شاتل' },
  { id: 159, name: 'الکتروگیربکس الواتر 8111' },
  { id: 160, name: 'الگتروموتور پمپ روغن هیدرولیک میکسر' },
  { id: 161, name: 'الکتروموتو فن روغن گیربکس میکسر' },
  { id: 162, name: 'الکتروموتور شماره 1 کراشر' },
  { id: 163, name: 'الکتروموتور شماره 2  کراشر' },
  { id: 164, name: 'الکتروگیربکس میکسر' },
  { id: 165, name: 'الکترو گیربکس نوار نقاله 7111' },
  { id: 166, name: 'الکتروگیربکس الواتور سیلیس موادریزی' },
  { id: 167, name: 'الکتروگیربکس الواتور کربنات موادریزی' },
  { id: 168, name: 'الکترو گیربکس زنجیر گرم خانه 1' },
  { id: 169, name: 'الکترو گیربکس زنجیر گرم خانه 2' },
  { id: 170, name: 'الکترو گیربکس زنجیر گرم خانه 3' },
  { id: 171, name: 'الکترو گیربکس کوتینگ سرد خط 1' },
  { id: 172, name: 'الکترو گیربکس کوتینگ سرد خط 2' },
  { id: 173, name: 'الکترو گیربکس کوتینگ سرد خط 3' },
  { id: 174, name: 'الکترو موتورفن 7.5 کیلو وات زیر داگ هاوس سمت چپ ( (L' },
  { id: 175, name: 'الکترو موتورفن 7.5 کیلو وات زیر داگ هس سمت راست ( (R' },
];

function EditWeeklyAmp({
  openEditModal,
  setOpenEditModal,
  selectedWeeklyAmp,
  setSelectedWeeklyAmp,
}) {
  const [form, setForm] = useState({
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
    if (!selectedWeeklyAmp) return;

    setForm({
      id: selectedWeeklyAmp.id,
      reportDate: selectedWeeklyAmp.reportDate,
      shiftName: selectedWeeklyAmp.shiftName,
      personnelName: selectedWeeklyAmp.personnelName,
      shiftFlags: selectedWeeklyAmp.shiftFlags,
      items: selectedWeeklyAmp?.items?.length
        ? selectedWeeklyAmp.items.map((e) => ({
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
  }, [selectedWeeklyAmp, openEditModal]);

  const handleItemChange = (index, field, value) => {
    setForm((prev) => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, items };
    });
  };

  const closeHandler = () => {
    setOpenEditModal(false);
    setSelectedWeeklyAmp(null);
  };

  const updateReport = useUpdateWeeklyAmp();

  const submitHandler = (e) => {
    e.preventDefault();
    updateReport.mutate(
      {
        id: selectedWeeklyAmp.id,
        form,
      },
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
          id="weeklyAmpForms"
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
            form="weeklyAmpForms"
            className="cursor-pointer rounded-xl bg-orange-700/95 px-5 py-3 font-[Vazirmatn] text-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ویرایش گزارش
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditWeeklyAmp;
