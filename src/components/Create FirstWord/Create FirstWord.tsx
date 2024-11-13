import { useState } from "react";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import css from "./CreateFirstWord.module.css";
import CreateEntryForm from "../CreateEntryForm/CreateEntryForm";
import Svg from "../Svg/Svg";

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
      <h2> This folder is empty yet</h2>

      <Button action='confirm' onClick={openAddFolderModal}>
        <Svg size='2'>add</Svg>
        Create new entry
      </Button>
      <p>Please create your first entry in this word collection</p>

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
