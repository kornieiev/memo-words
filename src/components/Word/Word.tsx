import { WordProps } from "../../types/words";

import css from "./Word.module.css";

interface WordComponentProps {
  word: WordProps;
}

export default function Word({ word }: WordComponentProps) {
  if (word) {
    return (
      <li key={word.id} className={css.wordWrapper}>
        <div>
          <p className={css.word}>{word.word}</p>
          <p className={css.translation}>{word.translation}</p>
        </div>
        <div className={css.secondaryWrapper}>
          <img src={word.imageLink} alt={word.word} />
          <div>
            <p>1</p>
            <p>2</p>
            <p>3</p>
          </div>
        </div>
        <p className={css.definition}>{word.definition}</p>
      </li>
    );
  }
  console.log("word", word);
}
