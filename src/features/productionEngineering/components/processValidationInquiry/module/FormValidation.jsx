import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';
import FormValidationJsx from '../template/FormValidationJsx';

const validSchema = z
  .object({
    companyId: z.string(),
    formDate: z.string().min(1, 'وارد کردن تاریخ الزامی است'),
    productionLine: z.coerce.number().min(1, 'وارد کردن شماره خط الزامی است'),
    productName: z.string().min(1, 'لطفا نام محصول را انتخاب کنید'),
    changeoverDate: z.string().min(1, 'وارد کردن تاریخ الزامی است'),
    validationStartTime: z.string().min(1, 'وارد کردن ساعت شروع الزامی است'),
    validationEndTime: z.string().min(1, 'وارد کردن ساعت پایان الزامی است'),
    validationDate: z.string().min(1, 'وارد کردن تاریخ صحه گذاری الزامی است'),
    warmupDuration: z.string().min(1, 'وارد کردن مقدار طول گرمخانه الزامی است'),
    deviationDuration: z
      .string()
      .min(1, 'وارد کردن مدت زمان انحراف الزامی است'),
    isValidationTimeApproved: z.boolean(),
    delayReason1: z.string().optional(),
    delayReason2: z.string().optional(),
    delayReason3: z.string().optional(),
    testResults: z.array(
      z.object({
        parameter: z.string().min(1, 'پارامتر الزامی است'),
        result: z.string().min(1, 'نتیجه الزامی است'),
        description: z.string().optional(),
      })
    ),
  })
  .refine((d) => d.validationEndTime > d.validationStartTime, {
    message: 'ساعت پایان باید بعد از ساعت شروع باشد',
    path: ['validationEndTime'],
  });

const resultName = [
  {
    id: '1',
    name: 'کیفیت محصول',
  },
  {
    id: '2',
    name: 'شوک',
  },
  {
    id: '3',
    name: 'چیدمان محصول',
  },
  {
    id: '4',
    name: 'برچسب محصول',
  },
];

const initialState = {
  companyId: '',
  formNumber: '',
  formDate: '',
  productionLine: '',
  productName: '',
  changeoverDate: '',
  validationStartTime: '',
  validationEndTime: '',
  validationDate: '',
  warmupDuration: '',
  deviationDuration: '',
  isValidationTimeApproved: true,
  delayReason1: '',
  delayReason2: '',
  delayReason3: '',
  testResults: resultName?.map((r) => ({
    parameter: r?.name,
    result: true,
    description: '',
  })),
};

function FormValidation({ isModalOpen, selectedValidation, onClose }) {
  const methods = useForm({
    resolver: zodResolver(validSchema),
    defaultValues: initialState,
    mode: 'onSubmit',
  });
  const { reset, watch } = methods;

  useEffect(() => {
    if (!isModalOpen) return;

    if (selectedValidation) {
      reset({
        companyId: selectedValidation?.companyId ?? '',
        formDate: selectedValidation?.formDate ?? '',
        productionLine: selectedValidation?.productionLine ?? 0,
        productName: selectedValidation?.productName ?? '',
        changeoverDate: selectedValidation?.changeoverDate ?? '',
        validationStartTime: selectedValidation?.validationStartTime ?? '',
        validationEndTime: selectedValidation?.validationEndTime ?? '',
        validationDate: selectedValidation?.validationDate ?? '',
        warmupDuration: selectedValidation?.warmupDuration ?? '',
        deviationDuration: selectedValidation?.deviationDuration ?? '',
        isValidationTimeApproved: selectedValidation?.isValidationTimeApproved,
        delayReason1: selectedValidation?.delayReason1 ?? '',
        delayReason2: selectedValidation?.delayReason2 ?? '',
        delayReason3: selectedValidation?.delayReason3 ?? '',
        testResults: selectedValidation?.testResults?.length
          ? selectedValidation?.testResults?.map((s) => ({
              parameter: s?.parameter ?? '',
              result: s?.result ?? null,
              description: s?.description ?? '',
            }))
          : {
              parameter: resultName?.name ?? '',
              result: null,
              description: '',
            },
      });
    } else {
      reset(initialState);
    }
  }, [selectedValidation, isModalOpen, reset]);

  const closeHandler = () => {
    onClose();
    reset(initialState);
  };

  const submitHandler = () => {};

  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center overflow-auto p-4 transition-opacity duration-300 ${
        isModalOpen
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
          isModalOpen
            ? ' translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <FormProvider {...methods}>
          <FormValidationJsx
            closeHandler={closeHandler}
            selectedValidation={selectedValidation}
            submitHandler={submitHandler}
          />
        </FormProvider>
      </div>
    </div>
  );
}

export default FormValidation;
