import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';

import { useUpdateElectricityReport } from '../../Api/electricityUPS/electricityUps';
import { IoAdd, IoCloseSharp, IoTrashOutline } from 'react-icons/io5';

const emptySection1Item = { voltage: '', voltage1: '' };
const emptySection2Item = { g1: '', g2: '' };

const initialState = {
  id: '',
  readingDate: '',
  shiftName: '',
  personnelName: '',
  shiftFlags: 0,
  section1Items: [{ ...emptySection1Item }],
  section2Items: [{ ...emptySection2Item }],
};

// مقدار خالی را به 0 و بقیه را به عدد تبدیل می‌کند (بک‌اند عدد می‌خواهد)
const toNumber = (value) => {
  if (value === '' || value === null || value === undefined) return 0;
  const n = Number(value);
  return Number.isNaN(n) ? 0 : n;
};

// رشته‌ی تاریخ میلادی (YYYY-MM-DD یا ISO) را به DateObject شمسی تبدیل می‌کند
const toPersianDate = (value) => {
  if (!value) return null;
  const datePart = String(value).split('T')[0];
  try {
    return new DateObject({
      date: datePart,
      format: 'YYYY-MM-DD',
      calendar: gregorian,
      locale: gregorian_en,
    }).convert(persian, persian_fa);
  } catch {
    return null;
  }
};

