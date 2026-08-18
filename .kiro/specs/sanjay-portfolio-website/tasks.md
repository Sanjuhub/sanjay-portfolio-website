# Implementation Plan: Sanjay Portfolio Website

## Overview

Build a statically-generated single-page portfolio using Next.js 14 (App Router), TypeScript strict mode, and Tailwind CSS v3. All personalised content lives in `src/data/portfolio.json`; a Zod-powered prebuild script guards the build. The implementation proceeds in dependency order: types → data → config → hooks → components → SEO → tests → build verification.

## Tasks

- [x] 1. Project scaffolding and toolchain setup
  - Initialise Next.js 14 project with `create-next-app` using `--typescript --app --tailwind --src-dir --import-alias "@/*"` flags
  - Set `"strict": true` in `tsconfig.json`; confirm `@/*` path alias resolves to `./src/*`
  - Install exact-version dev dependencies: `fast-check`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `tsx`
  - Install exact-version runtime dependencies: `zod`, `lucide-react`
  - Add `vitest.config.ts` (or `vitest.config.mts`) with `jsdom` environment and `@testing-library/jest-dom` setup file
  - Add `"prebuild": "tsx scripts/prebuild-validate.ts"` script to `package.json`; confirm `"build"`, `"dev"`, and `"lint"` scripts are present
  - Create the directory skeleton: `src/app`, `src/components/{Nav,Hero,Skills,Projects,Experience,Contact,Footer}`, `src/hooks`, `src/data`, `src/types`, `src/lib`, `src/__tests__/unit`, `scripts`, `public`
  - _Requirements: 11.1, 11.2, 11.3_

- [x] 2. TypeScript interfaces and portfolio data file
  - [x] 2.1 Create `src/types/portfolio.ts` with all exported interfaces
    - Export `SeoData`, `HeroData`, `SocialLink`, `ProjectData`, `ExperienceData`, `ContactData`, and `PortfolioData` interfaces exactly as specified in the design
    - Ensure no `any` type is used for any Data_File field (ESLint `@typescript-eslint/no-explicit-any` must pass)
    - _Requirements: 1.1, 1.6, 11.5_

  - [x] 2.2 Create `src/data/portfolio.json`
    - Populate with the example shape from the design (name, title, hero, skills, projects, experience, socialLinks, email, cvUrl, contact, seo)
    - Ensure `cvUrl` starts with `https://`; `seo.description` ≤ 160 chars; `hero.bio` ≤ 300 chars; all project descriptions ≤ 160 chars
    - Ensure the file is importable as a TypeScript module (add `"resolveJsonModule": true` to tsconfig if not present)
    - _Requirements: 1.1, 1.2, 1.4, 1.6_

- [x] 3. Zod validation schema and prebuild script
  - [x] 3.1 Create `src/lib/validatePortfolio.ts` with the full Zod schema
    - Define `SeoSchema`, `HeroSchema`, `SocialLinkSchema`, `ProjectSchema`, `ExperienceSchema`, and `PortfolioSchema` using `z.object()`
    - Export `PortfolioSchema` and the inferred `PortfolioData` type
    - _Requirements: 1.5_

  - [x] 3.2 Create `scripts/prebuild-validate.ts`
    - Import `PortfolioSchema` and `portfolio.json`; call `PortfolioSchema.safeParse()`
    - On failure: log each issue as `❌ portfolio.json validation error at "<field>": <message>` and call `process.exit(1)`
    - On success: log `✅ portfolio.json validation passed.` and call `process.exit(0)`
    - _Requirements: 1.5_

  - [x] 3.3 Write property tests for Zod schema (Properties 1, 2)
    - **Property 1: Validation rejects missing required fields** — for each required top-level key, delete it from a valid object and assert `safeParse` returns `{ success: false }` with an `issues` entry whose `path` contains the key name; use `fc.constantFrom(...requiredKeys)` to drive the key selection
    - **Property 2: Validation accepts only valid cvUrl schemes** — use `fc.webUrl()` for valid URLs and `fc.string()` filtered to non-URL values; assert `success` matches URL validity
    - File: `src/__tests__/validation.property.test.ts`
    - _Requirements: 1.4, 1.5_

