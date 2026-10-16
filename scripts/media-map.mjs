// Source → destination map for media migrated from the old WordPress site.
// `from` is relative to https://formscapeglobal.com/wp-content/uploads/
// `to` is relative to /public. `maxWidth` downsizes oversized originals.
// `format` re-encodes (e.g. a photographic PNG to JPEG).

export const SOURCE_BASE = "https://formscapeglobal.com/wp-content/uploads/";

/** @type {{from: string, to: string, maxWidth?: number, format?: "jpeg"}[]} */
export const mediaMap = [
  // Brand
  { from: "2024/11/Mask-group-16.png", to: "media/brand/formscape-global-logo.png" },
  { from: "2024/10/image-15.png", to: "media/brand/formscape-global-logo-on-indigo.png" },
  { from: "2024/10/android-chrome-512x512-1.png", to: "media/brand/formscape-global-mark.png" },

  // Affiliations
  { from: "2023/07/acce-1.png", to: "media/logos/affiliation-acce-india.png" },
  { from: "2023/07/steel.png", to: "media/logos/affiliation-insdag.png" },
  { from: "2023/11/institute.jpg", to: "media/logos/affiliation-institution-of-engineers-india.jpg" },

  // Clients
  { from: "2023/07/1.jpg", to: "media/logos/client-roheet-hede-associates.jpg" },
  { from: "2023/07/2.jpg", to: "media/logos/client-alpha-aqua.jpg" },
  { from: "2023/07/3.jpg", to: "media/logos/client-darashaw.jpg" },
  { from: "2023/08/3-b.png", to: "media/logos/client-3b-fibreglass.png" },
  { from: "2023/08/New-Project-3.png", to: "media/logos/client-planet-hollywood.png" },
  { from: "2023/08/caculo.png", to: "media/logos/client-caculo.png" },
  { from: "2023/08/New-Project-2.png", to: "media/logos/client-depth.png" },
  { from: "2023/08/pai-kane-logo.png", to: "media/logos/client-pai-kane-group.png" },
  { from: "2023/08/siemnens.png", to: "media/logos/client-siemens.png" },
  { from: "2023/08/New-Project-1.png", to: "media/logos/client-isprava.png" },
  { from: "2023/08/yanni-infra.jpg", to: "media/logos/client-yanni-infraprojects.jpg" },
  { from: "2023/08/mvr-infra-logo.png", to: "media/logos/client-mvr.png" },
  { from: "2024/10/WhatsApp-Image-2024-10-26-at-3.51.28-PM-1.png", to: "media/logos/client-axiom-design.png" },
  { from: "2024/10/WhatsApp-Image-2024-10-26-at-3.51.31-PM-3.png", to: "media/logos/client-rajdeep-builders.png" },
  { from: "2024/10/WhatsApp-Image-2024-10-26-at-3.51.32-PM.png", to: "media/logos/client-mohidin-properties.png" },

  // People and company
  { from: "2023/08/New-Project-4.jpg", to: "media/team/nayan-jivan-fatania.jpg" },
  { from: "2023/08/New-Project-1.jpg", to: "media/team/lahira-salkar-fatania.jpg" },
  { from: "2024/11/IMG-20241026-WA0043.png", to: "media/team/formscape-global-team.jpg", format: "jpeg", maxWidth: 2000 },
  { from: "2023/08/DRB09118-2-min.jpg", to: "media/team/formscape-global-site-team.jpg", maxWidth: 2400 },
  { from: "2023/08/New-Project-2.jpg", to: "media/about/directors-at-office.jpg" },
  { from: "2023/09/Formscape-photo-collage-1.jpg", to: "media/about/formscape-global-project-collage.jpg", maxWidth: 1600 },

  // Services
  { from: "2023/09/WhatsApp-Image-2023-09-06-at-9.57.56-AM.jpeg", to: "media/services/structural-design-lattice-roof.jpg" },
  { from: "2023/09/IMG_7163.jpg", to: "media/services/fabrication-drawings-steel-roof.jpg", maxWidth: 2400 },
  { from: "2023/07/Steel-Structures.jpg", to: "media/services/steel-structures.jpg" },
  { from: "2023/07/Composite-Structures.jpg", to: "media/services/composite-structures.jpg" },
  { from: "2023/07/Liquid-Retaining-Structures.jpg", to: "media/services/liquid-retaining-structures.jpg" },
  { from: "2023/07/Machine-Foundations.jpg", to: "media/services/machine-foundations.jpg" },
  { from: "2023/07/value-engineers.jpg", to: "media/services/value-engineering.jpg" },

  // Methodology page imagery
  { from: "2023/09/New-Project-5.jpg", to: "media/methodology/residential-villa-completed.jpg" },
  { from: "2023/08/Kia-Moters1-1.jpg", to: "media/methodology/steel-frame-erection.jpg" },
  { from: "2023/09/New-Project-6.jpg", to: "media/methodology/industrial-building-under-construction.jpg" },
  { from: "2023/09/New-Project-7.jpg", to: "media/methodology/industrial-building-facade.jpg" },

  // Sample drawings
  ...[1, 2, 3, 4, 5, 6, 7].map((n) => ({
    from: `2023/10/RCC-Detail-page-${n}.jpg`,
    to: `media/drawings/rcc-detail-sheet-${String(n).padStart(2, "0")}.jpg`,
  })),
  ...[1, 2, 3].map((n) => ({
    from: `2023/10/Structural-Detail-page-${n}.jpg`,
    to: `media/drawings/structural-detail-sheet-${String(n).padStart(2, "0")}.jpg`,
  })),

  // Downloads
  { from: "2024/09/Formscape-Global-Company-Profile.pdf", to: "downloads/formscape-global-company-profile.pdf" },

  // Projects
  { from: "2023/10/SERRAULIM-villas.jpeg", to: "media/projects/serraulim-villa-1.jpg" },
  { from: "2023/06/1-7.jpg", to: "media/projects/serraulim-villa-2.jpg" },
  { from: "2023/06/3-3.jpg", to: "media/projects/serraulim-villa-3.jpg" },
  { from: "2023/10/Sarjyotishis-Wadda.jpg", to: "media/projects/sarjyotishis-wada-1.jpg" },
  { from: "2023/10/Parra-Villa-3-1.jpg", to: "media/projects/villas-at-parra-1.jpg" },
  { from: "2023/06/1-5.jpg", to: "media/projects/villas-at-parra-2.jpg" },
  { from: "2023/10/Kings-Mansion.jpeg", to: "media/projects/kings-mansion-candolim-1.jpg" },
  { from: "2023/10/HVACplant-Binnai.jpeg", to: "media/projects/hvac-plant-binani-colvale-1.jpg" },
  { from: "2023/08/eca1ca50-fd24-456b-8355-096cbbe42f7f.jpg", to: "media/projects/roof-over-radiology-department-1.jpg" },
  { from: "2023/08/IMG_1163.jpg", to: "media/projects/guest-house-bogmalo-1.jpg" },
  { from: "2023/08/IMG_7161.jpg", to: "media/projects/structural-roof-mvr-bambolim-1.jpg", maxWidth: 2400 },
  { from: "2023/08/IMG_8289.jpg", to: "media/projects/karaswada-roof-1.jpg" },
  { from: "2023/08/IMG_6932.jpg", to: "media/projects/lester-house-candolim-1.jpg" },
  { from: "2023/08/Factory-for-PAI-KANE-1.jpeg", to: "media/projects/factory-pai-kane-banda-1.jpg" },
  { from: "2023/08/IMG_5784.jpg", to: "media/projects/hede-roof-1.jpg" },
  { from: "2023/08/IMG_2684.jpg", to: "media/projects/saptkoteshwar-1.jpg" },
  { from: "2023/08/IMG_9515.jpg", to: "media/projects/thivim-1.jpg" },
  { from: "2023/08/New-Project-5.jpg", to: "media/projects/candolim-1.jpg" },
  { from: "2023/08/WhatsApp-Image-2023-06-07-at-7.55.09-PM-1.jpeg", to: "media/projects/industrial-shed-corlim-idc-1.jpg" },
  { from: "2023/08/Corlim-IDC.jpeg", to: "media/projects/industrial-shed-corlim-idc-2.jpg" },
  { from: "2023/08/IMG_2665.jpg", to: "media/projects/ravindra-bhavan-1.jpg" },
  { from: "2023/06/1-12.jpg", to: "media/projects/sarjyotishis-house-renovation-1.jpg" },
  { from: "2023/06/2-10.jpg", to: "media/projects/sarjyotishis-house-renovation-2.jpg" },
  { from: "2023/06/3-5.jpg", to: "media/projects/sarjyotishis-house-renovation-3.jpg" },
  { from: "2023/07/verla-villas-2-1.jpeg", to: "media/projects/villas-verla-canca-1.jpg" },
  { from: "2023/06/1-9.jpg", to: "media/projects/villas-verla-canca-2.jpg" },
  { from: "2023/06/3-4.jpg", to: "media/projects/villas-verla-canca-3.jpg" },
  { from: "2023/06/4.jpg", to: "media/projects/villas-verla-canca-4.jpg" },
  { from: "2023/06/5.jpg", to: "media/projects/villas-verla-canca-5.jpg" },
  { from: "2023/06/6.jpg", to: "media/projects/villas-verla-canca-6.jpg" },
  { from: "2023/06/7-1.jpg", to: "media/projects/villas-verla-canca-7.jpg" },
  { from: "2023/06/1-8.jpg", to: "media/projects/sherwyns-house-bastora-1.jpg" },
  { from: "2023/06/2-9.jpg", to: "media/projects/sherwyns-house-bastora-2.jpg" },
  { from: "2023/06/2-8.jpg", to: "media/projects/sherwyns-house-bastora-3.jpg" },
  { from: "2023/06/1-6.jpg", to: "media/projects/goa-sintered-products-verna-1.jpg" },
  { from: "2023/06/2-7.jpg", to: "media/projects/villas-at-verla-1.jpg" },
  { from: "2023/07/9D871B51-33CA-497C-8F70-1492377E7704_1_105_c.jpeg", to: "media/projects/villa-at-siolim-1.jpg" },
  { from: "2023/06/1-4.jpg", to: "media/projects/villa-at-siolim-2.jpg" },
  { from: "2023/06/1-15.jpg", to: "media/projects/exhaust-stack-tower-mopa-1.jpg" },
  { from: "2023/06/2-6.jpg", to: "media/projects/exhaust-stack-tower-mopa-2.jpg" },
  { from: "2023/06/1-14.jpg", to: "media/projects/bungalow-roof-ribandar-1.jpg" },
  { from: "2023/06/2-4.jpg", to: "media/projects/bungalow-roof-ribandar-2.jpg" },
  { from: "2023/06/2-3.jpg", to: "media/projects/radiology-roof-gmc-1.jpg" },
  { from: "2023/06/1-13.jpg", to: "media/projects/radiology-roof-gmc-2.jpg" },
  { from: "2023/07/5E9C36EE-D573-4494-A297-7221CB16E72E_1_105_c.jpeg", to: "media/projects/shed-banda-pai-kane-1.jpg" },
  { from: "2023/06/1-11.jpg", to: "media/projects/shed-banda-pai-kane-2.jpg" },
  { from: "2023/06/1-copy.jpg", to: "media/projects/exhaust-stack-tower-visakhapatnam-1.jpg" },
  { from: "2023/06/1-3.jpg", to: "media/projects/dry-mix-plant-banda-1.jpg" },
  { from: "2023/06/2-5.jpg", to: "media/projects/dry-mix-plant-banda-2.jpg" },
  { from: "2023/06/1-2.jpg", to: "media/projects/swimming-pool-design-1.jpg" },
  { from: "2023/06/3-2.jpg", to: "media/projects/swimming-pool-roof-campal-1.jpg" },
  { from: "2023/06/IMG_6425-1.jpg", to: "media/projects/swimming-pool-roof-campal-2.jpg" },
  { from: "2023/06/IMG_6425F-1.jpg", to: "media/projects/swimming-pool-roof-campal-3.jpg" },
  { from: "2023/07/New-Project-6.jpg", to: "media/projects/latambarcem-breweries-bicholim-1.jpg" },
  { from: "2023/06/1-1.jpg", to: "media/projects/latambarcem-breweries-bicholim-2.jpg" },
  { from: "2023/06/2-2.jpg", to: "media/projects/latambarcem-breweries-bicholim-3.jpg" },
  { from: "2023/06/3-1.jpg", to: "media/projects/latambarcem-breweries-bicholim-4.jpg" },
  { from: "2023/06/1.jpg", to: "media/projects/kia-showroom-verna-1.jpg" },
  { from: "2023/06/2-1.jpg", to: "media/projects/kia-showroom-verna-2.jpg" },
];

