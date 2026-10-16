import dimensions from "./generated/media-dimensions.json";
import type { ImageAsset } from "./types";

const dims = dimensions as Record<string, { width: number; height: number }>;

/**
 * Returns an image asset with intrinsic dimensions read from the generated
 * media manifest (scripts/migrate-media.mjs). Throws at build time if a path
 * is mistyped, so broken images never reach production.
 */
export function media(src: string, alt: string): ImageAsset {
  const d = dims[src];
  if (!d) throw new Error(`Unknown media path: ${src}. Run \`npm run media\`.`);
  return { src, alt, ...d };
}