- [x] 4. Tailwind CSS configuration and global styles
  - [x] 4.1 Update `tailwind.config.ts` with design system tokens
    - Extend `colors` with `accent: '#FF0000'` and `muted: '#999999'`
    - Extend `fontFamily` with `sans: ['var(--font-hanken-grotesk)', 'sans-serif']` and `mono: ['var(--font-jetbrains-mono)', 'monospace']`
    - Extend `maxWidth` with `content: '1200px'`
    - Set `borderRadius.DEFAULT` and `borderRadius.none` to `'0px'`
    - Add `blink` keyframes and `animation.blink: 'blink 1s step-end infinite'`
    - Set `content` glob to `'./src/**/*.{ts,tsx}'`
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

  - [x] 4.2 Update `src/app/globals.css`
    - Include `@tailwind base`, `@tailwind components`, `@tailwind utilities` directives
    - In `@layer base`: set `html { scroll-behavior: smooth }`, `body { @apply bg-black text-white }`, `* { @apply rounded-none }`
    - In `@layer utilities`: add `.clip-chamfer-lg` utility with the `clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))` value
    - _Requirements: 10.3, 10.6_

- [x] 5. Root layout and font loading
  - Create `src/app/layout.tsx` as a Server Component
  - Load `Hanken_Grotesk` and `JetBrains_Mono` via `next/font/google`; assign them as CSS variables `--font-hanken-grotesk` and `--font-jetbrains-mono` on `<html>`
  - Import `portfolio.json` and export a static `metadata` object with `title`, `description`, `openGraph` (title, description, url, images), and `twitter` (card: `'summary_large_image'`, title, description, images) all sourced from `portfolio.json.seo`
  - Wrap children in `<body className="bg-black text-white font-sans">`
  - _Requirements: 9.1, 9.2, 9.3, 10.4, 10.5, 11.2_

