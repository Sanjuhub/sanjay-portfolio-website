# Requirements Document

## Introduction

A single-page Cyber-Geometric Developer Portfolio Website built with Next.js and TypeScript. The site showcases Sanjay Kumar as a Senior Software Engineer through six sections: Hero, Skills, Projects, Experience, Contact, and a sticky navigation bar. All personalised content (name, title, bio, skills, projects, experience, social links, CV URL, etc.) is centralised in a single JSON data file so the portfolio can be updated without touching component code. The visual language follows a Cyber-Brutalism + Modern Minimalism design system: pure black background, red (`#FF0000`) primary accent, white/grey text, sharp (0 px radius) corners, JetBrains Mono for labels and code, and Hanken Grotesk for headings and body copy.

---

## Glossary

- **Portfolio_App**: The Next.js + TypeScript single-page application described in this document.
- **Data_File**: The single JSON file (e.g., `src/data/portfolio.json`) that holds all dynamic/personal content.
- **Nav**: The sticky top navigation bar component.
- **Hero_Section**: The full-viewport opening section containing the headline, bio, tech-stack chips, CTA buttons, and the animated terminal window.
- **Terminal_Widget**: The animated code/terminal window displayed in the right column of the Hero_Section.
- **Skills_Section**: The section displaying the owner's technical skills as tag chips.
- **Projects_Section**: The section displaying project cards sourced from the Data_File.
- **Project_Card**: A single card component representing one project.
- **Experience_Section**: The section displaying professional experience as a vertical timeline.
- **Timeline_Entry**: A single item in the Experience_Section timeline (company, role, dates, bullet points).
- **Contact_Section**: The small section at the bottom of the page containing email and social links.
- **CV_URL**: The external URL (e.g., Google Drive) to the owner's CV PDF, stored in the Data_File.
- **Smooth_Scroll**: Browser-native or JavaScript-driven animated scroll to an anchor on the same page.
- **Scroll_Animation**: A CSS/JS animation triggered when an element enters the viewport during scrolling.
- **OG_Tags**: HTML `<meta>` Open Graph tags used to control link previews on social platforms.

---

## Requirements

### Requirement 1: Single Data File

**User Story:** As a portfolio owner, I want all personal and professional content stored in one JSON file, so that I can update my portfolio without modifying component code.

#### Acceptance Criteria

1. THE Portfolio_App SHALL read all user-facing content (name, title, bio, tech-stack chips, skills, projects, experience entries, social links, CV_URL, and contact email) exclusively from the Data_File.
2. THE Data_File SHALL be a valid JSON file located at the fixed path `src/data/portfolio.json` within the project source tree.
3. WHEN the Data_File is updated and the project is rebuilt, THE Portfolio_App SHALL reflect the updated content on all sections without any changes to component files.
4. THE Data_File SHALL include a `cvUrl` field whose value is a non-empty string beginning with `http://` or `https://` pointing to the owner's CV PDF.
5. IF the Data_File is missing any required top-level field (name, title, bio, techStack, skills, projects, experience, socialLinks, email, cvUrl, seo), THEN the build process SHALL terminate with a non-zero exit code and a console error message that names the specific missing field.
6. THE Data_File SHALL be importable as a TypeScript module so that TypeScript type-checking is applied at build time.

---

### Requirement 2: Navigation Bar

**User Story:** As a visitor, I want a sticky navigation bar with section links and a Resume button, so that I can jump to any section and access the CV at any time.

#### Acceptance Criteria

1. THE Nav SHALL remain fixed at the top of the viewport during scrolling (CSS `position: fixed` or equivalent).
2. THE Nav SHALL display the owner's name as a logo rendered in the primary red accent colour (`#FF0000`) using the JetBrains Mono typeface.
3. THE Nav SHALL render anchor links for each major section: Hero, Skills, Projects, Experience, and Contact.
4. WHEN a Nav anchor link is clicked, THE Portfolio_App SHALL Smooth_Scroll to the corresponding section, offset by the Nav height so the section heading is not obscured.
5. THE Nav SHALL display a "Resume" button containing a terminal icon that opens the CV_URL in a new browser tab.
6. WHEN the viewport width is less than 768 px, THE Nav SHALL collapse the section links and hide them; a hamburger icon SHALL be displayed that, when clicked, toggles a full-screen overlay containing the section links.
7. WHEN a section occupies more than 50% of the viewport height during scrolling, THE Nav SHALL apply an active visual state (red text colour and/or underline) to the corresponding anchor link.
8. WHEN the hamburger overlay is open and a nav link is clicked, THE overlay SHALL close before the Smooth_Scroll begins.

