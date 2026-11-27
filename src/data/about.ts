/* About's two lists, as the Figma writes them (« About », Nov 11): the names on the call sheet (clients) and the
   work on the schedule, each in two columns. A block of the page, not a collection: each column is a data file
   (src/data/about-call-sheet-1.json and so on), which OP System's Edit writes itself when a name is copied, deleted or
   moved; this file reads them. */
import { z } from "astro/zod";
import sheet1 from "@/data/about-call-sheet-1.json";
import sheet2 from "@/data/about-call-sheet-2.json";
import schedule1 from "@/data/about-schedule-1.json";
import schedule2 from "@/data/about-schedule-2.json";
import { listFrom } from "@/utils/data-list.ts";

/* a client may name a film of theirs (its id in the collection « Films »): About shows its loop beside the name on a
   hover (Sam, Nov 27, comment 50) */
const entry = z.object({ id: z.string().regex(/^[a-z0-9-]+$/), name: z.string(), film: z.string().optional() });
export type AboutColumn = { file: string; items: z.infer<typeof entry>[] };
const column = (data: unknown, file: string): AboutColumn => ({ file, items: listFrom(data, entry, file) });

export const callSheet: AboutColumn[] = [
  column(sheet1, "src/data/about-call-sheet-1.json"),
  column(sheet2, "src/data/about-call-sheet-2.json"),
];

export const schedule: AboutColumn[] = [
  column(schedule1, "src/data/about-schedule-1.json"),
  column(schedule2, "src/data/about-schedule-2.json"),
];