- [x] 6. Custom hooks
  - [x] 6.1 Implement `src/hooks/useScrollAnimation.ts`
    - Accept `count: number` and optional `{ threshold?, staggerMs?, once? }` options
    - Create a single `IntersectionObserver` on the container ref; set `isVisible = true` on first intersection; unobserve if `once: true`
    - `getItemStyle(index)` returns `{ opacity: 0, transform: 'translateY(20px)', transition: 'none' }` when not visible and `{ opacity: 1, transform: 'translateY(0)', transition: 'opacity 400ms ease, transform 400ms ease ${index * staggerMs}ms' }` when visible
    - Check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` once on mount; if true, return `{ opacity: 1, transform: 'none' }` for all items immediately, skipping all transitions
    - Export a slide-in-from-left variant by accepting a `direction: 'up' | 'left'` option (default `'up'`)
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

  - [x] 6.2 Implement `src/hooks/useTypingAnimation.ts`
    - Accept `text: string` and optional `{ pauseMs?, speedMs? }` options
    - Use `useRef` for cursor position; drive typing via `setInterval(speedMs)` inside `useEffect`
    - State machine: `TYPING → PAUSED_AT_END → RESETTING → TYPING`; after cursor reaches `text.length`, wait `pauseMs` then reset to `0`
    - Expose `{ displayText, isTyping, pause, resume }` where `pause()`/`resume()` freeze/continue the interval without resetting position
    - If `prefers-reduced-motion` is true, return `{ displayText: text, isTyping: false, pause: noop, resume: noop }` immediately
    - _Requirements: 3.9, 3.11_

  - [x] 6.3 Implement `src/hooks/useScrollSpy.ts`
    - Accept `sectionIds: string[]` and optional `navHeight?: number`
    - Create one `IntersectionObserver` with `rootMargin: '-50% 0px -50% 0px'`; observe all section elements by ID
    - Return the `id` of the currently intersecting section (or `null` if none)
    - _Requirements: 2.7_

  - [ ]* 6.4 Write property tests for scroll animation hook (Properties 23, 24, 25, 26)
    - **Property 23: Stagger delay is proportional to item index** — use `fc.nat()` for index and `fc.integer({ min: 80, max: 150 })` for staggerMs; assert `getItemStyle(i).transition` encodes `i * staggerMs` ms delay when visible
    - **Property 24: Scroll animation triggers only once** — simulate multiple intersection calls; assert `isVisible` stays `true` and does not flip
    - **Property 25: prefers-reduced-motion renders final state immediately** — mock `matchMedia` to return `true`; assert every `getItemStyle(i)` returns `{ opacity: 1, transform: 'none' }`
    - **Property 26: Items have opacity:0 and offset transform before intersection** — assert `getItemStyle(i)` returns `opacity: 0` and a non-zero `transform` when `isVisible === false`
    - File: `src/__tests__/scrollAnimation.property.test.ts`
    - _Requirements: 8.2, 8.3, 8.4, 8.5, 8.6_

  - [ ]* 6.5 Write property tests for typing animation hook (Properties 9, 10)
    - **Property 9: Typing animation progresses character-by-character and loops** — use `fc.string({ minLength: 1 })` for the code string; simulate tick-by-tick and assert each `displayText` is a prefix of `code` of length exactly `cursor`; verify reset after full text reached
    - **Property 10: Typing animation pause freezes cursor; resume continues from same position** — choose a random mid-string cursor position; call `pause()`; advance time; assert `displayText` unchanged; call `resume()`; assert typing continues from the same position
    - File: `src/__tests__/hero.property.test.tsx` (typing animation section)
    - _Requirements: 3.9, 3.11_

- [x] 7. Nav component
  - [x] 7.1 Implement `src/components/Nav/Nav.tsx` (`"use client"`)
    - Render `position: fixed top-0 z-50` bar; apply `max-w-content mx-auto` inner container
    - Render owner name in `font-mono text-red-500` (JetBrains Mono, `#FF0000`)
    - Map `sections` prop to anchor links; on click call `scrollIntoView({ behavior: 'smooth', block: 'start' })` with a 64px offset; wire active state from `useScrollSpy`
    - Render Resume `<a>` with `href={cvUrl}`, `target="_blank"`, `rel="noopener noreferrer"`, and Lucide `Terminal` icon
    - At `< 768px`: hide section links; show Lucide `Menu`/`X` hamburger icon that toggles `MobileMenu`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [x] 7.2 Implement `src/components/Nav/MobileMenu.tsx`
    - Render `fixed inset-0 bg-black z-40` overlay with the same nav links
    - On link click: close overlay (set open state to false) before triggering scroll
    - _Requirements: 2.6, 2.8_

  - [ ]* 7.3 Write property tests for Nav (Properties 3, 4, 5)
    - **Property 3: Nav renders exactly one anchor per section** — use `fc.array(fc.record({ id: fc.string({ minLength: 1 }), label: fc.string({ minLength: 1 }) }), { minLength: 1 })`; render Nav; assert anchor count equals array length and each href matches the corresponding `id`
    - **Property 4: Nav Resume button reflects any valid cvUrl** — use `fc.webUrl()`; assert exactly one anchor with `href === cvUrl` and `target === '_blank'`
    - **Property 5: Active section drives exactly one active nav link** — for each section id in the sections array, mock `useScrollSpy` to return that id; assert exactly one link has the active class
    - File: `src/__tests__/nav.property.test.tsx`
    - _Requirements: 2.3, 2.5, 2.7_

- [x] 8. Hero section and TerminalWidget
  - [x] 8.1 Implement `src/components/Hero/HeroSection.tsx` (Server Component)
    - Layout: `min-h-screen` two-column `lg:grid-cols-2` grid with single-column fallback
    - Render `"SENIOR SOFTWARE ENGINEER"` pre-heading in `font-mono uppercase text-xs`
    - Split `hero.headline` array and wrap the word matching `hero.accentWord` in `<span className="text-red-500">`; all other words in `text-white`
    - Render `hero.bio` capped at 300 chars using `.slice(0, 300)`
    - Render `hero.techStack` as ghost chips: `border border-white text-white uppercase font-mono text-xs rounded-none`
    - Render "VIEW PROJECTS →" button (`bg-red-500 text-white rounded-none`); on click smooth-scroll to `#projects`
    - Render "DOWNLOAD CV" button (`border border-white bg-transparent text-white rounded-none`); `href={cvUrl}` `target="_blank"` `rel="noopener noreferrer"`
    - Apply `clip-chamfer-lg` class on both CTA buttons at `lg:` breakpoint
    - Right column (`lg:block hidden`): render `<TerminalWidget code={hero.terminalCode} />`; below `lg`: render `<TerminalWidget>` stacked below text column
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.10_

  - [x] 8.2 Implement `src/components/Hero/TerminalWidget.tsx` (`"use client"`)
    - Use `useTypingAnimation(code, { pauseMs: 1000 })` hook
    - Render mock terminal window: dark header bar with three decorative dot buttons; scrollable code body
    - Display `displayText` as `font-mono text-sm text-green-400` with a blinking `<span className="animate-blink text-red-500 motion-reduce:animate-none">█</span>` cursor
    - Attach an `IntersectionObserver` ref to the container; call `pause()` on leave and `resume()` on enter
    - _Requirements: 3.9, 3.11_

  - [ ]* 8.3 Write property tests for Hero section (Properties 6, 7, 8)
    - **Property 6: Accent word receives red styling; all others do not** — use `fc.array(fc.string({ minLength: 1 }), { minLength: 1 })` and pick a random element as `accentWord`; render `HeroSection`; assert exactly one element with `text-red-500` whose text equals `accentWord`
    - **Property 7: Bio rendering never exceeds 300 characters** — use `fc.string()` for bio; assert rendered bio text length ≤ 300; for `bio.length ≤ 300` assert rendered text equals full input
    - **Property 8: Download CV link reflects any cvUrl with new-tab target** — use `fc.webUrl()` for `cvUrl`; assert DOWNLOAD CV anchor has `href === cvUrl` and `target === '_blank'`
    - File: `src/__tests__/hero.property.test.tsx`
    - _Requirements: 3.3, 3.4, 3.7_