---

### Requirement 3: Hero Section

**User Story:** As a visitor, I want an impactful hero section that communicates who Sanjay is, his speciality, tech stack, and actions I can take, so that I immediately understand his value proposition.

#### Acceptance Criteria

1. THE Hero_Section SHALL occupy at least the full height of the initial viewport (min-height: 100vh).
2. THE Hero_Section SHALL display a label "SENIOR SOFTWARE ENGINEER" in JetBrains Mono uppercase as a small pre-heading above the main headline.
3. THE Hero_Section SHALL display a large multi-word headline; the accent keyword is sourced from a dedicated `hero.accentWord` field in the Data_File and rendered in `#FF0000`; all other headline words are rendered in `#FFFFFF`.
4. THE Hero_Section SHALL display a bio paragraph sourced from the Data_File `hero.bio` field, capped at 300 characters, beneath the headline.
5. THE Hero_Section SHALL display tech-stack chips sourced from the `hero.techStack` array in the Data_File, each rendered as a ghost-style tag (transparent background, 1px solid `#FFFFFF` border, `#FFFFFF` uppercase text, JetBrains Mono, 0px border-radius).
6. THE Hero_Section SHALL display a "VIEW PROJECTS →" CTA button styled as a solid `#FF0000` background, `#FFFFFF` text, 0px border-radius button; WHEN clicked, it SHALL Smooth_Scroll to the Projects_Section.
7. THE Hero_Section SHALL display a "DOWNLOAD CV" CTA button styled as a transparent background, 1px solid `#FFFFFF` border, 0px border-radius button; WHEN clicked, it SHALL open the CV_URL in a new browser tab.
8. WHEN the viewport width is greater than 1024 px, THE Hero_Section SHALL display the Terminal_Widget in the right column of a two-column layout.
9. WHILE the Terminal_Widget is visible in the viewport, THE Terminal_Widget SHALL play a looping animation that types out a JavaScript/TypeScript object literal character by character, displays a blinking red cursor (`#FF0000`) at the insertion point, and restarts after a 1-second pause at the end of the sequence.
10. WHEN the viewport width is less than or equal to 1024 px, THE Hero_Section SHALL stack the text column above and the Terminal_Widget below in a single-column layout; the Terminal_Widget SHALL remain visible.
11. WHEN the Terminal_Widget is scrolled out of the viewport, THE typing animation SHALL pause; WHEN it re-enters the viewport, the animation SHALL resume.

---

### Requirement 4: Skills Section

**User Story:** As a visitor, I want to see Sanjay's technical skills displayed as readable tag chips, so that I can quickly assess his technology expertise.

#### Acceptance Criteria

1. THE Skills_Section SHALL render one chip per entry in the `skills` array of the Data_File.
2. THE Skills_Section SHALL display each skill as a chip with: transparent background, 1px solid `#FFFFFF` border, `#FFFFFF` uppercase text, JetBrains Mono typeface, and 0px border-radius.
3. WHEN the viewport width is greater than or equal to 768 px, THE Skills_Section SHALL arrange the chips in a multi-column wrapping flex layout. WHEN the viewport width is less than 768 px, THE Skills_Section SHALL arrange the chips in a single-column layout.
4. WHEN a skill chip is hovered, THE chip's border colour SHALL change to `#FF0000` and the chip's text colour SHALL change to `#FF0000`.
5. THE Skills_Section SHALL display a section heading using Hanken Grotesk at the same heading level (font size and weight) as all other major section headings on the page.

---

### Requirement 5: Projects Section

**User Story:** As a visitor, I want to browse Sanjay's projects with enough detail to evaluate them, so that I can assess the quality and breadth of his work.

#### Acceptance Criteria

