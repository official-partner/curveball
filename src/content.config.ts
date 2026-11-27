import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/* The site's collections, edited in OP System's « Contenu » (which also writes this file when the team adds a
   collection or a field): one file per item in src/content/<collection>/, named by its slug. Names are code
   (English camelCase); each .describe() is the label people see, in the client's language. Every field is optional
   but the name; `visible` hides an item everywhere, `order` sorts them (src/utils/content.ts). Keep this form: one
   defineCollection per collection, a glob() loader, its z.object(); nothing else goes here (CLAUDE.md, Content). */

/* The team: the people of Contact, from the current site's contact page (Sam, Nov 17, comment 26), in place of the
   starter's sample. Their city, a few lines and their portrait are to supply. */
const team = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/team" }),
  schema: ({ image }) =>
    z
      .object({
        name: z.string().describe("Name"),
        role: z.string().optional().describe("Role"),
        location: z.string().optional().describe("City"),
        email: z.string().optional().describe("Email"),
        linkedin: z.string().optional().describe("LinkedIn (link)"),
        bio: z.string().optional().describe("A few lines"),
        photo: image().optional().describe("Portrait"),
        visible: z.boolean().default(true).describe("Visible on the site"),
        draft: z.boolean().default(false).describe("Draft"),
        order: z.number().optional().describe("Order"),
      })
      .describe("Team"),
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
        website: z.string().optional().describe("Website"),
        coverVideo: z.string().optional().describe("Cover video (MP4 link)"),
        industries: z
          .array(z.enum(["Docustyle", "Comedy", "Story", "Spectacle", "Fashion"]))
          .default([])
          .describe("Industries"),
        location: z
          .enum(["Chicago", "Los Angeles", "New Orleans", "New York"])
          .optional()
          .describe("Location"),
        // its page for Google (OP System's « For Google »): empty, the page says the name and the bio's first sentence
        seoTitle: z.string().optional().describe("Title for Google"),
        seoDescription: z.string().optional().describe("Description for Google"),
        ogImage: image().optional().describe("Share image"),
        visible: z.boolean().default(true).describe("Visible on the site"),
        draft: z.boolean().default(false).describe("Draft"),
        order: z.number().optional().describe("Order"),
      })
      .describe("Directors"),
});

/* The films: each belongs to a director, shows on their page (the reel, in its order) and in the balls that rise on
   Home while their name is active (a short loop in each ball). A short version plays behind the reel and Home's
   opening (else the cover video, else the film) and the film opens in the player; a still stands in until a file is in (MP4 or WebM, a link). */
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
        loop: z.string().optional().describe("Loop for the balls (short MP4)"),
        preview: z.string().optional().describe("Short version, behind the page (MP4)"),
        cover: z.string().optional().describe("Cover video (MP4 link)"),
        video: z.string().optional().describe("Film (MP4 or WebM link)"),
        link: z.string().optional().describe("Film page (Vimeo)"),
        vertical: z.boolean().optional().describe("Vertical film"),
        // Home's « Featured work » beside « Directors » (Sam, Nov 27, comment 49): the list « home-featured-work »
        featured: z.boolean().default(false).describe("Featured work"),
        visible: z.boolean().default(true).describe("Visible on the site"),
        draft: z.boolean().default(false).describe("Draft"),
        order: z.number().optional().describe("Order"),
      })
      .describe("Films"),
});

export const collections = { team, directors, projects };
