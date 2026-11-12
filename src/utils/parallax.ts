import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollTriggerWithLenis } from "@/utils/smooth-scroll.ts";

gsap.registerPlugin(ScrollTrigger);
scrollTriggerWithLenis(gsap, ScrollTrigger);

/**
 * Items that travel at their own speed as the page scrolls (Sam, Nov 11: « sur la page News, tous les items des news
 * pourraient voyager à une vitesse différente au scroll. Même chose pour la page Contact avec les membres de
 * l'équipe »). Job: give the scattered layouts depth, quietly. Each `[data-parallax="<depth>"]` under `root` drifts
 * from `depth` half-screens below its place to as far above it while it crosses the screen (scrubbed, the scroll is
 * the curve), so it sits where the layout put it when it is mid-screen. A small depth (0.02 to 0.16, about 10 to 80
 * px on a laptop) keeps the text readable. Transform only: nothing around it moves. With a mouse from a tablet's
 * width up (OP's motion: parallax on a fine pointer only), never with reduced motion. Reverted when `signal` aborts.
 */
export function parallax(root: ParentNode, signal: AbortSignal): void {
  const items = [...root.querySelectorAll<HTMLElement>("[data-parallax]")];
  if (!items.length) return;
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference) and (pointer: fine) and (width >= 48rem)", () => {
    items.forEach((item) => {
      const depth = Number(item.dataset.parallax) || 0;
      if (!depth) return;
      gsap.fromTo(
        item,
        { y: () => depth * innerHeight * 0.5 },
        {
          y: () => -depth * innerHeight * 0.5,
          ease: "none",
          scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: 0.6, invalidateOnRefresh: true },
        },
      );
    });
  });
  signal.addEventListener("abort", () => mm.revert(), { once: true });
}
