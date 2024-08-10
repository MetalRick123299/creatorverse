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
    <div>
      <h1>ShowCreators</h1>
      {creators.length > 0 ? (
        creators.map((creator) => <Card creator={creator} />)
      ) : (
        <p>No creators found</p>
      )}
    </div>
  );
}

export default ShowCreators;
