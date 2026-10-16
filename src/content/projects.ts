import { media } from "./media";
import type { Project, ProjectCategory, ProjectStatus } from "./types";

// Every project listed on the old "Our Projects", "Ongoing Projects" and
// "Completed Projects" pages. Only facts stated on those pages are recorded.
// Old project detail pages largely contained template filler (e.g. the Dry
// Mix Plant specification repeated on villa pages), so specifications are
// taken from the Our Projects listing and only kept where they agree.
// Status is set only for projects that appeared on the Ongoing/Completed pages.

const p = (path: string, alt: string) => media(`/media/projects/${path}`, alt);

export const projects: Project[] = [
  {
    slug: "exhaust-stack-tower-mopa",
    name: "Exhaust Stack Tower at Mopa",
    status: "completed",
    categories: ["tower", "steel"],
    client: "Pai Kane Group",
    location: "Mopa International Airport, Goa",
    height: "30 m",
    description: "Analysis and design of a 30 m exhaust stack tower for dead load and wind loads.",
    images: [
      p("exhaust-stack-tower-mopa-1.jpg", "30 m steel lattice exhaust stack tower being erected by crane beside a building"),
      p("exhaust-stack-tower-mopa-2.jpg", "Engineer inspecting fabricated steel lattice members on site"),
    ],
    featured: true,
    verify: ["Old site labels Pai Kane Group as “Architect”; detail page says “Client”. Recorded as client."],
  },
  {
    slug: "exhaust-stack-tower-visakhapatnam",
    name: "Exhaust Stack Tower at Visakhapatnam Port",
    status: "completed",
    categories: ["tower", "steel"],
    client: "Pai Kane Group",
    location: "Visakhapatnam Port",
    height: "30 m",
    description: "Analysis and design of a 30 m exhaust stack tower for dead load and cyclonic wind loads.",
    images: [p("exhaust-stack-tower-visakhapatnam-1.jpg", "Steel lattice exhaust stack tower against a blue sky at Visakhapatnam Port")],
    featured: true,
  },
  {
    slug: "shed-banda-pai-kane",
    name: "Shed at Banda for Pai Kane Group",
    status: "completed",
    categories: ["industrial", "steel"],
    client: "Pai Kane Group",
    location: "Banda, Maharashtra",
    area: "1,500 m²",
    span: "20 m",
    structuralSystem: "Steel portal frame",
    columns: "Universal beams",
    lattice: "Tata 310 RHS/SHS",
    connections: "Bolted",
    description: "Steel portal frame structure spanning 20 m.",
    images: [
      p("shed-banda-pai-kane-1.jpg", "Underside of the steel portal-frame roof of the shed at Banda"),
      p("shed-banda-pai-kane-2.jpg", "Open-sided steel portal-frame shed at Banda with roof sheeting"),
    ],
    featured: true,
  },
  {
    slug: "dry-mix-plant-banda",
    name: "Dry Mix Plant",
    alsoListedAs: ["Design of Dry Mix Plant at Banda"],
    status: "completed",
    categories: ["industrial", "steel"],
    client: "Yanni Infra Projects Pvt. Ltd.",
    location: "Banda",
    area: "1,200 m²",
    span: "15 m × 2",
    structuralSystem: "Steel portal frame",
    columns: "Universal beams",
    lattice: "Tata 310 RHS/SHS",
    connections: "Bolted",
    description: "Steel portal frame structure with two 15 m spans.",
    images: [
      p("dry-mix-plant-banda-1.jpg", "Blue-clad dry mix plant building with a tall stack"),
      p("dry-mix-plant-banda-2.jpg", "Interior of the dry mix plant showing the steel roof structure"),
    ],
    featured: true,
  },
  {
    slug: "latambarcem-breweries-bicholim",
    name: "Latambarcem Breweries Pvt. Ltd.",
    status: "completed",
    categories: ["industrial", "steel"],
    client: "Mr. Pradeep Varshnei",
    architect: "Roheet Hede",
    location: "Bicholim, Goa",
    area: "1,200 m²",
    span: "18 m",
    structuralSystem: "Steel portal frame",
    columns: "Universal beams",
    lattice: "Lattice truss — Tata 310 RHS/SHS",
    connections: "Bolted / welded",
    description: "Steel portal frame structure spanning 18 m.",
    images: [
      p("latambarcem-breweries-bicholim-1.jpg", "Completed Latambarcem brewery building with grey cladding and vertical glazing"),
      p("latambarcem-breweries-bicholim-2.jpg", "Brewery building facade and entrance, second view"),
      p("latambarcem-breweries-bicholim-3.jpg", "Brewery interior with red steel lattice roof and production equipment"),
      p("latambarcem-breweries-bicholim-4.jpg", "Large column-free brewery hall under a steel roof"),
    ],
    featured: true,
    verify: ["Client name spelling “Pradeep Varshnei”."],
  },
  {
    slug: "kia-showroom-verna",
    name: "Showroom for KIA Motors",
    alsoListedAs: ["Design of Showroom for Kia Motors at Verna"],
    status: "completed",
    categories: ["commercial", "steel"],
    location: "Verna, Goa",
    images: [
      p("kia-showroom-verna-1.jpg", "Completed KIA Motors showroom with glazed frontage at Verna"),
      p("kia-showroom-verna-2.jpg", "Steel roof structure of the showroom during construction"),
    ],
    verify: ["Old detail-page URL was /projects/car-port-at-molbio-diagnostic-verna-goa/ — confirm whether a separate Molbio car-port project exists."],
  },
  {
    slug: "swimming-pool-roof-campal",
    name: "Refurbishment of Existing Swimming Pool Roof at Campal",
    status: "completed",
    categories: ["roof", "steel"],
    location: "Campal, Goa",
    scope: "Fabrication drawings",
    structuralSystem: "Steel roof with rafters, purlins and roofing sheets",
    description: "Fabrication drawings for a steel roof with rafters, purlins and roofing sheets over an existing swimming pool.",
    images: [
      p("swimming-pool-roof-campal-1.jpg", "Steel rafters and purlins over an existing swimming pool at Campal"),
      p("swimming-pool-roof-campal-2.jpg", "New steel roof frame above the pool tank"),
      p("swimming-pool-roof-campal-3.jpg", "Panoramic view of the steel roof structure over the pool"),
    ],
  },
  {
    slug: "swimming-pool-design",
    name: "Design of Swimming Pool",
    status: "completed",
    categories: ["liquid-retaining", "concrete"],
    images: [p("swimming-pool-design-1.jpg", "Reinforcement laid for a swimming pool base beside a residential building")],
  },
  {
    slug: "radiology-roof-gmc",
    name: "Structural Roof for Radiology Department",
    alsoListedAs: ["Structural Roof for Radiology Department at GMC, Goa"],
    status: "completed",
    categories: ["roof", "steel"],
    location: "GMC, Goa",
    images: [
      p("radiology-roof-gmc-1.jpg", "Steel roof framing for the radiology department at Goa Medical College"),
      p("radiology-roof-gmc-2.jpg", "Completed red sheeted roof over the radiology department"),
    ],
  },
  {
    slug: "bungalow-roof-ribandar",
    name: "Structural Roof of Bungalow",
    alsoListedAs: ["Structural Roof of Bungalow for Arch. Roheet Hede"],
    status: "completed",
    categories: ["roof", "residential", "steel"],
    architect: "Roheet Hede",
    location: "Ribandar, Goa",
    images: [
      p("bungalow-roof-ribandar-1.jpg", "Aerial view of a steel roof frame on a bungalow at Ribandar"),
      p("bungalow-roof-ribandar-2.jpg", "Bungalow with exposed steel roof structure among surrounding houses"),
    ],
    verify: ["Old listing labels Roheet Hede as “Architect / Client”."],
  },
  {
    slug: "villa-at-siolim",
    name: "Villa at Siolim",
    status: "ongoing",
    categories: ["residential", "concrete"],
    location: "Siolim, Goa",
    images: [
      p("villa-at-siolim-1.jpg", "Completed two-storey white villa with palm trees at Siolim"),
      p("villa-at-siolim-2.jpg", "Reinforced concrete frame of the Siolim villa under construction"),
    ],
  },
  {
    slug: "villas-at-parra",
    name: "3 Villas at Parra",
    alsoListedAs: ["Design of G+1 Villas, Parra"],
    status: "ongoing",
    categories: ["residential", "concrete"],
    architect: "Shikhar Dingra",
    location: "Parra, Goa",
    images: [
      p("villas-at-parra-1.jpg", "Two-storey villa at Parra under construction"),
      p("villas-at-parra-2.jpg", "Concrete frame of villas at Parra"),
    ],
    verify: ["Assumed “3 Villa at Parra” (Our Projects) and “Design Of G+1 Villas, Parra” (Ongoing) are the same project.", "Architect spelling “Shikhar Dingra”."],
  },
  {
    slug: "goa-sintered-products-verna",
    name: "Industrial Building for Goa Sintered Products",
    alsoListedAs: ["Industrial Building for Goa Sincters – Verna IDC, Goa"],
    status: "ongoing",
    categories: ["industrial"],
    location: "Verna IDC, Goa",
    images: [p("goa-sintered-products-verna-1.jpg", "Multi-storey industrial building under construction at Verna IDC")],
    verify: ["Old site spells the client “Goa Sincters”. Confirm “Goa Sintered Products”."],
  },
  {
    slug: "serraulim-villa",
    name: "Serraulim Villa",
    alsoListedAs: ["7 Row Villas, Serraulim, Margao"],
    status: "ongoing",
    categories: ["residential", "concrete"],
    architect: "Pratik Kurtarkar",
    location: "Serraulim, Margao",
    images: [
      p("serraulim-villa-1.jpg", "Rendering of the Serraulim villa with a timber and glass facade"),
      p("serraulim-villa-2.jpg", "Concrete frame of the Serraulim row villas under construction"),
      p("serraulim-villa-3.jpg", "Row of reinforced concrete villa frames at Serraulim"),
    ],
    verify: ["Assumed “Serraulim Villa” (Our Projects) and “7 Row Villas, Serraulim, Margao” (Ongoing) are the same project."],
  },
  {
    slug: "sherwyns-house-bastora",
    name: "Sherwyn’s House",
    status: "ongoing",
    categories: ["residential", "concrete"],
    location: "Bastora, Goa",
    images: [
      p("sherwyns-house-bastora-1.jpg", "Concrete house frame with props at Bastora"),
      p("sherwyns-house-bastora-2.jpg", "Slab reinforcement laid on formwork"),
      p("sherwyns-house-bastora-3.jpg", "Slab reinforcement and frame on site at Bastora"),
    ],
  },
  {
    slug: "villas-verla-canca",
    name: "14 G+2 Villas at Verla Canca",
    alsoListedAs: ["14 Villa G+2, Verla Canca"],
    status: "ongoing",
    categories: ["residential"],
    architect: "Shikhar Dingra",
    location: "Verla Canca, Goa",
    images: [
      p("villas-verla-canca-1.jpg", "Rendering of G+2 villas with vaulted roofs at Verla Canca"),
      p("villas-verla-canca-2.jpg", "Front elevation rendering of the vaulted villas"),
      p("villas-verla-canca-3.jpg", "Villa design rendering, view 3"),
      p("villas-verla-canca-4.jpg", "Villa design rendering, view 4"),
      p("villas-verla-canca-5.jpg", "Villa design rendering, view 5"),
      p("villas-verla-canca-6.jpg", "Villa design rendering, view 6"),
      p("villas-verla-canca-7.jpg", "Villa design rendering, view 7"),
    ],
  },
  {
    slug: "sarjyotishis-house-renovation",
    name: "Proposed Renovation of Sarjyotishis House",
    status: "ongoing",
    categories: ["residential"],
    location: "Kavlem, Ponda, Goa",
    images: [
      p("sarjyotishis-house-renovation-1.jpg", "Excavated foundation pits with reinforcement for the Sarjyotishis house renovation"),
      p("sarjyotishis-house-renovation-2.jpg", "Retaining wall reinforcement on the renovation site"),
      p("sarjyotishis-house-renovation-3.jpg", "Footing reinforcement in excavated ground"),
    ],
  },
  {
    slug: "sarjyotishis-wada",
    name: "Sarjyotishis Wada",
    categories: ["residential"],
    architect: "Roheet Hede",
    location: "Kavlem, Goa",
    images: [p("sarjyotishis-wada-1.jpg", "Rendering of the Sarjyotishis Wada residence")],
    featured: true,
  },
  {
    slug: "kings-mansion-candolim",
    name: "Kings Mansion",
    categories: ["residential"],
    architect: "Gauravi Creations",
    location: "Candolim, Goa",
    images: [p("kings-mansion-candolim-1.jpg", "Kings Mansion residence at Candolim")],
  },
  {
    slug: "hvac-plant-binani",
    name: "HVAC Plant at Binani",
    categories: ["industrial"],
    client: "Binani",
    location: "Colvale, Goa",
    images: [p("hvac-plant-binani-colvale-1.jpg", "HVAC plant structure at Binani, Colvale")],
  },
  {
    slug: "roof-over-radiology-department",
    name: "Roof over Radiology Department",
    categories: ["roof"],
    images: [p("roof-over-radiology-department-1.jpg", "Red sheeted roofs over hospital buildings")],
    verify: ["May be the same project as “Structural Roof for Radiology Department” (GMC, Goa); listed separately on the old site."],
  },
  {
    slug: "guest-house-bogmalo",
    name: "Guest House",
    categories: [],
    location: "Bogmalo, Goa",
    images: [p("guest-house-bogmalo-1.jpg", "Single-storey guest house building at Bogmalo")],
  },
  {
    slug: "structural-roof-mvr",
    name: "Structural Roof for MVR",
    categories: ["roof", "steel"],
    client: "MVR",
    location: "Bambolim, Goa",
    images: [p("structural-roof-mvr-bambolim-1.jpg", "Steel roof rafters and purlins on concrete columns for MVR at Bambolim")],
    featured: true,
  },
  {
    slug: "karaswada-roof",
    name: "Karaswada Roof",
    categories: ["roof"],
    location: "Karaswada, Goa",
    images: [p("karaswada-roof-1.jpg", "Roof structure at Karaswada")],
    verify: ["Location inferred from the project name."],
  },
  {
    slug: "lester-house-candolim",
    name: "Lester House",
    categories: ["residential"],
    architect: "Lester",
    location: "Candolim, Goa",
    images: [p("lester-house-candolim-1.jpg", "Lester House at Candolim")],
    verify: ["Old listing shows “Lester” under Architect."],
  },
  {
    slug: "factory-pai-kane",
    name: "Factory for Pai Kane",
    categories: ["industrial", "steel"],
    client: "Pai Kane Group",
    location: "Banda",
    images: [p("factory-pai-kane-banda-1.jpg", "Steel portal frame factory for Pai Kane Group at Banda")],
    featured: true,
    verify: ["Old site spells client “Pia Kane Group” on this entry."],
  },
  {
    slug: "hede-roof",
    name: "Hede Roof",
    categories: ["roof"],
    images: [p("hede-roof-1.jpg", "Roof structure for the Hede project")],
  },
  {
    slug: "saptkoteshwar",
    name: "Saptkoteshwar",
    categories: [],
    location: "Saptkoteshwar, Goa",
    images: [p("saptkoteshwar-1.jpg", "Saptkoteshwar project site")],
    verify: ["Project title and scope not stated on the old site."],
  },
  {
    slug: "thivim",
    name: "Thivim",
    categories: [],
    location: "Thivim, Goa",
    images: [p("thivim-1.jpg", "Thivim project site")],
    verify: ["Project title and scope not stated on the old site."],
  },
  {
    slug: "candolim",
    name: "Candolim",
    categories: [],
    location: "Candolim, Goa",
    images: [p("candolim-1.jpg", "Candolim project")],
    verify: ["Project title and scope not stated on the old site."],
  },
  {
    slug: "industrial-shed-corlim-idc",
    name: "Industrial Shed at Corlim IDC",
    categories: ["industrial", "steel"],
    client: "Siddharth Gadvi",
    location: "Corlim IDC, Goa",
    images: [
      p("industrial-shed-corlim-idc-1.jpg", "Industrial shed at Corlim IDC"),
      p("industrial-shed-corlim-idc-2.jpg", "Industrial shed at Corlim IDC, second view"),
    ],
  },
  {
    slug: "ravindra-bhavan",
    name: "Ravindra Bhavan",
    categories: [],
    images: [p("ravindra-bhavan-1.jpg", "Ravindra Bhavan project site")],
    verify: ["Location (which Ravindra Bhavan) not stated on the old site."],
  },
  {
    slug: "villas-at-verla",
    name: "Villas at Verla",
    categories: ["residential"],
    architect: "Shikhar Dingra",
    location: "Verla, Goa",
    images: [p("villas-at-verla-1.jpg", "Structural frame for the villas at Verla")],
    featured: true,
    verify: ["May overlap with “14 G+2 Villas at Verla Canca” — listed separately on the old site."],
  },
];

