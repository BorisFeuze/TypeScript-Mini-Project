import { z } from "zod/v4";

const ArtworkallSchema = z.object({
  id: z.number().min(0),
  api_link: z.url({ protocol: /^https$/ }),
});

const ArtworkSchema = z.object({
  id: z.number().min(0),
  title: z.string().min(1),
  artist_title: z.string().min(1),
  image_id: z.string().min(1),
});

const ArtworkSchemaObject = z.object(ArtworkSchema);
const ArtworkallSchemaArray = z.array(ArtworkallSchema);

export {
  ArtworkSchema,
  ArtworkSchemaObject,
  ArtworkallSchema,
  ArtworkallSchemaArray,
};
