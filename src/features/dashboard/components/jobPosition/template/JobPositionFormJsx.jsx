import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IoCloseSharp } from 'react-icons/io5';

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/react';

function JobPositionFormJsx({
  closeHandler,
  selectedJob,
  submitHandler,
  jobPosition,
  company,
  department,
}) {
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const isActive = watch('isActive');

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="5xl:text-[35px] pr-1.5 font-[Vazirmatn] text-sm font-semibold">
            {selectedJob
              ? `ویرایش جایگاه شغلی ${selectedJob?.title}`
              : 'افزودن جایگاه شغلی'}
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
          <label htmlFor="title">نام جایگاه شغلی</label>
          <input
            type="text"
            id="title"
            autoComplete="off"
            placeholder="نام جایگاه را وارد کنید"
            {...register('title')}
            className={`input-text mt-1 caret-orange-500 ${errors?.title ? 'border-red-500' : ''}`}
          />
          {errors?.title && (
            <p className="absolute top-18 right-5 rounded-xl bg-[#1c1c1c] px-1 text-xs text-red-500">
              {`* ${errors?.title?.message}`}
            </p>
          )}
        </div>
        <div className="relative md:mt-5">
          <label htmlFor="code">کد جایگاه شغلی</label>
          <input
            type="text"
            id="code"
            autoComplete="off"
            placeholder="کد جایگاه را وارد کنید"
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
          <label htmlFor="level">سطح جایگاه شغلی</label>
          <input
            type="number"
            id="level"
            autoComplete="off"
            placeholder="سطح جایگاه را وارد کنید"
            {...register('level', { valueAsNumber: true })}
            className={`input-text mt-1 font-[AvenirLTProHeavy] caret-orange-500 ${errors?.level ? 'border-red-500' : ''}`}
          />
          {errors?.level && (
            <p className="absolute top-18 right-5 rounded-xl bg-[#1c1c1c] px-1 text-xs text-red-500">
              {`* ${errors?.level?.message}`}
            </p>
          )}
        </div>
        <div className="relative">
          <label htmlFor="parentPositionId">انتخاب جایگاه شغلی والد</label>
          <div className="rounded-xl border border-white/10 text-[16px] font-semibold text-[Vazirmatn]">
            <Combobox
              immediate
              value={jobPosition?.selected}
              onChange={(value) =>
                setValue('parentPositionId', value?.id ?? null, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              onClose={() => jobPosition?.setSearch('')}
            >
              <div className="relative mt-1">
                <ComboboxInput
                  displayValue={(c) => (c?.id ? c.name : '')}
                  onChange={(e) => jobPosition?.setSearch(e.target.value)}
                  placeholder="انتخاب جایگاه والد..."
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
                {jobPosition?.filtered?.length === 0 ? (
                  <div className="p-3 text-white/70">موردی پیدا نشد</div>
                ) : (
                  jobPosition?.filtered?.map((c) => (
                    <ComboboxOption
                      key={c.id ?? 'empty'}
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
        </div>
        <div className="relative">
          <label htmlFor="departmentId">انتخاب دپارتمان</label>
          <div className="rounded-xl border border-white/10 text-[16px] font-semibold text-[Vazirmatn]">
            <Combobox
              immediate
              value={department?.selected}
              onChange={(value) =>
                setValue('departmentId', value?.id ?? null, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              onClose={() => department?.setSearch('')}
            >
              <div className="relative mt-1">
                <ComboboxInput
                  displayValue={(c) => (c?.id ? c.name : '')}
                  onChange={(e) => department?.setSearch(e.target.value)}
                  placeholder="انتخاب  دپارتمان..."
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
                {department?.filtered?.length === 0 ? (
                  <div className="p-3 text-white/70">موردی پیدا نشد</div>
                ) : (
                  department?.filtered?.map((c) => (
                    <ComboboxOption
                      key={c.id ?? 'empty'}
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
        </div>
        <div className="relative">
          <label htmlFor="companyId">انتخاب شرکت</label>
          <div className="rounded-xl border border-white/10 text-[16px] font-semibold text-[Vazirmatn]">
            <Combobox
              immediate
              value={company?.selected}
              onChange={(value) =>
                setValue('companyId', value?.id ?? null, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              onClose={() => company?.setSearch('')}
            >
              <div className="relative mt-1">
                <ComboboxInput
                  displayValue={(c) => (c?.id ? c.name : '')}
                  onChange={(e) => company?.setSearch(e.target.value)}
                  placeholder="انتخاب  شرکت..."
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
                {company?.filtered?.length === 0 ? (
                  <div className="p-3 text-white/70">موردی پیدا نشد</div>
                ) : (
                  company?.filtered?.map((c) => (
                    <ComboboxOption
                      key={c.id ?? 'empty'}
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
        <div className="relative">
          <input
            type="text"
            id="description"
            autoComplete="off"
            placeholder="توضیحات ..."
            {...register('description')}
            className={`input-text caret-orange-500`}
          />
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
              : selectedJob
                ? 'ویرایش جایگاه'
                : 'ایجاد جایگاه'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default JobPositionFormJsx;
