import React, { useEffect } from 'react';
import z from 'zod/v3';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useGetFullAccess } from '../../../../../hooks/auth/authApi';
import {
  useCreateShift,
  useUpdateShift,
} from '../../../../../hooks/shift/shiftApi';

import ShiftFormJsx from '../template/ShiftFormJsx';

const shiftSchema = z.object({
  companyId: z.string().nullable(),
  name: z.string().trim().min(1, 'وارد کردن نام شیفت الزامی است'),
  description: z.string().trim(),
  pattern: z.number().min(1, 'وارد کردن نوع شیفت الزامی است'),
  color: z.string(),
  cycles: z.array(
    z.object({
      workDayType: z.number(),
      durationDays: z.number(),
      startTime: z.string(),
      endTime: z.string(),
      breakMinutes: z.number(),
    })
  ),
});

const initialState = {
  companyId: '',
  name: '',
  description: '',
  pattern: 0,
  color: '',
  cycles: [
    {
      workDayType: 0,
      durationDays: 0,
      startTime: '',
      endTime: '',
      breakMinutes: 0,
    },
  ],
};

function ShiftForm({ isModalOpen, selectedShift, onclose }) {
  const methods = useForm({
    resolver: zodResolver(shiftSchema),
    defaultValues: initialState,
    mode: 'onSubmit',
  });
  const { reset, watch, setValue, control } = methods;

  const { data: permission } = useGetFullAccess();

  const findCompany = permission?.companies?.find((c) => c.id);

  useEffect(() => {
    if (!isModalOpen) return;

    if (selectedShift) {
      reset({
        companyId: selectedShift.companyId ?? findCompany?.id ?? '',
        name: selectedShift.name,
        description: selectedShift.description,
        pattern: selectedShift.pattern,
        color: selectedShift.color,
        cycles: selectedShift.cycles?.length
          ? selectedShift.cycles.map((c) => ({
              workDayType: c.workDayType,
              durationDays: c.durationDays,
              startTime: c.startTime,
              endTime: c.endTime,
              breakMinutes: c.breakMinutes,
            }))
          : initialState.cycles,
      });
    } else {
      reset({ ...initialState, companyId: findCompany?.id ?? '' });
    }
  }, [isModalOpen, selectedShift, findCompany?.id, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'cycles',
  });

  const addCycles = () =>
    append({
      workDayType: 0,
      durationDays: 0,
      startTime: '',
      endTime: '',
      breakMinutes: '',
    });

  const removeCycles = (index) => remove(index);

  const closeHandler = () => {
    onclose();
    reset(initialState);
  };

  const createShift = useCreateShift();
  const updateShift = useUpdateShift();

  const submitHandler = (data) => {
    if (!selectedShift)
      return createShift.mutate(data, {
        onSuccess: () => {
          closeHandler();
        },
      });
    if (selectedShift)
      return updateShift.mutate(
        { id: selectedShift?.id, data },
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
          <ShiftFormJsx
            closeHandler={closeHandler}
            selectedShift={selectedShift}
            submitHandler={submitHandler}
            findCompany={findCompany}
            addCycles={addCycles}
            fields={fields}
            removeCycles={removeCycles}
          />
        </FormProvider>
      </div>
    </div>
  );
}

export default ShiftForm;
