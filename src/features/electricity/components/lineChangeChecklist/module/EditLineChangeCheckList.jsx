import React, { useEffect, useState } from 'react';
import EditLineChangeCheckListJsx from '../template/EditLineChangeCheckListJsx';
import { normalizeTime } from '../../../../../Time/date';
import { useUpdateLineChangeCheckList } from '../../../Api/LineChangeCheckList/lineChangeCheckList';

const operations = [
  { id: 1, name: 'بازدید و چک کردن سربندی موتورها' },
  {
    id: 2,
    name: 'بازدید و چک کردن کابل های ورودی، ایزوله های موجود و سینی کابل ها ماشین های IS',
  },
  { id: 3, name: 'نظافت الکتروموتورها' },
  { id: 4, name: 'بازدید و چک کردن مدارات فرمان و قدرت ماشین IS و گرمخانه' },
  {
    id: 5,
    name: 'بازدید و چک کردن کلیه رله ها و کنتاکتورها ماشین IS و گرمخانه',
  },
  { id: 6, name: 'بازدید و چک کردن تمامی مشعل های گرمخانه' },
  {
    id: 7,
    name: 'چک کردن و بررسی سیستم خنک کاری و کاور سرو موتورها و پوشرهای ماشین IS ',
  },
  { id: 8, name: 'بازدید و چک کردن سنسورها و میکروسوئیچ ها' },
  { id: 9, name: 'چک کردن شماره ها و لیبل گذاری های روی کابل ها و تجهیزات' },
  {
    id: 10,
    name: 'چک کردن و بررسی امرجنسی ها، کلیدهای کلنگی و شستی های استارت استپ ',
  },
  { id: 11, name: 'آچار کشی تابلوهای Localماشین IS' },
  {
    id: 12,
    name: 'اطمینان از آماده بکار بودن فن کولینگ ماشین و فن کولینگ کانوایر SPARE',
  },

  { id: 13, name: 'بازدید و چک کردن کلیه سربوبین ها و شیر برقی ها' },
  { id: 14, name: 'نظافت کامل تابلوها و بادگیری آن ها به وسیله بلوئر' },
  { id: 15, name: 'چک کردن و کنترل عایق نسوز کابل های ماشین IS ' },
  { id: 16, name: 'چک کردن و بررسی تمامی اتصالات و کانکتورها ماشین IS ' },
  {
    id: 17,
    name: 'اطمینان از خنک کاری پروانه الکتروموتورها و سالم بودن پره های آن',
  },
];

function EditLineChangeCheckList({
  openEditModal,
  setOpenEditModal,
  selectedCheckList,
  setSelectedCheckList,
}) {
  const [form, setForm] = useState({
    companyId: '',
    id: '',
    checklistDate: '',
    checklistTime: '',
    shiftName: '',
    lineName: '',
    shiftFlags: 2,
    description: '',
    items: [
      {
        id: '',
        operationName: '',
        isCompleted: true,
        description: '',
        executorName: '',
      },
    ],
  });

  useEffect(() => {
    if (!selectedCheckList) return;

    setForm({
      companyId: selectedCheckList?.companyId,
      id: selectedCheckList?.id,
      checklistDate: selectedCheckList?.checklistDate,
      checklistTime: normalizeTime(selectedCheckList?.checklistTime),
      lineName: selectedCheckList?.lineName,
      shiftName: selectedCheckList?.shiftName,
      shiftFlags: selectedCheckList?.shiftFlags,
      description: selectedCheckList?.description,
      items: selectedCheckList?.items?.length
        ? selectedCheckList?.items?.map((e) => ({
            id: e?.id,
            operationName: e?.operationName,
            isCompleted: e?.isCompleted,
            description: e?.description,
            executorName: e?.executorName,
          }))
        : operations?.map((o) => ({
            id: '',
            operationName: o?.operationName,
            isCompleted: true,
            description: '',
            executorName: '',
          })),
    });
  }, [selectedCheckList, openEditModal]);

  const closeHandler = () => {
    setOpenEditModal(false);
    setSelectedCheckList(null);
  };

  const updateReport = useUpdateLineChangeCheckList();
  const toHHmmss = (value) => (value ? `${value}:00` : '');

  const submitHandler = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      checklistTime: toHHmmss(form.checklistTime),
    };

    updateReport.mutate(
      { id: selectedCheckList?.id, payload },
      {
        onSuccess: () => {
          closeHandler();
        },
      }
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center overflow-auto p-4 transition-opacity duration-300 ${
        openEditModal
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
          openEditModal
            ? ' translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <EditLineChangeCheckListJsx
          openEditModal={openEditModal}
          closeHandler={closeHandler}
          form={form}
          setForm={setForm}
          submitHandler={submitHandler}
          selectedCheckList={selectedCheckList}
        />
      </div>
    </div>
  );
}

export default EditLineChangeCheckList;
