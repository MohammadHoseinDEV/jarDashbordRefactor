import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import React, { useEffect, useMemo, useState } from 'react';
import z from 'zod/v3';
import { useGetCompanies } from '../../../../../hooks/company/companiApi';
import { useGetDepartment } from '../../../../../hooks/depratment/department';
import JobPositionFormJsx from '../template/JobPositionFormJsx';
import useSelectOptions from '../../../../dropDown/dropDownHook';
import {
  usecreateJobPosition,
  useJobPositions,
  useUpdateJobPosition,
} from '../../../../../hooks/jobPosition/jobPosition';

const jobSchema = z.object({
  title: z.string().trim().min(1, 'نام جایگاه شغلی الزامی است'),
  code: z.string().trim(),
  description: z.string(),
  level: z
    .number({
      required_error: 'وارد کردن سطح جایگاه الزامی است',
      invalid_type_error: 'وارد کردن سطح جایگاه الزامی است',
    })
    .min(1, 'سطح جایگاه باید حداقل ۱ باشد'),
  parentPositionId: z.string().nullable(),
  departmentId: z.string().nullable(),
  companyId: z.string().nullable(),
  isActive: z.boolean(),
});

const initialState = {
  title: '',
  code: '',
  description: '',
  level: '',
  parentPositionId: null,
  departmentId: null,
  companyId: null,
  isActive: true,
};

function JobPositionForm({ isModalOpen, selectedJob, onClose }) {
  const methods = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: initialState,
    mode: 'onSubmit',
  });
  const { reset, watch } = methods;

  useEffect(() => {
    if (!isModalOpen) return;

    if (selectedJob) {
      reset({
        title: selectedJob?.title,
        code: selectedJob?.code,
        description: selectedJob?.description,
        level: selectedJob?.level,
        parentPositionId: selectedJob?.parentPositionId,
        departmentId: selectedJob?.departmentId,
        companyId: selectedJob?.companyId,
        isActive: selectedJob?.isActive,
      });
    } else {
      reset(initialState);
    }
  }, [isModalOpen, selectedJob, reset]);
  // -------------------------------------------------------
  const { data: job } = useJobPositions({ pageSize: 999999999 });
  const { data: companyData } = useGetCompanies({ pageSize: 999999999 });
  const { data: depData } = useGetDepartment({ pageSize: 99 });

  const jobPosition = useSelectOptions(
    job?.items
      ?.filter((j) => j.id !== selectedJob?.id)
      .map((j) => ({ ...j, name: j.title })),
    'انتخاب جایگاه شغلی',
    watch('parentPositionId')
  );

  const company = useSelectOptions(
    companyData?.companies,
    'انتخاب شرکت',
    watch('companyId')
  );
  const department = useSelectOptions(
    depData?.departments,
    'انتخاب دپارتمان',
    watch('departmentId')
  );

  // --------------------closeHandler-----------------------------------
  const closeHandler = () => {
    onClose();
    reset(initialState);
  };
  // -------------------------------------------------------

  const createJob = usecreateJobPosition();
  const updateJob = useUpdateJobPosition();

  const submitHandler = (data) => {
    if (!selectedJob)
      return createJob.mutate(data, {
        onSuccess: () => {
          closeHandler();
        },
      });

    if (selectedJob)
      return updateJob.mutate(
        { id: selectedJob?.id, data },
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
          <JobPositionFormJsx
            closeHandler={closeHandler}
            selectedJob={selectedJob}
            submitHandler={submitHandler}
            jobPosition={jobPosition}
            company={company}
            department={department}
          />
        </FormProvider>
      </div>
    </div>
  );
}

export default JobPositionForm;
