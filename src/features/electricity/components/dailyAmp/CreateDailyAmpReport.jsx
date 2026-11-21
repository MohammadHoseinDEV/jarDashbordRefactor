import React, { useEffect, useState } from 'react';

import close from '../../../../assets/images/close.png';
import { useGetProfile } from '../../../../hooks/profile/profile';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { useCreateDailyAmpReport } from '../../Api/dailyAmp/dailyAmp';
import { useGetFullAccess } from '../../../../hooks/auth/authApi';
import { toast } from 'react-toastify';

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
  { id: 36, name: 'فن کولینگ کانوایر ماشین IS خط 2 رزرو' },
  { id: 37, name: 'فن کولینگ کانوایر ماشین IS خط 3 اصلی' },
  { id: 38, name: 'فن کولینگ کانوایر ماشین IS خط 3 رزرو' },
];

const createInitialForm = {
  companyId: '',
  reportDate: '',
  shiftName: '',
  personnelName: '',
  shiftFlags: 2,
  items: deviseList.map((device) => ({
    deviceName: device.name,
    frequency: 0,
    power: 0,
    t: 0,
    s: 0,
    r: 0,
  })),
};
function CreateDailyAmpReport({ openCreateModal, setOpenCreateModal }) {
  const [form, setForm] = useState(createInitialForm);

  const handleItemChange = (index, field, value) => {
    setForm((prev) => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, items };
    });
  };

  const { data: pro, isLoading: profileLoading } = useGetFullAccess();
  const findCompany = pro?.companies?.find((c) => c.id);

  useEffect(() => {
    if (pro?.currentShift?.name) {
      setForm((p) => ({
        ...p,
        shiftName: pro?.currentShift?.name,
      }));
    }

    if (pro?.firstName || pro?.lastName) {
      setForm((p) => ({
        ...p,
        personnelName: `${pro?.firstName ?? ''} ${pro?.lastName ?? ''}`.trim(),
      }));
    }
  }, [pro]);

  const resetForm = () => {
    setForm({
      ...createInitialForm,
      shiftName: pro?.currentShift?.name ?? '',
      personnelName: `${pro?.firstName ?? ''} ${pro?.lastName ?? ''}`.trim(),
    });
  };

  const closeHandler = () => {
    setOpenCreateModal(false);
    resetForm();
  };

  const createReport = useCreateDailyAmpReport();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!form.reportDate) {
      toast.warning('تاریخ گزارش را انتخاب کنید');
      return;
    }

    if (profileLoading || !pro) {
      toast.warning('اطلاعات کاربر هنوز بارگذاری نشده.لطفا صبر کنید');
      return;
    }

    const payload = {
      ...form,
      companyId: findCompany?.id,
      personnelName: `${pro?.firstName ?? ''} ${pro?.lastName ?? ''}`.trim(),
      shiftName: pro?.currentShift?.name,
    };
    createReport.mutate(payload, {
      onSuccess: () => {
        closeHandler();
      },
    });
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center overflow-auto p-4 transition-opacity duration-300 ${
        openCreateModal
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
          openCreateModal
            ? ' translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        {/* Header & close */}
        <div className="flex shrink-0 items-center justify-between">
          <p className="pr-1.5 font-[SamimBold] text-[20px]">
            ایجاد گزارش جدید
          </p>
          <button
            onClick={closeHandler}
            className="cursor-pointer rounded-[10px] bg-white/80 p-1.5 text-[30px] text-red-500 transition-all delay-100 duration-75 ease-in-out hover:bg-black"
          >
            <img
              src={close}
              alt="close"
              width={20}
              className="transition-all delay-100 duration-100 ease-in-out hover:scale-110"
            />
          </button>
        </div>
        {/* Form */}
        <form
          id="dailyAmpForm"
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
                value={form.reportDate ? new Date(form.reportDate) : ''}
                placeholder="تاریخ ثبت گزارش"
                format="YYYY/MM/DD"
                calendarPosition="bottom-center"
                onChange={(value) => {
                  setForm((prev) => ({
                    ...prev,
                    reportDate: value
                      ? value.toDate().toISOString().split('T')[0]
                      : '',
                  }));
                }}
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
          <div className="mt-4 grid grid-cols-2 gap-4 max-md:grid-cols-1">
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
                    value={item.deviceName}
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
                    value={item.frequency}
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
                    value={item.power}
                    onChange={(e) =>
                      handleItemChange(index, 'power', e.target.value)
                    }
                    className="mt-1 rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-white outline-none"
                    onWheel={(e) => e.currentTarget.blur()}
                  />
                </label>
                <label
                  htmlFor="T"
                  className="flex flex-col font-[AvenirLTProMedium]"
                >
                  T
                  <input
                    type="number"
                    step="0.001"
                    placeholder="T"
                    value={item.t}
                    onChange={(e) =>
                      handleItemChange(index, 't', e.target.value)
                    }
                    className="rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-white outline-none"
                    onWheel={(e) => e.currentTarget.blur()}
                  />
                </label>
                <label
                  htmlFor="S"
                  className="flex flex-col font-[AvenirLTProMedium]"
                >
                  S
                  <input
                    type="number"
                    step="0.001"
                    placeholder="S"
                    value={item.s}
                    onChange={(e) =>
                      handleItemChange(index, 's', e.target.value)
                    }
                    className="rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-white outline-none"
                    onWheel={(e) => e.currentTarget.blur()}
                  />
                </label>
                <label
                  htmlFor="R"
                  className="flex flex-col font-[AvenirLTProMedium]"
                >
                  R
                  <input
                    type="number"
                    step="0.001"
                    placeholder="R"
                    value={item.r}
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
            form="dailyAmpForm"
            className="cursor-pointer rounded-xl bg-orange-700/95 px-5 py-3 font-[Vazirmatn] text-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ثبت گزارش
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateDailyAmpReport;
