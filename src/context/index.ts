import { createContext, use } from "react";
import ArtworkProvider from "./ArtworkProvider";
import type { ArtWorkContextType } from "../types";

const ArtworkContext = createContext<ArtWorkContextType | undefined>(undefined);

const useArtwork = () => {
  const context = use(ArtworkContext);
  if (!context)
    throw new Error("useArtworks must be used within a ArtworkContext");
  return context;
};

export { ArtworkContext, useArtwork, ArtworkProvider };
