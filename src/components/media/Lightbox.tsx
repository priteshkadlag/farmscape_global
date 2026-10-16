"use client";

import YARL from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Download from "yet-another-react-lightbox/plugins/download";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/plugins/counter.css";
import type { ImageAsset } from "@/content/types";

export type LightboxProps = {
  images: (ImageAsset & { title?: string })[];
  index: number;
  open: boolean;
  onClose: () => void;
  onIndex?: (i: number) => void;
  /** Allow downloading originals (drawings). */
  download?: boolean;
  /** Higher zoom ceiling for technical drawings. */
  maxZoom?: number;
};

/** Full-screen viewer: zoom/pan, swipe, keyboard, thumbnails, captions. */
export default function Lightbox({ images, index, open, onClose, onIndex, download, maxZoom = 3 }: LightboxProps) {
  const plugins = [Zoom, Thumbnails, Captions, Counter, Fullscreen, ...(download ? [Download] : [])];
  return (
    <YARL
      open={open}
      close={onClose}
      index={index}
      on={{ view: ({ index: i }) => onIndex?.(i) }}
      plugins={plugins}
      slides={images.map((im) => ({
        src: im.src,
        width: im.width,
        height: im.height,
        alt: im.alt,
        title: im.title,
        description: im.title ? im.alt : undefined,
        download: download ? { url: im.src, filename: im.src.split("/").pop() ?? "drawing.jpg" } : undefined,
      }))}
      zoom={{ maxZoomPixelRatio: maxZoom, scrollToZoom: true }}
      thumbnails={{ width: 96, height: 68, border: 1, borderRadius: 0, padding: 2, gap: 8, imageFit: "contain" }}
      captions={{ descriptionTextAlign: "center", descriptionMaxLines: 2 }}
      counter={{ container: { style: { top: 0, bottom: "unset" } } }}
      carousel={{ finite: false, preload: 2 }}
      controller={{ closeOnBackdropClick: true }}
      labels={{ Previous: "Previous image", Next: "Next image", Close: "Close viewer" }}
    />
  );
}