function EditElectricityUps({
  openEditReport,
  setOpenEditReport,
  selectedReport,
  setSelectedReport,
}) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (!selectedReport) return;

    setForm({
      id: selectedReport?.id,
      readingDate: selectedReport?.readingDate
        ? String(selectedReport.readingDate).split('T')[0]
        : '',
      shiftName: selectedReport?.shiftName ?? '',
      personnelName: selectedReport?.personnelName ?? '',
      shiftFlags: selectedReport?.shiftFlags ?? 0,
      section1Items: selectedReport?.section1Items?.length
        ? selectedReport.section1Items.map((sec) => ({
            id: sec?.id,
            voltage: sec?.voltage ?? '',
            voltage1: sec?.voltage1 ?? '',
          }))
        : [{ ...emptySection1Item }],
      section2Items: selectedReport?.section2Items?.length
        ? selectedReport.section2Items.map((sec) => ({
            id: sec?.id,
            g1: sec?.g1 ?? '',
            g2: sec?.g2 ?? '',
          }))
        : [{ ...emptySection2Item }],
    });
  }, [selectedReport, openEditReport]);

  //   S1
  const addItems = () => {
    if (form.section1Items?.length >= 33) {
      toast.warning('حداکثر 33 ردیف قابل اضافه کردن است');
      return;
    }

    setForm((p) => ({
      ...p,
      section1Items: [...(p.section1Items || []), { ...emptySection1Item }],
    }));
  };

  const removeItems = (index) => {
    setForm((p) => {
      const next = [...(p.section1Items || [])];

      next.splice(index, 1);
      if (next.length === 0) {
        next.push({ ...emptySection1Item });
      }
      return { ...p, section1Items: next };
    });
  };

  const updateItems = (index, field, value) => {
    setForm((p) => {
      const next = [...p.section1Items];
      next[index] = { ...next[index], [field]: value };
      return { ...p, section1Items: next };
    });
  };
  //   -------------------------------------------------

  // S2
  const addRows = () => {
    if (form.section2Items?.length >= 4) {
      toast.warning('حداکثر 4 ردیف قابل اضافه کردن است');
      return;
    }

    setForm((p) => ({
      ...p,
      section2Items: [...(p.section2Items || []), { ...emptySection2Item }],
    }));
  };

  const removeRows = (index) => {
    setForm((p) => {
      const next = [...(p.section2Items || [])];

      next.splice(index, 1);
      if (next.length === 0) {
        next.push({ ...emptySection2Item });
      }
      return { ...p, section2Items: next };
    });
  };

  const updateRows = (index, field, value) => {
    setForm((p) => {
      const next = [...p.section2Items];
      next[index] = { ...next[index], [field]: value };
      return { ...p, section2Items: next };
    });
  };
  //   --------------------------------------------------------

  const closeHandler = () => {
    setOpenEditReport(false);
    setSelectedReport(null);
  };

  const updateReport = useUpdateElectricityReport();

  const submitHandler = (e) => {
    e.preventDefault();

    if (updateReport.isPending) return;

    if (!form.readingDate) {
      toast.warning('تاریخ گزارش را انتخاب کنید');
      return;
    }

    const payload = {
      id: form.id,
      readingDate: form.readingDate,
      shiftName: form.shiftName,
      personnelName: form.personnelName,
      shiftFlags: form.shiftFlags,
      section1Items: (form.section1Items || []).map((s) => ({
        ...(s.id ? { id: s.id } : {}),
        voltage: toNumber(s.voltage),
        voltage1: toNumber(s.voltage1),
      })),
      section2Items: (form.section2Items || []).map((s) => ({
        ...(s.id ? { id: s.id } : {}),
        g1: toNumber(s.g1),
        g2: toNumber(s.g2),
      })),
    };

    updateReport.mutate(
      { id: selectedReport?.id, data: payload },
      {
        onSuccess: () => {
          setOpenEditReport(false);
          setSelectedReport(null);
        },
      }
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center overflow-auto p-4 transition-opacity duration-300 ${
        openEditReport
          ? 'pointer-events-auto opacity-100 '
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={closeHandler}
      />
      <div
        className={`no-scrollbar relative flex max-h-[90vh] transform flex-col overflow-auto rounded-[15px] bg-linear-to-b from-[#1c1c1c] to-[#0c0c0c] px-6 py-4 text-white shadow-2xl transition-all duration-300 ${
          openEditReport
            ? ' translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="flex shrink-0 items-center justify-between">
          <p className="pr-1.5 font-[SamimBold] text-[20px]">
            ویرایش فرم گزارش ولتاژگیری باطریهای UPS
          </p>
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
          onSubmit={submitHandler}
          className="no-scrollbar flex min-h-0 flex-col overflow-x-hidden overflow-y-auto max-md:max-h-[70vh]"
        >
          <div className="grid grid-cols-3 gap-4 max-md:flex max-md:flex-col">
            <label htmlFor="readingDate" className="flex flex-col">
              تاریخ
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                placeholder="تاریخ ثبت گزارش"
                name="readingDate"
                format="YYYY/MM/DD"
                calendarPosition="bottom-center"
                value={toPersianDate(form.readingDate)}
                onChange={(value) =>
                  setForm((p) => ({
                    ...p,
                    readingDate: value
                      ? value
                          .convert(gregorian, gregorian_en)
                          .format('YYYY-MM-DD')
                      : '',
                  }))
                }
                inputClass="w-full rounded-xl bg-white/10 p-3 mt-2 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
            <label htmlFor="shiftName">
              شیفت
              <input
                type="text"
                name="shiftName"
                value={form.shiftName || ''}
                readOnly
                className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
            <label htmlFor="personnelName">
              نام و نام خانوادگی
              <input
                type="text"
                name="personnelName"
                value={form.personnelName || ''}
                readOnly
                className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
              />
            </label>
          </div>
          <div className="grid grid-cols-5 gap-4 py-5 max-md:grid max-md:grid-cols-2">
            <label
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all max-md:col-span-2 ${
                form.shiftFlags === 0
                  ? 'border-white bg-white text-black'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[15px]`}
            >
              <input
                type="radio"
                name="shiftFlags"
                value={0}
                checked={form.shiftFlags === 0}
                onChange={() => setForm({ ...form, shiftFlags: 0 })}
                className="hidden"
              />
              اداری
            </label>
            <label
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all ${
                form.shiftFlags === 2
                  ? 'border-white bg-white text-black'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[15px]`}
            >
              <input
                type="radio"
                name="shiftFlags"
                value={2}
                checked={form.shiftFlags === 2}
                onChange={() => setForm({ ...form, shiftFlags: 2 })}
                className="hidden"
              />
              روز کاری اول
            </label>
            <label
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all ${
                form.shiftFlags === 4
                  ? 'border-white bg-white text-black'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[15px]`}
            >
              <input
                type="radio"
                name="shiftFlags"
                value={4}
                checked={form.shiftFlags === 4}
                onChange={() => setForm({ ...form, shiftFlags: 4 })}
                className="hidden"
              />
              روز کاری دوم
            </label>
            <label
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all max-md:text-[14px] ${
                form.shiftFlags === 6
                  ? 'border-white bg-white text-black'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[15px]`}
            >
              <input
                type="radio"
                name="shiftFlags"
                value={6}
                checked={form.shiftFlags === 6}
                onChange={() => setForm({ ...form, shiftFlags: 6 })}
                className="hidden"
              />
              شب کاری اول
            </label>
            <label
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-8 py-2 transition-all max-md:text-[14px] ${
                form.shiftFlags === 8
                  ? 'border-white bg-white text-black'
                  : 'border-[#2a2a2a] bg-[#141414] text-gray-300'
              } font-[SamimBold] text-[15px]`}
            >
              <input
                type="radio"
                name="shiftFlags"
                value={8}
                checked={form.shiftFlags === 8}
                onChange={() => setForm({ ...form, shiftFlags: 8 })}
                className="hidden"
              />
              شب کاری دوم
            </label>
          </div>
          <p className="border-t border-white/50 pt-2 font-[SamimBold] text-[25px]">
            ولتاژ
          </p>
          <div>
            {(form?.section1Items || []).map((s, index) => (
              <div
                key={s.id ?? index}
                className="my-3 rounded-xl border border-white/30 p-3 text-left max-md:flex max-md:flex-col"
              >
                <p className="col-span-3 text-right font-[AvenirLTProMedium]">
                  {`${index + 1})`}
                </p>
                <button
                  type="button"
                  onClick={addItems}
                  className="mb-3 inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 font-[Samim] text-[15px] text-emerald-400 transition-all duration-150 hover:bg-emerald-500 hover:text-white active:scale-[0.97] max-md:flex max-md:w-full"
                >
                  <IoAdd className="text-[20px]" />
                  افزودن ردیف
                </button>
                <div className="grid grid-cols-2 gap-4 rounded-[10px] text-right max-md:flex max-md:flex-col">
                  <label htmlFor={`voltage-${index}`}>
                    ولتاژ A
                    <input
                      id={`voltage-${index}`}
                      type="number"
                      step="0.001"
                      name="voltage"
                      value={s.voltage ?? ''}
                      onChange={(e) =>
                        updateItems(index, 'voltage', e.target.value)
                      }
                      className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none"
                      onWheel={(e) => e.currentTarget.blur()}
                    />
                  </label>
                  <label htmlFor={`voltage1-${index}`}>
                    ولتاژ B
                    <input
                      id={`voltage1-${index}`}
                      type="number"
                      step="0.001"
                      name="voltage1"
                      value={s.voltage1 ?? ''}
                      onChange={(e) =>
                        updateItems(index, 'voltage1', e.target.value)
                      }
                      className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[AvenirLTProMedium] text-[18px] text-white outline-none"
                      onWheel={(e) => e.currentTarget.blur()}
                    />
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    removeItems(index);
                  }}
                  className="mt-3 inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2 font-[Samim] text-[15px] text-red-400 transition-all duration-150 hover:bg-red-500 hover:text-white active:scale-[0.97] max-md:flex max-md:w-full"
                >
                  <IoTrashOutline className="text-[18px]" />
                  حذف ردیف
                </button>
              </div>
            ))}
          </div>
          <p className="border-t border-white/50 pt-2 font-[AvenirLTProMedium] text-[25px]">
            G1,G2
          </p>
          <div>
            {(form?.section2Items || []).map((s, index) => (
              <div
                key={s.id ?? index}
                className="my-3 rounded-xl border border-white/30 p-3 text-left max-md:flex max-md:flex-col"
              >
                <p className="col-span-3 text-right font-[AvenirLTProMedium]">
                  {`${index + 1})`}
                </p>
                <button
                  type="button"
                  onClick={addRows}
                  className="mb-3 inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 font-[Samim] text-[15px] text-emerald-400 transition-all duration-150 hover:bg-emerald-500 hover:text-white active:scale-[0.97] max-md:flex max-md:w-full"
                >
                  <IoAdd className="text-[20px]" />
                  افزودن ردیف
                </button>
                <div className="grid grid-cols-2 gap-4 rounded-[10px] text-right max-md:flex max-md:flex-col">
                  <label
                    htmlFor={`g1-${index}`}
                    className="font-[AvenirLTProMedium]"
                  >
                    G1
                    <input
                      id={`g1-${index}`}
                      type="number"
                      step="0.001"
                      name="g1"
                      value={s.g1 ?? ''}
                      onChange={(e) => updateRows(index, 'g1', e.target.value)}
                      className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                      onWheel={(e) => e.currentTarget.blur()}
                    />
                  </label>
                  <label
                    htmlFor={`g2-${index}`}
                    className="font-[AvenirLTProMedium]"
                  >
                    G2
                    <input
                      id={`g2-${index}`}
                      type="number"
                      step="0.001"
                      name="g2"
                      value={s.g2 ?? ''}
                      onChange={(e) => updateRows(index, 'g2', e.target.value)}
                      className="mt-2 w-full rounded-xl bg-white/10 p-3 font-[Samim] text-[18px] text-white outline-none"
                      onWheel={(e) => e.currentTarget.blur()}
                    />
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    removeRows(index);
                  }}
                  className="mt-3 inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2 font-[Samim] text-[15px] text-red-400 transition-all duration-150 hover:bg-red-500 hover:text-white active:scale-[0.97] max-md:flex max-md:w-full"
                >
                  <IoTrashOutline className="text-[18px]" />
                  حذف ردیف
                </button>
              </div>
            ))}
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
              disabled={updateReport.isPending}
              className="btn-submit disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updateReport.isPending ? 'در حال ثبت...' : 'ثبت گزارش'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditElectricityUps;
