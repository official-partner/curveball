import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/* The site's collections, edited in OP System's « Contenu » (which also writes this file when the team adds a
   collection or a field): one file per item in src/content/<collection>/, named by its slug. Names are code
   (English camelCase); each .describe() is the label people see, in the client's language. Every field is optional
   but the name; `visible` hides an item everywhere, `order` sorts them (src/utils/content.ts). Keep this form: one
   defineCollection per collection, a glob() loader, its z.object(); nothing else goes here (CLAUDE.md, Content). */

const team = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/team" }),
  schema: ({ image }) =>
    z
      .object({
        name: z.string().describe("Nom"),
        role: z.string().optional().describe("Rôle"),
        bio: z.string().optional().describe("Présentation"),
        photo: image().optional().describe("Photo"),
        specialties: z.array(z.string()).optional().describe("Spécialités"),
        visible: z.boolean().default(true).describe("Visible sur le site"),
        order: z.number().optional().describe("Ordre"),
      })
      .describe("Équipe"),
});

/* The directors: each one will have a page of their own (their reel), and Home lists them all with the filters
   Industry and Location (the Figma's own lists). Their industries and city are to fill in. */
const directors = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/directors" }),
  schema: z
    .object({
      name: z.string().describe("Name"),
      industries: z
        .array(z.enum(["Docustyle", "Comedy", "Story", "Spectacle", "Fashion"]))
        .default([])
        .describe("Industries"),
      location: z
        .enum(["Chicago", "Los Angeles", "New Orleans", "New York"])
        .optional()
        .describe("Location"),
      visible: z.boolean().default(true).describe("Visible on the site"),
      order: z.number().optional().describe("Order"),
    })
    .describe("Directors"),
});

export const collections = { team, directors };
