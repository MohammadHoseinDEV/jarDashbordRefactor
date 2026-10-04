import { useState } from 'react';

import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  FloatingFocusManager,
  FloatingNode,
  FloatingTree,
} from '@floating-ui/react';
import { MdMoreVert } from 'react-icons/md';

import edit from '../../../../../assets/images/edit.png';
import deleteIcon from '../../../../../assets/images/delete.png';
import form from '../../../../../assets/images/form.png';
import { useGetProfile } from '../../../../../hooks/profile/profile';
import { FaUnlock } from 'react-icons/fa';

function ReportActionDepartment({
  report,
  canEdit,
  canDelete,
  openEdit,
  openDelete,
  setOpenFormReport,
  setSelected,
  profile,
  canView,
  openView,
}) {
  if (!report) return null;

  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom-start',
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(5), flip(), shift()],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, dismiss, role]
  );

  const handleOpenForm = () => {
    setSelected(report);
    setOpenFormReport(true);
    setIsOpen(false);
  };

  return (
    <>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        onClick={(e) => {
          e.stopPropagation();

          setSelected(report);
          setIsOpen(!isOpen);
        }}
        className="cursor-pointer text-2xl text-white/60 transition-all delay-100 duration-150 hover:scale-105 hover:text-white"
      >
        <MdMoreVert />
      </button>

      <FloatingPortal>
        {isOpen && (
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className="5xl:text-[25px] absolute top-full left-0 z-9999 flex w-fit cursor-pointer flex-col items-start space-y-1 rounded-[15px] bg-black px-3 py-2 shadow-lg"
            >
              <div className="5xl:text-xl flex w-full items-center space-x-1 border-b border-white/50 p-1 font-[Samim] text-white max-2xl:text-[15px] 2xl:text-lg">
                <p>{report?.name}</p>
              </div>

              {canEdit && (
                <div
                  {...getItemProps({
                    onClick: (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      openEdit(report);
                      setIsOpen(false);
                    },
                  })}
                  className="flex w-full space-x-2 rounded-[5px] py-1 transition-all delay-75 duration-100 hover:bg-white/20"
                >
                  <button
                    className={`cursor-pointer rounded-[10px] p-2 font-[Samim] max-xl:p-1 ${'cursor-pointer transition-all delay-100 duration-150 ease-in-out hover:scale-106'}`}
                  >
                    <img src={edit} alt="edit" width={20} />
                  </button>
                  <p className="my-auto flex text-white">ویرایش</p>
                </div>
              )}

              {canDelete && (
                <div
                  {...getItemProps({
                    onClick: (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      openDelete(report);
                      setIsOpen(false);
                    },
                  })}
                  className="flex w-full space-x-2 rounded-[5px] py-1 transition-all delay-75 duration-100 hover:bg-white/20"
                >
                  <button
                    className={`cursor-pointer rounded-[10px] p-2 font-[Samim] max-xl:p-1 ${'cursor-pointer transition-all delay-100 duration-150 ease-in-out hover:scale-106 '}`}
                  >
                    <img src={deleteIcon} alt="delete" width={20} />
                  </button>
                  <p className="my-auto flex text-white">حذف</p>
                </div>
              )}
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </>
  );
}

export default ReportActionDepartment;
