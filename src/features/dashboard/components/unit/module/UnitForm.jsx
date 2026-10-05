import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const unitSchema = z.object({
  name: z.string().trim().min(1, 'نام واحد الزامی است'),
  code: z.string().trim().min(1, 'کد واحد الزامی است'),
  companyId: z.string().min(1, 'انتخاب شرکت الزامی است'),
  parentUnitId: z.string().min(1, 'انتخاب واحد مستقیم الزامی است'),
  isActive: z.boolean(),
});

const initialState = {
  name: '',
  code: '',
  companyId: '',
  parentUnitId: '',
  isActive: true,
};

function UnitForm({
  isModalOpen,
  setIsModalOpen,
  selectedUnit,
  setSelectedUnit,
}) {
  const [searchCompany, setSearchCompany] = useState('');

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
  return <div>UnitForm</div>;
}

export default UnitForm;
