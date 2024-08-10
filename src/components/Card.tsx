import { Creator } from "../utils/types";

function Card({ creator }: { creator: Creator }) {
  const { name, description, imageURL, url } = creator;
  return (
    <div>
      <h3>{name}</h3>
      <img src={imageURL} alt={name} />
      <p>{description}</p>
      <a href={url}>Link</a>
    </div>
  );
}

export default Card;
