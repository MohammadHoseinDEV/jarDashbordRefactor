import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import DatePicker from 'react-multi-date-picker';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';

const errorClass =
  'absolute top-18 right-5 rounded-xl bg-[#1c1c1c] px-1 text-xs text-red-500';

export const isoToPersian = (iso) =>
  iso
    ? new DateObject({
        date: String(iso).slice(0, 10), 
        format: 'YYYY-MM-DD',
        calendar: gregorian,
        locale: gregorian_en,
      }).convert(persian, persian_fa)
    : '';

export const persianToIso = (date) =>
  date ? date.convert(gregorian, gregorian_en).format('YYYY-MM-DD') : '';

function DateField({ name, label, placeholder, className = '' }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors?.[name];

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label htmlFor={name} className="flex flex-col">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            format="YYYY/MM/DD"
            placeholder={placeholder}
            autoComplete="off"
            calendarPosition="bottom-center"
            containerClassName="w-full"
            inputClass={`input-text mt-1 caret-orange-500 ${
              error ? 'border-red-500' : ''
            }`}
            value={isoToPersian(field.value)}
            onChange={(date) => field.onChange(persianToIso(date))}
          />
        )}
      />

      {error && <p className={errorClass}>{`* ${error.message}`}</p>}
    </div>
  );
}

export default DateField;
