import React from 'react';
import { FaGraduationCap } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';

function EducationFormJsx({
  closeHandler,
  selectedEducation,
  handleSubmit,
  submitHandler,
  register,
  errors,
  watch,
  setValue,
  isSubmitting,
}) {
  const isActive = watch('isActive');

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <p className="rounded-full bg-white/15 p-3">
            <FaGraduationCap />
          </p>
          <h1 className="5xl:text-[35px] pr-1.5 font-[Vazirmatn] text-sm font-semibold">
            {selectedEducation
              ? `ویرایش مدرک تحصیلی ${selectedEducation?.name}`
              : 'افزودن مدرک تحصیلی'}
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
        className="flex flex-col gap-5"
      >
        <div className="relative mt-5">
          <label htmlFor="name">نام مدرک تحصیلی</label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            placeholder="نام مدرک را وارد کنید"
            {...register('name')}
            className={`input-text mt-1 caret-orange-500 ${errors?.name ? 'border-red-500' : ''}`}
          />
          {errors?.name && (
            <p className="absolute top-18 right-5 rounded-xl bg-[#1c1c1c] px-1 text-xs text-red-500">
              {`* ${errors?.name?.message}`}
            </p>
          )}
        </div>
        <div className="col-span-1">
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
            <div>
              <p className="font-[Vazirmatn] text-sm font-semibold">وضعیت</p>
            </div>

            <div>
              <button
                type="button"
                role="switch"
                aria-checked={isActive}
                onClick={() => {
                  const nextValue = !isActive;

                  setValue('isActive', nextValue, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
                className={`relative flex h-6 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors ${
                  isActive ? 'bg-orange-700/95' : 'bg-white/15'
                }`}
              >
                <span
                  className={`absolute top-0.5 size-5 rounded-full bg-white transition-transform ${
                    isActive ? '-translate-x-3' : 'translate-x-3'
                  }`}
                />
              </button>
              {errors?.isActive && (
                <p className="text-sm text-red-400">
                  {errors?.isActive?.message}
                </p>
              )}
            </div>
          </div>
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
              : selectedEducation
                ? 'ویرایش مدرک تحصیلی'
                : 'ایجاد مدرک تحصیلی'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EducationFormJsx;
