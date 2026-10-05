/* ==========================================================================
   Site data — the single source of truth for projects, skills, and roles.

   Edit this file to add/rename projects, change tags, or reorder things.
   The project gallery, filters, skill counts, featured cards, and every
   "Where to next?" block are generated from it automatically.

   The written content of each project (problem, approach, results, media)
   lives in its own page under /projects/.
   ========================================================================== */

/* Focus areas used for the filter buttons on the Projects page. */
const AREAS = [
  { id: "chip-design",  label: "Chip Design" },
  { id: "fabrication",  label: "Fabrication" },
  { id: "embedded",     label: "Embedded Systems" },
  { id: "automation",   label: "Test & Automation" },
];

/* Work experience on the Experience page. Each key matches an anchor on experience.html. */
const EXPERIENCE = {
  siemens:  { label: "Siemens Healthineers",            role: "Electrical Engineering Intern" },
  research: { label: "UD ECE Undergraduate Research",   role: "Undergraduate Researcher" },
  psi:      { label: "Phase Sensitive Innovations",     role: "Electrical Engineering Intern" },
};

/* Projects, in display order (newest first). Prev/Next links follow this order.
   - id:         must match the file name in /projects/ (without .html)
   - context:    where the project happened (shown on cards and project pages)
   - experience: optional key into EXPERIENCE; links the project to that role
   - skills:     must match names in SKILL_GROUPS below
   - featured:   shows on the home page
   - keyResult:  one short headline number/outcome for the "At a glance" box */
const PROJECTS = [
  {
    id: "senior-design-3d-printed-electronics",
    title: "AI-Designed 3D-Printed Electronics",
    summary: "An AI-assisted workflow that turns user-defined requirements into printable electronic geometries.",
    date: "Aug 2026 – Present",
    status: "In progress",
    context: "Senior Design",
    areas: ["fabrication"],
    skills: ["Python"],
    role: "Senior design team member",
    keyResult: "In progress",
    featured: false,   // already promoted by the "Currently" callout on the home page
  },
  {
    id: "eeprom-serialization-tool",
    title: "EEPROM Serialization Tool",
    summary: "A C# application that automates EEPROM serialization of PCAs over a USB-to-I²C bridge, with read-back verification and traceability.",
    date: "Summer 2026",
    context: "Siemens Healthineers",
    experience: "siemens",
    areas: ["automation", "embedded"],
    skills: ["C#", "I²C", "Logic Analyzers"],
    role: "Electrical Engineering Intern",
    keyResult: "Automated, verified serialization",
    featured: true,
  },
  {
    id: "bom-availability-checker",
    title: "BOM Availability Checker",
    summary: "A Python tool that checks component stock across approved distributors and generates color-coded sourcing reports.",
    date: "Summer 2026",
    context: "Siemens Healthineers",
    experience: "siemens",
    areas: ["automation"],
    skills: ["Python", "Playwright", "openpyxl"],
    role: "Electrical Engineering Intern",
    keyResult: "Automated stock checks",
    featured: false,
  },
  {
    id: "silicon-solar-cells",
    title: "Silicon Solar Cell Fabrication",
    summary: "Fabricated and characterized silicon solar cells from bare wafer to finished device.",
    date: "Mar – May 2026",
    context: "University of Delaware",
    areas: ["fabrication"],
    skills: ["E-beam PVD", "Diffusion", "Wet Etching", "Metallization"],
    role: "Fabrication & characterization",
    keyResult: "Up to 7.3% efficiency",
    featured: true,
  },
  {
    id: "side-channel-power-analysis",
    title: "Side-Channel Power Analysis Pipeline",
    summary: "An open-source RTL-to-GDSII flow with dynamic power simulation for side-channel analysis of cryptographic hardware.",
    date: "Summer 2025",
    context: "UD ECE Undergraduate Research",
    experience: "research",
    areas: ["chip-design"],
    skills: ["Python", "Verilog", "OpenROAD", "Yosys", "Icarus Verilog"],
    role: "Undergraduate Researcher",
    keyResult: "16 hrs vs. 24 hrs commercial flow",
    featured: true,
  },
  {
    id: "iot-environmental-monitor",
    title: "IoT Environmental Monitor",
    summary: "An Arduino-based IoT device that monitors environmental conditions in controlled spaces, locally and remotely.",
    date: "Apr – May 2025",
    context: "University of Delaware",
    areas: ["embedded"],
    skills: ["Arduino"],
    role: "Designer & developer",
    keyResult: "Local + remote monitoring",
    featured: false,
  },
  {
    id: "line-following-robot",
    title: "Line-Following Robot",
    summary: "Autonomous line tracking in C on a Basys MX3, with real-time status displays and audio-based control.",
    date: "Nov – Dec 2024",
    context: "University of Delaware",
    areas: ["embedded"],
    skills: ["C", "Basys MX3"],
    role: "Firmware developer",
    keyResult: "Won course-end races",
    featured: false,
  },
  {
    id: "vehicle-to-grid-vip",
    title: "Vehicle-to-Grid Embedded Systems",
    summary: "Soldered and debugged hardware for integration into smart electric vehicle chargers as part of a Vertically Integrated Projects team.",
    date: "Sep – Dec 2024",
    context: "Vertically Integrated Projects (VIP)",
    areas: ["embedded"],
    skills: ["Soldering"],
    role: "VIP team member",
    keyResult: "Hardware for smart EV chargers",
    featured: false,
  },
];

/* Smaller items listed under "More projects" with no detail page.
   Format: { title, date, summary, link }. The section is hidden while empty. */
const MORE_PROJECTS = [];

/* Skills page groups. A skill used by at least one project links to the
   filtered Projects page; others are listed without a link. */
const SKILL_GROUPS = [
  { name: "Programming & HDL", skills: ["Python", "C", "C#", "MATLAB", "Verilog"] },
  { name: "Software Libraries", skills: ["Playwright", "openpyxl"] },
  { name: "EDA Tools", skills: ["KiCad", "LTspice", "Vivado", "OpenROAD", "Yosys", "Icarus Verilog"] },
  { name: "Hardware & Protocols", skills: ["Arduino", "Basys MX3", "I²C"] },
  { name: "Lab & Test", skills: ["Oscilloscopes", "Spectrum Analyzers", "Logic Analyzers", "Soldering"] },
  { name: "Fabrication", skills: ["E-beam PVD", "Diffusion", "Wet Etching", "Metallization"] },
];
