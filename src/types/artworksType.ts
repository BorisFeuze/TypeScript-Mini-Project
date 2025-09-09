import { z } from "zod/v4";
import type { ArtworkallSchema, ArtworkSchema } from "../schemas";

type Search = {
  search: string;
};

type ArtWork = z.infer<typeof ArtworkallSchema>;
type Card = z.infer<typeof ArtworkSchema>;

export type { Search, ArtWork, Card };
