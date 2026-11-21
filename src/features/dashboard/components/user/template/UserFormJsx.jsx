import React, { useEffect } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { FaUser } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/react';
import DatePicker from 'react-multi-date-picker';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';

import useSelectOptions from '../../../../dropDown/dropDownHook';

const errorClass =
  'absolute top-18 right-5 rounded-xl bg-[#1c1c1c] px-1 text-xs text-red-500';

const EMPTY = [];

function TextField({ name, label, placeholder, className = '' }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors?.[name];

  return (
    <div className={`relative ${className}`}>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        id={name}
        autoComplete="off"
        placeholder={placeholder}
        {...register(name)}
        className={`input-text mt-1 caret-orange-500 ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className={errorClass}>{`* ${error.message}`}</p>}
    </div>
  );
}

const isoToPersian = (iso) =>
  iso
    ? new DateObject({
        date: iso,
        format: 'YYYY-MM-DD',
        calendar: gregorian,
        locale: gregorian_en,
      }).convert(persian, persian_fa)
    : '';

function DateField({ name, label, placeholder, className = '' }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors?.[name];

  return (
    <div className={`relative ${className}`}>
      <label htmlFor={name} className="flex flex-col">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            placeholder={placeholder}
            autoComplete="off"
            format="YYYY/MM/DD"
            calendarPosition="bottom-center"
            containerClassName="w-full"
            inputClass={`input-text mt-1 caret-orange-500 ${error ? 'border-red-500' : ''}`}
            value={isoToPersian(field.value)}
            onChange={(date) =>
              field.onChange(
                date
                  ? date.convert(gregorian, gregorian_en).format('YYYY-MM-DD')
                  : ''
              )
            }
          />
        )}
      />
      {error && <p className={errorClass}>{`* ${error.message}`}</p>}
    </div>
  );
}

function SelectField({ label, select, onSelect, placeholder, error }) {
  return (
    <div className="relative">
      <label>{label}</label>
      <div
        className={`rounded-xl border text-[16px] font-semibold text-[Vazirmatn] ${
          error ? 'border-red-500' : 'border-white/10'
        }`}
      >
        <Combobox
          immediate
          value={select?.selected}
          onChange={onSelect}
          onClose={() => select?.setSearch('')}
        >
          <div className="relative mt-1">
            <ComboboxInput
              displayValue={(c) => (c?.id ? (c.name ?? c.title ?? '') : '')}
              onChange={(e) => select?.setSearch(e.target.value)}
              placeholder={placeholder}
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
            {select?.filtered?.length === 0 ? (
              <div className="p-3 text-white/70">موردی پیدا نشد</div>
            ) : (
              select?.filtered?.map((c) => (
                <ComboboxOption
                  key={c.id ?? 'empty'}
                  value={c}
                  className="cursor-pointer rounded-lg p-3 text-white data-focus:bg-white/10 data-selected:bg-white/15"
                >
                  {c.name ?? c.title}
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        </Combobox>
      </div>
      {error && <p className={errorClass}>{`* ${error}`}</p>}
    </div>
  );
}

function JobPositionRow({
  index,
  jobItems,
  roleItems,
  departmentItems,
  systemItems,
  scopeTypeOptions,
  canRemove,
  onRemove,
  onSetPrimary,
}) {
  const {
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();

  const base = `jobPositions.${index}`;
  const jobId = watch(`${base}.jobPositionId`);
  const managerId = watch(`${base}.managerJobPositionId`);
  const roleId = watch(`${base}.roleId`);
  const isPrimary = watch(`${base}.isPrimary`);
  const scopeType = watch(`${base}.scopeType`);
  const scopeId = watch(`${base}.scopeId`);

  const scopeTypeField = register(`${base}.scopeType`);

  const items = jobItems ?? [];
  const selectedJob = items.find((j) => String(j.id) === String(jobId));
  const selectedManager = items.find((j) => String(j.id) === String(managerId));

  const jobLevel = selectedJob ? Number(selectedJob.level) : null;
  const managerLevel = selectedManager ? Number(selectedManager.level) : null;

  const jobPosition = useSelectOptions(
    items.filter(
      (m) => managerLevel === null || Number(m.level) > managerLevel
    ),
    'انتخاب جایگاه شغلی',
    jobId
  );

  const manager = useSelectOptions(
    items.filter((j) => jobLevel === null || Number(j.level) < jobLevel),
    'انتخاب جایگاه شغلی والد',
    managerId
  );

  const roles = useSelectOptions(roleItems, 'انتخاب نقش', roleId);

  const scopeTarget = useSelectOptions(
    scopeType === '0'
      ? departmentItems
      : scopeType === '3'
        ? systemItems
        : EMPTY,
    scopeType === '0' ? 'انتخاب دپارتمان' : 'انتخاب سیستم',
    scopeId
  );

  useEffect(() => {
    if (
      jobLevel !== null &&
      managerLevel !== null &&
      managerLevel >= jobLevel
    ) {
      setValue(`${base}.managerJobPositionId`, '', { shouldDirty: true });
    }
  }, [jobLevel, managerLevel, base, setValue]);

  const rowErrors = errors?.jobPositions?.[index];

  const onSelect = (field) => (value) =>
    setValue(`${base}.${field}`, value?.id ?? '', {
      shouldValidate: true,
      shouldDirty: true,
    });

  return (
    <div className="relative grid gap-5 rounded-xl border border-white/10 p-4 pb-8 md:grid-cols-3">
      <SelectField
        label="انتخاب جایگاه شغلی"
        placeholder="انتخاب جایگاه شغلی ..."
        select={jobPosition}
        onSelect={onSelect('jobPositionId')}
        error={rowErrors?.jobPositionId?.message}
      />
      <SelectField
        label="انتخاب نقش"
        placeholder="انتخاب نقش..."
        select={roles}
        onSelect={onSelect('roleId')}
        error={rowErrors?.roleId?.message}
      />
      <SelectField
        label="انتخاب جایگاه شغلی والد"
        placeholder="انتخاب جایگاه شغلی والد..."
        select={manager}
        onSelect={onSelect('managerJobPositionId')}
        error={rowErrors?.managerJobPositionId?.message}
      />

      <div className="flex items-center justify-between self-end rounded-xl border border-white/10 bg-white/5 p-3">
        <p className="font-[Vazirmatn] text-sm font-semibold">جایگاه اصلی</p>
        <button
          type="button"
          role="switch"
          aria-checked={Boolean(isPrimary)}
          onClick={() => onSetPrimary(!isPrimary)}
          className={`relative flex h-6 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors ${
            isPrimary ? 'bg-orange-700/95' : 'bg-white/15'
          }`}
        >
          <span
            className={`absolute top-0.5 size-5 rounded-full bg-white transition-transform ${
              isPrimary ? '-translate-x-3' : 'translate-x-3'
            }`}
          />
        </button>
      </div>

      <div className="relative">
        <label htmlFor={`${base}-scopeType`}>محدوده‌ی دسترسی نقش</label>
        <select
          id={`${base}-scopeType`}
          {...scopeTypeField}
          onChange={(e) => {
            scopeTypeField.onChange(e);
            setValue(`${base}.scopeId`, '');
          }}
          className={`input-text mt-1 ${rowErrors?.scopeType ? 'border-red-500' : ''}`}
        >
          <option value="" className="bg-[#1c1c1c]">
            بدون محدوده
          </option>
          {scopeTypeOptions?.map((s) => (
            <option key={s.id} value={String(s.id)} className="bg-[#1c1c1c]">
              {s.name}
            </option>
          ))}
        </select>
        {rowErrors?.scopeType && (
          <p className={errorClass}>{`* ${rowErrors.scopeType.message}`}</p>
        )}
      </div>

      {scopeType && (
        <SelectField
          label={scopeType === '0' ? 'دپارتمان' : 'سیستم'}
          placeholder="انتخاب محدوده..."
          select={scopeTarget}
          onSelect={onSelect('scopeId')}
          error={rowErrors?.scopeId?.message}
        />
      )}

      {canRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="cursor-pointer self-center rounded-xl bg-red-500/15 p-3 text-sm text-red-400 transition-colors hover:bg-red-500/25 md:col-span-2 md:justify-self-start"
        >
          حذف این جایگاه
        </button>
      )}
    </div>
  );
}

function UserFormJsx({
  closeHandler,
  selectedUser,
  submitHandler,
  education,
  jobItems,
  roleItems,
  departmentItems,
  systemItems,
  scopeTypeOptions,
}) {
  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useFormContext();
  const isActive = watch('isActive');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'jobPositions',
  });

  const addPosition = () =>
    append({
      jobPositionId: '',
      roleId: '',
      managerJobPositionId: '',
      isPrimary: false,
      scopeType: '',
      scopeId: '',
    });

  const setPrimary = (index, value) => {
    fields.forEach((_, i) => {
      setValue(`jobPositions.${i}.isPrimary`, i === index ? value : false, {
        shouldDirty: true,
      });
    });
  };

  const removeRow = (index) => {
    const wasPrimary = getValues(`jobPositions.${index}.isPrimary`);
    remove(index);
    if (wasPrimary) setValue('jobPositions.0.isPrimary', true);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <p className="rounded-full bg-white/15 p-3">
            <FaUser />
          </p>
          <h1 className="5xl:text-[35px] pr-1.5 font-[Vazirmatn] text-sm font-semibold">
            {selectedUser
              ? `ویرایش کاربر ${selectedUser?.firstName ?? ''} ${selectedUser?.lastName ?? ''}`
              : 'افزودن کاربر'}
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
        className="flex flex-col gap-5 md:grid md:grid-cols-3"
      >
        <TextField
          name="firstName"
          label="نام"
          placeholder="نام را وارد کنید"
          className="mt-5"
        />
        <TextField
          name="lastName"
          label="نام خانوادگی"
          placeholder="نام خانوادگی را وارد کنید"
          className="mt-5"
        />
        <TextField
          name="personnelCode"
          label="کد پرسنلی"
          placeholder="کد پرسنلی را وارد کنید"
          className="mt-5"
        />
        <TextField
          name="password"
          label={selectedUser ? 'رمز عبور جدید (اختیاری)' : 'رمز عبور'}
          placeholder={
            selectedUser
              ? 'فقط برای تغییر رمز وارد کنید'
              : 'رمز عبور را وارد کنید'
          }
        />
        <TextField
          name="nationalCode"
          label="کد ملی"
          placeholder="کد ملی را وارد کنید"
        />
        <TextField
          name="insuranceCode"
          label="کد بیمه"
          placeholder="کد بیمه را وارد کنید"
        />
        <TextField
          name="faceCode"
          label="کد Face"
          placeholder="کد Face را وارد کنید"
        />
        <TextField
          name="email"
          label="ایمیل"
          placeholder="ایمیل را وارد کنید"
        />

        <SelectField
          label="انتخاب مدرک تحصیلی"
          placeholder="انتخاب مدرک تحصیلی..."
          select={education}
          onSelect={(value) =>
            setValue('educationDegreeId', value?.id ?? '', {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          error={errors?.educationDegreeId?.message}
        />

        <TextField
          name="mobileNumber"
          label="تلفن همراه"
          placeholder="تلفن همراه را وارد کنید"
        />
        <TextField
          name="homePhoneNumber"
          label="تلفن منزل"
          placeholder="تلفن منزل را وارد کنید"
        />

        <DateField
          name="birthDate"
          label="تاریخ تولد"
          placeholder="تاریخ تولد"
        />
        <DateField
          name="hireDate"
          label="تاریخ استخدام"
          placeholder="تاریخ استخدام"
        />

        <div className="col-span-1">
          <label>وضعیت کاربر</label>
          <div className="mt-1 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="font-[Vazirmatn] text-sm font-semibold">وضعیت</p>
            <button
              type="button"
              role="switch"
              aria-checked={Boolean(isActive)}
              onClick={() =>
                setValue('isActive', !isActive, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
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
          </div>
        </div>

        <div className="col-span-3 flex flex-col gap-4">
          <p className="font-[Vazirmatn] text-sm font-semibold">
            جایگاه‌های شغلی
          </p>

          {fields.map((field, index) => (
            <JobPositionRow
              key={field.id}
              index={index}
              jobItems={jobItems}
              roleItems={roleItems}
              departmentItems={departmentItems}
              systemItems={systemItems}
              scopeTypeOptions={scopeTypeOptions}
              canRemove={fields.length > 1}
              onRemove={() => removeRow(index)}
              onSetPrimary={(value) => setPrimary(index, value)}
            />
          ))}

          <button
            type="button"
            onClick={addPosition}
            className="cursor-pointer self-start rounded-xl border border-dashed border-white/20 px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/10"
          >
            + افزودن جایگاه شغلی
          </button>

          {errors?.jobPositions?.message && (
            <p className="text-xs text-red-500">
              {`* ${errors.jobPositions.message}`}
            </p>
          )}
        </div>

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
            disabled={isSubmitting}
            className="cursor-pointer rounded-xl bg-orange-700/95 px-5 py-3 font-[Vazirmatn] text-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting
              ? 'در حال ارسال...'
              : selectedUser
                ? 'ویرایش کاربر'
                : 'ایجاد کاربر'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserFormJsx;
