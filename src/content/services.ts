import { media } from "./media";
import type { Service } from "./types";

// Copy is taken from the old Bespoke Services and Structural Design
// Methodology pages, edited for grammar and readability only.

export const services: Service[] = [
  {
    id: "structural-design",
    slug: "structural-design",
    title: "Structural Design",
    icon: "ruler",
    href: "/bespoke-services#structural-design",
    summary:
      "Durable, efficient structures designed around your project’s needs using sound engineering principles and modern analysis software.",
    fullDescription: [
      "Formscape Global provides holistic structural design solutions for a wide range of applications. We design durable and efficient structures that match your unique needs, drawing on our knowledge of engineering principles and modern analysis software.",
      "Our engineers work closely with clients to understand their objectives, constraints and project specifications. From concept development through detailed analysis to construction documentation, our designs are safe, practical and aesthetically considered.",
      "With a focus on innovation, sustainability and adherence to industry standards, our structural design services deliver reliable, high-quality solutions for building and infrastructure projects.",
    ],
    image: media("/media/services/structural-design-lattice-roof.jpg", "Steel lattice roof trusses on columns over an industrial floor slab"),
  },
  {
    id: "fabrication-drawings",
    slug: "fabrication-drawings",
    title: "Fabrication Drawings",
    icon: "drafting-compass",
    href: "/bespoke-services#fabrication-drawings",
    summary:
      "Accurate, complete fabrication drawings that give fabricators, welders and assemblers clear instructions.",
    fullDescription: [
      "Our fabrication drawings are produced by a skilled team of drafters and engineers. They are accurate, thorough and compliant with industry norms and standards.",
      "With a focus on precision and quality, our drawings streamline manufacturing by giving fabricators, welders and assemblers clear instructions. They help engineers, suppliers and contractors communicate efficiently — reducing errors, rework and overall cost.",
      "We use current CAD software and tools to meet your specifications for structural steel, pipeline systems, sheet-metal components and other custom fabrications.",
    ],
    image: media("/media/services/fabrication-drawings-steel-roof.jpg", "Steel rafters and purlins bolted to concrete columns on a roof under construction"),
  },
  {
    id: "proof-checking",
    slug: "proof-checking",
    title: "Proof Checking",
    icon: "clipboard-check",
    href: "/structural-design-methodology#proof-checking",
    summary:
      "Independent scrutiny of structural designs and drawings for compliance, accuracy and constructability.",
    fullDescription: [
      "Proof checking safeguards the quality, rigour and integrity of documents, plans and designs. We analyse and examine the content, calculations, requirements and other relevant components to identify errors, inconsistencies or omissions — verifying every detail.",
      "Handled carefully, proof checking reduces risk and protects the overall quality of deliverables. It is a quality-control procedure that ensures the final product is accurate, compliant and fit for its intended purpose.",
    ],
    methodology: {
      intro: [
        "For projects built to a contractor’s own design, or for projects of particular importance, structural design scrutiny by a proof consultant is essential. Our proof-checking services include:",
      ],
      items: [
        "Study of the tender documents and technical specifications adopted for the project",
        "Site supervision, if required",
      ],
      subItems: {
        label: "Scrutiny of structural design and drawings for:",
        items: [
          "Compliance with the tender documents and technical specifications",
          "Compliance with country-specific design standards",
          "Conformity between design calculations and drawings",
          "Detailing, clarity of details and drawing content, with respect to ease of execution on site",
        ],
      },
    },
    image: media("/media/drawings/structural-detail-sheet-01.jpg", "Structural detail drawing sheet with sections and reinforcement schedules"),
  },
  {
    id: "concrete-structures",
    slug: "concrete-structures",
    title: "Concrete Structures",
    icon: "boxes",
    href: "/structural-design-methodology#concrete-structures",
    summary:
      "RCC design for residential, commercial, institutional and industrial buildings, optimised for concrete’s strength in compression.",
    methodology: {
      intro: [
        "This includes the design of residential and commercial complexes, shopping malls, high-rise buildings, educational and institutional buildings, multiplex theatres, hotels, hospitals, industrial buildings and stadiums.",
        "When designing concrete structures, we focus on optimising the use of concrete’s strength, given that it is strong in compression and weak in tension. The systems we compare include:",
      ],
    },
    applications: [
      "Residential and commercial complexes",
      "Shopping malls",
      "High-rise buildings",
      "Educational and institutional buildings",
      "Multiplex theatres",
      "Hotels",
      "Hospitals",
      "Industrial buildings",
      "Stadiums",
    ],
    systems: [
      "Moment-resisting frames",
      "Shear-wall structures",
      "Braced frames",
      "Flat slabs with shear walls",
      "Irregular concrete space frames",
      "Combinations of the above",
    ],
    standards: ["IS 456"],
    image: media("/media/projects/serraulim-villa-3.jpg", "Reinforced concrete frame of a row of villas under construction"),
  },
  {
    id: "steel-structures",
    slug: "steel-structures",
    title: "Steel Structures",
    icon: "construction",
    href: "/bespoke-services#steel-structures",
    summary:
      "Steel buildings, roofs, canopies and industrial frames that exploit steel’s strength while guarding against buckling.",
    fullDescription: [
      "Formscape Global designs structures that use steel as the predominant construction material, for its strength, durability, adaptability and affordability.",
      "Steel structures are used in many applications, including high-rise and commercial buildings, industrial facilities, stadiums and bridges. Designed and constructed to the required performance criteria, they deliver safe, durable and efficient buildings and structures.",
    ],
    methodology: {
      intro: [
        "This includes the design of multi-storey buildings, industrial buildings, stadium structures, atriums and entrance canopies, multi-level car parks, indoor swimming pools, auditoriums and theatres.",
        "Steel is strong in both compression and tension, but weak against buckling when slender. When finalising the structural system we exploit its favourable qualities and safeguard against its weaknesses. Systems usually adopted are:",
      ],
    },
    applications: [
      "Multi-storey buildings",
      "Industrial buildings",
      "Stadium structures",
      "Atriums and entrance canopies",
      "Multi-level car parks",
      "Indoor swimming pools",
      "Auditoriums and theatres",
    ],
    systems: [
      "Moment-resisting frames",
      "Braced frames",
      "Trusses",
      "Portal frames using standard rolled sections",
      "Portal frames using built-up sections, and lattice portal frames",
    ],
    standards: ["IS 800"],
    image: media("/media/services/steel-structures.jpg", "Galvanised steel space-frame members against a building facade"),
  },
  {
    id: "composite-structures",
    slug: "composite-structures",
    title: "Composite Structures",
    icon: "layers",
    href: "/bespoke-services#composite-structures",
    summary:
      "Single structural systems combining steel and concrete so each material works where it performs best.",
    fullDescription: [
      "Composite structures combine two or more materials into a single structural system. Our specialised engineers design them with a clear understanding of how composite materials behave.",
      "Combining materials lets each contribute its strengths, producing structures that are light, robust and efficient. A high strength-to-weight ratio, corrosion and fatigue resistance, and design flexibility make composite systems a significant step forward in lightweight, efficient structural design.",
    ],
    methodology: {
      intro: [
        "This includes structures comprising more than one structural material, all forming part of a carefully conceived single structural system. These are mainly applied to industrial buildings, stadium structures and multi-storey buildings.",
        "With a proper understanding of each material’s strengths and weaknesses, we distribute materials within the structural system so that their strength is used optimally. Systems adopted include:",
      ],
    },
    applications: ["Industrial buildings", "Stadium structures", "Multi-storey buildings"],
    systems: [
      "Steel roof with concrete substructure",
      "Steel frame with concrete deck in multi-storey buildings",
    ],
    image: media("/media/services/composite-structures.jpg", "Dense steel reinforcement cage prepared for a concrete pour"),
  },
  {
    id: "liquid-retaining-structures",
    slug: "liquid-retaining-structures",
    title: "Liquid-Retaining Structures",
    icon: "waves",
    href: "/bespoke-services#liquid-retaining-structures",
    summary:
      "Tanks, treatment plants, pools and deep basements designed for strength with crack widths controlled at service.",
    fullDescription: [
      "Liquid-retaining structures are built specifically to hold and contain liquids, and we design them to suit your requirements. They must withstand the applied hydraulic pressure and prevent leakage or seepage of the retained liquid.",
      "Typical applications include water storage tanks, reservoirs, swimming pools, wastewater treatment facilities and industrial storage. With appropriate design and construction practice, these structures store liquids safely, durably and with long-term performance.",
    ],
    methodology: {
      intro: [
        "Concrete liquid-retaining structures are designed for strength at the ultimate limit state, while crack widths are restricted to permissible limits at the serviceability limit state. Steel liquid-retaining structures are mainly confined to oil and water storage tanks.",
        "Our design expertise and experience include:",
      ],
    },
    applications: [
      "Ground-level water tanks",
      "Water treatment plants",
      "Sewage treatment plants",
      "Sewage and water pumping stations",
      "Deep basements",
      "Swimming pools",
    ],
    standards: ["IS 3370"],
    image: media("/media/services/liquid-retaining-structures.jpg", "Reinforcement for a below-ground tank base and walls on site"),
  },
  {
    id: "machine-foundations",
    slug: "machine-foundations",
    title: "Machine Foundations",
    icon: "cog",
    href: "/bespoke-services#machine-foundations",
    summary:
      "Block and framed foundations that give machinery a stable footing and control vibration and deflection.",
    fullDescription: [
      "Machine foundations give machinery and equipment a stable footing. A machine’s operation, performance and safety depend heavily on limiting vibration, excessive deflection and possible damage to nearby structures.",
      "Machine foundations are common in manufacturing, power generation, petrochemicals and heavy industry. Our engineers analyse the dynamic behaviour of machines, evaluate soil conditions and design foundations that meet the required performance parameters for safe, effective operation.",
    ],
    methodology: {
      intro: ["This includes the design of:"],
    },
    applications: [
      "Block-type foundations",
      "Reciprocating machinery",
      "Impact hammers",
      "Framed foundations for high-speed machinery",
      "Foundations for rotary machines, fans and blowers, looms, and machines installed on building floors",
      "Vibration isolation",
    ],
    standards: ["IS 2974"],
    image: media("/media/services/machine-foundations.jpg", "Piling rig working on a foundation site"),
  },
  {
    id: "value-engineering",
    slug: "value-engineering",
    title: "Value Engineering",
    icon: "scale",
    href: "/bespoke-services#value-engineering",
    summary:
      "Comparing structural systems and materials to achieve equivalent performance at lower cost.",
    fullDescription: [
      "Through value engineering, Formscape Global seeks the best balance between function, cost, quality and performance while meeting project goals and stakeholder expectations.",
      "Value engineering focuses on finding ways to lower cost, increase efficiency and add value without sacrificing quality or functionality. Throughout a project’s life cycle it encourages creative thinking, teamwork and the pursuit of better value.",
    ],
    methodology: {
      intro: [
        "Value engineering is a systematic method of improving the “value” of a product. In structural design, the structure being designed is the product. Value is the ratio of function to cost, so it can be increased by improving function or reducing cost.",
        "For structures, the required functions are well defined by design standards, so value engineering primarily targets equivalent performance at lower cost. It is an integral part of our structural design, with a constant focus on structures that are safe and economical. This is achieved through:",
      ],
    },
    systems: [
      "Comparison of different possible structural systems",
      "Use of alternative structural materials for optimum strength utilisation",
      "Conceiving innovative structural solutions",
    ],
    image: media("/media/services/value-engineering.jpg", "Planning documents, charts and gears on a desk"),
  },
  {
    id: "technical-drawings",
    slug: "technical-drawings",
    title: "Technical Drawing Preparation",
    icon: "pen-tool",
    href: "/structural-design-methodology#technical-drawings",
    summary:
      "Civil, structural and infrastructure drawings prepared to client or Formscape templates, ready for execution.",
    methodology: {
      intro: [
        "Our detailing unit provides drafting services for civil, structural and infrastructure drawings. Working from a template and the design data provided by the client, we produce high-quality technical drawings that the client can confidently release for execution.",
        "Structural elements — and joints in particular — are detailed to country-specific detailing standards. Drawings can be prepared either:",
      ],
    },
    systems: [
      "Following the client’s own drawing standards and templates",
      "Following drawing standards and templates developed by Formscape Global for various types of structures",
    ],
    image: media("/media/drawings/rcc-detail-sheet-01.jpg", "RCC detail drawing sheet with footing and column sections"),
  },
];

