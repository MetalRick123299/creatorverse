import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../utils/client";
import { Creator } from "../utils/types";
import Card from "../components/Card";

function ViewCreator() {
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

  if (stringID === undefined || isNaN(id)) return <p>Invalid ID</p>;

  if (creator === null) return <p>Not Found</p>;

  return (
    <div>
      <h1>ViewCreator</h1>
      <Card creator={creator} />
    </div>
  );
}

export default ViewCreator;
