import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import css from "./Folder.module.css";
import Word from "../Word/Word";
import { WordProps } from "../../types/words";
import CreateFirstWord from "../Create FirstWord/Create FirstWord";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCurrentUserWords } from "../../redux/words/wordsSlice";
import Svg from "../Svg/Svg";
import Modal from "../Modal/Modal";
import CreateEntryForm from "../CreateEntryForm/CreateEntryForm";

export default function Folder() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isAddEntryModalOpen, setIsAddEntryModalOpen] = useState(false);

  const openAddEntryModal = () => setIsAddEntryModalOpen(true);
  const closeAddEntryModal = () => setIsAddEntryModalOpen(false);
  const { words } = useAppSelector((state) => state.words);

  const { folderName } = useParams<{ folderName: string }>();

  useEffect(() => {
    dispatch(fetchCurrentUserWords(folderName));
  }, [dispatch, folderName]);

  return (
    <>
      <div className={css.navWrapper}>
        <button
          className={css.goBack}
          type='button'
          onClick={() => navigate("/folders")}
        >
          <Svg size='1'>back</Svg>
          To All Folders
        </button>
        <h2 className={css.folderName}>
          Folder name: <span>{folderName}</span>
        </h2>
      </div>
      <div className={`${css.parrent}`}>
        <button
          type='button'
          title='Press here to create new entry'
          className={css.children}
          onClick={openAddEntryModal}
        >
          <Svg size='2'>add</Svg>
        </button>
      </div>

      {words.length > 0 ? (
        <ul className={css.wordsWrapper}>
          {words.map((word: WordProps) => {
            return (
              <Word key={word.id} word={word} /> // Передаем объект WordProps в компонент Word
            );
          })}
        </ul>
      ) : (
        <CreateFirstWord folderName={folderName} />
      )}

      {isAddEntryModalOpen && (
        <Modal onClose={closeAddEntryModal}>
          <CreateEntryForm
            folderName={folderName}
            onClose={closeAddEntryModal}
          />
        </Modal>
      )}
    </>
  );
}
