import React from "react";
import { FieldAttributes, useField } from "formik";
import PhoneInput from "react-phone-input-2";

interface TextInputProps extends FieldAttributes<any> {
  label?: string;
  name: string;
  leftIcon?: any;
  rightIcon?: any;
  wrapperClass?: string;
  onRightIconClick?: () => void;
}

const TextInput = ({
  leftIcon,
  rightIcon,
  wrapperClass,
  label,
  name, // name must contain a value and not an empty string
  onRightIconClick,
  ...restProps
}: TextInputProps) => {
  const [field, meta, helpers] = useField(name);

  const handlePhoneChange = (value: string) => {
    helpers.setValue(value);
  };

  const handlePhoneBlur = () => {
    helpers.setTouched(true);
  };
  return (
    <div className={`flex flex-col ${wrapperClass}`}>
      {label && (
        <label
          htmlFor={restProps?.id || name}
          className='text-xs font-normal font-satoshiRegular capitalize'
        >
          {label}
        </label>
      )}

      <div className='relative'>
        {leftIcon && (
          <i className='absolute top-1/2 -translate-y-1/2 left-2.5'>
            {leftIcon}
          </i>
        )}
        {name === "phone" ? (
          <PhoneInput
            country={"ng"}
            onlyCountries={["ng"]}
            areaCodes={{ng: ['234']}}
            value={field.value}
            inputClass={`w-full !border-none !w-full`}
            containerClass={`w-full rounded border ${
              meta.touched && meta.error
                ? "border-red-600"
                : "border-[#470e812b]"
            } p-1.5`}
            buttonClass={` !border-none !bg-white`}
            placeholder='+23420202020'
            onChange={handlePhoneChange}
            onBlur={handlePhoneBlur}
            inputProps={{
              name: "phone",
              required: true,
              autoFocus: true,
            }}
          />
        ) : (
          <input
            className={`w-full text-xs h-12 py-2.5 focus:outline-none ${
              leftIcon ? "pl-11" : "pl-3"
            } ${rightIcon ? "pr-11" : "pr-3"} rounded bg-white border ${
              meta.touched && meta.error
                ? "border-red-600"
                : "border-[#470e812b]"
            }`}
            {...field}
            {...restProps}
          />
        )}

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
        <small className='text-xs text-red-600'>{meta.error}</small>
      ) : null}
    </div>
  );
};

export default TextInput;
