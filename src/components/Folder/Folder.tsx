import { Link, useParams } from "react-router-dom";
import { getDocumentsByUserAndId } from "../../redux/words/operations";
import { useEffect, useState } from "react";
import css from "./Folder.module.css";
import Word from "../Word/Word";
import { WordProps } from "../../types/words";
import CreateFirstWord from "../Create FirstWord/Create FirstWord";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "@reduxjs/toolkit/query";
import { fetchCurrentUserWords } from "../../redux/words/wordsSlice";

export default function Folder() {
  const dispatch = useAppDispatch();
  const { words } = useAppSelector((state: RootState) => state.words);
  console.log("🚀 ~ Folder ~ words:", words);

  // const [words, setWords] = useState<WordProps[]>([]); // Ожидаем массив объектов WordProps
  const { folderName } = useParams<{ folderName: string }>();

  useEffect(() => {
    dispatch(fetchCurrentUserWords);
  }, [dispatch]);

  return (
    <>
      <div>
        <Link to='/folders'>Go back to All Folders</Link>
      </div>
      <hr />
      <div>Folder name : {folderName}</div>

      {words.length > 0 ? (
        <ul className={css.wordsWrapper}>
          {words.map((word: WordProps) => {
            console.log("word in map", word);
            return (
              <Word key={word.id} word={word} /> // Передаем объект WordProps в компонент Word
            );
          })}
        </ul>
      ) : (
        <CreateFirstWord folderName={folderName} />
      )}
      <div></div>
    </>
  );
}
