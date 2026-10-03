import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import FormHoldingPageJsx from '../template/FormHoldingPageJsx';
import {
  usecreateHolding,
  useUpdateholding,
} from '../../../../../hooks/holding/holding';

const holdingSchema = z.object({
  name: z.string().trim().min(1, 'نام هلدینگ الزامی است'),
  code: z.string().trim().toLowerCase().min(1, 'کد هلدینگ الزامی است'),
  isActive: z.boolean(),
});

const initialState = {
  name: '',
  code: '',
  isActive: true,
};

function FormHoldingPage({
  isModalOpen,
  setIsModalOpen,
  selectedHolding,
  setSelectedHolding,
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(holdingSchema),
    defaultValues: initialState,
    mode: 'onSubmit',
  });

  const formValues = watch();

  useEffect(() => {
    if (!isModalOpen) return;

    if (selectedHolding) {
      reset({
        name: selectedHolding?.name,
        code: selectedHolding?.code,
        isActive: selectedHolding?.isActive,
      });
    } else {
      reset(initialState);
    }
  }, [isModalOpen, selectedHolding]);

  const closeHandler = () => {
    setIsModalOpen(false);
    setSelectedHolding(null);
    reset(initialState);
  };

  const createHolding = usecreateHolding();
  const updateReport = useUpdateholding();

  const submitHandler = (data) => {
    if (!selectedHolding)
      return createHolding.mutate(data, {
        onSuccess: () => {
          closeHandler();
        },
      });

    if (selectedHolding)
      return updateReport.mutate(
        { id: selectedHolding?.id, data },
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
        className={`no-scrollbar relative flex max-h-[90vh] min-w-[440px] transform flex-col overflow-auto rounded-[15px] bg-linear-to-b from-[#1c1c1c] to-[#0c0c0c] px-6 py-4 text-white shadow-2xl transition-all duration-300 ${
          isModalOpen
            ? ' translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <FormHoldingPageJsx
          closeHandler={closeHandler}
          selectedHolding={selectedHolding}
          handleSubmit={handleSubmit}
          submitHandler={submitHandler}
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}

export default FormHoldingPage;
