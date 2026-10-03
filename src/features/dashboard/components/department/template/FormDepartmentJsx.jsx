import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/react';
import React, { useMemo } from 'react';
import { FaD } from 'react-icons/fa6';
import { IoCloseSharp } from 'react-icons/io5';

function FormDepartmentJsx({
  closeHandler,
  selectedDepartment,
  handleSubmit,
  submitHandler,
  register,
  errors,
  watch,
  setValue,
  isSubmitting,
  getHolding,
  filterholding,
  selectedholding,
  searchHolding,
  setsearchHolding,
}) {
  const isActive = watch('isActive');

  const activeholding = useMemo(
    () => (filterholding ?? []).filter((c) => c.isActive === true),
    [filterholding]
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <p className="rounded-full bg-white/15 p-3">
            <FaD />
          </p>
          <h1 className="5xl:text-[35px] pr-1.5 font-[Vazirmatn] text-lg font-semibold">
            {selectedDepartment
              ? `ویرایش دپارتمان ${selectedDepartment?.name}`
              : 'افزودن دپارتمان'}
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
        className="grid grid-cols-2 gap-5 space-y-5"
      >
        <div className="relative mt-5">
          <label htmlFor="name">نام دپارتمان</label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            placeholder="نام دپارتمان را وارد کنید"
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
          <label htmlFor="code">کد دپارتمان</label>
          <input
            type="text"
            id="code"
            autoComplete="off"
            placeholder="نام دپارتمان را وارد کنید"
            {...register('code')}
            className={`input-text mt-1 caret-orange-500 ${errors?.code ? 'border-red-500' : ''}`}
          />
          {errors?.code && (
            <p className="absolute top-18 right-5 rounded-xl bg-[#1c1c1c] px-1 text-xs text-red-500">
              {`* ${errors?.code?.message}`}
            </p>
          )}
        </div>
        <div className="relative">
          <div className="rounded-xl border border-white/10 text-[16px] font-semibold text-[Vazirmatn]">
            <Combobox
              immediate
              value={selectedholding}
              onChange={(value) =>
                setValue('holdingId', value?.id || null, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              onClose={() => setsearchHolding('')}
            >
              <div className="relative mt-1">
                <ComboboxInput
                  displayValue={(c) => c?.name ?? ''}
                  onChange={(e) => setsearchHolding(e.target.value)}
                  placeholder="انتخاب هلدینگ..."
                  autoComplete="off"
                  className="w-full rounded-xl bg-white/5 p-3 font-[Vazirmatn] text-white outline-none placeholder:text-white/50"
                />
                <ComboboxButton className="absolute inset-y-0 left-0 px-3 text-white/70">
                  ▾
                </ComboboxButton>
              </div>
              <ComboboxOptions
                anchor="bottom"
                className="no-scrollbar z-999 max-h-60 w-(--input-width) rounded-xl bg-black/95 p-1 shadow-lg ring-1 ring-white/10 [--anchor-gap:8px]"
              >
                {activeholding.length === 0 ? (
                  <div className="p-3 text-white/70">موردی پیدا نشد</div>
                ) : (
                  activeholding.map((c) => (
                    <ComboboxOption
                      key={c.id}
                      value={c}
                      className="cursor-pointer rounded-lg p-3 text-white data-focus:bg-white/10 data-selected:bg-white/15"
                    >
                      {c.name}
                    </ComboboxOption>
                  ))
                )}
              </ComboboxOptions>
            </Combobox>
          </div>
          {errors?.holdingId && (
            <p className="absolute right-2 -bottom-1 rounded-xl bg-[#1c1c1c] px-1 text-xs text-red-500">
              {`* ${errors?.holdingId?.message}`}
            </p>
          )}
        </div>
        <div className="">
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
              : selectedDepartment
                ? 'ویرایش منو'
                : 'ایجاد منو'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormDepartmentJsx;
