import React from 'react';
import { useDeleteBiweeklyAmp } from '../../Api/BiWeeklyAmp/biWeeklyAmp';

import close from '../../../../assets/images/close.png';
import { IoCloseSharp } from 'react-icons/io5';

function DeleteBiWeeklyAmp({
  openDeleteModal,
  setOpenDeleteModal,
  selectedBiWeeklyAmp,
}) {
  const closeHandler = () => {
    setOpenDeleteModal(false);
  };
  const deleteReport = useDeleteBiweeklyAmp();

  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen items-center justify-center overflow-auto p-4 transition-opacity duration-300 ${
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
        className={`no-scrollbar relative flex max-h-[90vh] transform flex-col overflow-auto rounded-[15px] bg-linear-to-b from-[#1c1c1c] to-[#0c0c0c] px-6 py-4 text-white shadow-2xl transition-all duration-300 ${
          openDeleteModal
            ? ' translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-[SamimBold] text-[20px]">حذف گزارش</h2>

          <p
            onClick={closeHandler}
            className="5xl:size-12 5xl:text-[35px] flex size-7 cursor-pointer items-center justify-center rounded-lg text-[16px] text-white/50 transition-all delay-75 duration-100 hover:bg-white/10 hover:text-white"
          >
            <span>
              <IoCloseSharp />
            </span>
          </p>
        </div>
        <div>
          <h4 className="pt-5 font-[SamimBold]">
            آیا از حذف شماره گزارش
            <span
              className="border-b border-white/50 px-2 font-[AvenirLTProMedium]"
              dir="ltr"
            >
              {selectedBiWeeklyAmp?.reportNumber}
            </span>
            مطمئن هستید؟
          </h4>
          <div
            className="mt-6 flex justify-end gap-2"
            onClick={() => {
              deleteReport.mutate(selectedBiWeeklyAmp?.id, {
                onSuccess: () => {
                  closeHandler();
                },
              });
            }}
          >
            <button className="cursor-pointer rounded-xl bg-orange-700/95 px-5 py-3 font-[Vazirmatn] text-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50">
              حذف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteBiWeeklyAmp;
