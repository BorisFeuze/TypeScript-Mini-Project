import { useEffect, useState, type ReactNode } from "react";
import { getArtworks } from "../data/ArtworkData";
import type { ArtWork, Search } from "../types";
import { ArtworkContext } from ".";

function ArtworkProvider({ children }: { children: ReactNode }) {
  const [form, setForm] = useState<Search>({ search: "" });
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