- [x] 9. Skills section
  - [x] 9.1 Implement `src/components/Skills/SkillsSection.tsx` (`"use client"`)
    - Section heading in Hanken Grotesk `text-3xl font-bold`
    - Chip grid: `flex flex-wrap gap-3`; at `< 768px` each chip is `w-full`
    - Each chip: `border border-white text-white uppercase font-mono text-xs px-4 py-2 rounded-none transition-colors hover:border-red-500 hover:text-red-500`
    - Apply `useScrollAnimation` on the container for stagger fade-in
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [ ]* 9.2 Write property tests for Skills section (Properties 11, 12)
    - **Property 11: Skills section renders exactly one chip per skill** — use `fc.array(fc.string({ minLength: 1 }), { minLength: 1 })`; assert chip count equals array length and each chip text matches the corresponding skill string
    - **Property 12: Every skill chip carries required hover styling classes** — for any skills array, assert every chip element has `hover:border-red-500`, `hover:text-red-500`, `border-white`, `uppercase`, `font-mono`, `rounded-none` classes
    - File: `src/__tests__/skills.property.test.tsx`
    - _Requirements: 4.1, 4.2, 4.4_

- [x] 10. Projects section and ProjectCard
  - [x] 10.1 Implement `src/components/Projects/ProjectCard.tsx`
    - `border border-white/20 bg-black p-6 flex flex-col gap-4 transition-all duration-200 ease-in-out hover:border-red-500 rounded-none`
    - Render `next/image` thumbnail only when `thumbnailUrl` is present; `alt={project.title}`, with `onError` hiding the image on load failure
    - Render description clamped to 160 chars via `.slice(0, 160)`
    - Render tech-stack ghost chips (same class as skills chips)
    - Render demo and GitHub link buttons only when `demoUrl`/`githubUrl` are present; each with `target="_blank" rel="noopener noreferrer"`
    - _Requirements: 5.2, 5.3, 5.4, 5.6_

  - [x] 10.2 Implement `src/components/Projects/ProjectsSection.tsx` (`"use client"`)
    - Grid: `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6`
    - Apply `useScrollAnimation` stagger on the card container
    - Render one `<ProjectCard>` per entry in the `projects` array
    - _Requirements: 5.1, 5.5_

  - [ ]* 10.3 Write property tests for Projects section (Properties 13, 14, 15)
    - **Property 13: Projects section renders exactly one card per project** — use `fc.array(projectDataArbitrary, { minLength: 1 })`; assert card count equals array length
    - **Property 14: Project card links render conditionally and open in new tab** — use `projectDataArbitrary` with optional `demoUrl`/`githubUrl`; assert presence/absence of anchors and `target="_blank" rel="noopener noreferrer"` on each
    - **Property 15: Project card thumbnail alt text equals project title** — when `thumbnailUrl` present, assert `alt` equals `project.title`
    - File: `src/__tests__/projects.property.test.tsx`
    - _Requirements: 5.2, 5.3, 5.6_

- [x] 11. Checkpoint — data layer and core components verified
  - Ensure all implemented tests pass. Run `npx vitest run` and confirm zero failures. Ask the user if any questions arise before continuing.

