import { useNavigate } from "react-router-dom";

import css from "./FoldersList.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import CreateFolderForm from "../CreateFolderForm/CreateFolderForm";
import Svg from "../Svg/Svg";

interface FoldersData {
  id: string;
  folderName: string;
  folderDescription: string;
}
interface FoldersListProps {
  folders: FoldersData[];
}

export default function FoldersList({ folders }: FoldersListProps) {
  const navigate = useNavigate();

  const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false);

  const openAddFolderModal = () => setIsAddFolderModalOpen(true);
  const closeAddFolderModal = () => setIsAddFolderModalOpen(false);

  return (
    <>
      <div className={css.foldersWrapper}>
        <div className={`${css.parrent}`}>
          <p className={`${css.title}`}>My Folders:</p>
          <button
            type='button'
            title='Press here to create new folder'
            className={css.children}
            onClick={openAddFolderModal}
          >
            <Svg size='2'>add</Svg>
          </button>
        </div>

        {folders && (
          <ul className={css.foldersList}>
            {folders.map((folder) => {
              return (
                <li
                  key={folder.id}
                  className=''
                  onClick={() => navigate(`/folders/${folder.folderName}`)}
                >
                  <div>
                    <p>{folder.folderName}</p>
                    <Svg className={css.icon} size='1.3'>
                      config
                    </Svg>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {isAddFolderModalOpen && (
        <Modal onClose={closeAddFolderModal}>
          <CreateFolderForm onClose={closeAddFolderModal} />
        </Modal>
      )}
    </>
  );
}
