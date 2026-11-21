import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useJobPositions } from '../../../../../hooks/jobPosition/jobPosition';
import useSelectOptions from '../../../../dropDown/dropDownHook';
import {
  useCreateUser,
  useUpdateUser,
} from '../../../../../hooks/user/userApi';
import { useEducationDegrees } from '../../../../../hooks/education/education';
import {
  useAssignRoleToUser,
  useGetRoles,
} from '../../../../../hooks/role/role';
import { useGetSystem } from '../../../../../hooks/system/system';
import { useGetDepartment } from '../../../../../hooks/depratment/department';
import UserFormJsx from '../template/UserFormJsx';

const userSchema = z.object({
  personnelCode: z
    .string()
    .min(1, 'وارد کردن کد پرسنلی الزامی است')
    .min(7, 'کدپرسنلی حداقل باید 7 رقم باشد')
    .regex(/^\d{7,}$/, 'کد پرسنلی حداقل باید 7 رقم باشد'),
  firstName: z.string().trim().min(1, 'وارد کردن نام الزامی است'),
  lastName: z.string().trim().min(1, 'وارد کردن نام خانوادگی الزامی است'),
  password: z
    .string()
    .trim()
    .refine((v) => v === '' || v.length >= 8, 'حداقل باید 8 کاراکتر باشد'),
  nationalCode: z
    .string()

    .trim()
    .regex(/^\d{10}$/, 'کد ملی باید 10 رقم باشد'),
  mobileNumber: z
    .string()
    .trim()
    .regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست (مثال: 09123456789)'),
  homePhoneNumber: z.string().trim(),
  insuranceCode: z
    .string()
    .trim()
    .regex(/^\d{5,12}$/, 'کد بیمه باید فقط عدد و بین 5 تا 12 رقم باشد'),
  faceCode: z.string().trim().min(1, 'وارد کردن کد فیس الزامی است '),
  email: z.string().trim().email('ایمیل نامعتبر است').or(z.literal('')),
  gender: z.coerce.number().int().min(0),
  birthDate: z.string().min(1, 'تاریخ تولد الزامی است'),
  hireDate: z.string().min(1, 'تاریخ استخدام الزامی است'),
  educationDegreeId: z.string().trim().min(1, 'انتخاب مدرک تحصیلی الزامی است'),
  isActive: z.boolean(),
  jobPositions: z
    .array(
      z
        .object({
          jobPositionId: z
            .string()
            .trim()
            .min(1, 'انتخاب جایگاه شغلی الزامی است'),
          roleId: z.string().trim().min(1, 'نقش را انتخاب کنید'),
          managerJobPositionId: z.string().trim().nullable().optional(),
          isPrimary: z.boolean(),
          scopeType: z.string().optional().or(z.literal('')),
          scopeId: z.string().trim().optional().or(z.literal('')),
        })
        .superRefine((r, ctx) => {
          if (!r.scopeType && !r.scopeId) return;
          if (!r.scopeType)
            ctx.addIssue({
              code: 'custom',
              path: ['scopeType'],
              message: 'نوع محدوده را انتخاب کنید',
            });
          if (!r.scopeId)
            ctx.addIssue({
              code: 'custom',
              path: ['scopeId'],
              message: 'محدوده را انتخاب کنید',
            });
        })
    )
    .min(1, 'حداقل یک سمت شغلی لازم است'),
});

const emptyPosition = {
  jobPositionId: '',
  roleId: '',
  managerJobPositionId: null,
  isPrimary: true,
  scopeType: '',
  scopeId: '',
};

const initialState = {
  personnelCode: '',
  firstName: '',
  lastName: '',
  password: '',
  nationalCode: '',
  mobileNumber: '',
  homePhoneNumber: '',
  insuranceCode: '',
  faceCode: '',
  email: '',
  gender: 0,
  birthDate: '',
  hireDate: '',
  educationDegreeId: '',
  isActive: true,
  jobPositions: [emptyPosition],
};

