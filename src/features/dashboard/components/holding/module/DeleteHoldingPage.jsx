import React from 'react';
import { FaHeading } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { useDeleteholding } from '../../../../../hooks/holding/holding';

function DeleteHoldingPage({
  selectedHolding,
  setSelectedHolding,
  isDeleteModal,
  setIsDeleteModal,
}) {
  const closeHandler = () => {
    setIsDeleteModal(false);
  };

  const deletereport = useDeleteholding();

  const deleteHandler = () => {
    deletereport.mutate(selectedHolding?.id, {
      onSuccess: () => {
        closeHandler();
      },
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isDeleteModal
          ? 'pointer-events-auto opacity-100 '
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={closeHandler}
      />
      <div
        className={`relative transform rounded-[15px] bg-linear-to-b from-[#1c1c1c] to-[#0c0c0c] p-6 text-white shadow-2xl transition-all duration-300 ${
          isDeleteModal
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="4xl:text-3xl rounded-full bg-white/15 p-3">
              <FaHeading />
            </p>
            <h1 className="4xl:text-3xl pr-1.5 font-[Vazirmatn] text-lg font-semibold md:text-xl">
              حذف هلدینگ
            </h1>
          </div>
          <p
            onClick={closeHandler}
            className="4xl:text-3xl flex size-7 cursor-pointer items-center justify-center rounded-lg text-[16px] text-white/50 transition-all delay-75 duration-100 hover:bg-white/10 hover:text-white"
          >
            <span>
              <IoCloseSharp />
            </span>
          </p>
        </div>
        <div className="4xl:text-3xl flex space-x-1 py-2 font-[Vazirmatn] text-sm md:text-lg lg:text-xl">
          <p>آیا از حذف </p>
          <p>{selectedHolding?.name}</p>
          <p>اطمینان دارید؟</p>
        </div>

        <div className="flex items-end justify-end space-x-2 py-3">
          <button
            onClick={closeHandler}
            className="4xl:text-xl cursor-pointer rounded-xl bg-white/10 px-5 py-3 font-[Vazirmatn] text-sm transition hover:bg-white/20"
          >
            انصراف
          </button>
          <button
            onClick={deleteHandler}
            className="4xl:text-xl cursor-pointer rounded-xl bg-red-700/95 px-5 py-3 font-[Vazirmatn] text-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteHoldingPage;
