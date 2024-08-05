import { createApi } from "unsplash-js";

const serverApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY!,
});

const topics = [
  { id: "vQtUUPIzp6c", slug: "macro-moments" },
  { id: "bo8jQKTaE0Y", slug: "wallpapers" },
  { id: "6sMVjTLSkeQ", slug: "nature" },
  { id: "CDwuwXJAbEw", slug: "3d-renders" },
  { id: "Fzo3zuOHN6w", slug: "travel" },
  { id: "M8jVbLbTRws", slug: "architecture-interior" },
  { id: "iUIsnVtjB0Y", slug: "textures-patterns" },
  { id: "xHxYTMHLgOc", slug: "street-photography" },
  { id: "hmenvQhUmxM", slug: "film" },
  { id: "E--_pnIirG4", slug: "archival" },
];

const e = { serverApi, topics };

export default e;
