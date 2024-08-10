import { LinkIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Creator } from "../utils/types";

function Card({ creator }: { creator: Creator }) {
  const { name, description, imageURL, url, id } = creator;
  return (
    <a
      href={"/" + id.toString()}
      className="relative block h-72 w-full max-w-sm rounded-xl border-4 border-slate-600"
    >
      <img
        src={imageURL}
        alt={name}
        className="absolute -z-10 h-full w-full rounded-xl object-cover object-center opacity-50"
      />
      <div className="flex h-full flex-col justify-end gap-3 p-4 text-lg">
        <h3>Name: {name}</h3>
        <p>Description: {description}</p>
        <div className="flex gap-3">
          <a href={url} target="_blank">
            <LinkIcon
              className="h-6 w-6 transition-all hover:text-slate-100 hover:dark:text-slate-800"
              role="link"
            />
          </a>
          <a href={`/${id.toString()}/edit`}>
            <PencilSquareIcon
              className="h-6 w-6 transition-all hover:text-slate-100 hover:dark:text-slate-800"
              role="link"
            />
          </a>
        </div>
      </div>
    </a>
  );
}

export default Card;
