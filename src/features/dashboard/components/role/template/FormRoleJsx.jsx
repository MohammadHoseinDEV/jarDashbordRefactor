import React, { useMemo } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/react';
import { LuShieldCheck } from 'react-icons/lu';

function FormRoleJsx({
  closeHandler,
  selectedRole,
  handleSubmit,
  submitHandler,
  register,
  errors,
  watch,
  setValue,
  isSubmitting,
  company,
  getCompany,
  filterCompany,
  selectedCompany,
  searchCompany,
  setSearchCompany,
}) {
  const isGlobalAccess = watch('isGlobalAccess');

  const activeCompanies = useMemo(
    () => (filterCompany ?? []).filter((c) => c.isActive === true),
    [filterCompany]
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <p className="rounded-full bg-white/15 p-3">
            <LuShieldCheck />
          </p>
          <h1 className="5xl:text-[35px] pr-1.5 font-[Vazirmatn] text-lg font-semibold">
            {selectedRole ? `ویرایش نقش ${selectedRole?.name}` : 'افزودن نقش'}
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
        className="flex flex-col space-y-5"
      >
        <div className="relative mt-5">
          <label
            htmlFor="roleName"
            className="font-[Vazirmatn] text-[15px] text-white/50"
          >
            نام نقش
          </label>
          <input
            id="roleName"
            type="text"
            autoComplete="off"
            placeholder="نام نقش را وارد کنید"
            {...register('roleName')}
            className={`input-text mt-1 caret-orange-500 ${errors?.roleName ? 'border-red-500' : ''}`}
          />
          {errors?.roleName && (
            <p className="absolute top-18 right-5 rounded-xl bg-[#1c1c1c] px-1 text-xs text-red-500">
              {`* ${errors?.roleName?.message}`}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
          <div>
            <p className="font-[Vazirmatn] text-sm font-semibold">نقش سراسری</p>
            <p className="font-[Vazirmatn] text-xs text-white/50">
              دسترسی به همه‌ی شرکت‌ها
            </p>
          </div>
          <div>
            <button
              type="button"
              role="switch"
              aria-checked={isGlobalAccess}
              onClick={() => {
                const nextValue = !isGlobalAccess;

                setValue('isGlobalAccess', nextValue, {
                  shouldDirty: true,
                  shouldValidate: true,
                });

                if (nextValue) {
                  setValue('companyId', null, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }
              }}
              className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${
                isGlobalAccess ? 'bg-orange-700/95' : 'bg-white/15'
              }`}
            >
              <span
                className={`absolute top-0.5 size-5 rounded-full bg-white transition-transform ${
                  isGlobalAccess ? 'translate-x-0' : 'translate-x-5.5'
                }`}
              />
            </button>
            {errors?.isGlobalAccess && (
              <p className="text-sm text-red-400">
                {errors?.isGlobalAccess?.message}
              </p>
            )}
          </div>
        </div>
        <div className="relative">
          <div className="rounded-xl border border-white/10 text-[16px] font-semibold text-[Vazirmatn]">
            {!isGlobalAccess && (
              <Combobox
                immediate
                value={selectedCompany}
                onChange={(value) =>
                  setValue('companyId', value?.id || null, {
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
                  {activeCompanies.length === 0 ? (
                    <div className="p-3 text-white/70">موردی پیدا نشد</div>
                  ) : (
                    activeCompanies.map((c) => (
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
            )}
          </div>
          {errors?.companyId && (
            <p className="absolute top-11 right-2 rounded-xl bg-[#1c1c1c] px-1 text-[8px] text-red-500 md:text-[10px]">
              {`* ${errors?.companyId?.message}`}
            </p>
          )}
        </div>
        <div className="mt-6 flex items-center justify-end gap-3">
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
              : selectedRole
                ? 'ویرایش نقش'
                : 'ایجاد نقش'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormRoleJsx;
