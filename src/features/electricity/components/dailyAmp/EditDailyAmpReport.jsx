import React, { useEffect, useState } from 'react';

import close from '../../../../assets/images/close.png';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import { useUpdateDailyAmpReport } from '../../Api/dailyAmp/dailyAmp';
import { IoCloseSharp } from 'react-icons/io5';

const deviseList = [
  { id: 1, name: 'الکتروپمپ وکیوم 1' },
  { id: 2, name: 'الکتروپمپ وکیوم 2' },
  { id: 3, name: 'الکتروپمپ وکیوم 3' },
  { id: 4, name: 'الکتروپمپ ویکوم رزرو(اسپیر)' },
  { id: 5, name: 'الکتروپمپ برگشتی آب تانکر 1' },
  { id: 6, name: 'الکتروپمپ برگشتی آب تانکر 2' },
  { id: 7, name: 'الکترو پمپ برگشتی آب صابون 1 اصلی' },
  { id: 8, name: 'الکترو پمپ برگشتی آب صابون 2 رزرو' },
  { id: 9, name: 'الکتروگیربکس اسکراپر' },
  { id: 10, name: 'فن احتراق شماره 1 کوره اصلی' },
  { id: 11, name: 'فن احتراق شماره 2 کوره رزرو' },
  { id: 12, name: 'فن ساکشن 1 اصلی' },
  { id: 13, name: 'فن ساکشن 2 رزرو' },
  { id: 14, name: 'فن پاتاقی 1 اصلی' },
  { id: 15, name: 'فن پاتاقی 2 رزرو' },
  { id: 16, name: 'فن کولینگ دیواره 1 اصلی' },
  { id: 17, name: 'فن کولینگ دیواره 2 رزرو' },
  { id: 18, name: 'الکترو پمپ استخر1 اصلی' },
  { id: 19, name: 'الکترو پمپ استخر2 رزرو' },
  { id: 20, name: 'الکتروگیربکس دمپر ریورسال کوره' },
  { id: 21, name: 'فن فورهارث 1 اصلی (A-A)' },
  { id: 22, name: 'فن فورهارث 2 رزرو(B)' },
  { id: 23, name: 'فن فورهارث 3 (اتاق فرمان)' },
  { id: 24, name: 'فن فورهارث گلوگاه (A-C)' },
  { id: 25, name: 'فن ورکینگ انداصلی' },
  { id: 26, name: 'فن ورکینگ اند رزرو' },
  { id: 27, name: 'فن کولینگ ماشین IS خط 1 اصلی' },
  { id: 28, name: 'فن کولینگ ماشینIS خط 1 رزرو' },
  { id: 29, name: 'فن کولینگ ماشین IS خط 2 اصلی' },
  { id: 30, name: 'فن کولینگ ماشینIS خط 2 رزرو' },
  { id: 31, name: 'فن کولینگ ماشین IS خط 3 اصلی' },
  { id: 32, name: 'فن کولینگ ماشین IS خط 3' },
  { id: 33, name: 'فن کولینگ کانوایر ماشین IS خط 1 اصلی' },
  { id: 34, name: 'فن کولینگ کانوایر ماشین IS خط 1 رزرو' },
  { id: 35, name: 'فن کولینگ کانوایر ماشین IS خط 2 اصلی' },
  { id: 36, name: 'فن کولینگ کانوایر ماشین خط 2' },
  { id: 37, name: 'فن کولینگ کانوایر ماشین IS خط 3 اصلی' },
  { id: 38, name: 'فن کولینگ کانوایر ماشین IS خط 3 رزرو' },
];
function EditDailyAmpReport({
  openEditModal,
  setOpenEditModal,
  selectedDailyAmp,
  setSelectedDailyAmp,
}) {
  const [form, setForm] = useState({
    companyId: '',
    id: '',
    reportDate: '',
    shiftName: '',
    personnelName: '',
    shiftFlags: 2,
    items: deviseList?.map((device) => ({
      id: '',
      deviceName: device?.name,
      frequency: 0,
      power: 0,
      t: 0,
      s: 0,
      r: 0,
    })),
  });

  useEffect(() => {
    if (!selectedDailyAmp) return;

    setForm({
      companyId: selectedDailyAmp?.companyId,
      id: selectedDailyAmp?.id,
      reportDate: selectedDailyAmp?.reportDate,
      shiftName: selectedDailyAmp?.shiftName,
      personnelName: selectedDailyAmp?.personnelName,
      shiftFlags: selectedDailyAmp?.shiftFlags,
      items: selectedDailyAmp?.items?.length
        ? selectedDailyAmp.items.map((e) => ({
            id: e?.id,
            deviceName: e.deviceName ?? '',
            frequency: e.frequency ?? 0,
            power: e.power ?? 0,
            t: e.t ?? 0,
            s: e.s ?? 0,
            r: e.r ?? 0,
          }))
        : deviseList.map((device) => ({
            id: '',
            deviceName: device.name,
            frequency: 0,
            power: 0,
            t: 0,
            s: 0,
            r: 0,
          })),
    });
  }, [selectedDailyAmp, openEditModal]);

  const handleItemChange = (index, field, value) => {
    setForm((prev) => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, items };
    });
  };
  const closeHandler = () => {
    setOpenEditModal(false);
    setSelectedDailyAmp(null);
  };

  const updateReport = useUpdateDailyAmpReport();

  const submitHandler = (e) => {
    e.preventDefault();

    updateReport.mutate(
      {
        id: selectedDailyAmp?.id,
        form,
      },
      {
        onSuccess: () => {
          setOpenEditModal(false);
          setSelectedDailyAmp(null);
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
            ویرایش گزارش روزانه آمپر گیری
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
        {/* form */}
        <form
          id="dailyAmpEdit"
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
                name="shiftName"
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
          <div className="mt-4 grid grid-cols-4 gap-4 max-md:grid-cols-2">
            <label
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all max-md:text-[13px] ${
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
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all max-md:text-[13px] ${
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
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all max-md:text-[12px] ${
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
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all max-md:text-[12px] ${
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
          <div className="mt-4 grid grid-cols-2 gap-4 max-md:grid-cols-1">
            {form.items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-4 rounded-[10px] border border-white/50 p-2"
              >
                <input
                  type="text"
                  value={item?.deviceName}
                  readOnly
                  className="rounded-xl bg-white/10 p-3 font-[Samim] text-white outline-none"
                />

                <input
                  type="number"
                  step="0.001"
                  placeholder="فرکانس"
                  value={item.frequency ?? 0}
                  onChange={(e) =>
                    handleItemChange(index, 'frequency', e.target.value)
                  }
                  className="rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-white outline-none"
                  onWheel={(e) => e.currentTarget.blur()}
                />

                <input
                  type="number"
                  step="0.001"
                  placeholder="پاور"
                  value={item.power ?? 0}
                  onChange={(e) =>
                    handleItemChange(index, 'power', e.target.value)
                  }
                  className="rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-white outline-none"
                  onWheel={(e) => e.currentTarget.blur()}
                />

                <input
                  type="number"
                  step="0.001"
                  placeholder="T"
                  value={item.t ?? 0}
                  onChange={(e) => handleItemChange(index, 't', e.target.value)}
                  className="rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-white outline-none"
                  onWheel={(e) => e.currentTarget.blur()}
                />

                <input
                  type="number"
                  step="0.001"
                  placeholder="S"
                  value={item.s ?? 0}
                  onChange={(e) => handleItemChange(index, 's', e.target.value)}
                  className="rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-white outline-none"
                  onWheel={(e) => e.currentTarget.blur()}
                />

                <input
                  type="number"
                  step="0.001"
                  placeholder="R"
                  value={item.r ?? 0}
                  onChange={(e) => handleItemChange(index, 'r', e.target.value)}
                  className="rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-white outline-none"
                  onWheel={(e) => e.currentTarget.blur()}
                />
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
            form="dailyAmpEdit"
            className="cursor-pointer rounded-xl bg-orange-700/95 px-5 py-3 font-[Vazirmatn] text-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ثبت گزارش
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditDailyAmpReport;
