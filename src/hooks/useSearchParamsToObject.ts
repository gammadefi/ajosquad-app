import { useSearchParams } from 'react-router-dom';

export const useSearchParamsToObject = () => {
  const [searchParams] = useSearchParams();
  const paramsObject: { [key: string]: string } = {};

  searchParams.forEach((value, key) => {
    paramsObject[key] = value;
  });

  return paramsObject;
};