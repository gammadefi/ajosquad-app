import { FormikProvider, useFormik } from 'formik'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa6'
import usePasswordToggle from '../../../hooks/usePasswordToggle';
import TextInput from '../../../components/FormInputs/TextInput2';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Button } from '../../../components/Button/Button';

const regexPatternsForPassword = {
    number: /\d/,
    lowerCase: /[a-z]/,
    upperCase: /[A-Z]/,
    symbol: /[!@#$%^&*(),.?":{}|<>[\]\\;'`~_\-+=/]/
}
const PasswordSetting = () => {
    const { showPassword, handleClickShowPassword } = usePasswordToggle();
    const form = useFormik({
        initialValues: {
            oldPassword: '',
            password: '',
            confirmPassword: ''

        },
        onSubmit: (values: any) => {
            console.log(values)
        }
    })
    return (
        <div>
            <h3 className='text-xl font-semibold'>Security <span className='text-sm text-[#0000006B] font-normal '>change password</span></h3>

            <div className='md:max-w-[415px] mt-6 w-full'>
                <FormikProvider value={form} >
                    <form className='flex flex-col gap-4' onSubmit={form.handleSubmit}>
                    <TextInput
                            name='oldPassword'
                            type={showPassword ? "text" : "password"}
                            label="Current Password"
                            placeholder='Current Password'
                            rightIcon={
                                showPassword ? (
                                    <AiOutlineEye size={24} className='cursor-pointer' />
                                ) : (
                                    <AiOutlineEyeInvisible size={24} />
                                )
                            }
                            onRightIconClick={handleClickShowPassword}
                        />
                        <div >
                            <TextInput
                                name='password'
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                placeholder='Password'
                                rightIcon={
                                    showPassword ? (
                                        <AiOutlineEye size={24} className='cursor-pointer' />
                                    ) : (
                                        <AiOutlineEyeInvisible size={24} className='cursor-pointer' />
                                    )
                                }
                                onRightIconClick={handleClickShowPassword}
                            />
                            <div className="flex flex-wrap gap-1 lg:gap-2 !text-[10px] md:text-sm mt-2 md:mt-3">
                                <span className={`p-1 rounded border ${form.values.password === "" ? "border-[#C8CCD0]" : (form.values.password.length < 8) ? "border-red-600 text-red-600" : "border-green-500 text-green-500"}`}>
                                    8 Character Min
                                </span>
                                <span className={`p-1 rounded border ${form.values.password === "" ? "border-[#C8CCD0]" : !regexPatternsForPassword.symbol.test(form.values.password) ? "border-red-600 text-red-600" : "border-green-500 text-green-500"}`}>
                                    One Special Character
                                </span>
                                <span className={`p-1 rounded border ${form.values.password === "" ? "border-[#C8CCD0]" : !regexPatternsForPassword.upperCase.test(form.values.password) ? "border-red-600 text-red-600" : "border-green-500 text-green-500"}`}>
                                    One Uppercase Character
                                </span>
                                <span className={`p-1 rounded border ${form.values.password === "" ? "border-[#C8CCD0]" : !regexPatternsForPassword.number.test(form.values.password) ? "border-red-600 text-red-600" : "border-green-500 text-green-500"}`}>
                                    One number
                                </span>
                                <span className={`p-1 rounded border ${form.values.password === "" ? "border-[#C8CCD0]" : !regexPatternsForPassword.lowerCase.test(form.values.password) ? "border-red-600 text-red-600" : "border-green-500 text-green-500"}`}>
                                    One Lowercase Character
                                </span>
                            </div>
                        </div>
                        <TextInput
                            name='confirmPassword'
                            type={showPassword ? "text" : "password"}
                            label="Confirm Password"
                            placeholder='Confirm Password'
                            rightIcon={
                                showPassword ? (
                                    <AiOutlineEye size={24} className='cursor-pointer' />
                                ) : (
                                    <AiOutlineEyeInvisible size={24} />
                                )
                            }
                            onRightIconClick={handleClickShowPassword}
                        />
                        <Button label='Update' className='h-[48px] flex items-center justify-center font-semibold ' />
                    </form>
                </FormikProvider>

            </div>

        </div>
    )
}

export default PasswordSetting