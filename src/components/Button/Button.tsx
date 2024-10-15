import React from 'react';
import Spinner from '../spinner/Spinner';

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string;
  backgroundColor?: string;
  onClick?: any;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'outlined';
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  className?:string;
  iconPosition?: 'beforeText' | 'afterText';
}

export const Button = ({
  label,
  onClick = () => { },
  disabled = false,
  size = "small",
  isLoading,
  fullWidth,
  variant,
  icon,
  iconPosition,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      type="submit"
      disabled={isLoading ? true : disabled}
      aria-label="button"
      onClick={onClick}
      className={`flex focus:outline-none gap-2 justify-start my-auto ${
        size === 'small' ? 'h-10' : 'h-12'
      } text-sm px-3 text-white rounded  items-center default-button text-center ${
        disabled
          ? 'bg-gray-300 cursor-not-allowed'
          : 'bg-primary cursor-pointer'
      } shadow-sm ${fullWidth && 'w-full'} ${className}`}
    >
      {!isLoading && icon && iconPosition === 'beforeText' && (
        <div className="my-auto">{icon} </div>
      )}
      {isLoading && <Spinner />}

      {label}
      {!isLoading && icon && iconPosition === 'afterText' && (
        <div className="my-auto">{icon} </div>
      )}
    </button>
  );
};
