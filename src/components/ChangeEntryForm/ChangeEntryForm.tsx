import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

import css from "./ChangeEntryForm.module.css";
import Button from "../Button/Button";
import { useAppDispatch } from "../../redux/hooks";
import { deleteWord, updateWord } from "../../redux/words/wordsSlice";
import { useState } from "react";
import Svg from "../Svg/Svg";
import { handleFileUpload } from "../../services/aws";
import { WordProps } from "../../types/words";

interface ChangeEntryFormProps {
  onClose: () => void;
  folderName: string | undefined;
  wordData: WordProps | undefined;
}

export default function ChangeEntryForm({
  onClose,
  folderName,
  wordData,
}: ChangeEntryFormProps) {
  console.log("wordData", wordData);
  const dispatch = useAppDispatch();

  const [pickedImage, setPickedImage] = useState(wordData.imageLink);
  const [imgFile, setImgFile] = useState(null);

  const handleImageAdd = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }

    setImgFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPickedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const onDeleteImageClick = () => {
    setPickedImage(null);
  };

  let initialValues = {
    word: "",
    translation: "",
    definition: "",
    loadImage: "",
  };
  if (wordData) {
    initialValues = {
      word: wordData.word || "",
      translation: wordData.translation || "",
      definition: wordData.definition || "",
      loadImage: wordData.imageLink || "",
    };
  }

  const validationSchema = Yup.object({
    word: Yup.string().required("Enter word"),
    translation: Yup.string().required("Enter translation"),
    definition: Yup.string(),
  });

  interface valuesProps {
    word: string;
    translation: string;
    definition: string;
    loadImage: null | string;
  }

  const onSubmit = async (
    values: valuesProps,
    { setSubmitting }: FormikHelpers<valuesProps>
  ) => {
    const { word, translation, definition } = values;

    let linkToImg = await handleFileUpload(imgFile);

    if (!linkToImg) {
      linkToImg = wordData?.imageLink;
    }

    setSubmitting(false);

    try {
      dispatch(
        updateWord({
          id: wordData?.id,
          folder: folderName,
          word,
          translation,
          definition,
          imageLink: linkToImg || "",
          learningStatus: wordData?.learningStatus,
          userId: wordData?.id,
        })
      );
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
    if (wordData?.id) {
      dispatch(deleteWord(wordData?.id));
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
              <h3>Change / Delete the word</h3>

              <div className={css.inputWrapper}>
                <label className={css.inputTitle} htmlFor='word'>
                  Word/Phrase:
                </label>
                <Field
                  className={css.textarea}
                  type='text'
                  name='word'
                  placeholder='Enter word or phrase'
                  as='textarea'
                  rows='2'
                  cols='50'
                />
                <ErrorMessage name='word' component='div' className='error' />
              </div>
              <div className={css.inputWrapper}>
                <label className={css.inputTitle} htmlFor='translation'>
                  Translation:
                </label>
                <Field
                  className={css.textarea}
                  type='text'
                  name='translation'
                  placeholder='Enter word or phrase translation'
                  as='textarea'
                  rows='2'
                  cols='50'
                />
                <ErrorMessage
                  name='translation'
                  component='div'
                  className='error'
                />
              </div>
              <div className={css.inputWrapper}>
                <label className={css.inputTitle} htmlFor='definition'>
                  Examples of usage:
                </label>
                <Field
                  className={css.textarea}
                  type='text'
                  name='definition'
                  as='textarea'
                  rows='4'
                  cols='50'
                  placeholder='Enter definition'
                />
                <ErrorMessage
                  name='example'
                  component='div'
                  className='error'
                />
              </div>
              <div className={css.picker}>
                {pickedImage ? (
                  <div>
                    <img src={pickedImage} alt='picked image' />
                    <div onClick={onDeleteImageClick}>
                      <Svg color='#ff0000' size='1'>
                        cancel
                      </Svg>
                    </div>
                  </div>
                ) : (
                  <label onChange={handleImageAdd} htmlFor='loadImage'>
                    <span>Load image</span>
                    <input
                      type='file'
                      accept='image/png, image/jpeg'
                      name='loadImage'
                      id='loadImage'
                      style={{ display: "none" }}
                    />
                  </label>
                )}
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
