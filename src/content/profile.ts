export const profile = {
  name: "Christober",
  role: "Frontend Engineer",
  location: "Chennai, TN",
  email: "christoberedward@gmail.com",
  phone: "+916374144587",
  phoneDisplay: "+91 63741 44587",
  linkedin: "https://www.linkedin.com/in/christoberceciledward",
  company: "ByteAlly Software Solutions Pvt Ltd",
  companyShort: "ByteAlly",
  tenure: "June 2024 — Present",
  summary:
    "Frontend engineer in Chennai building production React and Next.js products — AI workflow tools, real-time chat, and platforms serving 1.8M+ pages.",
};

export const metrics = [
  { value: "2+", label: "Years in production" },
  { value: "1.8M+", label: "Indexed pages shipped" },
  { value: "98", label: "Lighthouse performance" },
  { value: "~35%", label: "Smaller first load" },
] as const;

export const projects = [
  {
    slug: "edi-workflow",
    index: "01",
    title: "EDI Workflow",
    subtitle: "AI-powered Web EDI mapper",
    year: "2024 — Present",
    summary:
      "A production drag-and-drop builder for designing and running complex EDI processes. The canvas holds unbounded graphs past 100 nodes, with live state sync and type-aware validation before anything executes.",
    outcome:
      "Prompt-driven mapping takes configuration from hours to minutes, and the tool is used daily by operations teams.",
    stack: ["React", "TypeScript", "Redux Toolkit", "WebSockets", "OpenAI"],
    role: "Frontend engineer · architecture to release",
    context:
      "Operations teams configure EDI processes — the mappings and checks that move business documents between trading partners. By hand, that meant long configuration sessions and mistakes that only surfaced once a workflow ran.",
    built: [
      "A node-based drag-and-drop canvas with 50+ configurable node types, real-time state sync, and graphs that run past 100 nodes.",
      "A rule-based validation engine that checks type compatibility and configuration before anything executes.",
      "A streaming AI assistant over WebSockets and OpenAI, rendering responses token by token.",
      "A prompt-driven UI that drafts workflow configurations from plain language.",
      "Code splitting, lazy loading, and memoization so large canvases stop blocking first render.",
      "Playwright, Jest, and React Testing Library coverage for the builder and the streaming chat.",
    ],
    results: [
      "EDI mapping that took hours now takes minutes.",
      "About 40% fewer misconfiguration failures across QA and production.",
      "About 35% smaller initial bundle.",
      "Used daily by operations teams.",
    ],
    visual: "workflow",
  },
  {
    slug: "edi-dictionary",
    index: "02",
    title: "EDI Dictionary",
    subtitle: "Large-scale technical reference",
    year: "2025",
    summary:
      "A reference platform scaled to 1.8 million indexed pages. Server-side generation, metadata, and internal linking were built so the catalog stays crawlable and fast at that size.",
    outcome:
      "Measurable organic growth from routing, caching, and a content model designed for scale.",
    stack: ["Next.js", "React", "Node.js", "PostgreSQL"],
    role: "Frontend engineer",
    context:
      "A technical reference for EDI standards. At this size it only works if search engines can crawl all of it and a reader can land on any page and get it fast.",
    built: [
      "Server-side generation for a catalog of 1.8 million pages.",
      "Metadata and internal linking generated from the content model, so every page is reachable and described.",
      "Routing and caching tuned to keep the catalog fast at that scale.",
      "A content model on PostgreSQL designed to grow without reworking the routes.",
    ],
    results: ["1.8M+ indexed pages.", "Measurable organic search growth."],
    visual: "dictionary",
  },
  {
    slug: "zenbridge",
    index: "03",
    title: "Zenbridge",
    subtitle: "B2B marketing site",
    year: "2024",
    summary:
      "Sole frontend owner from design handoff to production. The marketing site was built with Next.js SSR, a shared component library, and a metadata setup aimed at search.",
    outcome: "98/100 Lighthouse performance and 95/100 SEO after image, cache, and script tuning.",
    stack: ["Next.js", "React", "SASS", "SEO"],
    role: "Sole frontend owner",
    context:
      "The public marketing site for Zenbridge, where load speed and search ranking decide whether a buyer ever sees the product.",
    built: [
      "Took the site from design handoff to production.",
      "Next.js server-rendered pages on a shared component library.",
      "A metadata setup aimed at search.",
      "Image, cache, and script tuning to keep pages light.",
    ],
    results: ["98/100 Lighthouse performance.", "95/100 Lighthouse SEO."],
    visual: "score",
  },
  {
    slug: "edi-sla-monitor",
    index: "04",
    title: "EDI SLA Monitor",
    subtitle: "Abnormality detection",
    year: "2024",
    summary:
      "A live dashboard for SLA compliance on EDI transactions. Abnormality detection flags workflow failures as they happen, and the charts are what analysts and support use each day.",
    outcome: "Shorter time to detection, and a clearer read on delay and adherence.",
    stack: ["React", "WebSockets", "Real-time data"],
    role: "Frontend engineer",
    context:
      "Analysts and support need to know when EDI transactions miss their SLA, ideally before a trading partner notices.",
    built: [
      "A live dashboard fed over WebSockets.",
      "Abnormality detection that flags workflow failures as they happen.",
      "Delay and adherence charts that analysts and support read every day.",
    ],
    results: ["Shorter time to detection.", "A clearer read on delay and SLA adherence."],
    visual: "signal",
  },
] as const;

