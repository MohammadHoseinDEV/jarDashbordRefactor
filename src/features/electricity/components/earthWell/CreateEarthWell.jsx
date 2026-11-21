import React, { useEffect, useState } from 'react';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import { useGetProfile } from '../../../../hooks/profile/profile';
import { useCreateEarthWell } from '../../Api/earthWell/earthWell';
import { IoCloseSharp } from 'react-icons/io5';
import { useGetFullAccess } from '../../../../hooks/auth/authApi';
import { toast } from 'react-toastify';

const earthLocation = [
  { id: 1, earthNumber: 1, location: 'چاه ارت دودکش' },
  { id: 2, earthNumber: 2, location: 'اتاق توزیع و دیزل ژنراتورها' },
  { id: 3, earthNumber: 3, location: 'چاه ارت اسکراپر و بچ پلنت' },
  { id: 4, earthNumber: 4, location: 'چاه ارت فن کانوایر و کولینگ ماشین ها' },
  { id: 5, earthNumber: 5, location: 'چاه ارت اتاق ماشین 3 و بچ پلنت' },
  { id: 6, earthNumber: 6, location: 'چاه ارت بسته بندی وشیرینگ' },
  {
    id: 7,
    earthNumber: 7,
    location: 'چاه ارت PLC اتاق فرمان ماشین و کنترل کوره',
  },
  { id: 8, earthNumber: 8, location: 'چاه ارت پمپ های آب برگشتی و پالتایزر' },
  { id: 9, earthNumber: 9, location: 'چاه ارت پست' },
  { id: 10, earthNumber: 10, location: 'چاه ارت ترانس ها' },
  { id: 11, earthNumber: 11, location: 'چاه ارت تابلو مرکزی' },
  { id: 12, earthNumber: 12, location: 'چاه ارت پشت انبار محصول' },
  { id: 13, earthNumber: 13, location: 'چاه ارت تراشکاری' },
];

const initialState = {
  companyId: '',
  inspectionDate: '',
  personnelName: '',
  shiftFlags: 0,
  items: [
    {
      wellNumber: 0,
      wellLocation: '',
      inspectionResult: true,
      notes: '',
    },
  ],
};

function CreateEarthWell({ openCreateModal, setOpenCreateModal }) {
  const [form, setForm] = useState({
    inspectionDate: '',
    personnelName: '',
    shiftName: '',
    shiftFlags: 2,
    items: earthLocation?.map((e) => ({
      wellNumber: e?.earthNumber,
      wellLocation: e?.location,
      inspectionResult: true,
      notes: '',
    })),
  });

  const handleItemChange = (index, field, value) => {
    setForm((prev) => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, items };
    });
  };

  const { data: profile, isLoading: profileLoading } = useGetFullAccess();

  const findCompany = profile?.companies?.find((c) => c.id);

  useEffect(() => {
    if (profile?.currentShift?.name) {
      setForm((p) => ({
        ...p,
        shiftName: profile?.currentShift?.name,
      }));
    }

    if (profile?.firstName || profile?.lastName) {
      setForm((p) => ({
        ...p,
        personnelName:
          `${profile?.firstName ?? ''} ${profile?.lastName ?? ''}`.trim(),
      }));
    }
  }, [profile]);

  const resetForm = () => {
    setForm({
      ...initialState,
      shiftName: profile?.currentShift?.name ?? '',
      personnelName:
        `${profile?.firstName ?? ''} ${profile?.lastName ?? ''}`.trim(),
    });
  };

  const closeHandler = () => {
    setOpenCreateModal(false);
  };

  const createReport = useCreateEarthWell();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!form.inspectionDate) {
      toast.warning('تاریخ گزارش را انتخاب کنید');
      return;
    }

    if (profileLoading || !profile) {
      toast.warning('اطلاعات کاربر هنوز بارگذاری نشده.لطفا صبر کنید');
      return;
    }

    const payload = {
      ...form,
      companyId: findCompany?.id,
      personnelName:
        `${profile?.firstName ?? ''} ${profile?.lastName ?? ''}`.trim(),
      shiftName: profile?.currentShift?.name,
    };
    createReport.mutate(payload, {
      onSuccess: () => {
        setOpenCreateModal(false);
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
          id="earthWellForm"
          onSubmit={submitHandler}
          className="no-scrollbar flex min-h-0 flex-col overflow-x-hidden overflow-y-auto max-md:max-h-[70vh]"
        >
          {/* Personnel Details */}
          <div className="grid grid-cols-3 gap-2 max-md:flex max-md:flex-col">
            <label htmlFor="inspectionDate" className="flex flex-col">
              تاریخ
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                placeholder="تاریخ ثبت گزارش"
                format="YYYY/MM/DD"
                calendarPosition="bottom-center"
                value={form.inspectionDate ? new Date(form.inspectionDate) : ''}
                onChange={(value) => {
                  setForm({
                    ...form,
                    inspectionDate: value
                      ? value.toDate().toISOString().split('T')[0]
                      : '',
                  });
                }}
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
          <div className="mt-4 grid grid-cols-3 gap-4 max-md:grid-cols-1">
            {form.items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-4 rounded-[10px] border p-2"
              >
                <label
                  htmlFor="wellNumber"
                  className="flex flex-col font-[SamimBold]"
                >
                  شماره چاه
                  <input
                    type="text"
                    readOnly
                    value={item?.wellNumber || 0}
                    className="mt-1 rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-white outline-none"
                  />
                </label>
                <label
                  htmlFor="wellLocation"
                  className="flex flex-col font-[SamimBold]"
                >
                  <input
                    type="text"
                    readOnly
                    value={item?.wellLocation || ''}
                    className="mt-1 rounded-xl bg-white/10 p-3 font-[Samim] text-white outline-none"
                  />
                </label>
                <label
                  htmlFor="inspectionResult"
                  className="flex flex-col font-[SamimBold]"
                >
                  نتیجه
                  <select
                    name="inspectionResult"
                    value={String(item.inspectionResult)}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        'inspectionResult',
                        e.target.value === 'true'
                      )
                    }
                    className="mt-1 rounded-xl bg-white/10 p-3 font-[Samim] text-white outline-none"
                  >
                    <option className="bg-black" value="نتیجه">
                      نتیجه
                    </option>
                    <option className="bg-black" value="true">
                      OK
                    </option>
                    <option className="bg-black" value="false">
                      N.OK
                    </option>
                  </select>
                </label>
                <label
                  htmlFor="notes"
                  className="flex flex-col font-[SamimBold]"
                >
                  توضیحات
                  <textarea
                    name="notes"
                    placeholder="توضیحات"
                    maxLength={170}
                    value={item.notes || ''}
                    onChange={(e) =>
                      handleItemChange(index, 'notes', e.target.value)
                    }
                    className="mt-1 rounded-xl bg-white/10 p-3 font-[Samim] text-white outline-none"
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
            form="earthWellForm"
            className="cursor-pointer rounded-xl bg-orange-700/95 px-5 py-3 font-[Vazirmatn] text-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ثبت گزارش
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateEarthWell;
