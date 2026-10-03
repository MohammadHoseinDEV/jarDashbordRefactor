import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { useGetHolding } from '../../../../../hooks/holding/holding';
import FormDepartmentJsx from '../template/FormDepartmentJsx';
import {
  useCreateDepartment,
  useUpdateDepartment,
} from '../../../../../hooks/depratment/department';

const departmentSchema = z.object({
  name: z.string().trim().min(1, 'نام دپارتمان الزامی است'),
  code: z.string().trim().min(1, 'کد دپارتمان الزامی است'),
  holdingId: z.string().min(1, 'انتخاب هلیدنگ الزامی است'),
  isActive: z.boolean(),
});

const initialState = {
  name: '',
  code: '',
  holdingId: '',
  isActive: true,
};

function FormDepartment({
  isModalOpen,
  setIsModalOpen,
  selectedDepartment,
  setselectedDepartment,
}) {
  const [searchHolding, setsearchHolding] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(departmentSchema),
    defaultValues: initialState,
    mode: 'onSubmit',
  });
  const formValues = watch();

  console.log(formValues);

  const { data: hold } = useGetHolding();

  const getHolding = useMemo(() => {
    const none = { id: '', name: 'انتخاب هلدینگ', isActive: true };

    return [
      none,
      ...(hold?.holdings ?? []).map((h) => ({
        id: h.id,
        name: h.name,
        isActive: h.isActive,
      })),
    ];
  }, [hold]);

  const filterholding = useMemo(() => {
    const q = searchHolding.trim().toLocaleLowerCase();
    if (!q) return getHolding;

    return getHolding.filter((h) => (h?.name || '').toLowerCase().includes(q));
  }, [searchHolding, getHolding]);

  const holdingId = watch('holdingId');

  const selectedholding = useMemo(
    () => getHolding.find((h) => h.id === holdingId) ?? getHolding[0],
    [getHolding, holdingId]
  );

  useEffect(() => {
    if (!isModalOpen) return;

    if (selectedDepartment) {
      return {
        name: selectedDepartment?.name,
        code: selectedDepartment?.code,
        holdingId: selectedDepartment?.holdingId,
        isActive: selectedDepartment?.isActive,
      };
    }
  }, [selectedDepartment, isModalOpen, reset]);

  const closeHandler = () => {
    setIsModalOpen(false);
    setselectedDepartment(null);
    reset(initialState);
  };

  const createdep = useCreateDepartment();
  const updateDep = useUpdateDepartment();

  const submitHandler = (data) => {
    if (!selectedDepartment)
      return createdep.mutate(data, {
        onSuccess: () => {
          closeHandler();
        },
      });

    if (selectedDepartment)
      return updateDep.mutate(
        { id: selectedDepartment?.id, data },
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
        <FormDepartmentJsx
          closeHandler={closeHandler}
          selectedDepartment={selectedDepartment}
          handleSubmit={handleSubmit}
          submitHandler={submitHandler}
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          isSubmitting={isSubmitting}
          searchHolding={searchHolding}
          setsearchHolding={setsearchHolding}
          getHolding={getHolding}
          filterholding={filterholding}
          selectedholding={selectedholding}
        />
      </div>
    </div>
  );
}

export default FormDepartment;
