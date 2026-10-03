import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { MENU_ICON_OPTIONS } from '../../../../../icons/icons';
import FormMenuJsx from '../template/FormMenuJsx';
import {
  useCreateMenu,
  useUpdateMenu,
} from '../../../../../hooks/menu/menuApi';

const menuSchema = z.object({
  name: z.string().trim().min(1, 'نام منو الزامی است'),
  title: z.string().trim().min(1, 'عنوان منو الزامی است'),
  icon: z.string().min(1, 'انتخاب آیکون الزامی است'),
  url: z.string().trim().min(1, 'پرکردن لینک صفحه الزامی است'),
  displayOrder: z.coerce
    .number({ error: 'ترتیب باید عدد باشد' })
    .min(1, 'وارد کردن ترتیب منو الزامی است'),
  parentMenuId: z.string().nullable(),
  isActive: z.boolean(),
});

const initialState = {
  name: '',
  title: '',
  icon: '',
  url: '',
  displayOrder: '',
  parentMenuId: '',
  isActive: true,
};

function FormMenu({
  isModalOpen,
  setIsModalOpen,
  selectedMenus,
  setSelectedMenus,
  parentOptions,
  flatList,
}) {
  const [searchMenu, setSearchMenu] = useState('');
  const [query, setQuery] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(menuSchema),
    defaultValues: initialState,
    mode: 'onSubmit',
  });

  const formValues = watch();

  useEffect(() => {
    if (!isModalOpen) return;

    if (selectedMenus) {
      reset({
        name: selectedMenus?.name ?? '',
        title: selectedMenus?.title ?? '',
        icon: selectedMenus?.icon ?? '',
        url: selectedMenus?.url ?? '',
        displayOrder: selectedMenus?.displayOrder ?? 0,
        parentMenuId: selectedMenus?.parentMenuId ?? '',
        isActive: selectedMenus?.isActive ?? '',
      });
    } else {
      reset(initialState);
    }
  }, [selectedMenus, isModalOpen, reset]);

  const closeHandler = () => {
    setIsModalOpen(false);
    setSelectedMenus(null);
    reset(initialState);
  };

  const parentMenu = useMemo(() => {
    const none = { id: '', title: '', isActive: true };

    return [
      none,
      ...parentOptions.map((p) => ({
        id: p.id,
        title: p.title || p.name || '--',
        isActive: p.isActive,
      })),
    ];
  }, [parentOptions]);

  const filterdMenu = useMemo(() => {
    return searchMenu.trim() === ''
      ? parentMenu
      : parentMenu.filter((m) =>
          (m?.title || '').toLowerCase().includes(searchMenu.toLowerCase())
        );
  }, [parentMenu, searchMenu]);

  const selectedMenu = useMemo(() => {
    return (
      parentMenu.find((m) => m.id === (formValues.parentMenuId || '')) ||
      parentMenu[0]
    );
  }, [parentMenu, formValues.parentMenuId]);
  // --------------------------------------------

  // ---------------------------------
  const iconList = [{ key: '', lable: 'بدون آیکن' }, ...MENU_ICON_OPTIONS];

  const filteredIcons =
    query?.trim() === ''
      ? iconList
      : iconList.filter((icon) =>
          icon?.label?.toLowerCase().includes(query?.toLowerCase())
        );

  const selectedIcon =
    iconList.find((item) => item.key === formValues.icon) || iconList[0];

  // ---------------------------------

  const createReport = useCreateMenu();
  const updateMenu = useUpdateMenu();

  const submitHandler = (data) => {
    if (!selectedMenus)
      return createReport.mutate(data, {
        onSuccess: () => {
          closeHandler();
        },
      });
    if (selectedMenus)
      return updateMenu.mutate(
        { id: selectedMenus.id, data },
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
        <FormMenuJsx
          closeHandler={closeHandler}
          selectedMenus={selectedMenus}
          handleSubmit={handleSubmit}
          submitHandler={submitHandler}
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          isSubmitting={isSubmitting}
          parentMenu={parentMenu}
          filterdMenu={filterdMenu}
          selectedMenu={selectedMenu}
          iconList={iconList}
          filteredIcons={filteredIcons}
          selectedIcon={selectedIcon}
          query={query}
          setQuery={setQuery}
          flatList={flatList}
          searchMenu={searchMenu}
          setSearchMenu={setSearchMenu}
        />
      </div>
    </div>
  );
}

export default FormMenu;
