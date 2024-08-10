import { Creator } from "../utils/types";

function Card({ creator }: { creator: Creator }) {
  const { name, description, imageURL, url, id } = creator;
  return (
    <div>
      <h3>Name: {name}</h3>
      <img src={imageURL} alt={name} />
      <p>Description: {description}</p>
      <a href={url}>Social Media Link</a>
      <a href={"/" + id.toString()}>View Creator</a>
      <a href={`/${id.toString()}/edit`}>Edit Creator</a>
    </div>
  );
}

export default Card;
