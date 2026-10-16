import { media } from "./media";
import type { Drawing, Logo, TeamMember, Testimonial } from "./types";

export const directors: TeamMember[] = [
  {
    name: "Mr. Nayan Jivan Fatania",
    role: "Chief Executive Officer",
    shortRole: "CEO",
    biography: [
      "Nayan Jivan Fatania is a civil engineer with nine years of industry experience and a commitment to delivering exceptional results. His professionalism, knowledge, skill and integrity have earned him an excellent reputation.",
      "He graduated in Civil Engineering from Goa College of Engineering, Farmagudi, Goa, and has worked on a wide range of projects, contributing to the successful completion of numerous construction and infrastructure developments.",
    ],
    photo: media("/media/team/nayan-jivan-fatania.jpg", "Portrait of Nayan Jivan Fatania, CEO of Formscape Global"),
    socialLinks: [{ label: "LinkedIn", href: "https://in.linkedin.com/in/nayan-fatania-b45277102" }],
  },
  {
    name: "Mrs. Lahira Salkar Fatania",
    role: "Chief Operating Officer",
    shortRole: "COO",
    biography: [
      "Lahira Salkar Fatania holds a Master’s in Structural Engineering from Goa College of Engineering, Farmagudi, Goa, and brings a fresh viewpoint and an inventive attitude to the team.",
      "She specialises in the analysis and design of complex structures, ensuring their safety and effectiveness, and works closely with clients, architects and contractors to achieve project goals.",
    ],
    photo: media("/media/team/lahira-salkar-fatania.jpg", "Portrait of Lahira Salkar Fatania, COO of Formscape Global"),
  },
];

export const aboutCopy = {
  intro:
    "At Formscape Global, we are structural engineers who go beyond traditional structural engineering — we help shape the future.",
  history: [
    "Formscape Global was founded by Mr. Nayan Jivan Fatania and specialises in structural design. The practice was previously known as M/S. Nayan Fatania & Associates and was rebranded as Formscape Global in 2024.",
    "With broader business objectives and a growing client base across the country, the firm has firmly established its roots in the market.",
  ],
  growth:
    "The company started small and grew steadily, serving clients in Goa, Maharashtra and Gujarat with quality output and a focus on customer satisfaction — under the supervision of Mr. Nayan Fatania, drawing on six years of experience at a consultancy firm, and Mrs. Lahira Salkar Fatania, who shares his eye for design, form and function.",
  philosophy:
    "We bring life to your designs with excellence and a creative approach — combining the science of structural analysis with an artistic understanding of form.",
  whyIntro:
    "We provide accurate, top-quality structural engineering services. Proven technologies and methodologies help us deliver actionable results, with your best interests in mind.",
};

export const whyChooseUs = [
  {
    title: "Highly Skilled Team",
    icon: "users",
    text: "Our structural engineers bring years of experience in overcoming complex structural problems and offering creative solutions that meet your project’s needs.",
  },
  {
    title: "Accurate Mapping",
    icon: "map",
    text: "Our thorough approach to structural mapping supports problem-solving, design optimisation and the production of accurate solutions.",
  },
  {
    title: "PAN-India Clientele",
    icon: "globe",
    text: "A diverse portfolio of clients across sectors and industries nationwide has shown our ability to adapt our approach to each project while consistently producing high-quality outcomes.",
  },
  {
    title: "Reliable Support",
    icon: "life-buoy",
    text: "We prioritise client satisfaction and long-term relationships. From initial consultation to post-construction support, we offer trustworthy direction, prompt responses, proactive issue resolution and attentive service.",
  },
];

/** Short commitments listed beneath the quote form on the old site. */
export const commitments = ["Best Quality", "Effective Planning", "Dedicated Team", "Reliable Support"];

export const valuePillars = [
  {
    title: "Explore",
    text: "Discover possibilities, innovations and structural-engineering solutions built on concrete strength.",
  },
  {
    title: "Transform",
    text: "We turn project visions into reality and help reshape the built environment.",
  },
  {
    title: "Elevate",
    text: "We raise the quality, efficiency and sustainability of structural design.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Formscape Global offers unrivalled structural engineering skills and a track record of producing outstanding outcomes. Their team is the best at providing what you seek and delivering excellence.",
    person: "Jignesh Patel",
  },
  {
    quote:
      "I strongly recommend Formscape Global if you are looking for dependable, excellent structural engineering services and flawless work. We have worked together and I am highly impressed with their way of working.",
    person: "Victor Dsouza",
  },
  {
    quote:
      "Formscape Global is unmatched in knowledge and attention to detail. We have worked together on a number of projects, and each time their solutions have been excellent. I highly recommend them.",
    person: "Vinay Sharma",
  },
];

const logo = (file: string, name: string): Logo => ({ name, image: media(`/media/logos/${file}`, `${name} logo`) });

export const affiliations: Logo[] = [
  logo("affiliation-acce-india.png", "Association of Consulting Civil Engineers (India)"),
  logo("affiliation-insdag.png", "INSDAG — Institute for Steel Development and Growth"),
  logo("affiliation-institution-of-engineers-india.jpg", "The Institution of Engineers (India)"),
];

export const clients: Logo[] = [
  logo("client-pai-kane-group.png", "Pai Kane Group"),
  logo("client-siemens.png", "Siemens"),
  logo("client-yanni-infraprojects.jpg", "Yanni Infraprojects"),
  logo("client-mvr.png", "MVR"),
  logo("client-roheet-hede-associates.jpg", "Roheet Hede & Associates"),
  logo("client-caculo.png", "Caculo"),
  logo("client-isprava.png", "Isprava"),
  logo("client-planet-hollywood.png", "Planet Hollywood Beach Resort Goa"),
  logo("client-darashaw.jpg", "Darashaw"),
  logo("client-3b-fibreglass.png", "3B — The Fibreglass Company"),
  logo("client-alpha-aqua.jpg", "Alpha Aqua"),
  logo("client-depth.png", "Depth"),
  logo("client-axiom-design.png", "Axiom Design"),
  logo("client-rajdeep-builders.png", "Rajdeep Builders"),
  logo("client-mohidin-properties.png", "Mohidin Properties & Holdings"),
];

export const drawings: Drawing[] = [
  ...[1, 2, 3, 4, 5, 6, 7].map((n) => {
    const id = String(n).padStart(2, "0");
    return {
      id: `rcc-${id}`,
      set: "rcc" as const,
      title: `RCC Detail — Sheet ${n}`,
      image: media(
        `/media/drawings/rcc-detail-sheet-${id}.jpg`,
        `Sample RCC detail drawing, sheet ${n} of 7: reinforced concrete sections, reinforcement details and notes`,
      ),
    };
  }),
  ...[1, 2, 3].map((n) => {
    const id = String(n).padStart(2, "0");
    return {
      id: `structural-${id}`,
      set: "structural" as const,
      title: `Structural Detail — Sheet ${n}`,
      image: media(
        `/media/drawings/structural-detail-sheet-${id}.jpg`,
        `Sample structural detail drawing, sheet ${n} of 3: steel and structural member details and schedules`,
      ),
    };
  }),
];

export const companyVideo = {
  youtubeId: "S2B9tCRsDvo",
  title: "Formscape Global — everything about us in two minutes",
  poster: media("/media/team/formscape-global-site-team.jpg", "Formscape Global engineers in hard hats reviewing drawings on site"),
};
