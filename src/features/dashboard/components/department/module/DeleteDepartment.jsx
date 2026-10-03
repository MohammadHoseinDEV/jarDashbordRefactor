import React from 'react';
import { useDeleteDepartment } from '../../../../../hooks/depratment/department';

function DeleteDepartment() {
  const deletedep = useDeleteDepartment();

  return <div></div>;
}

export default DeleteDepartment;
