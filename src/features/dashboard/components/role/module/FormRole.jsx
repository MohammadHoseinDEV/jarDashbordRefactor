import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import FormRoleJsx from '../template/FormRoleJsx';
import { useGetCompanies } from '../../../../../hooks/company/companiApi';
import { useCreateRole, useUpdateRole } from '../../../../../hooks/role/role';

const roleSchema = z
  .object({
    roleName: z.string().trim().min(1, 'نام نقش الزامی است'),
    isGlobalAccess: z.boolean(),
    companyId: z.string().nullable(),
  })
  .superRefine((data, ctx) => {
    if (!data.isGlobalAccess && !data.companyId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['companyId'],
        message:
          'در صورت عدم انتخاب شرکت برای نقش مورد نظر باید دسترسی به صورت سراسری باشد.',
      });
    }
  });

const initialState = {
  roleName: '',
  isGlobalAccess: false,
  companyId: '',
};

function FormRole({
  isModalOpen,
  setIsModalOpen,
  selectedRole,
  setSelectedRole,
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
    resolver: zodResolver(roleSchema),
    defaultValues: initialState,
    mode: 'onSubmit',
  });
  const formValues = watch();

  useEffect(() => {
    if (!isModalOpen) return;

    if (selectedRole) {
      reset({
        roleName: selectedRole?.name ?? '',
        isGlobalAccess: selectedRole?.isGlobalAccess ?? true,
        companyId: selectedRole?.companyId ?? null,
      });
    } else {
      reset(initialState);
    }
  }, [selectedRole, isModalOpen, reset]);

  const closeHandler = () => {
    setIsModalOpen(false);
    setSelectedRole(null);
    reset(initialState);
  };

  const { data: company } = useGetCompanies();

  const getCompany = useMemo(() => {
    const none = { id: '', name: 'انتخاب شرکت', isActive: true };

    return [
      none,
      ...(company?.companies ?? []).map((c) => ({
        id: c.id,
        name: c.name,
        isActive: c.isActive,
      })),
    ];
  }, [company]);

  const filterCompany = useMemo(() => {
    const q = searchCompany.trim().toLowerCase();
    if (!q) return getCompany;

    return getCompany.filter((c) => (c?.name || '').toLowerCase().includes(q));
  }, [searchCompany, getCompany]);

  const selectedCompany = useMemo(() => {
    return (
      getCompany.find((c) => c.id === formValues.companyId) || getCompany[0]
    );
  }, [getCompany, formValues.companyId]);

  const createRole = useCreateRole();
  const updateRole = useUpdateRole();

  const submitHandler = (data) => {
    if (!selectedRole)
      return createRole.mutate(data, {
        onSuccess: () => {
          closeHandler();
        },
      });
    if (selectedRole)
      return updateRole.mutate(
        { id: selectedRole?.id, data },
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
        className={`no-scrollbar relative flex max-h-[90vh] w-[440px] transform flex-col overflow-auto rounded-[15px] bg-linear-to-b from-[#1c1c1c] to-[#0c0c0c] px-6 py-4 text-white shadow-2xl transition-all duration-300 ${
          isModalOpen
            ? ' translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <FormRoleJsx
          closeHandler={closeHandler}
          selectedRole={selectedRole}
          handleSubmit={handleSubmit}
          submitHandler={submitHandler}
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          isSubmitting={isSubmitting}
          company={company}
          getCompany={getCompany}
          filterCompany={filterCompany}
          selectedCompany={selectedCompany}
          searchCompany={searchCompany}
          setSearchCompany={setSearchCompany}
        />
      </div>
    </div>
  );
}

export default FormRole;