export const statusLabel: Record<ProjectStatus, string> = {
  ongoing: "Ongoing",
  completed: "Completed",
};

export const categoryLabel: Record<ProjectCategory, string> = {
  residential: "Residential",
  industrial: "Industrial",
  commercial: "Commercial",
  steel: "Steel Structures",
  concrete: "Concrete Structures",
  roof: "Roof Structures",
  tower: "Towers",
  "liquid-retaining": "Liquid-Retaining Structures",
};

/** Featured order on the home page, matching the brief. */
export const featuredSlugs = [
  "exhaust-stack-tower-mopa",
  "exhaust-stack-tower-visakhapatnam",
  "shed-banda-pai-kane",
  "dry-mix-plant-banda",
  "latambarcem-breweries-bicholim",
  "serraulim-villa",
  "sarjyotishis-wada",
  "villas-at-verla",
  "factory-pai-kane",
  "structural-roof-mvr",
];

export const getProject = (slug: string) => projects.find((x) => x.slug === slug);

export const featuredProjects = () =>
  featuredSlugs.map((s) => {
    const proj = getProject(s);
    if (!proj) throw new Error(`Unknown featured project ${s}`);
    return proj;
  });

export const projectsByStatus = (status: ProjectStatus) => projects.filter((x) => x.status === status);

export function relatedProjects(project: Project, limit = 3) {
  const score = (o: Project) =>
    o.categories.filter((c) => project.categories.includes(c)).length * 2 +
    (o.client && o.client === project.client ? 3 : 0) +
    (o.status && o.status === project.status ? 1 : 0);
  return projects
    .filter((o) => o.slug !== project.slug)
    .map((o) => ({ o, s: score(o) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.o);
}
