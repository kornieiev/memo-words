import { useState } from "react";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import css from "./CreateFirstFolder.module.css";
import CreateFolderForm from "../CreateFolderForm/CreateFolderForm";
import Svg from "../Svg/Svg";

export default function CreateFirstFolder() {
  const [isAddFolderModalOpen, setAddFolderModalOpen] = useState(false);

  const openAddFolderModal = () => setAddFolderModalOpen(true);
  const closeAddFolderModal = () => setAddFolderModalOpen(false);

  return (
    <div className={css.CreateFirstFolderWrapper}>
      <p>Please create your first folder to store your word collection</p>

      <Button action='confirm' onClick={openAddFolderModal}>
        <Svg size='2'>add</Svg>
        Create new folder
      </Button>
      {isAddFolderModalOpen && (
        <Modal onClose={closeAddFolderModal}>
          <CreateFolderForm onClose={closeAddFolderModal} />
        </Modal>
      )}
    </div>
  );
}
