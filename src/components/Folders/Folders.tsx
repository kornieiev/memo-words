import { useAppSelector } from "../../redux/hooks";

export default function Folders() {
  const { words, loading, error } = useAppSelector((state) => state.words);
  console.log("words", words);

  return <div>My Folder list</div>;
}