// Assets found on the old site that are intentionally NOT migrated.
export const notMigrated = [
  { from: "2024/10/building-construction-ideas-concept-2024-07-17-21-35-39-utc.mp4", reason: "Generic stock blueprint animation used as the old hero background. Replaced by a real project photograph (MVR structural roof). Re-add only if the stock licence is confirmed." },
  { from: "2024/10/Copy-of-Copy-of-Formscape-Brand-Film-4th-Draft-1-1.mp4", reason: "115 MB brand film. Served via the existing YouTube embed (S2B9tCRsDvo) instead of self-hosting." },
  { from: "2023/07/white-formscape.png", reason: "Legacy 'Formscape Engineers LLP' logo — superseded by the Formscape Global mark." },
  { from: "2023/06/Logo-png.png", reason: "Legacy logo variant." },
  { from: "2023/07/Coderix-White.png", reason: "Template vendor branding." },
  { from: "2021/02/modern-white-apartment-house-with-metal-balconies-6CPSBRF-1-2-1.jpg", reason: "WordPress theme demo stock photo (licence unknown). Replaced with a sample drawing for Proof Checking." },
  { from: "2021/02/img-2-1.jpg", reason: "Theme demo stock photo attached to placeholder copy." },
  { from: "2021/02/office-building-X275FAF-1-2.jpg", reason: "Theme demo stock photo attached to placeholder copy." },
  { from: "2023/10/QUERIES-FORMSCAPE.jpg", reason: "Promotional banner with baked-in text; its contact details are rendered as real text instead." },
  { from: "2023/08/testimg.jpg", reason: "Decorative testimonial background." },
  { from: "2024/10/1-FS.svg, 2FS.svg, 3FS.svg", reason: "Decorative icons with opaque white backgrounds; replaced by the new icon set." },
  { from: "2023/10/archetectn.png, location.png, area.png, Columns.png, Lattice.png; Connections.webp", reason: "UI icons for project spec labels; replaced by the new icon set." },
  { from: "2023/06/FAVICON-1.png", reason: "Superseded by the 512px brand mark." },
  { from: "elementor/thumbs/*", reason: "Elementor-generated crops — originals migrated instead." },
];
