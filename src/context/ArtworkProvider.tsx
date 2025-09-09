import { useEffect, useState } from "react";
import { getArtworks } from "../data/ArtworkData";
import type { ArtWork } from "../types";
import { ArtworkContext } from "./artworkContext";

function ArtworkProvider({ children }) {
  const [form, setForm] = useState({ search: "" });
  const [artworks, setArtworks] = useState<ArtWork[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        const { search } = form;
        const allArtworks = await getArtworks(search, abortController);
        setArtworks(allArtworks);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [form]);

  return (
    <ArtworkContext value={{ artworks, setForm, form }}>
      {children}
    </ArtworkContext>
  );
}

export default ArtworkProvider;
