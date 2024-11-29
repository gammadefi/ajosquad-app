import { useMemo } from 'react';

export function useCADFormatter(amount: number) {
  return useMemo(() => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
    }).format(amount);
  }, [amount]);
}
