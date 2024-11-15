import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

import css from "./EditFolderForm.module.css";
import Button from "../Button/Button";
import {
  createNewFolder,
  deleteFolder,
  editFolder,
} from "../../redux/folders/foldersSlice";
import { useAppDispatch } from "../../redux/hooks";
import { FolderProps } from "../../types/words";

interface EditFolderFormProps {
  onClose: () => void;
  folderData: FolderProps;
}

export default function EditFolderForm({
  onClose,
  folderData,
}: EditFolderFormProps) {
  const dispatch = useAppDispatch();

  const { id, folderName, folderDescription } = folderData;

  const initialValues = {
    folderName: folderName,
    folderDescription: folderDescription,
  };

  const validationSchema = Yup.object({
    folderName: Yup.string().required("Enter folder name"),
    folderDescription: Yup.string(),
  });

  const onSubmit = async (
    values: FolderProps,
    { setSubmitting }: FormikHelpers<FolderProps>
  ) => {
    const { folderName, folderDescription } = values;
    setSubmitting(false);
    try {
      dispatch(
        editFolder({ id: folderData.id, folderName, folderDescription })
      );
      // dispatch(createNewFolder({ folderName, folderDescription }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
    }

    onClose();
  };

  function onDeleteHandleClick() {
    if (id) {
      dispatch(deleteFolder(id));
    }

    onClose();
  }

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
              <Button
                action='decline'
                type='button'
                onClick={onDeleteHandleClick}
              >
                Delete
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
