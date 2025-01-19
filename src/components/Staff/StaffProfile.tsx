import { useState } from "react";
import * as Yup from "yup";
import { FaArrowRight, FaCamera, FaRegCircleCheck } from "react-icons/fa6";
import { useMutation, useQuery, useQueryClient } from "react-query";
import PageLoader from "../spinner/PageLoader";
import { StaffService } from "../../services/staff";
import { formatDate2 } from "../../utils/formatTime";
import { IoMdCopy } from "react-icons/io";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import toast from "react-hot-toast";
import { ErrorMessage, Form, Formik } from 'formik';
import TextInput from '../FormInputs/TextInput2';

export default function StaffProfile({ id, closeModal }: { id: string, closeModal: () => void }) {
  const [showStaffProfile, setShowStaffProfile] = useState(true);
  const [showEditStaffRole, setShowEditStaffRole] = useState(false);
  const [showRevokeStaff, setShowRevokeStaff] = useState(false);

  const { copiedIndex, copyToClipboard } = useCopyToClipboard();

  const { data, isLoading } = useQuery([`staff-${id}`], async () => {
    const res = await StaffService.getStaff(id);
    return res.data.data;
  })

  if (isLoading) return <PageLoader />

  return (
    <div className='w-[350px] md:w-[550px]'>
      {
        showStaffProfile &&
        <div className="flex flex-col gap-4">
          <h1 className="text-lg md:text-2xl lg:text-3xl font-semibold">
            Staff Profile
          </h1>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div className='relative w-fit'>
                <img src="./Image.svg" alt="" className="w-16 h-16" />
                <FaCamera className='absolute h-3 w-3 text-primary-darkHover bottom-1 right-1' />
              </div>
              <div className="mt-2">
                <h3 className='font-semibold text-lg'>{data.firstName} {data.lastName}</h3>
                <p className='font-normal flex gap-2'>{data.id} <span className='text-[#464749] flex gap-1 items-center'>{copiedIndex === 1 ? <FaRegCircleCheck /> : <IoMdCopy className='cursor-pointer' onClick={() => copyToClipboard(data.id, 1)} />}</span></p>
              </div>
            </div>
            <div>
              <span className="text-[#036B26] bg-[#E7F6EC] py-0.5 px-2 rounded-xl text-sm font-semibold">Active</span>
            </div>
          </div>
          <div className='font-medium space-y-1.5'>
            <div className='flex justify-between'>
              <div className='w-3/5'>
                <p className='text-[#96999C]'>First Name</p>
                <p className='font-normal'>{data.firstName}</p>
              </div>
              <div className='w-2/5'>
                <p className='text-[#96999C]'>Last Name</p>
                <p className='font-normal'>{data.lastName}</p>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='w-3/5'>
                <p className='text-[#96999C]'>Email Address</p>
                <p className='font-normal'>{data.email_address}</p>
              </div>
              <div className='w-2/5'>
                <p className='text-[#96999C]'>Phone Number</p>
                <p className='font-normal'>{data.phoneNumber || "N/A"}</p>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='w-3/5'>
                <p className='text-[#96999C]'>ID</p>
                <p className='font-normal'>{data.id}</p>
              </div>
              <div className='w-2/5'>
                <p className='text-[#96999C]'>Role</p>
                <p className='font-normal capitalize'>{data.role}</p>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='w-3/5'>
                <p className='text-[#96999C]'>Date Invite Sent</p>
                <p className='font-normal'>{data.invitedAt || "N/A"}</p>
              </div>
              <div className='w-2/5'>
                <p className='text-[#96999C]'>Date Joined</p>
                <p className='font-normal'>{formatDate2(data.createdAt)}</p>
              </div>
            </div>
          </div>
          <div className="mt-10 flex justify-between">
            <button
              type="button"
              onClick={() => {
                setShowStaffProfile(false);
                setShowRevokeStaff(true);
              }}
              className="border border-primary font-medium px-10 rounded-lg"
            >
              Revoke Access
            </button>
            <button
              onClick={() => {
                setShowStaffProfile(false);
                setShowEditStaffRole(true);
              }}
              className='bg-primary font-semibold px-10 rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
            >
              Change User Role
              <FaArrowRight />
            </button>

          </div>
        </div>
      }
      {
        showRevokeStaff && <RevokeStaff id={data.id} closeModal={closeModal} handleReturnToStaffProfile={() => {
          setShowRevokeStaff(false);
          setShowStaffProfile(true);
        }} />
      }
      {
        showEditStaffRole && <UpdateStaffForm email={data.email_address} role={data.role} id={data.id} closeModal={closeModal} handleReturnToStaffProfile={() => {
          setShowEditStaffRole(false);
          setShowStaffProfile(true);
        }} />
      }
    </div>
  )
}

