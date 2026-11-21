import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { IoCloseSharp } from 'react-icons/io5';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

function FormValidationJsx({
  closeHandler,
  selectedValidation,
  submitHandler,
}) {
  const {
    watch,
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useFormContext();

  console.log(watch('testResults'));

  const { fields } = useFieldArray({ control, name: 'testResults' });
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="5xl:text-[35px] pr-1.5 font-[Vazirmatn] text-sm font-semibold">
            {selectedValidation
              ? `ویرایش گزارش  ${selectedValidation?.title}`
              : 'افزودن گزارش '}
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
        <div className="relative col-span-3 mt-5 flex w-fit flex-col">
          <label htmlFor="formDate">تاریخ</label>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            placeholder="تاریخ ثبت گزارش"
            format="YYYY/MM/DD"
            calendarPosition="bottom-center"
            inputClass="input-date mt-2"
            value={watch('formDate') ? new Date(watch('formDate')) : ''}
            onChange={(value) =>
              setValue(
                'formDate',
                value ? value.toDate().toISOString().split('T')[0] : '',
                { shouldValidate: true, shouldDirty: true }
              )
            }
          />
          {errors?.formDate && (
            <p className="absolute top-18 right-5 rounded-xl bg-[#1c1c1c] px-1 text-xs text-red-500">
              {`* ${errors?.formDate?.message}`}
            </p>
          )}
        </div>

        <div className="relative">
          <label htmlFor="productionLine">شماره خط</label>
          <input
            type="number"
            id="productionLine"
            autoComplete="off"
            placeholder="شماره خط مورد نظر را وارد کنید"
            {...register('productionLine', { valueAsNumber: true })}
            className={`input-text mt-1 font-[AvenirLTProHeavy] caret-orange-500 ${errors?.productionLine ? 'border-red-500' : ''}`}
          />
          {errors?.productionLine && (
            <p className="absolute top-18 right-5 rounded-xl bg-[#1c1c1c] px-1 text-xs text-red-500">
              {`* ${errors?.productionLine?.message}`}
            </p>
          )}
        </div>

        <div className="relative">انتخاب محصول</div>
        <div className="relative mt-5 flex flex-col">
          <label htmlFor="changeoverDate">تاریخ صحه گذاری</label>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            placeholder="ثبت تاریخ صحه گذاری"
            format="YYYY/MM/DD"
            calendarPosition="bottom-center"
            inputClass="input-date mt-2"
            value={
              watch('changeoverDate') ? new Date(watch('changeoverDate')) : ''
            }
            onChange={(value) =>
              setValue(
                'changeoverDate',
                value ? value.toDate().toISOString().split('T')[0] : '',
                { shouldValidate: true, shouldDirty: true }
              )
            }
          />
          {errors?.changeoverDate && (
            <p className="absolute top-18 right-5 rounded-xl bg-[#1c1c1c] px-1 text-xs text-red-500">
              {`* ${errors?.changeoverDate?.message}`}
            </p>
          )}
        </div>
        <div className="col-span-3">
          <h1 className="font-[Vazirmatn] text-xl font-extrabold">
            نتایج آزمون ها
          </h1>
          {fields.map((item, index) => {
            const result = watch(`testResults.${index}.result`);

            return (
              <div
                key={item.id}
                className="mt-3 grid grid-cols-4 items-center justify-between rounded-xl bg-white/10 p-2"
              >
                <div>
                  <p className="font-[Samim]">{item.parameter}</p>
                  <input
                    type="hidden"
                    {...register(`testResults.${index}.parameter`)}
                  />
                </div>
                <div className="rounded- flex w-50 items-center justify-between rounded-xl border border-white/5 bg-white/5 px-3 py-2">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={!!result}
                    onClick={() =>
                      setValue(`testResults.${index}.result`, !result, {
                        shouldDirty: true,
                        shouldValidate: true,
                      })
                    }
                    className={`relative h-6 w-12 shrink-0 cursor-pointer rounded-full transition-colors ${
                      result ? 'bg-orange-700/95' : 'bg-white/15'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 size-5 rounded-full bg-white transition-all ${
                        result ? 'right-0.5' : 'right-6'
                      }`}
                    />
                  </button>
                  <p className="relative h-6 w-15 font-[Samim] text-sm">
                    <span
                      className={`absolute inset-0 flex justify-between transition-all duration-300 ease-in-out ${
                        result
                          ? 'translate-y-0 opacity-100'
                          : '-translate-y-1 opacity-0'
                      }`}
                    >
                      تایید
                    </span>
                    <span
                      className={`absolute inset-0 flex items-center justify-between transition-all duration-300 ease-in-out ${
                        result
                          ? 'translate-y-1 opacity-0'
                          : 'translate-y-0 opacity-100'
                      }`}
                    >
                      عدم تایید
                    </span>
                  </p>
                </div>
                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="توضیحات"
                    autoComplete="off"
                    {...register(`testResults.${index}.description`)}
                    className="input-text"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
}

export default FormValidationJsx;
