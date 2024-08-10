import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Creator, CreatorUpdate } from "../utils/types";
import { supabase } from "../utils/client";
import Card from "../components/Card";

function EditCreators() {
  const { id: stringID } = useParams();
  const id = parseInt(stringID!);

  const [creator, setCreator] = useState<Creator | null>(null);
  const navigate = useNavigate();

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

  const DeleteCreator = async (id: number) => {
    const deletedCreator = await supabase
      .from("creators")
      .delete()
      .eq("id", id);

    if (deletedCreator.error) {
      console.error("Error");
      return;
    }

    console.log("Creator deleted", deletedCreator.data);

    navigate("/");
  };

  const UpdateCreator = async (creator: CreatorUpdate) => {
    const updatedCreator = await supabase
      .from("creators")
      .update(creator)
      .eq("id", id);

    if (updatedCreator.error) {
      console.error("Error");
      return;
    }

    navigate("/");
    console.log("Creator updated", updatedCreator.data);
  };

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
    <div className="grid place-items-center gap-16 p-8 text-xl">
      <form
        onSubmit={onSubmit}
        className="flex w-full max-w-2xl flex-col gap-4"
      >
        <label className="flex flex-col">
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
        <label className="flex flex-col">
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
        <label className="flex flex-col">
          <span>Creator Description:</span>
          <textarea
            name="description"
            placeholder="Description"
            required
            onChange={onChange}
            value={creator.description}
          ></textarea>
        </label>
        <label className="flex flex-col">
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

        <div className="flex justify-evenly">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => DeleteCreator(creator.id)}>
            Delete Creator
          </button>
        </div>
      </form>

      <Card creator={creator} />
    </div>
  );
}

export default EditCreators;
