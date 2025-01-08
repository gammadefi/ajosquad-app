import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const ConnectGoCardless = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const status = searchParams.get('status');
    if (status === 'success') {
      localStorage.setItem('connectedGocardless', 'true');
    } else if (status === 'failed') {
      localStorage.setItem('connectedGocardless', 'false');
    }
  }, [searchParams]);

  return <div>Processing GoCardless Connection...</div>;
};

export default ConnectGoCardless;
