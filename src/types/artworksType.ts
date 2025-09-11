import { z } from "zod/v4";
import type { ArtworkallSchema, ArtworkSchema } from "../schemas";
import type { Dispatch, SetStateAction } from "react";

type Search = {
  search: string;
};

type ArtWork = z.infer<typeof ArtworkallSchema>;
type Card = z.infer<typeof ArtworkSchema>;

type ArtWorkContextType = {
  artworks: ArtWork[];
  setForm: Dispatch<SetStateAction<Search>>;
  form: Search;
};
type Fc = {
  id: number;
  api_link: string;
  note?: string;
  count?: number;
};

type Function = {
  fn: () => void;
};

export type { Search, ArtWork, Card, ArtWorkContextType, Fc, Function };
