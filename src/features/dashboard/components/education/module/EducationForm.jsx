import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod/v3';
import {
  useCreateEducation,
  useUpdateEducation,
} from '../../../../../hooks/education/education';
import EducationFormJsx from '../template/EducationFormJsx';

const eduSchema = z.object({
  name: z.string().trim().min(1, 'نام مدرک تحصیلی الزامی است'),
  isActive: z.boolean(),
});

const initialState = {
  name: '',
  isActive: true,
};

function EducationForm({
  isModalOpen,
  setIsModalOpen,
  selectedEducation,
  setSelectedEducation,
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(eduSchema),
    defaultValues: initialState,
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (!isModalOpen) return;

    if (selectedEducation) {
      reset({
        name: selectedEducation?.name,
        isActive: selectedEducation?.isActive,
      });
    } else {
      reset(initialState);
    }
  }, [isModalOpen, selectedEducation, reset]);

  const closeHandler = () => {
    setIsModalOpen(false);
    setSelectedEducation(null);
    reset(initialState);
  };

  const createEdu = useCreateEducation();
  const updateEdu = useUpdateEducation();

  const submitHandler = (data) => {
    if (!selectedEducation)
      return createEdu.mutate(data, {
        onSuccess: () => {
          closeHandler();
        },
      });

    if (selectedEducation)
      return updateEdu.mutate(
        { id: selectedEducation?.id, data },
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
        <EducationFormJsx
          closeHandler={closeHandler}
          selectedEducation={selectedEducation}
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

export default EducationForm;
