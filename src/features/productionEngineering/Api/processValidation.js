import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';

const BASE_API = `http://localhost:5261/api/ProcessValidationInquiryForms`;

export const useGetProcessValidation = ({
  search,
  page,
  pageSize,
  companyId,
  isRequesterSigned,
  isQCSupervisorSigned,
  isFinalProductionSupervisorSigned,
} = {}) => {
  const { token } = useSelector((state) => state.auth);
  return useQuery({
    queryKey: [
      'process',
      token,
      search,
      page,
      pageSize,
      companyId,
      isRequesterSigned,
      isQCSupervisorSigned,
      isFinalProductionSupervisorSigned,
    ],
    queryFn: async () => {
      return await axios.get(`${BASE_API}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          search,
          page,
          pageSize,
          companyId,
          isRequesterSigned,
          isQCSupervisorSigned,
          isFinalProductionSupervisorSigned,
        },
      });
    },
  });
};