const toIsoDate = (value) => (value ? String(value).slice(0, 10) : '');

const scope = [
  { id: 0, name: 'دپارتمان' },
  { id: 3, name: 'سیستم' },
];

function UserForm({ isModalOpen, selectedUser, onClose }) {
  const methods = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: initialState,
    mode: 'onSubmit',
  });
  const { reset, watch, setError } = methods;

  useEffect(() => {
    if (!isModalOpen) return;

    if (selectedUser) {
      reset({
        personnelCode: selectedUser?.personnelCode ?? '',
        firstName: selectedUser?.firstName ?? '',
        lastName: selectedUser?.lastName ?? '',
        password: '',
        nationalCode: selectedUser?.nationalCode ?? '',
        mobileNumber: selectedUser?.mobileNumber ?? '',
        homePhoneNumber: selectedUser?.homePhoneNumber ?? '',
        insuranceCode: selectedUser?.insuranceCode ?? '',
        faceCode: selectedUser?.faceCode ?? '',
        email: selectedUser?.email ?? '',
        gender: selectedUser?.gender ?? 0,
        birthDate: toIsoDate(selectedUser?.birthDate),
        hireDate: toIsoDate(selectedUser?.hireDate),
        educationDegreeId: selectedUser?.educationDegreeId ?? '',
        isActive: selectedUser?.isActive ?? true,
        jobPositions: selectedUser?.jobPositions?.length
          ? selectedUser.jobPositions.map((j) => ({
              jobPositionId: j?.id ?? '',
              roleId: j?.roleId ?? '',
              managerJobPositionId: j?.managerJobPositionId ?? '',
              isPrimary: Boolean(j?.isPrimary),
              scopeType: '',
              scopeId: '',
            }))
          : [emptyPosition],
      });
    } else {
      reset(initialState);
    }
  }, [isModalOpen, selectedUser, reset]);

  const { data: job } = useJobPositions({ pageSize: 999999999 });
  const { data: edu } = useEducationDegrees({ pageSize: 999999999 });
  const { data: role } = useGetRoles({ pageSize: 999999999 });
  const { data: departments } = useGetDepartment({ pageSize: 99 });
  const { data: systems } = useGetSystem({ pageSize: 99 });

  const education = useSelectOptions(
    edu,
    'انتخاب مدرک تحصیلی',
    watch('educationDegreeId')
  );

  const closeHandler = () => {
    onClose();
    reset(initialState);
  };

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const assignRoleToUser = useAssignRoleToUser();

  const submitHandler = (data) => {
    if (!selectedUser && !data.password) {
      setError('password', {
        type: 'required',
        message: 'وارد کردن رمز عبور الزامی است',
      });
      return;
    }

    const scoped = data.jobPositions.filter((j) => j.scopeType && j.scopeId);

    const userData = {
      ...data,
      jobPositions: data.jobPositions.map(
        ({ scopeType, scopeId, ...rest }) => rest
      ),
    };
    if (!userData.password) delete userData.password;

    const assignScopes = async () => {
      try {
        await Promise.all(
          scoped.map((j) =>
            assignRoleToUser.mutateAsync({
              personnelCode: userData.personnelCode,
              roleId: j.roleId,
              scopeType: Number(j.scopeType),
              scopeId: j.scopeId,
            })
          )
        );
      } catch (e) {
        console.error('assign-to-user failed', e);
      }
      closeHandler();
    };

    if (!selectedUser)
      return createUser.mutate(userData, { onSuccess: assignScopes });

    return updateUser.mutate(
      { id: selectedUser.id, data: userData },
      { onSuccess: assignScopes }
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
          <UserFormJsx
            closeHandler={closeHandler}
            selectedUser={selectedUser}
            submitHandler={submitHandler}
            education={education}
            jobItems={job?.items}
            roleItems={role?.roles}
            departmentItems={departments?.departments}
            systemItems={systems?.systems}
            scopeTypeOptions={scope}
          />
        </FormProvider>
      </div>
    </div>
  );
}

export default UserForm;
