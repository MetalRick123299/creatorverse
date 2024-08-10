import { FormEventHandler } from "react";
import { supabase } from "../utils/client";
import { CreatorInsert } from "../utils/types";

function AddCreators() {
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

    // TODO: Add creator vaildation

    AddCreator({
      name,
      url,
      description,
      imageURL,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        <span>Creator Name:</span>
        <input type="text" name="name" placeholder="Name" required />
      </label>

      <label>
        <span>Creator URL:</span>
        <input type="text" name="url" placeholder="URL" required />
      </label>

      <label>
        <span>Creator Description:</span>
        <textarea
          name="description"
          placeholder="Description"
          required
        ></textarea>
      </label>

      <label>
        <span>Creator Image URL:</span>
        <input type="text" name="imageURL" placeholder="Image URL" required />
      </label>

      <button type="submit">Add Creator</button>
    </form>
  );
}

export default AddCreators;
