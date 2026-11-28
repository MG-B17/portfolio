export interface LinkData {
  label: string;
  href: string;
}

export interface NavItem extends LinkData {
  hideOnMobile?: boolean;
}

export interface WidgetOutline {
  xRatio: number;
  yRatio: number;
  w: number;
  h: number;
  r: number;
  depth: number;
  phase: number;
  kind: "phone" | "card" | "pill";
  label?: string;
  meta?: string;
}

export interface TreeLink {
  from: number;
  to: number;
  speed: number;
  offset: number;
}

export interface LayoutData {
  name: string;
  title: string;
  description: string;
  brand: { text: string; mark: string; href: string };
  nav: NavItem[];
  primaryNavAriaLabel: string;
  footer: { copyright: string; location: string };
  whatsapp: { href: string; ariaLabel: string };
  statusBarTime: string;
  backgroundBlueprints: { outlines: WidgetOutline[]; links: TreeLink[] };
}

export interface PhoneScreen {
  src: string;
  alt: string;
  label: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroData {
  role: string;
  availability: string;
  headlineLine1: string;
  headlineHighlight: string;
  ledePrefix: string;
  ledeHighlight: string;
  ledeSuffix: string;
  primaryCta: LinkData;
  secondaryCta: LinkData;
  stats: HeroStat[];
  phoneScreen: PhoneScreen;
  phoneScreens: PhoneScreen[];
  placeholderTitle: string;
}

export interface Project {
  slug: string;
  name: string;
  date: string;
  summary: string;
  stack: string[];
  github?: string;
  linkedin?: string;
  live?: string;
  demoVideo?: string;
  screens: string[];
  screenAlts?: string[];
  featured?: boolean;
}

export interface WorkData {
  heading: string;
  subheading: string;
  showMoreLabel: string;
  githubLinkLabel: string;
  linkedinLinkLabel: string;
  liveLinkLabel: string;
  demoLinkLabel: string;
  demoModalCloseAriaLabel: string;
  demoModalTitleSuffix: string;
  demoVideoUnsupported: string;
  emptyScreensText: string;
  screensLabel: string;
  screenLabel: string;
  projectsPage: {
    title: string;
    description: string;
    heading: string;
    intro: string;
    backLabel: string;
  };
  projects: Project[];
}

export interface ArchitectureLayer {
  name: string;
  detail: string;
  accent?: boolean;
}

export interface StateFlowStep {
  label: string;
  accent?: boolean;
}

export interface BackendNode {
  label: string;
  sublabel?: string;
}

export interface AiFeatureRow {
  project: string;
  tech: string;
  outcome: string;
}

export interface SkillTile {
  id: string;
  area: string;
  eyebrow: string;
  items: string[];
  usedIn: string;
}

export interface SkillsData {
  heading: string;
  subheading: string;
  usedInPrefix: string;
  tiles: {
    layers: SkillTile & {
      summary: string;
      diagramAriaLabel: string;
      layers: ArchitectureLayer[];
    };
    state: SkillTile & {
      summary: string;
      diagramAriaLabel: string;
      steps: StateFlowStep[];
      inspectorLeft: string;
      inspectorRight: string;
    };
    backend: SkillTile & {
      summary: string;
      diagramAriaLabel: string;
      centerLabel: string;
      nodes: BackendNode[];
    };
    ai: SkillTile & { summary: string; rows: AiFeatureRow[] };
    tools: SkillTile;
  };
}

export interface AboutParagraph {
  lead?: string;
  body: string;
}

export interface AboutData {
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  heading: string;
  primaryCta: LinkData;
  secondaryCta: LinkData;
  photo: { src: string; alt: string; caption: string };
  paragraphs: AboutParagraph[];
  facts: { index: string; label: string; title: string; detail: string }[];
}

export interface ContactLimits {
  name: number;
  email: number;
  subject: number;
  message: number;
}

export interface ContactLinkData extends LinkData {
  icon: "github" | "linkedin" | "whatsapp" | "x" | "facebook" | "instagram";
}

export interface ContactData {
  heading: string;
  subheading: string;
  eyebrow: string;
  directEmailLabel: string;
  email: string;
  links: ContactLinkData[];
  form: {
    ariaLabel: string;
    composeTitle: string;
    recipientBadge: string;
    websiteLabel: string;
    nameLabel: string;
    emailLabel: string;
    subjectLabel: string;
    subjectOptional: string;
    messageLabel: string;
    submitLabel: string;
    sendingLabel: string;
    successMessage: string;
    limits: ContactLimits;
    errors: {
      nameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      messageRequired: string;
      genericFailure: string;
      tooLong: string;
    };
  };
}
