import { z } from "astro/zod";
import socialData from "@/data/social.json";
import { listFrom } from "@/utils/data-list.ts";

/* The footer's small lists, edited on the canvas with OP System's Edit (data-op-list). A social link without its
   address shows as text until the client gives it (to supply). */
export const SOCIAL_FILE = "src/data/social.json";
/* the social links, written in src/data/social.json (OP System's Edit writes it itself) */
export const social: { id: string; label: string; name: string; href: string }[] = listFrom(
  socialData,
  z.object({ id: z.string().regex(/^[a-z0-9-]+$/), label: z.string(), name: z.string(), href: z.string() }),
  SOCIAL_FILE,
);

export const legal: { label: string; href: string }[] = [
  { label: "privacy", href: "/privacy" },
  { label: "accessibility", href: "/accessibility" },
];