1. THE Projects_Section SHALL render one Project_Card per entry in the `projects` array of the Data_File.
2. EACH Project_Card SHALL display: project title, a short description (at most 160 characters), tech-stack tag chips, a live demo link button (only if `demoUrl` is provided), and a GitHub link button (only if `githubUrl` is provided). IF neither link is provided, no link area SHALL be rendered on the card.
3. WHEN a project entry in the Data_File includes a `thumbnailUrl`, THE Project_Card SHALL display the thumbnail image with `alt` text equal to the project title string.
4. WHEN a Project_Card is hovered, THE Project_Card's border SHALL transition to `1px solid #FF0000` over 200ms using `ease-in-out` timing.
5. THE Projects_Section SHALL arrange Project_Cards in a responsive CSS grid: 3 columns when viewport width is ≥ 1200 px, 2 columns when viewport width is ≥ 768 px and < 1200 px, and 1 column when viewport width is < 768 px.
6. WHEN a live demo link or GitHub link on a Project_Card is clicked, THE Portfolio_App SHALL open the URL in a new browser tab using `target="_blank" rel="noopener noreferrer"`.

---

### Requirement 6: Experience Section

**User Story:** As a visitor or recruiter, I want to see Sanjay's professional history in a clear vertical timeline, so that I can understand his career progression.

#### Acceptance Criteria

1. THE Experience_Section SHALL render one Timeline_Entry per entry in the `experience` array of the Data_File.
2. EACH Timeline_Entry SHALL display: company name, job title/role, start date formatted as `MMM YYYY`, end date formatted as `MMM YYYY` or the literal string "Present", and a list of responsibility/achievement bullet points sourced from the entry's `bullets` array.
3. THE Experience_Section SHALL arrange Timeline_Entries in reverse chronological order (most recent start date first).
4. THE Experience_Section SHALL render a vertical line connecting all Timeline_Entries, with a diamond-shaped red accent marker (`#FF0000`) at each entry point on the line.
5. WHEN a Timeline_Entry enters the viewport (at least 10% visible), THE Experience_Section SHALL trigger a slide-in-from-left Scroll_Animation on that entry, playing it once per page load only.
6. IF the `experience` array in the Data_File is empty, THE Experience_Section SHALL render the section heading and a "No experience entries available." placeholder message instead of the timeline.

---

### Requirement 7: Contact Section

**User Story:** As a visitor, I want a simple contact section with Sanjay's email and social links, so that I can reach out to him easily.

#### Acceptance Criteria

1. THE Contact_Section SHALL display the owner's contact email sourced from the Data_File `email` field as a clickable `mailto:` hyperlink.
2. THE Contact_Section SHALL display one icon-and-label link per entry in the `socialLinks` array; each entry SHALL provide a `platform` name (e.g., "GitHub") and a `url` string; the displayed icon SHALL be derived from the `platform` name.
3. WHEN a social icon link is clicked, THE Portfolio_App SHALL open the URL in a new browser tab using `target="_blank" rel="noopener noreferrer"`.
4. THE Contact_Section SHALL display a section heading sourced from the Data_File `contact.heading` field (e.g., "Get In Touch"), rendered using Hanken Grotesk at the same heading level as all other major section headings.
5. WHEN a social icon link or the email link is hovered, BOTH the icon and the label/text SHALL change colour to `#FF0000`.
6. IF the `socialLinks` array in the Data_File is empty, THE Contact_Section SHALL render only the email link with no social icon area.

---

### Requirement 8: Scroll Animations

**User Story:** As a visitor, I want sections and elements to animate smoothly as I scroll, so that the site feels polished and engaging.

#### Acceptance Criteria

1. WHEN a section heading enters the viewport (at least 10% visible), THE Portfolio_App SHALL play a fade-in combined with a slide-up (from 20px below final position to 0) Scroll_Animation on the heading, with a duration between 300ms and 600ms.
2. WHEN a Project_Card enters the viewport (at least 10% visible), THE Portfolio_App SHALL play a staggered fade-in Scroll_Animation on the cards, with a stagger interval of 80–150ms per card in DOM order.
3. WHEN the Skills_Section chip grid enters the viewport (at least 10% visible), THE Portfolio_App SHALL play a staggered fade-in Scroll_Animation on the chips, with a stagger interval of 80–150ms per chip in DOM order.
4. THE Portfolio_App SHALL trigger each Scroll_Animation only once per page load; scrolling back up SHALL NOT replay the animation.
5. WHERE the user has enabled the "prefers-reduced-motion" OS accessibility setting, THE Portfolio_App SHALL skip all Scroll_Animations and render all animated elements in their final visible state immediately without any transition.
6. Elements subject to Scroll_Animation SHALL have `opacity: 0` and their offset transform applied as their initial state before the animation plays.

