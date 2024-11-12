import { useState } from "react";
import { WordProps } from "../../types/words";

import hidedImg from "../../assets/hideImg.png";

import css from "./Word.module.css";
import Svg from "../Svg/Svg";

interface WordComponentProps {
  word: WordProps;
}

export default function Word({ word }: WordComponentProps) {
  const [isNotShow, setIsNotShow] = useState(true);

  function toggleIsNotShow() {
    setIsNotShow(!isNotShow);
  }

  if (word) {
    return (
      <li key={word.id} className={css.wordWrapper}>
        <div>
          <p className={css.word}>{word.word}</p>
          <p
            className={`${css.translation} ${css.isNotShow}`}
            onClick={toggleIsNotShow}
          >
            {isNotShow ? "*********" : word.translation}
          </p>
        </div>

        <div className={css.secondaryWrapper}>
          {isNotShow ? (
            <img src={hidedImg} alt='hided word' onClick={toggleIsNotShow} />
          ) : (
            <img
              src={word.imageLink}
              alt={word.word}
              onClick={toggleIsNotShow}
            />
          )}

          <div className={css.statusWrapper}>
            <div>
              <Svg size='medium' status color='#05FF1F'>
                already
              </Svg>
            </div>
            <div>
              <Svg size='medium' color='#05FF1F'>
                repeat
              </Svg>
            </div>
            <div>
              <Svg size='medium' status color='#FF0000'>
                hardWord
              </Svg>
            </div>
          </div>
        </div>
        <p className={css.definition} onClick={toggleIsNotShow}>
          {isNotShow ? "show definition" : word.definition}
        </p>
      </li>
    );
  }
  console.log("word", word);
}
