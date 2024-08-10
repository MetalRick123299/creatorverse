import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Creator, CreatorUpdate } from "../utils/types";
import { supabase } from "../utils/client";
import Card from "../components/Card";

function EditCreators() {
  const { id: stringID } = useParams();
  const id = parseInt(stringID!);

  const [creator, setCreator] = useState<Creator | null>(null);

  useEffect(() => {
    (async () => {
      if (isNaN(id)) return;

      const creator = await supabase.from("creators").select("*").eq("id", id);

      if (!creator.data) return;
      if (creator.error) {
        console.error("Error");
        return;
      }
      setCreator(creator.data[0]);
    })();
  }, [id]);

  const UpdateCreator = async (creator: CreatorUpdate) => {
    const updatedCreator = await supabase
      .from("creators")
      .update(creator)
      .eq("id", id);

    if (updatedCreator.error) {
      console.error("Error");
      return;
    }

    console.log("Creator updated", updatedCreator.data);
  };

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setCreator((prev) => {
      if (prev === null) return null;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (creator === null) return;

    // TODO: Add creator vaildation

    UpdateCreator(creator)
      .then(() => {
        console.log("Updated");
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  if (stringID === undefined || isNaN(id)) return <p>Invalid ID</p>;

  if (creator === null) return <p>Not Found</p>;

  return (
    <div>
      <h1>EditCreator</h1>
      <form onSubmit={onSubmit}>
        <label>
          <span>Creator Name:</span>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            onChange={onChange}
            value={creator.name}
          />
        </label>

        <label>
          <span>Creator URL:</span>
          <input
            type="text"
            name="url"
            placeholder="URL"
            required
            onChange={onChange}
            value={creator.url}
          />
        </label>

        <label>
          <span>Creator Description:</span>
          <textarea
            name="description"
            placeholder="Description"
            required
            onChange={onChange}
            value={creator.description}
          ></textarea>
        </label>

        <label>
          <span>Creator Image URL:</span>
          <input
            type="text"
            name="imageURL"
            placeholder="Image URL"
            required
            onChange={onChange}
            value={creator.imageURL}
          />
        </label>

        <button type="submit">Add Creator</button>
      </form>

      <Card creator={creator} />
    </div>
  );
}

export default EditCreators;
