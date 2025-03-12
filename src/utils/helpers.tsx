import React, {
  Component,
  lazy,
  PropsWithoutRef,
  RefAttributes,
  Suspense
} from "react";

import { RouteObject } from "react-router-dom";

import axios from 'axios';

export const LazyRoute = (
  obj: RouteObject,
  factory: () => Promise<{ default: React.ComponentType<any> }>
): RouteObject => {
  const Page = lazy(factory);
  return {
    ...obj,
    element: <Page />,
  };
};

export const LazyLoad = <TProps,>(props: {
  c: (() => Promise<{ default: React.ComponentType<TProps> }>) | undefined;
  props: PropsWithoutRef<TProps> & RefAttributes<Component<TProps, any, any>>;
}) => {
  if (!props.c) {
    return <div>Not found</div>;
  }
  const Component = lazy(props.c);
  return (
    <Suspense
      fallback={
        <div className="h-full grid place-content-center place-items-center bg-transparent">
          <img
            src={"/images/logo.svg"}
            className="animate-pulse h-32 w-32"
            alt="paycenter_logo"
          />
        </div>
      }
    >
      <Component {...props.props} />
    </Suspense>
  );
};

export const currencyFormat = (
  amount: string | number,
  currency: string = "NGN"
) =>
  Number(amount).toLocaleString("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  });


export const convertToThumbnailUrl = (
  cloudinaryUrl: string,
  format: "jpg" | "png" = "jpg",
  width: number = 500
): string | null => {
  // Validate the Cloudinary URL
  if (!cloudinaryUrl || !cloudinaryUrl.includes("cloudinary.com")) {
    return null;
  }

  // Split the URL into the base and resource parts
  const urlParts = cloudinaryUrl.split("/upload/");
  if (urlParts.length !== 2) {
    return null;
  }

  const baseUrl = urlParts[0];
  const resource = urlParts[1];

  // Construct the transformed URL
  return `${baseUrl}/upload/f_${format},w_${width}/${resource}`;
};

export const getFileSize = async (url: string): Promise<string> => {
  try {
    const response = await axios.head(url);
    const contentLength = response.headers['content-length'];
    const sizeInBytes = parseInt(contentLength, 10);
    const sizeInKB = (sizeInBytes / 1024).toFixed(2);
    return sizeInKB;
  } catch (error) {
    console.error('Error fetching file size:', error);
    throw error;
  }
}

export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + '...';
}

export const isJsonString = (value: string): boolean => {

  try {

    const parsed = JSON.parse(value);

    return typeof parsed === 'object' && parsed !== null;

  } catch (error) {

    return false;

  }

}

export const isEmpty = (value: any) =>

  value === undefined ||

  value === null ||

  (typeof value === "object" && Object.keys(value).length === 0) ||

  (typeof value === "string" && value.trim().length === 0) ||

  (typeof value === "object" && value.toString().length === 0);


export const trimObject = (obj: any) => {

  for (const propName in obj) {

    if (isEmpty(obj[propName])) {

      delete obj[propName];

    }

  }
  return obj;

};

export function paramsObjectToQueryString(payload: any) {

  const trimmedPayload = trimObject(payload);

  const paramPayloadToArr = Object.keys(trimmedPayload);

  if (!trimmedPayload || paramPayloadToArr.length < 1) return "";

  const queryString = paramPayloadToArr.reduce((acc, element, index, array) => {

    acc = `${array[0] === element ? "?" : ""}${acc}${element}=${trimmedPayload[element]

      }${array[array.length - 1] !== element ? "&" : ""}`;

    return acc;

  }, "");

  return queryString;

}

  interface PaginationInfo {
    currentPage: number;
    pageSize: number;
  }


  export const generateSerialNumber = (index: number, pageInfo: PaginationInfo): number => {
    const { currentPage, pageSize } = pageInfo;
    return (currentPage - 1) * pageSize + index + 1;
  };

export const jsonToCSV = (jsonArray: any[], fileName: string = 'data.csv') => {
  if (!jsonArray.length) {
    return;
  }

  const keys = Object.keys(jsonArray[0]);
  const csvContent = [
    keys.join(','), // header row
    ...jsonArray.map(item => keys.map(key => item[key]).join(',')) // data rows
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

