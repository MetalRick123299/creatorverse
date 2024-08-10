import { useEffect, useState } from "react";
import { supabase } from "../utils/client";
import Card from "../components/Card";
import { Creator } from "../utils/types";

function ShowCreators() {
  const [creators, setCreators] = useState<Creator[]>([]);

  useEffect(() => {
    (async () => {
      const creators = await supabase.from("creators").select("*");

      if (!creators.data) return;
      if (creators.error) {
        console.error("Error");
        return;
      }

      setCreators(creators.data);
    })();
  }, []);

  return (
    <div className="flex w-full flex-col p-8">
      <div className="flex flex-col items-center gap-y-4">
        <h1 className="text-7xl">Creatorverse</h1>
        <a href="/add" className="cursor-pointer text-2xl">
          Add Creator
        </a>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {creators.length > 0 ? (
          creators.map((creator) => <Card key={creator.id} creator={creator} />)
        ) : (
          <p>No creators found</p>
        )}
      </div>
    </div>
  );
}

export default ShowCreators;