- [x] 12. Experience section and timeline
  - [x] 12.1 Create date formatting utility `src/lib/formatDate.ts`
    - Export `formatDate(dateStr: string): string` using `Intl.DateTimeFormat` with `{ month: 'short', year: 'numeric' }`
    - Return `"Present"` unchanged when input is the literal string `"Present"`
    - _Requirements: 6.2_

  - [x] 12.2 Implement `src/components/Experience/TimelineEntry.tsx`
    - Display company name, role, formatted date range (`startDate` — `endDate`), and `bullets` list
    - Accept `animationStyle: React.CSSProperties` prop injected by parent for stagger
    - Apply the diamond marker: a `<span>` absolutely positioned at `left: -1.25rem` with `rotate-45 w-3 h-3 bg-red-500`
    - _Requirements: 6.2, 6.4_

  - [x] 12.3 Implement `src/components/Experience/ExperienceSection.tsx` (`"use client"`)
    - Sort entries by `startDate` descending (most recent first) before rendering
    - Outer container: `relative pl-8`; vertical line: `absolute left-3 top-0 bottom-0 w-px bg-white/20`
    - Render one `<TimelineEntry>` per entry with slide-in-from-left `useScrollAnimation({ direction: 'left', once: true })`; inject `animationStyle` per entry
    - Empty array: render section heading and `<p>No experience entries available.</p>` placeholder
    - _Requirements: 6.1, 6.3, 6.4, 6.5, 6.6_

  - [ ]* 12.4 Write property tests for Experience section (Properties 16, 17, 18)
    - **Property 16: Experience section renders exactly one entry per record** — use `fc.array(experienceDataArbitrary, { minLength: 1 })`; assert timeline entry count equals array length
    - **Property 17: Date formatter produces correct MMM YYYY output** — use `fc.integer({ min: 1900, max: 2100 })` and `fc.integer({ min: 1, max: 12 })`; compose `"YYYY-MM"` string; assert `formatDate()` result matches `/^[A-Z][a-z]{2} \d{4}$/`; separately assert `formatDate("Present") === "Present"`
    - **Property 18: Experience entries sorted in reverse chronological order** — use `fc.array(experienceDataArbitrary, { minLength: 2 })`; assert each adjacent pair satisfies `a.startDate >= b.startDate`
    - File: `src/__tests__/experience.property.test.tsx`
    - _Requirements: 6.1, 6.2, 6.3_

- [x] 13. Contact section and Footer
  - [x] 13.1 Implement `src/components/Contact/ContactSection.tsx` (Server Component)
    - Render `contact.heading` as a section heading in Hanken Grotesk `text-3xl font-bold`
    - Render email as `<a href={\`mailto:${email}\`} className="hover:text-red-500 transition-colors">`
    - Build `PLATFORM_ICONS` map: `{ GitHub: GithubIcon, LinkedIn: LinkedinIcon, Twitter: TwitterIcon }` using Lucide icons, with `Globe` as fallback
    - Render one icon-and-label `<a>` per `SocialLink`; `target="_blank" rel="noopener noreferrer"` with `hover:text-red-500 transition-colors`
    - Empty `socialLinks` array: render only the email link, no social icon area
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

  - [x] 13.2 Implement `src/components/Footer/Footer.tsx` (Server Component)
    - Render a centred copyright line: `© {year} {ownerName}. All rights reserved.`
    - Source `ownerName` from props (passed from `page.tsx`)
    - _Requirements: 11.2_

  - [ ]* 13.3 Write property tests for Contact section (Properties 19, 20, 21, 22)
    - **Property 19: Contact email link uses mailto scheme** — use `fc.emailAddress()`; assert exactly one anchor with `href === 'mailto:' + email`
    - **Property 20: Contact section renders exactly one social link per entry** — use `fc.array(socialLinkArbitrary)`; assert social anchor count equals array length; for empty array assert no social icon area rendered
    - **Property 21: All social links open in new tab with noopener noreferrer** — for any `SocialLink` array, assert every social anchor has `target="_blank"` and `rel="noopener noreferrer"`
    - **Property 22: Contact section heading reflects any heading string** — use `fc.string({ minLength: 1 })`; assert heading element text equals input string
    - File: `src/__tests__/contact.property.test.tsx`
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 14. SEO routes — robots.ts and sitemap.ts
  - [x] 14.1 Create `src/app/robots.ts`
    - Export default function returning `MetadataRoute.Robots` with `rules: { userAgent: '*', allow: '/' }` and `sitemap: \`${portfolioData.seo.siteUrl}/sitemap.xml\``
    - _Requirements: 9.4_

  - [x] 14.2 Create `src/app/sitemap.ts`
    - Export default function returning `MetadataRoute.Sitemap` array with one entry: `{ url: portfolioData.seo.siteUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }`
    - _Requirements: 9.5_

  - [ ]* 14.3 Write property tests for metadata and sitemap (Properties 27, 28)
    - **Property 27: Metadata object reflects all seo fields including OG tags** — use `fc.record({ title: fc.string({ minLength: 1 }), description: fc.string({ maxLength: 160 }), ogImage: fc.webUrl(), siteUrl: fc.webUrl() })`; call `buildMetadata(seoData)`; assert all seven field mappings hold
    - **Property 28: Sitemap returns exactly one entry with siteUrl** — use `fc.webUrl()` for `siteUrl`; mock `portfolioData.seo.siteUrl`; call `sitemap()`; assert array length is 1 and `url === siteUrl`
    - File: `src/__tests__/metadata.property.test.ts`
    - _Requirements: 9.1, 9.2, 9.3, 9.5_

