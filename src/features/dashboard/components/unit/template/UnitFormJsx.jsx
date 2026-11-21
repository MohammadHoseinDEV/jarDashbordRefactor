import React, { useMemo } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { MdMapsHomeWork } from 'react-icons/md';

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/react';

function UnitFormJsx({
  closeHandler,
  selectedUnit,
  handleSubmit,
  submitHandler,
  register,
  errors,
  watch,
  setValue,
  isSubmitting,
  searchUnit,
  setSearchUnit,
  getUnit,
  getCompany,
  filterCompany,
  filterUnit,
  selectedCompany,
  selectedUnits,
  searchCompany,
  setSearchCompany,
}) {
  const isActive = watch('isActive');

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <p className="rounded-full bg-white/15 p-3">
            <MdMapsHomeWork />
          </p>
          <h1 className="5xl:text-[35px] pr-1.5 font-[Vazirmatn] text-lg font-semibold">
            {selectedUnit ? `ویرایش واحد ${selectedUnit?.name}` : 'افزودن واحد'}
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
          <label htmlFor="name">نام واحد</label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            placeholder="نام واحد را وارد کنید"
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
          <label htmlFor="code">کد واحد</label>
          <input
            type="text"
            id="code"
            autoComplete="off"
            placeholder="کد واحد را وارد کنید"
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
              value={selectedCompany}
              onChange={(value) =>
                setValue('companyId', value?.id ?? null, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              onClose={() => setSearchCompany('')}
            >
              <div className="relative mt-1">
                <ComboboxInput
                  displayValue={(c) => c?.name ?? ''}
                  onChange={(e) => setSearchCompany(e.target.value)}
                  placeholder="انتخاب شرکت..."
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
                {getCompany?.length === 0 ? (
                  <div className="p-3 text-white/70">موردی پیدا نشد</div>
                ) : (
                  getCompany?.map((c) => (
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
          {errors?.companyId && (
            <p className="absolute right-2 -bottom-1 rounded-xl bg-[#1c1c1c] px-1 text-xs text-red-500">
              {`* ${errors?.companyId?.message}`}
            </p>
          )}
        </div>
        <div className="relative">
          <div className="rounded-xl border border-white/10 text-[16px] font-semibold text-[Vazirmatn]">
            <Combobox
              immediate
              value={selectedUnits}
              onChange={(value) =>
                setValue('parentUnitId', value?.id ?? '', {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              onClose={() => setSearchUnit('')}
            >
              <div className="relative mt-1">
                <ComboboxInput
                  displayValue={(c) => c?.name ?? ''}
                  onChange={(e) => setSearchUnit(e.target.value)}
                  placeholder="انتخاب واحد..."
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
                {getUnit?.length === 0 ? (
                  <div className="p-3 text-white/70">موردی پیدا نشد</div>
                ) : (
                  getUnit?.map((c) => (
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
          {errors?.parentUnitId && (
            <p className="absolute right-2 -bottom-1 rounded-xl bg-[#1c1c1c] px-1 text-xs text-red-500">
              {`* ${errors?.parentUnitId?.message}`}
            </p>
          )}
        </div>
        <div className="col-span-2">
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
              : selectedUnit
                ? 'ویرایش واحد'
                : 'ایجاد واحد'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UnitFormJsx;