export const serviceById = (id: string) => {
  const s = services.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown service ${id}`);
  return s;
};

/** Order of the Bespoke Services page. */
export const bespokeServiceIds = [
  "structural-design",
  "fabrication-drawings",
  "proof-checking",
  "steel-structures",
  "liquid-retaining-structures",
  "composite-structures",
  "machine-foundations",
  "value-engineering",
];

/** Order of the methodology page categories. */
export const methodologyServiceIds = [
  "concrete-structures",
  "steel-structures",
  "composite-structures",
  "liquid-retaining-structures",
  "machine-foundations",
  "value-engineering",
  "proof-checking",
  "technical-drawings",
];

export const methodologyIntro = [
  "At Formscape Global, creating diverse structures means combining the principles of science with an artistic approach.",
  "We follow a structural design methodology to create safe, sound, efficient and robust structures. It allows our engineers to deliver secure, durable structures that comply with the relevant codes and requirements.",
  "Once the structural system has been finalised conceptually, we apply structural analysis and design using modern computer hardware and software. Analysis and design results are cross-checked extensively before they are converted into drawings. Evaluating a structural design involves several stages and considerations, so that it meets every requirement and standard.",
];

export const workflow = [
  { id: "brief", title: "Brief", text: "We study the architectural intent, objectives, constraints and project specifications with the client." },
  { id: "system", title: "Structural system selection", text: "Candidate structural systems and materials are compared and the most suitable system is finalised." },
  { id: "analysis", title: "Analysis", text: "The framework is analysed using modern structural analysis hardware and software." },
  { id: "design", title: "Design", text: "Members and connections are designed to the applicable Indian Standards." },
  { id: "check", title: "Cross-checking", text: "Analysis and design outputs are extensively cross-checked before drawings begin." },
  { id: "drawings", title: "Technical drawings", text: "Results are converted into detailed, execution-ready structural drawings." },
  { id: "support", title: "Construction support", text: "Guidance continues through construction, with site supervision where required." },
] as const;
