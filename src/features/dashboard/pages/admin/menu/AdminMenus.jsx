import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { HashLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { MENU_ICON_MAP, MENU_ICON_OPTIONS } from '../../../../../icons/icons';

import { useGetMenu } from '../../../../../hooks/menu/menuApi';
import { usePermission } from '../../../../../permission/usePermission';
import { MENU_URL } from '../../../../../permission/menuKeys';

import HeaderMenuPage from '../../../components/menu/template/HeaderMenuPage';
import TableMenuPage from '../../../components/menu/template/TableMenuPage';
import FormMenu from '../../../components/menu/module/FormMenu';
import DeleteMenu from '../../../components/menu/module/DeleteMenu';

function AdminMenus() {
  const { token, menus: userMenus } = useSelector((state) => state.auth);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editing, setEditing] = useState(null);
  const [selectedMenus, setSelectedMenus] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [openFilterMobile, setOpenFilterMobile] = useState(false);
  const [openform, setOpenForm] = useState(false);

  const [form, setForm] = useState({
    name: '',
    title: '',
    url: '',
    icon: '',
    displayOrder: 1,
    parentMenuId: '',
    isActive: true,
  });

  const {
    data: menu,
    isLoading,
    isError,
  } = useGetMenu({ page, pageSize: 10000, search });

  const flatList = useMemo(() => {
    const flatten = (list, level = 0) =>
      (list || []).flatMap((m) => [
        { ...m, __level: level },
        ...flatten(m?.subMenus, level + 1),
      ]);
    return flatten(menu?.menus);
  }, [menu]);

  const filterData = useMemo(() => {
    if (filterStatus === 'all') return flatList;
  }, [filterStatus, menu, flatList]);

  const totalCount = flatList.length;

  const parentOptions = useMemo(() => {
    return flatList?.map((m) => ({
      id: m.id,
      title: m.title,
      name: m.name,
      isActive: m.isActive,
    }));
  }, [flatList]);

  const {
    canCreate,
    canEdit,
    canDelete,
    canView,
    guardCreate,
    guardEdit,
    guardDelete,
    guardView,
  } = usePermission(MENU_URL.ADMIN_MENUS, 'منو');

  const openCreate = guardCreate(() => {
    setIsModalOpen(true);
  });

  const openEdit = guardEdit((menu) => {
    setSelectedMenus(menu);
    setIsModalOpen(true);
  });

  const openDelete = guardDelete((menu) => {
    setSelectedMenus(menu);
    setIsDeleteModalOpen(true);
  });

  const openView = guardView((menu) => {
    setSelectedMenus(menu);
    setOpenForm(true);
  });

  return (
    <div className="no-scrollbar h-full overflow-hidden rounded-[15px] bg-[#0F090C]/30 pb-0.5 text-white">
      <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-black/70">
        <HeaderMenuPage
          openCreate={openCreate}
          canCreate={canCreate}
          search={search}
          setSearch={setSearch}
          totalCount={totalCount}
          menu={menu}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        {isLoading ? (
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center space-y-5">
            <HashLoader color="#ffffff" size={80} speedMultiplier={1.5} />
            <p className="pt-10 text-[20px]">لطفا منتظر بمانید😎</p>
          </div>
        ) : isError ? (
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center space-y-5 text-[30px]">
            خطا در دریافت اطلاعات 😟
          </div>
        ) : (
          <div className="no-scrollbar 4xl:mt-5 flex min-h-0 w-full overflow-x-hidden overflow-y-auto">
            <div className="mx-3 hidden sm:block md:w-full">
              <TableMenuPage
                filterData={filterData}
                selectedMenus={selectedMenus}
                setSelectedMenus={setSelectedMenus}
                canEdit={canEdit}
                openEdit={openEdit}
                canDelete={canDelete}
                openDelete={openDelete}
                openView={openView}
                canView={canView}
              />
            </div>
          </div>
        )}
      </div>
      <FormMenu
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedMenus={selectedMenus}
        setSelectedMenus={setSelectedMenus}
        parentOptions={parentOptions}
        flatList={flatList}
      />
      <DeleteMenu
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        selectedMenus={selectedMenus}
        setSelectedMenus={setSelectedMenus}
      />
    </div>
  );
}

export default AdminMenus;
