/* Contact's blocks, written in src/data/contact-blocks.json, which OP System's Edit writes itself when a block is
   copied, deleted or moved (op-astro docs/content.md, Lists as data); this file reads it. The Figma's copy word for
   word (one double space fixed in « Got a job? Got a curveball? »); its placeholder kept: every block writes to
   bids@curveballfilms.com until the real addresses are in. The team is the collection « Team ». */
import { z } from "astro/zod";
import data from "@/data/contact-blocks.json";
import { listFrom } from "@/utils/data-list.ts";

export const CONTACT_FILE = "src/data/contact-blocks.json";

const entry = z.object({ id: z.string().regex(/^[a-z0-9-]+$/), title: z.string(), text: z.string(), email: z.string() });

export type ContactBlock = z.infer<typeof entry>;

export const blocks: ContactBlock[] = listFrom(data, entry, CONTACT_FILE);