---

### Requirement 9: SEO and Open Graph Metadata

**User Story:** As a portfolio owner, I want proper SEO metadata and Open Graph tags on my site, so that it ranks in search engines and previews correctly when shared on social media.

#### Acceptance Criteria

1. THE Portfolio_App SHALL set a `<title>` tag sourced from `seo.title` in the Data_File and a `<meta name="description">` tag sourced from `seo.description` (at most 160 characters) in the Data_File.
2. THE Portfolio_App SHALL include OG_Tags `og:title` (from `seo.title`), `og:description` (from `seo.description`), `og:image` (from `seo.ogImage`, minimum 1200×630 px), and `og:url` (from `seo.siteUrl`) in the HTML `<head>`.
3. THE Portfolio_App SHALL include a `twitter:card` meta tag set to `summary_large_image`.
4. THE Portfolio_App SHALL generate a `robots.txt` file at the root that contains `User-agent: *` and `Allow: /`.
5. THE Portfolio_App SHALL generate a `sitemap.xml` file at the root containing a single `<loc>` entry with the value of `seo.siteUrl` from the Data_File.

---

### Requirement 10: Responsive Layout and Design System Compliance

**User Story:** As a visitor on any device, I want the portfolio to look correct and consistent with the Cyber-Brutalism design system, so that the visual identity is maintained across all screen sizes.

#### Acceptance Criteria

1. THE Portfolio_App SHALL use a maximum content width of 1200 px, centred within the viewport using `margin: 0 auto`.
2. THE Portfolio_App SHALL use multiples of 8 px as the unit for all margins, paddings, and gaps (i.e., all spacing values SHALL be divisible by 8).
3. THE Portfolio_App SHALL use 0 px border-radius on all buttons, cards, tags, and containers. WHEN the viewport width is greater than 1024 px, the hero CTA buttons SHALL additionally use a `clip-path` polygon to create 45° clipped corners.
4. THE Portfolio_App SHALL load Hanken Grotesk via Google Fonts as the typeface for all headings and body text.
5. THE Portfolio_App SHALL load JetBrains Mono via Google Fonts as the typeface for all labels, tag chips, and code blocks.
6. THE Portfolio_App SHALL use `#000000` as the page background colour, `#FF0000` as the primary accent colour, `#FFFFFF` as the primary text colour, and `#999999` as the secondary/muted text colour.
7. WHEN the viewport width is between 768 px and 1199 px, THE Portfolio_App SHALL render the projects grid in two columns and all other section content in a single-column layout.
8. WHEN the viewport width is less than 768 px, THE Portfolio_App SHALL render all sections in a single-column layout with a minimum body font size of 16 px.

---

### Requirement 11: Next.js Application Structure and Build

**User Story:** As a developer maintaining this portfolio, I want a well-structured Next.js TypeScript project, so that the codebase is easy to understand, extend, and deploy.

#### Acceptance Criteria

1. THE Portfolio_App SHALL be implemented as a Next.js application using TypeScript with `strict: true` in `tsconfig.json`.
2. THE Portfolio_App SHALL use the Next.js App Router with a single root page (`app/page.tsx`) that renders all sections.
3. THE Portfolio_App SHALL be deployable to Vercel without a `vercel.json` file and without requiring any build-time environment variables.
4. THE Portfolio_App SHALL pass `next build` and `next lint` without any errors; ESLint warnings that do not fail the build are acceptable, but zero errors is required.
5. THE Portfolio_App SHALL export TypeScript interfaces or types (in `src/types/portfolio.ts` or equivalent) for every top-level field in the Data_File; use of the `any` type for Data_File fields is prohibited.
