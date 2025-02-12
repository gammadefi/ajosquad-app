import { FieldAttributes, useField } from "formik";

interface SelectProps extends FieldAttributes<any> {
  label?: string;
  name: string;
  rightIcon?: any;
  options: { name: string, value: string }[],
  wrapperClass?: string;
  onRightIconClick?: () => void;
}

const Select = ({
  options,
  leftIcon,
  rightIcon,
  wrapperClass,
  label,
  name, // name must contain a value and not an empty string
  onRightIconClick,
  ...restProps
}: SelectProps) => {
  const [field, meta] = useField(name);

  return (
    <div className={`flex flex-col ${wrapperClass} w-full text-xs md:text-sm lg:text-base`}>
      {label && (
        <label
          htmlFor={restProps?.id || name}
          className='font-normal text-sm font-satoshiRegular capitalize mb-1.5'
        >
          {label}
        </label>
      )}

      <div className='relative'>
        <select
          className={`w-full h-[44px] py-2.5 focus:outline-none ${rightIcon ? "pr-11 pl-3" : "px-3"} rounded-lg bg-white border ${meta.touched && meta.error
            ? "border-red-600"
            : "border-[#D0D5DD]"
            }`}
          {...field}
          {...restProps}
        >
          <option disabled value="">
            {label}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        {rightIcon && (
          <i
            onClick={() => (onRightIconClick ? onRightIconClick() : null)}
            className='absolute top-1/2 -translate-y-1/2 right-2.5 cursor-pointer'
          >
            {rightIcon}
          </i>
        )}
      </div>
      {meta.touched && meta.error ? (
        <small className='text-red-600 mt-1 text-xs md:text-sm'>{meta.error}</small>
      ) : null}
    </div>
  );
};

export default Select;
