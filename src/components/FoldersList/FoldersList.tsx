import { useNavigate } from "react-router-dom";

import css from "./FoldersList.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import CreateFolderForm from "../CreateFolderForm/CreateFolderForm";
import Svg from "../Svg/Svg";
import { useAppDispatch } from "../../redux/hooks";
import { deleteFolder } from "../../redux/folders/foldersSlice";
import EditFolderForm from "../EditFolderForm/EditFolderForm";

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
  const [isEditFolderModalOpen, setIsEditFolderModalOpen] = useState(false);

  const openAddFolderModal = () => setIsAddFolderModalOpen(true);
  const closeAddFolderModal = () => setIsAddFolderModalOpen(false);

  function editModalToggle() {
    setIsEditFolderModalOpen(!isEditFolderModalOpen);
  }

  return (
    <>
      <div className={css.foldersWrapper}>
        <div className={`${css.parent}`}>
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
                <div key={folder.id + "1"}>
                  <li key={folder.id}>
                    <div className={css.folderWrapper}>
                      <p
                        className={css.folderTitle}
                        onClick={() =>
                          navigate(`/folders/${folder.folderName}`)
                        }
                      >
                        {folder.folderName}
                      </p>
                      <div className={css.icon} onClick={editModalToggle}>
                        <Svg size='1.3'>config</Svg>
                      </div>
                    </div>
                  </li>
                  {isEditFolderModalOpen && (
                    <Modal onClose={editModalToggle}>
                      <EditFolderForm
                        onClose={editModalToggle}
                        folderData={folder}
                      />
                    </Modal>
                  )}
                </div>
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
