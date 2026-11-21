import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { BsFillCalendarPlusFill } from 'react-icons/bs';
import { IoCloseSharp } from 'react-icons/io5';
import TimePickerInput from '../../../../../Time/TimePickerInput';

function ShiftFormJsx({
  closeHandler,
  selectedShift,
  submitHandler,
  findCompany,
  addCycles,
  fields,
  removeCycles,
}) {
  const {
    watch,
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const pattern = watch('pattern');

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <p className="rounded-full bg-white/15 p-3">
            <BsFillCalendarPlusFill />
          </p>
          <h1 className="5xl:text-[35px] pr-1.5 font-[Vazirmatn] text-sm font-semibold">
            {selectedShift
              ? `ویرایش شیفت ${selectedShift?.title}`
              : 'افزودن شیفت'}
          </h1>
        </div>
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
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-5 md:grid md:grid-cols-2"
      >
        <div className="relative mt-5">
          <label htmlFor="name">نام شیفت </label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            placeholder="نام شیفت را وارد کنید"
            {...register('name')}
            className={`input-text mt-1 caret-orange-500 ${errors?.name ? 'border-red-500' : ''}`}
          />
          {errors?.name && (
            <p className="absolute top-18 right-5 rounded-xl bg-[#1c1c1c] px-1 text-xs text-red-500">
              {`* ${errors?.name?.message}`}
            </p>
          )}
        </div>
        <div className="relative mt-5">
          <label htmlFor="companyId">شرکت </label>
          <input
            type="text"
            id="companyId"
            readOnly
            value={findCompany?.name || ''}
            className={`input-text mt-1 caret-orange-500 ${errors?.companyId ? 'border-red-500' : ''}`}
          />
        </div>
        <div className="relative">
          <label htmlFor="durationDays"> توضیحات</label>
          <input
            type="text"
            id="description"
            autoComplete="off"
            placeholder=" توضیحات ..."
            {...register('description')}
            className={`input-text mt-1 caret-orange-500 ${errors?.description ? 'border-red-500' : ''}`}
          />
          {errors?.description && (
            <p className="absolute top-18 right-5 rounded-xl bg-[#1c1c1c] px-1 text-xs text-red-500">
              {`* ${errors?.description?.message}`}
            </p>
          )}
        </div>
        <div className="relative">
          <label htmlFor="pattern"> نوع شیفت</label>
          <select
            className={`input-text mt-1 caret-orange-500 ${errors?.pattern ? 'border-red-500' : ''}`}
            {...register('pattern', { valueAsNumber: true })}
          >
            <option value={0} className="bg-black/95 text-[15px] text-white">
              انتخاب شیفت
            </option>
            <option value={1} className="bg-black/95 text-[15px] text-white">
              شیفت اداری
            </option>
            <option value={2} className="bg-black/95 text-[15px] text-white">
              شیفت چرخشی
            </option>
          </select>
          {errors?.pattern && (
            <p className="absolute top-18 right-5 rounded-xl bg-[#1c1c1c] px-1 text-xs text-red-500">
              {`* ${errors?.pattern?.message}`}
            </p>
          )}
        </div>
        <div className="col-span-2">
          {(pattern === 1 || pattern === 2) && (
            <div>
              <div className="no-scrollbar col-span-2 overflow-y-auto">
                <div className="no-scrollbar mt-2 overflow-y-auto rounded-2xl border border-white/20 p-4">
                  <div className="no-scrollbar mb-3 flex items-center justify-between overflow-y-auto">
                    <p className="font-[SamimBold] text-white/80">چرخش ها</p>
                    {(pattern === 1 || pattern === 2) && (
                      <button
                        type="button"
                        onClick={addCycles}
                        className="rounded-xl border-2 border-dashed border-white/30 px-3 py-2 font-[Samim] hover:cursor-pointer hover:bg-white/15"
                      >
                        افزودن چرخش +
                      </button>
                    )}
                  </div>
                  <div>
                    {fields?.map((item, index) => (
                      <div
                        key={item.id}
                        className="my-3 flex flex-col gap-5 rounded-lg border border-white/50 p-2 md:grid md:grid-cols-2"
                      >
                        <div className="relative">
                          <label htmlFor="workDayType"> نوع روز</label>
                          <select
                            className={`input-text mt-1 caret-orange-500 ${errors?.cycles?.[index]?.workDayType ? 'border-red-500' : ''}`}
                            {...register(`cycles.${index}.workDayType`, {
                              valueAsNumber: true,
                            })}
                          >
                            <option
                              value={0}
                              className="bg-black/95 text-[15px] text-white"
                            >
                              انتخاب روز
                            </option>
                            <option
                              value={1}
                              className="bg-black/95 text-[15px] text-white"
                            >
                              صبح
                            </option>
                            <option
                              value={2}
                              className="bg-black/95 text-[15px] text-white"
                            >
                              شب
                            </option>
                            <option
                              value={3}
                              className="bg-black/95 text-[15px] text-white"
                            >
                              تعطیل
                            </option>
                          </select>
                          {errors?.cycles?.[index]?.workDayType && (
                            <p className="absolute top-18 right-5 rounded-xl bg-[#1c1c1c] px-1 text-xs text-red-500">
                              {`* ${errors?.cycles?.[index]?.workDayType?.message}`}
                            </p>
                          )}
                        </div>
                        <div className="relative">
                          <label htmlFor="durationDays"> تعداد روز</label>
                          <input
                            type="number"
                            id="durationDays"
                            autoComplete="off"
                            {...register(`cycles.${index}.durationDays`, {
                              valueAsNumber: true,
                            })}
                            className={`input-text mt-1 font-[AvenirLTProHeavy] caret-orange-500 ${errors?.cycles?.[index]?.durationDays ? 'border-red-500' : ''}`}
                          />
                          {errors?.cycles?.[index]?.durationDays && (
                            <p className="absolute top-18 right-5 rounded-xl bg-[#1c1c1c] px-1 text-xs text-red-500">
                              {`* ${errors?.cycles?.[index]?.durationDays?.message}`}
                            </p>
                          )}
                        </div>
                        <div className="relative">
                          <label htmlFor="startTime"> ساعت شروع</label>
                          <Controller
                            control={control}
                            name={`cycles.${index}.startTime`}
                            render={({ field }) => (
                              <TimePickerInput
                                value={field.value}
                                onChange={field.onChange}
                                inputClassName={
                                  errors?.cycles?.[index]?.startTime
                                    ? 'border border-red-500'
                                    : ''
                                }
                              />
                            )}
                          />
                          {errors?.cycles?.[index]?.startTime && (
                            <p className="absolute top-18 right-5 rounded-xl bg-[#1c1c1c] px-1 text-xs text-red-500">
                              {`* ${errors.cycles[index].startTime.message}`}
                            </p>
                          )}
                        </div>
                        <div className="relative">
                          <label htmlFor="endTime"> ساعت پایان</label>
                          <Controller
                            control={control}
                            name={`cycles.${index}.endTime`}
                            render={({ field }) => (
                              <TimePickerInput
                                value={field.value}
                                onChange={field.onChange}
                                inputClassName={
                                  errors?.cycles?.[index]?.endTime
                                    ? 'border border-red-500'
                                    : ''
                                }
                              />
                            )}
                          />
                          {errors?.cycles?.[index]?.endTime && (
                            <p className="absolute top-18 right-5 rounded-xl bg-[#1c1c1c] px-1 text-xs text-red-500">
                              {`* ${errors.cycles[index].endTime.message}`}
                            </p>
                          )}
                        </div>
                        <div className="relative col-span-2">
                          <label htmlFor="breakMinutes"> زمان استراحت</label>
                          <input
                            type="number"
                            id="breakMinutes"
                            autoComplete="off"
                            {...register(`cycles.${index}.breakMinutes`, {
                              valueAsNumber: true,
                            })}
                            className={`input-text mt-1 font-[AvenirLTProHeavy] caret-orange-500 ${errors?.cycles?.[index]?.breakMinutes ? 'border-red-500' : ''}`}
                          />
                          {errors?.cycles?.[index]?.breakMinutes && (
                            <p className="absolute top-18 right-5 rounded-xl bg-[#1c1c1c] px-1 text-xs text-red-500">
                              {`* ${errors?.cycles?.[index]?.breakMinutes?.message}`}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeCycles(index)}
                          className="col-span-2 rounded-xl border border-red-500/50 py-2 text-red-400 hover:bg-red-500/10"
                        >
                          حذف
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-2 mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={closeHandler}
            className="cursor-pointer rounded-xl bg-white/10 px-5 py-3 font-[Vazirmatn] text-sm transition hover:bg-white/20"
          >
            انصراف
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer rounded-xl bg-orange-700/95 px-5 py-3 font-[Vazirmatn] text-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting
              ? 'در حال ارسال...'
              : selectedShift
                ? 'ویرایش شیفت'
                : 'ایجاد شیفت'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShiftFormJsx;
