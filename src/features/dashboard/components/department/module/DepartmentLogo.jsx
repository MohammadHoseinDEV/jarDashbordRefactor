import React, { useEffect, useRef, useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { toast } from 'react-toastify';
import {
  useGetDeoartmentLogo,
  useUploadDepartmentLogo,
} from '../../../../../hooks/depratment/department';

const MAX_SIZE = 2 * 1024 * 1024;
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

function DepartmentLogo({
  isLogo,
  setIsLogo,
  selectedDepartment,
  setselectedDepartment,
}) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const uploadLogo = useUploadDepartmentLogo();

  const { data: logo, isLoading } = useGetDeoartmentLogo(
    selectedDepartment?.id,
    isLogo && !!selectedDepartment?.hasLogo
  );

  const currentLogoSrc = logo?.success
    ? `data:${logo.contentType};base64,${logo.imageBase64}`
    : null;

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (!isLogo) {
      setFile(null);
      if (inputRef.current) inputRef.current.value = '';
    }
  }, [isLogo]);

  const closeHandler = () => {
    setIsLogo(false);
    setselectedDepartment(null);
  };

  const fileChangeHandler = (e) => {
    const picked = e.target.files?.[0];
    e.target.value = '';
    if (!picked) return;

    if (!ALLOWED_TYPES.includes(picked.type)) {
      toast.warning('فقط فرمت PNG، JPG یا WEBP مجاز است');
      return;
    }
    if (picked.size > MAX_SIZE) {
      toast.warning('حجم فایل نباید بیشتر از 2 مگابایت باشد');
      return;
    }
    setFile(picked);
  };

  const logoHandler = () => {
    if (!file) {
      toast.warning('ابتدا یک فایل انتخاب کنید');
      return;
    }
    if (!selectedDepartment?.id) {
      toast.error('شرکتی انتخاب نشده است');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    uploadLogo.mutate(
      { id: selectedDepartment.id, data: formData },
      { onSuccess: closeHandler }
    );
  };

  const shownSrc = preview || currentLogoSrc;
  const isUploading = uploadLogo.isPending;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isLogo
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={closeHandler}
      />
      <div
        className={`relative w-full transform rounded-[15px] bg-linear-to-b from-[#1c1c1c] to-[#0c0c0c] p-6 text-white shadow-2xl transition-all duration-300 md:w-fit ${
          isLogo
            ? 'translate-y-0 scale-100 opacity-100'
            : '-translate-y-10 scale-0 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="4xl:text-3xl pr-1.5 font-[Vazirmatn] text-lg font-semibold md:text-xl">
            بارگذاری لوگو
          </h1>
          <p
            onClick={closeHandler}
            className="4xl:text-3xl flex size-7 cursor-pointer items-center justify-center rounded-lg text-[16px] text-white/50 transition-all delay-75 duration-100 hover:bg-white/10 hover:text-white"
          >
            <span>
              <IoCloseSharp />
            </span>
          </p>
        </div>

        <div className="mt-5 flex flex-col items-center gap-4 md:min-w-90">
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={fileChangeHandler}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            className="flex h-40 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/50 transition-all hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {shownSrc ? (
              <img
                src={shownSrc}
                alt="لوگو"
                className="h-full w-full object-contain p-2"
              />
            ) : isLoading ? (
              <span className="text-sm text-white/50">در حال بارگذاری...</span>
            ) : (
              <span className="text-sm text-white/50">
                برای انتخاب لوگو کلیک کنید
              </span>
            )}
          </button>

          {shownSrc && (
            <p className="text-xs text-white/50">
              {file ? (
                <span dir="ltr">{file.name}</span>
              ) : (
                'برای تغییر لوگو روی کادر کلیک کنید'
              )}
            </p>
          )}

          <div className="flex w-full items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeHandler}
              disabled={isUploading}
              className="cursor-pointer rounded-xl bg-white/10 px-5 py-3 font-[Vazirmatn] text-sm transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
                
              انصراف
            </button>
            <button
              type="button"
              onClick={logoHandler}
              disabled={!file || isUploading}
              className="cursor-pointer rounded-xl bg-orange-700/95 px-5 py-3 font-[Vazirmatn] text-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUploading ? 'در حال بارگذاری...' : 'بارگذاری'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepartmentLogo;
