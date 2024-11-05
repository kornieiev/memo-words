import { nanoid } from "nanoid";
import css from "./FoldersList.module.css";
import sprite from "../../assets/sprite.svg";

import { useAppSelector } from "../../redux/hooks";

export default function FoldersList() {
  const { words, loading, error } = useAppSelector((state) => state.words);
  console.log("words", words);

  const foldersList = ["folderOne", "folderTwo", "folderThree"];

  return (
    <div>
      <div className={`${css.parrent}`}>
        <p className={`${css.title}`}>My Folders:</p>
        <button
          title='Press here to create new folder'
          className={css.children}
        >
          <svg className={`${css.icon} ${css.iconAdd}`}>
            <use href={`${sprite}#icon-add`}></use>
          </svg>
        </button>
      </div>

      {foldersList && (
        <ul className={css.foldersList}>
          {foldersList.map((folder) => {
            return (
              <li key={nanoid()} className=''>
                <div>
                  <p>{folder}</p>
                  <svg className={css.icon}>
                    <use href={`${sprite}#icon-config`}></use>
                  </svg>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
