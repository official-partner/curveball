import { defineCollection, reference } from "astro:content";
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

/* The directors: each has a page of their own (their reel), and Home lists them all with the filters Industry and
   Location (the Figma's own lists). Each takes one of the brand's three colours: Home turns to it when their name is
   in the middle of the screen, and their page opens on it (Sam, Nov 11). Their industries and city are to fill in. */
const directors = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/directors" }),
  schema: ({ image }) =>
    z
      .object({
        name: z.string().describe("Name"),
        shortName: z.string().optional().describe("Short name (Enquire about …)"),
        colour: z.enum(["red", "mustard", "teal"]).optional().describe("Colour"),
        portrait: image().optional().describe("Portrait"),
        bio: z.string().optional().describe("Bio"),
        based: z.array(z.string()).optional().describe("Based in"),
        clients: z.array(z.string()).optional().describe("Clients"),
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

/* The films: each belongs to a director, shows on their page (the reel, in its order) and in the balls that rise on
   Home while their name is active. A still stands in for the film until its file is in (MP4 or WebM, a link). */
const projects = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z
      .object({
        name: z.string().describe("Title"),
        director: reference("directors").optional().describe("Director"),
        client: z.string().optional().describe("Client"),
        agency: z.string().optional().describe("Agency"),
        year: z.number().optional().describe("Year"),
        still: image().optional().describe("Still"),
        video: z.string().optional().describe("Film (MP4 or WebM link)"),
        vertical: z.boolean().optional().describe("Vertical film"),
        visible: z.boolean().default(true).describe("Visible on the site"),
        order: z.number().optional().describe("Order"),
      })
      .describe("Films"),
});

export const collections = { team, directors, projects };
