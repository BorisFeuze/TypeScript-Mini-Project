import { z } from "zod/v4";
import { ArtworkallSchemaArray, ArtworkSchema } from "../schemas/Artwork";
import type { Search } from "../types";

const API_URL = "https://api.artic.edu/api/v1/artworks/search?";

const getArtworks = async (search: Search, abort: AbortController) => {
  const resp = await fetch(`${API_URL}q=${search}`, { signal: abort.signal });

  if (!resp.ok) {
    throw new Error("fetch failed");
  }
  const respData = await resp.json();

  const { success, data, error } = ArtworkallSchemaArray.safeParse(
    respData.data
  );

  if (!success) {
    throw new Error(z.prettifyError(error));
  }
  return data;
};

const getFinalData = async (url: string, Abort: AbortController) => {
  const response = await fetch(url, { signal: Abort.signal });

  if (!response.ok) {
    throw new Error("fetch failed");
  }
  const respData = await response.json();

  const { success, data, error } = ArtworkSchema.safeParse(respData?.data);

  if (!success) {
    throw new Error(z.prettifyError(error));
  }
  return data;
};

export { getArtworks, getFinalData };
