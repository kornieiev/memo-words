import { useState } from "react";
import { WordProps } from "../../types/words";

import hidedImg from "../../assets/masks-min.jpg";

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
            {isNotShow ? (
              <div className={css.blindEye}>
                <Svg>blind_eye</Svg>
              </div>
            ) : (
              word.translation
            )}
          </p>
        </div>

        <div className={css.secondaryWrapper}>
          {isNotShow ? (
            <img
              className={css.hidedImg}
              src={hidedImg}
              alt='hided word'
              onClick={toggleIsNotShow}
            />
          ) : (
            <img
              src={word.imageLink}
              alt={word.word}
              onClick={toggleIsNotShow}
            />
          )}

          <div className={css.statusWrapper}>
            <div>
              <Svg size='2' color='#05FF1F'>
                already
              </Svg>
            </div>
            <div>
              <Svg size='2'>repeat</Svg>
            </div>
            <div>
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
    );
  }
  console.log("word", word);
}