export type Project = (typeof projects)[number];

export const experience = [
  {
    lead: "Modular systems",
    text: "Architected React and TypeScript frontends for an enterprise workflow platform, raising reuse and cutting feature delivery time by about 30%.",
  },
  {
    lead: "Workflow builder",
    text: "Built a node-based drag-and-drop canvas with real-time state sync, 50+ configurable node types, and graphs that run past 100 nodes.",
  },
  {
    lead: "Bundle weight",
    text: "Cut the initial bundle by about 35% with code splitting, lazy loading, and memoization so large canvases stop blocking first render.",
  },
  {
    lead: "Validation engine",
    text: "Designed rule-based checks that run before execution, cutting misconfiguration failures by about 40% across QA and production.",
  },
  {
    lead: "Streaming assistant",
    text: "Shipped a real-time AI chat for WebEDI over WebSockets and OpenAI response streaming, token by token, with no perceived wait.",
  },
  {
    lead: "Language to config",
    text: "Connected LLM APIs to a prompt-driven UI that drafts workflow configurations from plain language, turning hours of EDI mapping into minutes.",
  },
  {
    lead: "Live pipelines",
    text: "Built WebSocket and REST data paths for live interaction across microservices.",
  },
  {
    lead: "Tests that match the risk",
    text: "Covered the builder, streaming chat, and component logic with Playwright, Jest, and React Testing Library.",
  },
  {
    lead: "Past the UI",
    text: "Contributed to ASP.NET Core services — request validation, data processing, and API contracts — so features could be owned end to end.",
  },
  {
    lead: "Release path",
    text: "Maintained GitLab CI/CD pipelines and deployments onto cloud infrastructure.",
  },
] as const;

export const skillGroups = [
  {
    label: "Core",
    items: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)"],
  },
  {
    label: "Styling",
    items: ["Tailwind CSS", "SASS", "CSS3", "HTML5"],
  },
  {
    label: "State & data",
    items: ["Redux Toolkit", "Zustand", "TanStack Query", "Context API"],
  },
  {
    label: "Performance",
    items: ["Code splitting", "Lazy loading", "SSR / SSG", "Core Web Vitals"],
  },
  {
    label: "Real-time & AI",
    items: ["WebSockets", "LLM APIs", "OpenAI streaming", "Prompt-driven UI"],
  },
  {
    label: "Testing",
    items: ["Jest", "React Testing Library", "Playwright"],
  },
  {
    label: "Backend & APIs",
    items: ["Node.js", "REST", "Webhooks", "ASP.NET Core"],
  },
  {
    label: "Tools",
    items: ["Git", "GitLab CI/CD", "Figma", "Postman"],
  },
] as const;

export const nav = [
  { href: "/#work", id: "work", label: "Work" },
  { href: "/#experience", id: "experience", label: "Experience" },
  { href: "/#skills", id: "skills", label: "Skills" },
  { href: "/#contact", id: "contact", label: "Contact" },
] as const;
