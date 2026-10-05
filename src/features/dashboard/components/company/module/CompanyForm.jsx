import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { useGetDepartment } from '../../../../../hooks/depratment/department';
import CompanyFormJsx from '../template/CompanyFormJsx';
import {
  useCreateCompany,
  useUpdateCompany,
} from '../../../../../hooks/company/companiApi';

const companySchema = z.object({
  name: z.string().trim().min(1, 'نام شرکت الزامی است'),
  code: z.string().trim().min(1, 'کد شرکت الزامی است'),
  address: z.string().trim().min(1, 'آدرس شرکت الزامی است'),
  departmentId: z.string().min(1, 'انتخاب دپارتمان الزامی است'),
  isActive: z.boolean(),
});

const initialState = {
  name: '',
  code: '',
  address: '',
  departmentId: '',
  isActive: true,
};

function CompanyForm({
  isModalOpen,
  setIsModalOpen,
  selectedCompany,
  setSelectedCompany,
}) {
  const [searchDepartment, setSearchDepartment] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(companySchema),
    defaultValues: initialState,
    mode: 'onSubmit',
  });

  const formValues = watch();

  useEffect(() => {
    if (!isModalOpen) return;

    if (selectedCompany) {
      reset({
        name: selectedCompany?.name,
        code: selectedCompany?.name,
        address: selectedCompany?.address,
        isActive: selectedCompany?.isActive,
        departmentId: selectedCompany?.departmentId,
      });
    } else {
      reset(initialState);
    }
  }, [selectedCompany, isModalOpen, reset]);

  const closeHandler = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
    reset(initialState);
  };

  const { data: dep } = useGetDepartment();

  const getDepartment = useMemo(() => {
    const none = { id: '', name: 'انتخاب دپارتمان', code: '', isActive: true };

    return [
      none,
      ...(dep?.departments ?? []).map((h) => ({
        id: h.id,
        name: h.name,
        code: h?.code,
        isActive: h.isActive,
      })),
    ];
  }, [dep]);

  const filterDepartment = useMemo(() => {
    const q = searchDepartment.trim().toLocaleLowerCase();
    if (!q) return getDepartment;

    return getDepartment.filter((h) =>
      (h?.name || '').toLowerCase().includes(q)
    );
  }, [searchDepartment, getDepartment]);

  const departmentId = watch('departmentId');

  const selectedDepartment = useMemo(
    () => getDepartment.find((h) => h.id === departmentId) ?? getDepartment[0],
    [getDepartment, departmentId]
  );

  const createCompany = useCreateCompany();
  const updateCompany = useUpdateCompany();

  const submitHandler = (data) => {
    if (!selectedCompany)
      return createCompany.mutate(data, {
        onSuccess: () => {
          closeHandler();
        },
      });

    if (selectedCompany)
      return updateCompany.mutate(
        { id: selectedCompany?.id, data },
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
        <CompanyFormJsx
          closeHandler={closeHandler}
          selectedCompany={selectedCompany}
          handleSubmit={handleSubmit}
          submitHandler={submitHandler}
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          isSubmitting={isSubmitting}
          searchDepartment={searchDepartment}
          setSearchDepartment={setSearchDepartment}
          getDepartment={getDepartment}
          filterDepartment={filterDepartment}
          selectedDepartment={selectedDepartment}
        />
      </div>
    </div>
  );
}

export default CompanyForm;
