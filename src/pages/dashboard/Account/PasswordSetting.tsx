import { Form, Formik } from 'formik'
import * as Yup from "yup";
import usePasswordToggle from '../../../hooks/usePasswordToggle';
import TextInput from '../../../components/FormInputs/TextInput2';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { userServices } from '../../../services/user';
import { useAuth } from '../../../zustand/auth.store';

const regexPatternsForPassword = {
    number: /\d/,
    lowerCase: /[a-z]/,
    upperCase: /[A-Z]/,
    symbol: /[!@#$%^&*(),.?":{}|<>[\]\\;'`~_\-+=/]/
}

const validationSchema = Yup.object({
    currentPassword: Yup.string()
        .trim()
        .required("*Old Password is required"),
    newPassword: Yup.string().trim()
        .required("*New Password is required")
        .min(8, 'Must be at least 8 characters')
        .matches(regexPatternsForPassword.number, "You must enter at least one number.")
        .matches(regexPatternsForPassword.lowerCase, "You must enter at least one lowercase letter.")
        .matches(regexPatternsForPassword.upperCase, "You must enter at least one uppercase letter.")
        .matches(regexPatternsForPassword.symbol, "You must enter at least one special character"),
    confirmPassword: Yup.string()
        .required("*Confirm Password is required")
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
});

const PasswordSetting = () => {
    const { showPassword, handleClickShowPassword } = usePasswordToggle();
    const initialValues = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''

    }
    return (
        <div>
            <h3 className='text-xl font-semibold'>Security <span className='text-sm text-[#0000006B] font-normal '>change password</span></h3>

            <div className='md:max-w-[415px] mt-6 w-full'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { resetForm }) => {
                        if (values) {
                            const payload = {
                                currentPassword: values.currentPassword,
                                newPassword: values.newPassword,
                                confirmPassword: values.confirmPassword
                            }
                            try {
                                const response = await userServices.user.updatePassword(useAuth.getState().profile.id, payload);
                                if (response) {
                                    toast.success("Successfully updated password");
                                    resetForm();
                                }
                            } catch (error: any) {
                                console.log(error);
                                toast.error(error.response.data.message);
                            }
                        }
                    }}
                >
                    {({ values, isSubmitting }) => {
                        return (
                            <Form className='flex flex-col gap-3'>
                                <TextInput
                                    name='currentPassword'
                                    type={showPassword ? "text" : "password"}
                                    label="Current Password"
                                    placeholder='Password'
                                    rightIcon={
                                        showPassword ? (
                                            <AiOutlineEye size={24} className='cursor-pointer' />
                                        ) : (
                                            <AiOutlineEyeInvisible size={24} />
                                        )
                                    }
                                    onRightIconClick={handleClickShowPassword}
                                />
                                <div>
                                    <TextInput
                                        name='newPassword'
                                        type={showPassword ? "text" : "password"}
                                        label="New Password"
                                        placeholder='Password'
                                        rightIcon={
                                            showPassword ? (
                                                <AiOutlineEye size={24} className='cursor-pointer' />
                                            ) : (
                                                <AiOutlineEyeInvisible size={24} />
                                            )
                                        }
                                        onRightIconClick={handleClickShowPassword}
                                    />
                                    <div className="flex flex-wrap gap-1 lg:gap-2 text-[10px] text-xs mt-1 md:mt-3">
                                        <span className={`p-1 rounded border ${values.newPassword === "" ? "border-[#C8CCD0]" : (values.newPassword.length < 8) ? "border-red-600 text-red-600" : "border-green-500 text-green-500"}`}>
                                            8 Character Min
                                        </span>
                                        <span className={`p-1 rounded border ${values.newPassword === "" ? "border-[#C8CCD0]" : !regexPatternsForPassword.symbol.test(values.newPassword) ? "border-red-600 text-red-600" : "border-green-500 text-green-500"}`}>
                                            One Special Character
                                        </span>
                                        <span className={`p-1 rounded border ${values.newPassword === "" ? "border-[#C8CCD0]" : !regexPatternsForPassword.upperCase.test(values.newPassword) ? "border-red-600 text-red-600" : "border-green-500 text-green-500"}`}>
                                            One Uppercase Character
                                        </span>
                                        <span className={`p-1 rounded border ${values.newPassword === "" ? "border-[#C8CCD0]" : !regexPatternsForPassword.number.test(values.newPassword) ? "border-red-600 text-red-600" : "border-green-500 text-green-500"}`}>
                                            One number
                                        </span>
                                        <span className={`p-1 rounded border ${values.newPassword === "" ? "border-[#C8CCD0]" : !regexPatternsForPassword.lowerCase.test(values.newPassword) ? "border-red-600 text-red-600" : "border-green-500 text-green-500"}`}>
                                            One Lowercase Character
                                        </span>
                                    </div>
                                </div>

                                <TextInput
                                    name='confirmPassword'
                                    type={showPassword ? "text" : "password"}
                                    label="Confirm Password"
                                    placeholder='Password'
                                    rightIcon={
                                        showPassword ? (
                                            <AiOutlineEye size={24} className='cursor-pointer' />
                                        ) : (
                                            <AiOutlineEyeInvisible size={24} />
                                        )
                                    }
                                    onRightIconClick={handleClickShowPassword}
                                />
                                <button
                                    type='submit'
                                    disabled={isSubmitting}
                                    className='bg-primary font-semibold self-end rounded-lg text-white inline-flex items-center gap-3 justify-center text-center py-3 px-14 disabled:bg-opacity-50'
                                >
                                    {
                                        isSubmitting ? "Updating" : "Update"
                                    }
                                </button>
                            </Form>
                        );
                    }}
                </Formik>

            </div>

        </div >
    )
}

export default PasswordSetting