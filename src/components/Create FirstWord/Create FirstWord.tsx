import { useState } from "react";
import sprite from "../../assets/sprite.svg";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import css from "./CreateFirstWord.module.css";
import CreateEntryForm from "../CreateEntryForm/CreateEntryForm";

export default function CreateFirstWord({
  folderName,
}: {
  folderName: string | undefined;
}) {
  const [isAddWordModalOpen, setAddWordModalOpen] = useState(false);

  const openAddFolderModal = () => setAddWordModalOpen(true);
  const closeAddFolderModal = () => {
    console.log("closeAddFolderModal");
    setAddWordModalOpen(false);
  };

  return (
    <div className={css.CreateFirstFolderWrapper}>
      <p>Please create your first entry in this word collection</p>

      <Button action='confirm' onClick={openAddFolderModal}>
        <svg className={css.icon}>
          <use href={`${sprite}#icon-add`}></use>
        </svg>
        Create new entry
      </Button>
      {isAddWordModalOpen && (
        <Modal onClose={closeAddFolderModal}>
          <CreateEntryForm
            onClose={closeAddFolderModal}
            folderName={folderName}
          />
        </Modal>
      )}
    </div>
  );
}
