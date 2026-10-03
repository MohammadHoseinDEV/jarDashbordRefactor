import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { RiMenuAddLine } from 'react-icons/ri';

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/react';

function FormMenuJsx({
  closeHandler,
  selectedMenus,
  handleSubmit,
  submitHandler,
  register,
  errors,
  watch,
  setValue,
  isSubmitting,
  parentMenu,
  filterdMenu,
  selectedMenu,
  iconList,
  filteredIcons,
  selectedIcon,
  query,
  setQuery,
  flatList,
  searchMenu,
  setSearchMenu,
}) {
  const isActive = watch('isActive');

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <p className="rounded-full bg-white/15 p-3">
            <RiMenuAddLine />
          </p>
          <h1 className="4xl:text-[35px] pr-1.5 font-[Vazirmatn] text-lg font-semibold">
            {selectedMenus ? `ویرایش منو ${selectedMenus?.name}` : 'افزودن منو'}
          </h1>
        </div>
        <p
          onClick={closeHandler}
          className="4xl:size-12 5xl:text-[35px] flex size-7 cursor-pointer items-center justify-center rounded-lg text-[16px] text-white/50 transition-all delay-75 duration-100 hover:bg-white/10 hover:text-white"
        >
          <span>
            <IoCloseSharp />
          </span>
        </p>
      </div>

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="grid grid-cols-2 gap-2 space-y-2"
      >
        <div className="relative">
          <label
            htmlFor="name"
            className="font-[Vazirmatn] text-[15px] text-white/50"
          >
            نام منو
          </label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            placeholder="Name"
            {...register('name')}
            className={`input-text mt-1 caret-orange-500 ${errors?.name ? 'border-red-500' : ''}`}
          />

          {errors?.name && (
            <p className="absolute right-1 -bottom-1 rounded-xl bg-[#1c1c1c] px-1 text-xs text-red-500">
              {`* ${errors?.name?.message}`}
            </p>
          )}
        </div>
        <div className="relative">
          <label
            htmlFor="url"
            className="font-[Vazirmatn] text-[15px] text-white/50"
          >
            عنوان منو
          </label>
          <input
            type="text"
            id="title"
            autoComplete="off"
            placeholder="title"
            {...register('title')}
            className={`input-text mt-1 caret-orange-500 ${errors?.title ? 'border-red-500' : ''}`}
          />

          {errors?.title && (
            <p className="absolute right-1 -bottom-1 rounded-xl bg-[#1c1c1c] px-1 text-xs text-red-500">
              {`* ${errors?.title?.message}`}
            </p>
          )}
        </div>
        <div className="relative">
          <label
            htmlFor="url"
            className="font-[Vazirmatn] text-[15px] text-white/50"
          >
            آدرس
          </label>
          <input
            type="text"
            id="url"
            autoComplete="off"
            placeholder="url"
            {...register('url')}
            className={`input-text mt-1 caret-orange-500 ${errors?.url ? 'border-red-500' : ''}`}
          />

          {errors?.url && (
            <p className="absolute right-2 -bottom-1 rounded-xl bg-[#1c1c1c] px-1 text-xs text-red-500">
              {`* ${errors?.url?.message}`}
            </p>
          )}
        </div>

        <div className="relative">
          <label
            htmlFor="displayOrder"
            className="font-[Vazirmatn] text-[15px] text-white/50"
          >
            ترتیب
          </label>
          <input
            type="number"
            id="displayOrder"
            autoComplete="off"
            placeholder="displayOrder"
            {...register('displayOrder')}
            className={`input-text mt-1 caret-orange-500 ${errors?.displayOrder ? 'border-red-500' : ''}`}
          />

          {errors?.displayOrder && (
            <p className="absolute right-2 bottom-0 rounded-xl bg-[#1c1c1c] px-1 text-xs text-red-500">
              {`* ${errors?.displayOrder?.message}`}
            </p>
          )}
        </div>
        <div className="relative">
          <label className="font-[Vazirmatn] text-[15px] text-white/50">
            آیکون
          </label>

          <Combobox
            value={selectedIcon}
            onChange={(value) =>
              setValue('icon', value?.key || '', {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
            onClose={() => setQuery('')}
          >
            <div className="relative mt-1">
              <ComboboxInput
                displayValue={(icon) => icon?.label ?? ''}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="انتخاب آیکن..."
                autoComplete="off"
                className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-white caret-orange-500 outline-none placeholder:text-white/50"
              />
              <ComboboxButton className="absolute inset-y-0 top-1 left-0 px-1 text-3xl text-white/70">
                ▾
              </ComboboxButton>
            </div>

            <ComboboxOptions
              anchor="bottom"
              className="no-scrollbar z-999 w-(--input-width) rounded-xl bg-black/95 p-1 shadow-lg ring-1 ring-white/10 [--anchor-gap:8px]"
            >
              {filteredIcons.length === 0 ? (
                <div className="p-3 text-white/70">موردی پیدا نشد</div>
              ) : (
                filteredIcons.map((icon) => (
                  <ComboboxOption
                    key={icon.key || 'none'}
                    value={icon}
                    className="cursor-pointer rounded-lg p-3 text-white data-focus:bg-white/10 data-selected:bg-white/15"
                  >
                    {icon.label}
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </Combobox>

          {errors?.icon && (
            <p className="absolute right-2 -bottom-1 rounded-xl bg-[#1c1c1c] px-1 text-xs text-red-500">{`* ${errors.icon.message}`}</p>
          )}
        </div>
        <div className="relative">
          <label className="font-[Vazirmatn] text-[15px] text-white/50">
            منوی والد
          </label>

          <Combobox
            immediate
            value={selectedMenu ?? null}
            onChange={(value) =>
              setValue('parentMenuId', value?.id || '', {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
            onClose={() => setSearchMenu('')}
          >
            <div className="relative mt-1">
              <ComboboxInput
                displayValue={(m) => m?.title ?? ''}
                onChange={(e) => setSearchMenu(e.target.value)}
                placeholder="انتخاب منوی والد..."
                autoComplete="off"
                className="w-full rounded-xl bg-white/10 p-3 font-[Samim] text-white caret-orange-500 outline-none placeholder:text-white/50"
              />
              <ComboboxButton className="absolute inset-y-0 top-1 left-0 px-1 text-3xl text-white/70">
                ▾
              </ComboboxButton>
            </div>

            <ComboboxOptions
              anchor={{ to: 'bottom start', gap: 8, padding: 16 }}
              className="no-scrollbar z-999 w-(--input-width) rounded-xl bg-black/95 p-1 shadow-lg ring-1 ring-white/10"
            >
              {flatList.length === 0 ? (
                <div className="p-3 text-white/70">موردی پیدا نشد</div>
              ) : (
                flatList.map((m) => (
                  <ComboboxOption
                    key={m.id || 'no-parent'}
                    value={m}
                    className="cursor-pointer rounded-lg p-3 text-white data-focus:bg-white/10 data-selected:bg-white/15"
                  >
                    {m.title}
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </Combobox>

          {errors?.parentMenuId && (
            <p className="absolute right-2 -bottom-1 rounded-xl bg-[#1c1c1c] px-1 text-xs text-red-500">
              {`* ${errors.parentMenuId.message}`}
            </p>
          )}
        </div>
        <div className="col-span-2">
          <label
            htmlFor="isActive"
            className="font-[Vazirmatn] text-[15px] text-white/50"
          >
            وضعیت منو
          </label>
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

                  if (nextValue) {
                    setValue('companyId', null, {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }
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
              : selectedMenus
                ? 'ویرایش منو'
                : 'ایجاد منو'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormMenuJsx;
