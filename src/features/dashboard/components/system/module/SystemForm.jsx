import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import SystemFormJsx from '../template/SystemFormJsx';
import { useGetUnit } from '../../../../../hooks/unit/unitApi';
import {
  useCreateSystem,
  useUpdateSystem,
} from '../../../../../hooks/system/system';

const systemSchema = z.object({
  name: z.string().trim().min(1, 'نام سیستم الزامی است'),
  code: z.string().trim().min(1, 'کد سیستم الزامی است'),
  unitId: z.string().min(1, 'انتخاب واحد الزامی است'),
  isActive: z.boolean(),
});

const initialState = {
  name: '',
  code: '',
  unitId: '',
  isActive: true,
};

function SystemForm({
  isModalOpen,
  setIsModalOpen,
  selectedSystem,
  setSelectedSystem,
}) {
  const [searchUnit, setSearchUnit] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(systemSchema),
    defaultValues: initialState,
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (!isModalOpen) return;

    if (selectedSystem) {
      reset({
        name: selectedSystem?.name,
        code: selectedSystem?.code,
        unitId: selectedSystem?.unitId,
        isActive: selectedSystem?.isActive,
      });
    } else {
      reset(initialState);
    }
  }, [selectedSystem, isModalOpen, reset]);

  const { data: unit } = useGetUnit({ pageSize: 999999999 });

  const getUnit = useMemo(() => {
    const none = { id: null, name: 'انتخاب واحد', isActive: true };

    return [
      none,
      ...(unit?.units ?? [])
        ?.filter((u) => u.isActive === true)
        ?.map((h) => ({
          id: h.id,
          name: h.name,
          isActive: h.isActive,
        })),
    ];
  }, [unit]);

  const filterUnit = useMemo(() => {
    const q = searchUnit.trim().toLocaleLowerCase();
    if (!q) return getUnit;

    return getUnit.filter((h) => (h?.name || '').toLowerCase().includes(q));
  }, [searchUnit, getUnit]);

  const unitId = watch('unitId');

  const selectedUnits = useMemo(
    () => getUnit.find((h) => h.id === unitId) ?? getUnit[0],
    [getUnit, unitId]
  );

  const closeHandler = () => {
    setIsModalOpen(false);
    setSelectedSystem(null);
    reset(initialState);
  };

  const createSystem = useCreateSystem();
  const updateSystem = useUpdateSystem();

  const submitHandler = (data) => {
    if (!selectedSystem)
      return createSystem.mutate(data, {
        onSuccess: () => {
          closeHandler();
        },
      });

    if (selectedSystem)
      return updateSystem.mutate(
        { id: selectedSystem.id, data },
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
        <SystemFormJsx
          closeHandler={closeHandler}
          selectedSystem={selectedSystem}
          handleSubmit={handleSubmit}
          submitHandler={submitHandler}
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          isSubmitting={isSubmitting}
          searchUnit={searchUnit}
          setSearchUnit={setSearchUnit}
          getUnit={getUnit}
          filterUnit={filterUnit}
          selectedUnits={selectedUnits}
        />
      </div>
    </div>
  );
}

export default SystemForm;
