import { useEffect } from "react";
import { fetchWords } from "../redux/words/wordsSlice";
import css from "./Pages.module.css";
import CreateFirstFolder from "../components/CreateFirstFolder/CreateFirstFolder";
import FoldersList from "../components/FoldersList/FoldersList";

export default function FoldersPage() {
  return (
    <div className='container'>
      {/* <CreateFirstFolder /> */}
      <FoldersList />
    </div>
  );
}
