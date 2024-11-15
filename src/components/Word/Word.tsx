import { useState } from "react";
import { WordProps } from "../../types/words";

import css from "./Word.module.css";
import Svg from "../Svg/Svg";
import Modal from "../Modal/Modal";
import ChangeEntryForm from "../ChangeEntryForm/ChangeEntryForm";
import { changeWordStatus } from "../../redux/words/wordsSlice";
import { useAppDispatch } from "../../redux/hooks";

interface WordComponentProps {
  word: WordProps;
}

export default function Word({ word }: WordComponentProps) {
  const [isNotShow, setIsNotShow] = useState(true);
  const [isShowChangeModal, setIsShowChangeModal] = useState(false);

  const dispatch = useAppDispatch();

  function toggleIsNotShow() {
    setIsNotShow(!isNotShow);
  }

  function toggleIsShowChangeModal() {
    setIsShowChangeModal(!isShowChangeModal);
  }

  function handleStatusClick(e) {
    const targetDiv = e.target.closest(".clickable-div");
    if (targetDiv) {
      const newStatus: string = targetDiv.getAttribute("data-id");
      try {
        dispatch(changeWordStatus({ id: word.id, newStatus: newStatus }));
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("An unknown error occurred:", error);
        }
      }
    }
  }

  if (word) {
    return (
      <>
        <li key={word.id} className={css.wordWrapper}>
          <div>
            <p className={css.word}>{word.word}</p>
            <p
              className={`${css.translation} ${css.isNotShow}`}
              onClick={toggleIsNotShow}
            >
              {isNotShow ? (
                <div className={css.blindEye}>
                  <Svg>blind_eye</Svg>
                </div>
              ) : (
                word.translation
              )}
            </p>
          </div>

          <div className={`${css.secondaryWrapper} ${css.parent}`}>
            <div className={css.children} onClick={toggleIsShowChangeModal}>
              <Svg size='1.5'>settings</Svg>
            </div>

            {isNotShow ? (
              <div className={css.blind_eye} onClick={toggleIsNotShow}>
                <Svg size='6'>blind_eye</Svg>
              </div>
            ) : (
              <img
                src={word.imageLink}
                alt={word.word}
                onClick={toggleIsNotShow}
              />
            )}

            <div className={css.statusWrapper} onClick={handleStatusClick}>
              <div
                data-id='1'
                className={`clickable-div ${
                  word.learningStatus === "1" ? css.learningStatus : ""
                }`}
              >
                <Svg size='2' color='#05FF1F'>
                  already
                </Svg>
              </div>
              <div
                data-id='2'
                className={`clickable-div ${
                  word.learningStatus === "2" ? css.learningStatus : ""
                }`}
              >
                <Svg size='2'>repeat</Svg>
              </div>
              <div
                data-id='3'
                className={`clickable-div ${
                  word.learningStatus === "3" ? css.learningStatus : ""
                }`}
              >
                <Svg size='2' color='#FF0000'>
                  hardWord
                </Svg>
              </div>
            </div>
          </div>
          <p className={css.definition} onClick={toggleIsNotShow}>
            {isNotShow ? "Click to show definition" : word.definition}
          </p>
        </li>
        {isShowChangeModal && (
          <Modal onClose={toggleIsShowChangeModal}>
            <ChangeEntryForm
              onClose={toggleIsShowChangeModal}
              folderName={word.folder}
              wordData={word}
            ></ChangeEntryForm>
          </Modal>
        )}
      </>
    );
  }
}
