import { useGetFullAccess } from './auth/authApi';

export const useSignatureAccess = (menuUrl) => {
  const { data: profile } = useGetFullAccess();

  const steps = (profile?.signatureAccess ?? [])
    .filter((a) => a.menuUrl === menuUrl && a.canSign)
    .map((a) => a.stepKey);

  return {
    canSign: (stepKey) => steps.includes(stepKey),
    hasAnySign: steps.length > 0,
  };
};
