import { useParams } from "react-router-dom";

export default function ErrorPage() {
  const { error } = useParams();
  return (
    <div>
      <h1>Page {error} not found</h1>
    </div>
  );
}
