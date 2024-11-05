import { nanoid } from "nanoid";
import css from "./FoldersList.module.css";
import sprite from "../../assets/sprite.svg";

interface FoldersData {
  id: string;
  folderName: string;
  folderDescription: string;
}
interface FoldersListProps {
  folders: FoldersData[];
}

export default function FoldersList({ folders }: FoldersListProps) {
  const allFolders = [...new Set(folders.map((folder) => folder.folderName))];

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

      {allFolders && (
        <ul className={css.foldersList}>
          {allFolders.map((folder) => {
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
