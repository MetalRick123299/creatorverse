import { useParams } from "react-router-dom";

function ViewCreator() {
  const { id } = useParams();
  return <div>
    <h1>ViewCreator</h1>
    <p>{id}</p>
  </div>;
}

export default ViewCreator;
