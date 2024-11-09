import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

import css from "./CreateFolderForm.module.css";
import Button from "../Button/Button";
import { createNewFolder } from "../../redux/folders/foldersSlice";
import { useAppDispatch } from "../../redux/hooks";

interface CreateFolderFormProps {
  onClose: () => void;
}

export default function CreateFolderForm({ onClose }: CreateFolderFormProps) {
  const dispatch = useAppDispatch();

  const initialValues = {
    folderName: "",
    folderDescription: "",
  };

  const validationSchema = Yup.object({
    folderName: Yup.string().required("Enter folder name"),
    folderDescription: Yup.string(),
  });

  interface valuesProps {
    folderName: string;
    folderDescription: string;
  }

  const onSubmit = async (
    values: valuesProps,
    { setSubmitting }: FormikHelpers<valuesProps>
  ) => {
    const { folderName, folderDescription } = values;
    setSubmitting(false);
    try {
      dispatch(createNewFolder({ folderName, folderDescription }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
    }

    onClose();
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={css.formWrapper}>
              <div className={css.inputWrapper}>
                <label className={css.inputTitle} htmlFor='folderName'>
                  Folder Name:
                </label>
                <Field
                  type='text'
                  name='folderName'
                  placeholder='Enter folder name'
                />
                <ErrorMessage
                  name='folderName'
                  component='div'
                  className='error'
                />
              </div>
              <div className={css.inputWrapper}>
                <label className={css.inputTitle} htmlFor='folderDescription'>
                  Folder Description:
                </label>
                <Field
                  className={css.textarea}
                  type='text'
                  name='folderDescription'
                  as='textarea'
                  rows='4'
                  cols='50'
                  placeholder='Enter folder description'
                />
                <ErrorMessage
                  name='folderDescription'
                  component='div'
                  className='error'
                />
              </div>
            </div>

            <div className={css.buttonsWrapper}>
              <Button action='confirm' type='submit' disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
              <Button action='decline' onClick={onClose}>
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
