import { createContext, use } from "react";
import ArtworkProvider from "./artworkProvider";

const ArtworkContext = createContext();

const useArtwork = () => {
  const context = use(ArtworkContext);
  if (!context)
    throw new Error("useArtworks must be used within a ArtworkContext");
  return context;
};

export { ArtworkContext, useArtwork, ArtworkProvider };
