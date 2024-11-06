import { useParams } from "react-router-dom";
import { getDocumentsByUserAndId } from "../../redux/words/operations";
import { useEffect, useState } from "react";
import css from "./Folder.module.css";
import Word from "../Word/Word";
import { WordProps } from "../../types/words";

export default function Folder() {
  const [words, setWords] = useState<WordProps[]>([]); // Ожидаем массив объектов WordProps
  const { folderName } = useParams<{ folderName: string }>();

  useEffect(() => {
    if (folderName && typeof folderName === "string") {
      getDocumentsByUserAndId(folderName).then((r: WordProps[]) => {
        console.log("r", r);
        setWords(r); // Передаем массив объектов типа WordProps
      });
    }
  }, [folderName]);

  return (
    <>
      <div>Folder name: {folderName}</div>
      {words.length > 0 ? (
        <ul className={css.wordsWrapper}>
          {words.map((word: WordProps) => (
            <Word key={word.id} word={word} /> // Передаем объект WordProps в компонент Word
          ))}
        </ul>
      ) : (
        <p>No words</p>
      )}
      <div></div>
    </>
  );
}