- [x] 15. Root page assembly
  - Create `src/app/page.tsx` as a React Server Component
  - Import `portfolio.json` and pass typed props to each section component: `<Nav>`, `<HeroSection>`, `<SkillsSection>`, `<ProjectsSection>`, `<ExperienceSection>`, `<ContactSection>`, `<Footer>`
  - Wrap each section in a `<section id="...">` element matching the `id` values used by `useScrollSpy` and Nav anchors
  - Apply `max-w-content mx-auto` wrapper for content width; set `pt-16` to account for fixed Nav height
  - _Requirements: 1.1, 11.2_

- [x] 16. Checkpoint — full page assembled and routes verified
  - Ensure all tests pass with `npx vitest run`. Verify `npx tsc --noEmit` exits 0. Ask the user if any questions arise before continuing.

- [x] 17. Build verification and lint
  - Run `npx next lint` and fix any zero-tolerance errors (warnings are acceptable)
  - Run `npm run build` (which triggers `prebuild` Zod validation, then `next build`); confirm it exits 0
  - Confirm `robots.txt` and `sitemap.xml` are accessible in the build output
  - _Requirements: 11.3, 11.4, 9.4, 9.5_

- [x] 18. Final checkpoint — all tests pass and build is green
  - Run `npx vitest run` — all property tests and unit tests must pass
  - Run `npm run build` — prebuild validation and Next.js build must exit 0 with no errors
  - Run `npx next lint` — zero ESLint errors
  - Ask the user if any questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP; the build and page will function without them
- Each task references specific requirements for full traceability
- Checkpoints (tasks 11, 16, 18) ensure incremental validation before continuing
- Property tests use **fast-check** with `numRuns: 100`; each test file includes the tag comment `// Feature: sanjay-portfolio-website, Property {N}: {property text}`
- `useScrollAnimation` direction option (`'up'` | `'left'`) covers both the standard fade-up and the Experience section slide-in-from-left without duplicating the hook
- `formatDate` is exported from `src/lib/formatDate.ts` (not `validatePortfolio.ts`) so it can be imported independently by property tests (Property 17)
- `buildMetadata` for Property 27 should be extracted as a pure helper in `src/lib/buildMetadata.ts` called by `layout.tsx` so it is independently testable

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["2.1"] },
    { "id": 1, "tasks": ["2.2", "4.1", "4.2"] },
    { "id": 2, "tasks": ["3.1", "5"] },
    { "id": 3, "tasks": ["3.2", "3.3", "6.1", "6.2", "6.3"] },
    { "id": 4, "tasks": ["6.4", "6.5", "7.1", "8.1", "9.1", "10.1", "12.1"] },
    { "id": 5, "tasks": ["7.2", "7.3", "8.2", "8.3", "9.2", "10.2", "12.2", "13.2"] },
    { "id": 6, "tasks": ["10.3", "11", "12.3"] },
    { "id": 7, "tasks": ["12.4", "13.1", "14.1", "14.2"] },
    { "id": 8, "tasks": ["13.3", "14.3", "15"] },
    { "id": 9, "tasks": ["16", "17"] },
    { "id": 10, "tasks": ["18"] }
  ]
}
```
