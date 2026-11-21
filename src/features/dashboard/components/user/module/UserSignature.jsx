import { useEffect, useMemo, useState } from 'react';
import {
  useGetPermissionSignature,
  usePermissionSignature,
  useUpdatePermissionSignature,
} from '../../../../../hooks/user/userApi';
import { useGetAllSignatureSteps } from '../../../../../hooks/Signature/Signature';
import { useGetMenu } from '../../../../../hooks/menu/menuApi';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { IoCloseSharp } from 'react-icons/io5';

function UserSignature({ isModalOpen, selectedUser, onClose }) {
  const [form, setForm] = useState({
    userId: '',
    menuId: '',
    signatureStepKey: '',
    canSignature: true,
  });

  const [selected, setSelected] = useState(null);
  const [accessDenied, setAccessDenied] = useState(false);
  const [accessType, setAccessType] = useState('');
  const [searchMenu, setSearchMenu] = useState('');

  const handleOpenAccess = (row, type) => {
    setAccessDenied(true);
    setSelected(row);
    setAccessType(type);
  };

  useEffect(() => {
    if (!selectedUser) return;

    setForm((p) => ({
      ...p,
      userId: selectedUser?.id,
    }));
  }, [selectedUser]);

  const permissionSignature = usePermissionSignature();
  const updatePermission = useUpdatePermissionSignature();

  const { data: menus } = useGetMenu();
  const { data: signature } = useGetPermissionSignature(selectedUser?.id);

  const stepsByMenuName = useGetAllSignatureSteps();

  const menuById = useMemo(() => {
    const map = {};
    const walk = (list) =>
      (list || []).forEach((m) => {
        map[m.id] = m;
        walk(m.subMenus);
      });
    walk(menus?.menus);
    return map;
  }, [menus]);

  const getMenu = useMemo(() => {
    const none = { id: '', name: 'انتخاب منو', slug: '', isHeader: true };

    const walk = (list, depth) =>
      (list || []).flatMap((m) => {
        const hasSubs = (m.subMenus || []).length > 0;
        return [
          {
            id: m.id,
            name: `${'— '.repeat(depth)}${m.title}`,
            slug: m.name,
            isHeader: hasSubs,
          },
          ...walk(m.subMenus, depth + 1),
        ];
      });

    return [none, ...walk(menus?.menus, 0)];
  }, [menus]);

  const filterMenu = useMemo(() => {
    const q = searchMenu.trim().toLowerCase();
    if (!q) return getMenu;

    return getMenu.filter((m) => (m?.name || '').toLowerCase().includes(q));
  }, [searchMenu, getMenu]);

  const selectedMenu = useMemo(() => {
    return (
      getMenu.find((menu) => menu.id === (form.menuId || '')) || getMenu[0]
    );
  }, [getMenu, form.menuId]);

  const steps = stepsByMenuName[selectedMenu?.slug] || [];

  const rows = (signature?.data || []).map((r) => {
    const menu = menuById[r.menuId];
    const menuName = r.menuName || menu?.name;
    const stepKey = r.signatureStepKey ?? null;
    const stepTitle = (stepsByMenuName[menuName] || []).find(
      (s) => s.stepKey === stepKey
    )?.title;

    return {
      menuId: r.menuId,
      signatureStepKey: stepKey,
      canSignature: r.canSignature,
      title: r.menuTitle || menu?.title || menuName || '',
      stepTitle,
    };
  });

  const closeModal = () => {
    onClose();
  };

  const canSubmit =
    !!form.menuId && (steps.length === 0 || !!form.signatureStepKey);

  const submitHandler = () => {
    if (!canSubmit) return;

    permissionSignature.mutate(
      { ...form, signatureStepKey: form.signatureStepKey || null },
      {
        onSuccess: () => {
          closeModal();
          setForm((p) => ({ ...p, menuId: '', signatureStepKey: '' }));
        },
      }
    );
  };

  const updateHandler = () => {
    if (!selected) return;

    updatePermission.mutate(
      {
        canSignature: accessType === 'access',
        menuId: selected.menuId,
        signatureStepKey: selected.signatureStepKey,
        userId: selectedUser?.id,
      },
      {
        onSuccess: () => {
          setAccessDenied(false);
          setSelected(null);
        },
      }
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isModalOpen
          ? 'pointer-events-auto opacity-100 '
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={closeModal}
      />
      <div
        className={`relative w-full transform rounded-[15px] bg-linear-to-b from-[#1c1c1c] to-[#0c0c0c] p-6 text-white shadow-2xl transition-all duration-300 md:w-fit ${
          isModalOpen
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between space-x-20 pb-5">
          <h2 className="font-[SamimBold] text-lg">
            {`دسترسی امضاء ${selectedUser?.gender === 0 ? 'جناب آقای' : 'سرکار خانم'} ${selectedUser?.fullName}`}
          </h2>
          <p
            onClick={closeModal}
            className="4xl:text-3xl flex size-7 cursor-pointer items-center justify-center rounded-lg text-[16px] text-white/50 transition-all delay-75 duration-100 hover:bg-white/10 hover:text-white"
          >
            <span>
              <IoCloseSharp />
            </span>
          </p>
        </div>

        <Combobox
          value={selectedMenu}
          onChange={(value) =>
            setForm((m) => ({
              ...m,
              menuId: value?.id || '',
              signatureStepKey: '',
            }))
          }
        >
          {({ open }) => (
            <div className="relative">
              <ComboboxButton className="flex w-full items-center justify-between rounded-xl bg-white/10 p-3 font-[Samim] text-white outline-none">
                <span
                  className={selectedMenu?.id ? 'text-white' : 'text-white/70'}
                >
                  {selectedMenu?.name || 'انتخاب منو'}
                </span>
                <span className="text-white/70">{open ? '▴' : '▾'}</span>
              </ComboboxButton>
              <div
                className={`absolute z-50 mt-2 w-full overflow-auto rounded-xl bg-black/95 shadow-lg ring-1 ring-white/10 ${
                  open ? '' : 'hidden '
                }`}
              >
                <div className="border-b border-white/10 p-2">
                  <ComboboxInput
                    value={searchMenu}
                    onChange={(e) => setSearchMenu(e.target.value)}
                    placeholder="جستجو..."
                    className="w-full rounded-lg bg-white/10 p-2 font-[Samim] text-white outline-none placeholder:text-white/50"
                  />
                </div>
                <ComboboxOptions className="no-scrollbar max-h-60 overflow-auto p-1">
                  {filterMenu.length === 0 ? (
                    <div className="p-3 text-white/70">موردی پیدا نشد</div>
                  ) : (
                    filterMenu.map((menu) => (
                      <ComboboxOption
                        key={menu.id || 'none'}
                        value={menu}
                        disabled={menu.isHeader && menu.id !== ''}
                        className={({ active, focus }) =>
                          `cursor-pointer rounded-lg p-3 ${
                            menu.isHeader
                              ? 'cursor-default bg-gray-800/40 font-bold text-yellow-300'
                              : active || focus
                                ? 'bg-black'
                                : 'text-white'
                          }`
                        }
                      >
                        {menu.name}
                      </ComboboxOption>
                    ))
                  )}
                </ComboboxOptions>
              </div>
            </div>
          )}
        </Combobox>

        {steps.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            {steps.map((s) => {
              const active = form.signatureStepKey === s.stepKey;

              return (
                <button
                  type="button"
                  key={s.stepKey}
                  aria-pressed={active}
                  onClick={() =>
                    setForm((p) => ({ ...p, signatureStepKey: s.stepKey }))
                  }
                  className={`cursor-pointer rounded-xl px-5 py-2 font-[Samim] transition-all duration-150 ${
                    active
                      ? 'bg-orange-700/95 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {s.title}
                </button>
              );
            })}
          </div>
        )}

        <div className="flex items-center justify-around pb-5">
          <p className="flex items-center justify-center space-x-2 pt-5">
            {/* <span>دسترسی امضاء</span> */}
            <input
              type="radio"
              name="canSignature"
              value="true"
              checked={form.canSignature === true}
              onChange={() => setForm((p) => ({ ...p, canSignature: true }))}
              className="hidden"
            />
          </p>
        </div>

        <button
          onClick={submitHandler}
          disabled={!canSubmit || permissionSignature.isPending}
          className="cursor-pointer rounded-xl bg-linear-to-tl from-green-900 to-green-500 px-4 py-2 font-[Samim] transition-all delay-100 duration-150 ease-in-out hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
        >
          تایید
        </button>

        <div className="">
          <p className="py-2 font-[SamimBold] text-[18px]">دسترسی های منو</p>
          <p className="border-b border-white/50 pb-2"></p>
          <div className="no-scrollbar max-h-90 overflow-auto">
            {rows.map((m, index) => (
              <div
                key={`${m.menuId}-${m.signatureStepKey ?? 'none'}`}
                className="flex items-center justify-between space-x-5 border-b border-white/50 py-2"
              >
                <div className="flex space-x-1">
                  <span>{index + 1}-</span>
                  <span>
                    {m.title}
                    {m.stepTitle ? ` — ${m.stepTitle}` : ''}
                  </span>
                </div>
                <div>
                  <div className="flex items-center justify-center space-x-1">
                    {m.canSignature === false ? (
                      <span
                        onClick={() => handleOpenAccess(m, 'access')}
                        className="ml-2 cursor-pointer rounded-[10px] bg-green-600 p-1 transition-all delay-75 duration-100 ease-in-out hover:scale-105 hover:bg-green-700"
                      >
                        دسترسی امضاء
                      </span>
                    ) : (
                      <span
                        onClick={() => handleOpenAccess(m, 'noAccess')}
                        className="ml-2 cursor-pointer rounded-[10px] bg-red-600 p-1 transition-all delay-75 duration-100 ease-in-out hover:scale-105 hover:bg-red-700"
                      >
                        عدم دسترسی امضاء
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          accessDenied ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          onClick={() => setAccessDenied(false)}
        />
        <div
          className={`relative w-[400px] transform rounded-[15px] bg-linear-to-br from-black to-gray-600 p-6 text-white shadow-2xl transition-all duration-300 ${
            accessDenied
              ? 'translate-y-0 scale-100 opacity-100'
              : '-translate-y-10 scale-95 opacity-0'
          }`}
        >
          <div className="flex items-center justify-between pb-5">
            <p>
              <span>
                {accessType === 'access'
                  ? 'اعطای دسترسی منو '
                  : 'لغو دسترسی منو '}
              </span>
              <span>
                {selected?.title}
                {selected?.stepTitle ? ` — ${selected.stepTitle}` : ''}
              </span>
            </p>
            <span
              onClick={() => setAccessDenied(false)}
              className="flex size-7 cursor-pointer items-center justify-center rounded-lg text-[16px] text-white/50 transition-all delay-75 duration-100 hover:bg-white/10 hover:text-white"
            >
              <IoCloseSharp />
            </span>
          </div>
          <div className="">
            <button
              onClick={updateHandler}
              className="float-left mt-2 mr-5 cursor-pointer rounded-[10px] bg-green-500 p-2 transition-all delay-75 duration-100 hover:bg-green-700"
            >
              تایید
            </button>
            <button
              onClick={() => setAccessDenied(false)}
              className="float-left mt-2 cursor-pointer rounded-[10px] bg-red-500 p-2 transition-all delay-75 duration-100 hover:bg-red-700"
            >
              انصراف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSignature;
