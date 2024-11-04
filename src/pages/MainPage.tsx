import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchWords } from "../redux/words/wordsSlice";
import css from "./Pages.module.css";

export default function MainPage() {
  const dispatch = useAppDispatch();
  const { words, loading, error } = useAppSelector((state) => state.words);

  useEffect(() => {
    dispatch(fetchWords());
  }, [dispatch]);

  return (
    <div className={`container ${css.pagesWrapper}`}>
      {words &&
        words.map((item, index) => {
          const {
            definition,
            folder,
            imageLink,
            learningStatus,
            translation,
            word,
          } = item;

          return (
            <div key={index}>
              <ul>
                <li>
                  <p>
                    Folder:<b> {folder}</b>
                  </p>
                  <p>
                    Word:<b> {word}</b>
                  </p>
                  <p>
                    Translation:<b> {translation}</b>
                  </p>
                  <p>
                    Definition:<b> {definition}</b>
                  </p>
                  <p>
                    LearningStatus:<b> {learningStatus}</b>
                  </p>
                  <img width='100px' src={imageLink} alt={word} />
                </li>
              </ul>
            </div>
          );
        })}
    </div>
  );
}
