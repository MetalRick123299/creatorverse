import { useParams } from "react-router-dom";

function EditCreators() {
  const { id } = useParams();
  return (
    <div>
      <h1>EditCreators</h1>
      <p>{id}</p>
    </div>
  );
}

export default EditCreators;
