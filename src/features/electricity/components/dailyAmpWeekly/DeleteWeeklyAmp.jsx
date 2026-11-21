import React from 'react';

import { useDeleteWeeklyAmp } from '../../Api/dailyAmpWeekly/WeeklyAmp';
import { IoCloseSharp } from 'react-icons/io5';

function DeleteWeeklyAmp({
  openDeleteModal,
  setOpenDeleteModal,
  selectedWeeklyAmp,
}) {
  const closeHandler = () => {
    setOpenDeleteModal(false);
  };

  const deleteReports = useDeleteWeeklyAmp();
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        openDeleteModal
          ? 'pointer-events-auto opacity-100 '
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={closeHandler}
      />
      <div
        className={`relative w-full transform rounded-[15px] bg-linear-to-b from-[#1c1c1c] to-[#0c0c0c] p-6 text-white shadow-2xl transition-all duration-300 md:w-fit ${
          openDeleteModal
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-[SamimBold] text-[20px]">حذف گزارش</h2>

          <p
            onClick={closeHandler}
            className="4xl:text-3xl flex size-7 cursor-pointer items-center justify-center rounded-lg text-[16px] text-white/50 transition-all delay-75 duration-100 hover:bg-white/10 hover:text-white"
          >
            <span>
              <IoCloseSharp />
            </span>
          </p>
        </div>
        <div>
          <h4 className="pt-5 font-[SamimBold]">
            آیا از حذف شماره گزارش
            <span className="px-2 font-[AvenirLTProMedium]" dir="ltr">
              {selectedWeeklyAmp?.reportNumber}
            </span>
            مطمئن هستید؟
          </h4>
          <div
            className="mt-6 flex justify-end gap-2"
            onClick={() => {
              deleteReports.mutate(selectedWeeklyAmp?.id, {
                onSuccess: () => {
                  closeHandler();
                },
              });
            }}
          >
            <button className="4xl:text-xl cursor-pointer rounded-xl bg-red-700/95 px-5 py-2 font-[Vazirmatn] text-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50">
              حذف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteWeeklyAmp;
