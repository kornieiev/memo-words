import { useEffect } from "react";
import CreateFirstFolder from "../components/CreateFirstFolder/CreateFirstFolder";
import FoldersList from "../components/FoldersList/FoldersList";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchCurrentUserFolders } from "../redux/folders/foldersSlice";

export default function FoldersPage() {
  const { folders } = useAppSelector((state) => state.folders);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUserFolders());
  }, [dispatch]);

  return (
    <div className='container'>
      {folders.length > 0 ? (
        <FoldersList folders={folders} />
      ) : (
        <CreateFirstFolder />
      )}
    </div>
  );
}
