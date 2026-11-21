import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import TimePickerInput from '../../../../../Time/TimePickerInput';

function CreateLineChangeCheckListJsx({
  closeHandler,
  form,
  setForm,
  submitHandler,
}) {
  const handleItemChange = (index, field, value) => {
    setForm((prev) => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, items };
    });
  };
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 items-center justify-between">
        <h1 className="5xl:text-[35px] pr-1.5 font-[SamimBold] text-[22px]">
          ایجاد گزارش جدید
        </h1>
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
        id="lineChangeCheckList"
        onSubmit={submitHandler}
        className="no-scrollbar flex min-h-0 flex-col overflow-x-hidden overflow-y-auto max-md:max-h-[70vh]"
      >
        <div className="grid grid-cols-4 gap-5">
          <label htmlFor="checklistDate" className="flex flex-col">
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
                  checklistDate: value
                    ? value.toDate().toISOString().split('T')[0]
                    : '',
                });
              }}
              inputClass="input-date"
            />
          </label>
          <label htmlFor="checklistTime">
            ساعت
            <TimePickerInput
              value={form.checklistTime}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  checklistTime: value,
                }))
              }
            />
          </label>
          <label htmlFor="lineName">
            خط
            <input
              type="text"
              placeholder="شماره خط"
              name="lineName"
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }));
              }}
              className="input-text"
            />
          </label>
          <label htmlFor="shiftName">
            شیفت
            <input
              type="text"
              readOnly
              value={form.shiftName || ''}
              className="input-text"
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
          {form.items?.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 gap-4 rounded-[10px] border p-2"
            >
              <label htmlFor="operationName">
                <input
                  type="text"
                  readOnly
                  value={item?.operationName || ''}
                  className="input-text text-[15px]"
                />
              </label>
              <div className="grid grid-cols-2 gap-5 text-center">
                <label
                  className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                    item.isCompleted === true
                      ? 'border-green-600 text-white'
                      : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
                  } font-[SamimBold] text-[18px]`}
                >
                  <input
                    type="radio"
                    name={`isCompleted-${index}`}
                    value={true}
                    checked={item?.isCompleted === true}
                    onChange={() =>
                      handleItemChange(index, 'isCompleted', true)
                    }
                    className="hidden"
                  />
                  OK
                </label>
                <label
                  className={`5xl:text-[25px] flex cursor-pointer items-center justify-center rounded-xl border-2 px-5 py-1 transition-all select-none max-2xl:text-[14px] ${
                    item.isCompleted === false
                      ? 'border-red-600 text-white'
                      : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
                  } font-[SamimBold] text-[18px]`}
                >
                  <input
                    type="radio"
                    name={`isCompleted-${index}`}
                    value={false}
                    checked={item?.isCompleted === false}
                    onChange={() =>
                      handleItemChange(index, 'isCompleted', false)
                    }
                    className="hidden"
                  />
                  N.OK
                </label>
              </div>
              <label htmlFor="description">
                <textarea
                  name="description"
                  placeholder="توضیحات"
                  maxLength={160}
                  value={item.description || ''}
                  onChange={(e) =>
                    handleItemChange(index, 'description', e.target.value)
                  }
                  className="input-text"
                />
              </label>
              <label htmlFor="executorName">
                <input
                  type="text"
                  placeholder="مجری عملیات"
                  name="executorName"
                  onChange={(e) =>
                    handleItemChange(index, 'executorName', e.target.value)
                  }
                  className="input-text"
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
        <button type="submit" form="lineChangeCheckList" className="btn-submit">
          ثبت گزارش
        </button>
      </div>
    </div>
  );
}

export default CreateLineChangeCheckListJsx;
