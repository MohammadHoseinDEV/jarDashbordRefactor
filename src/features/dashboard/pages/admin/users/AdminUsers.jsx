import React, { lazy, useState } from 'react';
import { MENU_URL } from '../../../../../permission/menuKeys';
import { useGetUser } from '../../../../../hooks/user/userApi';
import { HashLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { usePermission } from '../../../../../permission/usePermission';
import { useGetFullAccess } from '../../../../../hooks/auth/authApi';

const UserHeader = lazy(
  () => import('../../../components/user/template/UserHeader')
);
const UserTable = lazy(
  () => import('../../../components/user/template/UserTable')
);
const Pagination = lazy(() => import('../../../../../pagination/Pagination'));
const UserForm = lazy(() => import('../../../components/user/module/UserForm'));
const UserDelete = lazy(
  () => import('../../../components/user/module/UserDelete')
);
const UserShift = lazy(
  () => import('../../../components/user/module/UserShift')
);
const UserSignature = lazy(
  () => import('../../../components/user/module/UserSignature')
);
const UserMobilepage = lazy(
  () => import('../../../components/user/template/UserMobilepage')
);

function AdminUsers() {
  const [filter, setFilter] = useState({
    search: '',
    status: 'all',
    page: 1,
    pageSize: 10,
    companyId: '',
    unitId: '',
    systemId: '',
  });
  const [modal, setModal] = useState({
    open: false,
    delete: false,
    shift: false,
    sign: false,
    detail: false,
    user: null,
  });

  const { canCreate, canEdit, canDelete, guardCreate, guardEdit, guardDelete } =
    usePermission(MENU_URL.ADMIN_USER, 'کاربر');

  const openCreate = guardCreate(() => {
    setModal({
      open: true,
      delete: false,
      shift: false,
      sign: false,
      user: null,
    });
  });

  const openEdit = guardEdit((user) => {
    setModal({
      open: true,
      delete: false,
      shift: false,
      sign: false,
      detail: false,
      user,
    });
  });

  const openDelete = guardDelete((user) => {
    setModal({
      open: false,
      delete: true,
      shift: false,
      sign: false,
      detail: false,
      user,
    });
  });

  const openShift = (user) => {
    setModal({
      open: false,
      delete: false,
      shift: true,
      sign: false,
      detail: false,
      user,
    });
  };
  const openSignature = (user) => {
    setModal({
      open: false,
      delete: false,
      shift: false,
      sign: true,
      detail: false,
      user,
    });
  };

  const openDetails = (user) => {
    setModal({
      open: false,
      delete: false,
      shift: false,
      sign: false,
      detail: true,
      user,
    });
  };

  const closeModal = () =>
    setModal({
      open: false,
      delete: false,
      shift: false,
      sign: false,
      job: null,
    });

  const { data: user, isLoading, isError } = useGetUser();

  const { data: permission } = useGetFullAccess();

  const totalPages = user?.totalPages ?? 1;
  const totalCount = user?.totalCount;

  return (
    <div className="h-screen overflow-hidden rounded-[15px] bg-[#0F090C]/30 text-white">
      <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-black/70">
        <UserHeader
          user={user}
          filter={filter}
          setFilter={setFilter}
          canCreate={canCreate}
          openCreate={openCreate}
          totalCount={totalCount}
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
              <UserTable
                user={user}
                canEdit={canEdit}
                openEdit={openEdit}
                canDelete={canDelete}
                openDelete={openDelete}
                openShift={openShift}
                openSignature={openSignature}
                filter={filter}
              />
            </div>
            <UserMobilepage
              user={user}
              canEdit={canEdit}
              openEdit={openEdit}
              canDelete={canDelete}
              openDelete={openDelete}
              openShift={openShift}
              openSignature={openSignature}
              filter={filter}
            />
          </div>
        )}
        <div className={`w-full shrink-0`}>
          <Pagination
            page={filter.page}
            setPage={(newPage) => {
              setFilter((f) => ({ ...f, page: newPage }));
            }}
            totalPages={totalPages}
          />
        </div>
      </div>
      <UserForm
        isModalOpen={modal.open}
        selectedUser={modal.user}
        onClose={closeModal}
      />
      <UserDelete
        isModalOpen={modal.delete}
        selectedUser={modal.user}
        onClose={closeModal}
      />

      <UserShift
        isModalOpen={modal.shift}
        selectedUser={modal.user}
        onClose={closeModal}
      />
      <UserSignature
        isModalOpen={modal.sign}
        selectedUser={modal.user}
        onClose={closeModal}
      />
    </div>
  );
}

export default AdminUsers;
