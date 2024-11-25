import React, { useState, DragEvent, ChangeEvent } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { LuFileDown } from 'react-icons/lu';

// Define the form values type
interface FormValues {
  file: File | null;
}

const FileUploadForm = ({ next }: { next: () => void }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const initialValues: FormValues = {
    file: null,
  };

  const validationSchema = Yup.object({
    file: Yup.mixed<File>()
      .nullable()
      .required('A file is required')
      .test('fileType', 'Only PDF or Word files are allowed', (value) =>
        value
          ? [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          ].includes(value.type)
          : true
      )
      .test('fileSize', 'File size is too large (max 5MB)', (value) =>
        value ? value.size <= 1024 * 1024 * 5 : true // 5MB limit
      ),
  });

  const handleDrop = (
    event: DragEvent<HTMLDivElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files[0]) {
      setFieldValue('file', files[0]);
      setFileName(files[0].name);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = event.currentTarget.files?.[0] || null;
    setFieldValue('file', file);
    setFileName(file?.name || null);
  };

  const handleSubmit = (values: FormValues) => {
    alert(`File uploaded: ${values.file?.name}`);
    next()
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isValid, isSubmitting }) => (
        <Form className='my-5'>
          <div
            onDrop={(event) => handleDrop(event, setFieldValue)}
            onDragOver={handleDragOver}
            className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg text-center bg-[#E6F0FF]"
          >
            <Field name="file">
              {() => (
                <div className='h-[173px] flex items-center'>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="fileInput"
                    onChange={(event) => handleFileChange(event, setFieldValue)}
                  />
                  <label
                    htmlFor="fileInput"
                    className="w-full cursor-pointer flex flex-col items-center"
                  >
                    <img src="/UploadIcon.svg" alt="" />
                    <h2 className='font-bold mt-1 mb-3'>
                      Drag & drop files or <span className='text-primary'>Browse</span>
                    </h2>
                    <span className='text-[#676767] text-sm'>Supported formats: PDF, Word</span>
                  </label>
                </div>
              )}
            </Field>
          </div>

          {fileName && (
            <p className="mt-4 text-sm text-gray-700">
              Selected File: <span className="font-medium">{fileName}</span>
            </p>
          )}

          <ErrorMessage
            name="file"
            component="div"
            className="mt-2 text-red-600 text-sm"
          />
          <div className='flex gap-5 mt-4'>
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="w-full flex items-center gap-2 justify-center border border-primary py-2 rounded-lg"
            >
              Download Guarantor Form
              <LuFileDown className='h-5 w-5' />
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="w-full disabled:bg-primary/40 bg-primary text-white py-2 rounded-lg"
            >
              Upload File
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FileUploadForm;