function RevokeStaff({ id, closeModal, handleReturnToStaffProfile }: { id: string, closeModal: () => void, handleReturnToStaffProfile: () => void }) {
  const [hasRevoked, setHasRevoked] = useState(false);
  const [isRevoking, setIsRevoking] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ id }: { id: string }) => {
      const res = await StaffService.deleteStaff(id);
      return res;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["query-all-staffs"]);
      },
    }
  );

  const handleDeleteStaff = async () => {
    setIsRevoking(true);
    try {
      const res = await mutation.mutateAsync({ id });
      if (res) {
        toast.success("Staff revoked successfully")
        setIsRevoking(false);
        setHasRevoked(true);
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  };

  return (
    <div className='w-[350px] md:w-[530px]'>
      {
        hasRevoked ?
          <div className='md:w-[550px] lg:w-full flex flex-col items-center gap-5'>
            <img src="./Trophy.svg" alt="Delete bank" className='w-52 h-52' />
            <div>
              <h3 className='font-bold text-2xl text-center'>
                Access & Permission Revoked successfully
              </h3>
            </div>
            <p className='text-sm text-center'>
              Success! staff access and permission revoked successfully.
            </p>
            <button
              type='button'
              onClick={closeModal}
              className='bg-primary w-full font-semibold px-10 rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
            >
              Dismiss
              <FaArrowRight />
            </button>
          </div>
          :
          <div className="w-full flex flex-col items-center gap-4">
            <img src="./Rectangle.svg" alt="" />
            <h1 className="text-2xl font-semibold text-center">
              Please confirm that you want to revoke this staff access & permissions
            </h1>
            <div className="w-full mt-10 flex justify-between">
              <button
                type="button"
                onClick={handleReturnToStaffProfile}
                className="border border-primary font-medium px-10 rounded-lg"
              >
                Cancel
              </button>
              <button
                type='submit'
                onClick={handleDeleteStaff}
                disabled={isRevoking}
                className='bg-primary font-semibold px-10 rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
              >
                Yes, proceed
                <FaArrowRight />
              </button>

            </div>
          </div>
      }
    </div>
  )
}


const UpdateStaffForm = ({ id, email, role, closeModal, handleReturnToStaffProfile }: { id: string, email: string, role: string, closeModal: () => void, handleReturnToStaffProfile: () => void }) => {
  const [hasUpdatedStaff, setHasUpdatedStaff] = useState(false);
  const queryClient = useQueryClient()

  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .email()
      .required("*Email Name is required"),
    role: Yup.string()
      .trim()
      .required("*Role is required"),
  });

  const initialValues = {
    email,
    role
  }

  const mutation = useMutation(
    async ({ payload }: { payload: any }) => {
      const res = await StaffService.updateStaff(id, payload);
      return res;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["query-all-staffs"]);
        queryClient.invalidateQueries([`staff-${id}`]);
      },
    }
  );

  return (
    <>
      {
        hasUpdatedStaff ?
          <div className='md:w-[550px] lg:w-full flex flex-col items-center gap-5'>
            <img src="./Trophy.svg" alt="Delete bank" className='w-52 h-52' />
            <div>
              <h3 className='font-bold text-2xl text-center'>
                Staff Role Updated
              </h3>
            </div>
            <p className='text-sm text-center'>
              Success! User role has been changed successfully.
            </p>
            <button
              type='button'
              onClick={closeModal}
              className='bg-primary w-full font-semibold px-10 rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
            >
              Dismiss
              <FaArrowRight />
            </button>
          </div>
          :
          <div className='flex flex-col gap-2'>
            <h1 className="text-lg md:text-2xl lg:text-3xl font-semibold">
              Edit Staff Role
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                if (values) {
                  const payload = {
                    email_address: values.email,
                    role: values.role
                  }

                  console.log(payload)
                  try {
                    const res = await mutation.mutateAsync({ payload });
                    if (res) {
                      setHasUpdatedStaff(true);
                    }
                  } catch (error) {
                    console.log(error)
                    toast.error("Failed to add a staff")
                  }
                }
              }}
            >
              {({ isSubmitting, setValues }) => (
                <Form className='flex flex-col gap-1.5'>
                  <TextInput
                    name='email'
                    type='email'
                    label="Emali*"
                    placeholder='Enter user email'
                  />
                  <div className='flex flex-col w-full text-xs md:text-sm lg:text-base'>
                    <label className='font-normal text-sm font-satoshiRegular capitalize mb-1.5'>Select Permission Type*</label>
                    <select name='role' defaultValue={role} onChange={(e) => setValues((prevValues) => ({ ...prevValues, role: e.target.value }))} className='w-full h-[44px] py-2.5 focus:outline-none px-3 rounded-lg bg-white border'>
                      <option value="">Select Permission Type</option>
                      <option value="admin">Admin</option>
                      <option value="staff">Staff</option>
                    </select>
                    <ErrorMessage name="role" component="div" className="text-red-500" />
                  </div>
                  <div className="my-3 flex justify-between">
                    <button
                      type="button"
                      onClick={handleReturnToStaffProfile}
                      className="border border-primary font-medium px-10 rounded-lg"
                    >
                      Back
                    </button>
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className='bg-primary font-semibold px-10 rounded-lg text-white inline-flex items-center gap-3 justify-center text-center p-3 disabled:bg-opacity-50'
                    >
                      {isSubmitting ? "Updating" : "Update"}
                      <FaArrowRight />
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
      }
    </>
  )
}