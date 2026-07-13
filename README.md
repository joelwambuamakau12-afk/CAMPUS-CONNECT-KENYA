# CampusConnect Kenya

**Slogan:** From Campus to Career.

A student-focused web platform connecting Kenyan university students to internships,
attachments, scholarships, jobs, mentors, and free learning resources — built as a
Website Development project for MOHI Technical Training Institute
(Module: Web Development — HTML, CSS & JavaScript).

---

## 1. Project Objectives

CampusConnect Kenya was built to solve one specific problem: Kenyan students and
recent graduates don't have a single, trustworthy place to find real internships,
attachments, scholarships and jobs. Opportunities are scattered across WhatsApp
groups, individual company career pages, and word of mouth — which favours students
who already have connections.

The site's objectives are to:

1. **Centralise real opportunities** — internships, attachments, graduate programmes,
   scholarships, campus jobs, remote work, volunteering, bootcamps, fellowships and
   research roles — each linking to a genuine employer application page.
2. **Make opportunities searchable and filterable** by title, company, skill, county,
   university and category, so students can find what's actually relevant to them.
3. **Give students free tools** to get application-ready: a CV/cover letter guide,
   interview prep, aptitude test practice, and a catalogue of free courses with a
   built-in learning-and-certification flow (read course modules, pass an 80% test,
   download a certificate).
4. **Build community** through a discussion feed, student clubs (with their own
   "join" application flow), mentorship requests, and campus events with live
   countdowns.
5. **Demonstrate professional front-end engineering practice** — semantic HTML5,
   responsive CSS with Flexbox/Grid, accessible forms, and interactive JavaScript
   with DOM manipulation — to the standard of a real commercial product.

---

## 2. Technology Stack

Built from scratch with **plain HTML5, CSS3 and vanilla JavaScript** — no frameworks,
no build tooling, no external UI libraries. This was a deliberate choice so every
line of markup, styling and logic in the project is directly attributable to and
understandable by the student, per the assignment brief.

- **HTML5** — semantic elements (`header`, `nav`, `main`, `section`, `article`,
  `aside`, `footer`), accessible forms, ARIA attributes where semantics alone aren't
  enough (live regions, roles on custom widgets).
- **CSS3** — custom properties (design tokens) for theming, Flexbox and CSS Grid for
  layout, keyframe animations, `prefers-reduced-motion` and `prefers-color-scheme`
  support, mobile-first responsive breakpoints.
- **JavaScript (ES6+)** — no frameworks. Modular functions, `IntersectionObserver`
  for scroll reveals and lazy counter animation, the Canvas API for certificate
  generation, `localStorage` for course-progress persistence, and event delegation
  throughout instead of per-element listeners.
- **Google Fonts** — Fraunces (display/editorial serif), Inter (UI/body), JetBrains
  Mono (data/labels) — loaded via `<link>` with `preconnect` for performance.

No external JS or CSS frameworks (React, Vue, Bootstrap, Tailwind) are used anywhere
in this project, per the assignment requirement.

---

## 3. Folder Structure

```
campusconnect-kenya/
├── index.html                     Main (and only) HTML page — a documented,
│                                   single-page application
├── assets/
│   ├── css/
│   │   └── style.css              All styling, organised into 22 numbered sections
│   ├── js/
│   │   └── script.js              All behaviour, organised into numbered modules
│   └── images/
│       ├── favicon.svg            Brand favicon
│       ├── about-illustration.svg Original "campus to career" illustration
│       └── logos/                 One SVG letter-mark per partner company
│           ├── safaricom.svg
│           ├── equity-bank.svg
│           ├── ncba-bank.svg
│           ├── download.png
│           ├── mastercard-foundation.svg
│           ├── images (3).jpg
│           ├── images (2).png
│           ├── images (4).jpg
│           ├── images (3).png
│           ├── images (4).png
│           ├── images (5).jpg
│           ├── google-developer-groups.svg
│           ├── download.jpg
│           ├── images (6).jpg
│           └── default.svg        Fallback logo for any new company added later
└── docs/
    ├── README.md                  This file
    ├── wireframe-and-sitemap.md   Low-fidelity wireframe + full site map
    └── rubric-mapping.md          Every rubric line item mapped to where it's met
```

**On the company logos:** these are original, custom-designed letter-mark logos
(brand-toned gradient + initials), not copies of the companies' registered
trademarks. This avoids any copyright/trademark risk while still giving every
opportunity card a distinct, professional visual identity. `default.svg` is a
generic CampusConnect-branded mark used automatically (via an `onerror` fallback
on the `<img>` tag) for any company added later without its own logo file.

---

## 4. How to Run the Project

No build step, no server, no dependencies required.

1. Unzip the project.
2. Open `index.html` directly in any modern browser (double-click it, or
   right-click → Open With → your browser).
3. That's it — the whole site, including the free-course certification flow, runs
   entirely client-side.

For local development with live reload, any static file server works, e.g.:

```bash
# Python
python3 -m http.server 8000

# Node (if http-server is installed)
npx http-server .
```

Then visit `http://localhost:8000`.

---

## 5. Key Features

- **Opportunities board** — search, category/remote/employment-type filters, sort by
  latest/deadline/salary/popularity, save/bookmark/share, and a real external
  "Apply Now" link per listing.
- **Free Courses** — an 18-course catalogue (Tech, Data, Business, Design, Soft
  Skills, Health, Agriculture). Each course has real learning modules (notes you
  read), a live coverage tracker, and a certification test that **only unlocks
  once every module is marked complete** and **only issues a certificate at a
  genuine 80%+ score** — enforced both in the UI and re-checked in the code before
  the certificate can be generated.
- **Auto-generated certificates** — a Canvas-drawn certificate with a unique
  verification ID, score badge, and downloadable as a PNG.
- **Student clubs** — each club has its own story, achievements, and an in-modal
  "Apply to Join" form.
- **Community feed, mentorship requests, events with live countdowns, testimonial
  slider, FAQ accordion, newsletter and contact forms** — all with client-side
  validation and toast notifications.
- **Dark/light mode**, persisted across visits.
- **Fully responsive** — tested at mobile, tablet and desktop breakpoints.

---

## 6. Testing Notes

- Verified with a real headless-browser test pass (Playwright + Chromium): the page
  loads with **zero JavaScript console errors**, every dynamic section renders its
  expected element count, and all image/logo assets resolve with a non-zero natural
  width (i.e. nothing is a broken image).
- Manually checked at 375px (mobile), 768px (tablet) and 1280px+ (desktop)
  viewport widths.
- All internal navigation links (`#about`, `#opportunities`, etc.) and all external
  "Apply Now" / "View course" links point to real, working URLs.

---

## 7. Original Work Statement

All copy, illustrations (favicon, about-section graphic, company letter-mark logos),
layout, styling and JavaScript logic in this project were written specifically for
this assignment. No template, theme, or third-party UI kit was used.
