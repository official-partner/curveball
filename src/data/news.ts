/* News and awards: the cards of the News page, written in src/data/news.json (the client's eight news, from the
   current site's CMS, Nov 17, the newest first; each card links to its article), which OP System's Edit writes itself
   when a card is copied, deleted or moved (op-astro docs/content.md, Lists as data). This file only reads it: each
   entry checked when the site is built, its photo as its path under src/assets/. The current site has no date and no
   text for them: a date is the one its article gives (read from its link, Nov 17), and a card without one shows none. */
import { z } from "astro/zod";
import data from "@/data/news.json";
import { listFrom, picture } from "@/utils/data-list.ts";

export const NEWS_FILE = "src/data/news.json";

const entry = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  source: z.string(),
  date: z.string().optional(),
  title: z.string(),
  text: z.string().optional(),
  href: z.string(),
  photo: z.string().optional(),
  alt: z.string().optional(),
});

export type NewsItem = Omit<z.infer<typeof entry>, "photo"> & { photo?: ImageMetadata };

export const news: NewsItem[] = listFrom(data, entry, NEWS_FILE).map((n) => ({
  ...n,
  photo: n.photo ? picture(n.photo, NEWS_FILE) : undefined,
}));
