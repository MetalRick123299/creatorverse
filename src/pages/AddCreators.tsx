import { FormEventHandler } from "react";
import { supabase } from "../utils/client";
import { CreatorInsert } from "../utils/types";
import { useNavigate } from "react-router-dom";

function AddCreators() {
  const navigate = useNavigate();

  const AddCreator = async (creator: CreatorInsert) => {
    const createdCreator = await supabase.from("creators").insert(creator);

    if (createdCreator.error) {
      console.error("Error");
      return;
    }

    console.log("Creator added", createdCreator.data);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const { description, imageURL, name, url } = Object.fromEntries([
      ...formData,
    ]) as unknown as CreatorInsert;

    AddCreator({
      name,
      url,
      description,
      imageURL,
    });

    navigate("/");
  };

  return (
    <div className="grid place-items-center p-8 text-xl">
      <form
        onSubmit={onSubmit}
        className="flex w-full max-w-2xl flex-col gap-4"
      >
        <label className="flex flex-col">
          <span>Creator Name:</span>
          <input type="text" name="name" placeholder="Name" required />
        </label>
        <label className="flex flex-col">
          <span>Creator URL:</span>
          <input type="text" name="url" placeholder="URL" required />
        </label>
        <label className="flex flex-col">
          <span>Creator Description:</span>
          <textarea
            name="description"
            placeholder="Description"
            required
          ></textarea>
        </label>
        <label className="flex flex-col">
          <span>Creator Image URL:</span>
          <input type="text" name="imageURL" placeholder="Image URL" required />
        </label>
        <button type="submit">Add Creator</button>
      </form>
    </div>
  );
}

export default AddCreators;
