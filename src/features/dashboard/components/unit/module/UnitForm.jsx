import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { useGetCompanies } from '../../../../../hooks/company/companiApi';
import {
  useCreateUnit,
  useGetUnit,
  useUpdateReport,
} from '../../../../../hooks/unit/unitApi';
import UnitFormJsx from '../template/UnitFormJsx';

const unitSchema = z.object({
  name: z.string().trim().min(1, 'نام واحد الزامی است'),
  code: z.string().trim().min(1, 'کد واحد الزامی است'),
  companyId: z.string().min(1, 'انتخاب شرکت الزامی است'),
  parentUnitId: z.string().nullable().optional(),
  isActive: z.boolean(),
});

const initialState = {
  name: '',
  code: '',
  companyId: '',
  parentUnitId: null,
  isActive: true,
};

function UnitForm({
  isModalOpen,
  setIsModalOpen,
  selectedUnit,
  setSelectedUnit,
}) {
  const [searchCompany, setSearchCompany] = useState('');
  const [searchUnit, setSearchUnit] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(unitSchema),
    defaultValues: initialState,
    mode: 'onSubmit',
  });

  const formValues = watch();

  const { data: company } = useGetCompanies({ pageSize: 999999999 });

  const getCompany = useMemo(() => {
    const none = { id: '', name: 'انتخاب شرکت', isActive: true };

    return [
      none,
      ...(company?.companies ?? [])
        ?.filter((c) => c.isActive === true)
        .map((h) => ({
          id: h.id,
          name: h.name,
          isActive: h.isActive,
        })),
    ];
  }, [company]);

  const filterCompany = useMemo(() => {
    const q = searchCompany.trim().toLocaleLowerCase();
    if (!q) return getCompany;

    return getCompany.filter((h) => (h?.name || '').toLowerCase().includes(q));
  }, [searchCompany, getCompany]);

  const companyId = watch('companyId');

  const selectedCompany = useMemo(
    () => getCompany.find((h) => h.id === companyId) ?? getCompany[0],
    [getCompany, companyId]
  );

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

  const parentUnitId = watch('parentUnitId');

  const selectedUnits = useMemo(
    () => getUnit.find((h) => h.id === parentUnitId) ?? getUnit[0],
    [getUnit, parentUnitId]
  );

  useEffect(() => {
    if (!isModalOpen) return;

    if (selectedUnit) {
      reset({
        name: selectedUnit?.name,
        code: selectedUnit?.code,
        companyId: selectedUnit?.companyId,
        parentUnitId: selectedUnit?.parentUnitId,
        isActive: selectedUnit?.isActive,
      });
    } else {
      reset(initialState);
    }
  }, [selectedUnit, isModalOpen, reset]);

  const closeHandler = () => {
    setIsModalOpen(false);
    setSelectedUnit(null);
    reset(initialState);
  };

  const createUnit = useCreateUnit();
  const updateReport = useUpdateReport();

  const submitHandler = (data) => {
    if (!selectedUnit)
      return createUnit.mutate(data, {
        onSuccess: () => {
          closeHandler();
        },
      });

    if (selectedUnit)
      return updateReport.mutate(
        { id: selectedUnit.id, data },
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
        <UnitFormJsx
          closeHandler={closeHandler}
          selectedUnit={selectedUnit}
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
          searchCompany={searchCompany}
          setSearchCompany={setSearchCompany}
          getCompany={getCompany}
          filterCompany={filterCompany}
          selectedCompany={selectedCompany}
        />
      </div>
    </div>
  );
}

export default UnitForm;
