# Wireframe & Site Map — CampusConnect Kenya

This document was prepared during the planning stage, before any HTML/CSS/JS was
written, to define the site's structure and each page section's layout.

---

## 1. Site Map

CampusConnect Kenya is a single-page application: every "page" below is a section
on `index.html`, reachable both by scrolling and via anchor links in the sticky
navigation.

```
CampusConnect Kenya (index.html)
│
├── Nav (sticky)
│     Logo · About · Opportunities · Resources · Community · Events · FAQ
│     · Theme toggle · "Find Opportunities" CTA · Mobile burger menu
│
├── #top        Hero
│                 Headline · Subtext · Search / Join CTAs · Floating stat cards
│
├── #about       About
│                 Mission · Vision · Goals · Why We Exist · Illustration
│
├── (Stats)      Statistics strip
│                 Animated counters: students, universities, partners, jobs filled…
│
├── #opportunities  Opportunities
│                 Smart search · Filter chips · Sort · Opportunity cards (grid)
│                 → each card: logo, role, badges, deadline, skills, Apply/Save/
│                   Bookmark/Share
│
├── #resources   Resources
│                 CV Builder · Cover Letter Guide · Interview Qs · Aptitude Tests ·
│                 Career Roadmaps · Learning Resources · Free Courses · …
│                 → Free Courses opens a full catalogue → course modules (notes) →
│                   certification test (80% pass) → certificate
│
├── #community   Community
│                 Discussion feed · Popular clubs (each with story + achievements +
│                   join-application form) · Mentor request
│
├── #events      Events
│                 Career fairs, hackathons, workshops — each with a live countdown
│
├── (Testimonials)  Auto-playing testimonial slider
│
├── #faq         FAQ accordion
│
├── (Newsletter) Email subscription band
│
├── #contact     Contact form + office/contact info
│
└── Footer
      Brand · Social links · Quick links · Contact · Copyright

Floating (persistent, all pages/sections):
  · Scroll progress bar        · Back-to-top button
  · Cursor glow (desktop)      · Floating "search" action button
  · Toast notification stack
```

---

## 2. Low-Fidelity Wireframes

### 2.1 Hero (desktop)

```
┌──────────────────────────────────────────────────────────────────┐
│ [Logo] About  Opportunities  Resources  Community  Events  FAQ    │
│                                        [Theme] [Find Opportunities]│
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│   ROUTE NO. 001 · NAIROBI — EVERYWHERE                            │
│   From Campus                                     ┌─────────────┐│
│   to Career.                                       │ 🎓 Scholarship│
│                                                     │   secured    │
│   One board for every Kenyan student's next        └─────────────┘│
│   stage...                                          ┌────────────┐│
│                                                       │💼 Internship││
│   [ Search Opportunities → ]  [ Join Community ]     │   offer    ││
│                                                       └────────────┘│
│   (avatars) 12,400+ students already on board                     │
│                                                                    │
└──────────────────────────────────────────────────────────────────┘
```

### 2.2 Opportunities section (desktop, 3-column grid)

```
┌──────────────────────────────────────────────────────────────────┐
│  Opportunities                                                    │
│  Everything hiring, in one board                                  │
│                                                                    │
│  [ 🔍 Search box.......................... ] [ Sort: Latest ▾ ]   │
│  ( All ) ( Remote ) ( Internship ) ( Scholarship ) ( Attachment )…│
│                                                                    │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                  │
│  │ [logo] Co. │  │ [logo] Co. │  │ [logo] Co. │                  │
│  │ Position   │  │ Position   │  │ Position   │                  │
│  │ [badges]   │  │ [badges]   │  │ [badges]   │                  │
│  │ 📍 location│  │ 📍 location│  │ 📍 location│                  │
│  │ 🗓 deadline │  │ 🗓 deadline │  │ 🗓 deadline │                  │
│  │ [skills]   │  │ [skills]   │  │ [skills]   │                  │
│  │ [Apply] ♥ ⚑ ↗│ │ [Apply] ♥ ⚑ ↗│ │ [Apply] ♥ ⚑ ↗│              │
│  └────────────┘  └────────────┘  └────────────┘                  │
│               [ Load more opportunities ]                         │
└──────────────────────────────────────────────────────────────────┘
```

### 2.3 Mobile layout (opportunities, single column)

```
┌────────────────────┐
│ [Logo]        [☰]  │
├────────────────────┤
│ 🔍 Search box       │
│ [Sort ▾]            │
│ (All)(Remote)(Int.) │
│                     │
│ ┌────────────────┐ │
│ │ [logo] Company  │ │
│ │ Position title  │ │
│ │ [badges]        │ │
│ │ 📍 location      │ │
│ │ 🗓 deadline       │ │
│ │ [Apply] ♥ ⚑ ↗    │ │
│ └────────────────┘ │
│ ┌────────────────┐ │
│ │      ...        │ │
│ └────────────────┘ │
└────────────────────┘
```

### 2.4 Free Courses flow (Cisco-style learning path)

```
Resources → [Free Courses card]
      │
      ▼
┌─────────────────────────────┐
│ Course Catalog               │
│ (All)(Tech)(Data)(Business)… │
│ ┌───────────────────────────┐│
│ │ Course · provider · hrs    ││
│ │ [progress bar] 0% covered  ││
│ │        [View course][Start]││
│ └───────────────────────────┘│
└──────────────┬────────────────┘
               ▼
┌─────────────────────────────┐
│ Course Learning Modal         │
│ Coverage: 2 of 3 modules      │
│ [██████░░░] 66%               │
│ (1)(2)(3) module tabs         │
│ Module notes / resources      │
│ [Mark complete & continue]    │
│ [Take certification test →]   │  ← only enabled at 100% coverage
└──────────────┬────────────────┘
               ▼ (100% coverage)
┌─────────────────────────────┐
│ Certification Test            │
│ 5 questions, 80% to pass      │
│ [Submit test]                 │
│ Score: 100%  [Get certificate]│  ← only shown if score ≥ 80%
└──────────────┬────────────────┘
               ▼
┌─────────────────────────────┐
│ Certificate Modal              │
│ [Full name input]              │
│ [Generate certificate]         │
│ (canvas-drawn certificate)     │
│ [Download certificate]         │
└─────────────────────────────┘
```

---

## 3. Design Rationale

- **Single-page, anchor-navigated structure** was chosen over multiple HTML files
  because the content is inherently one continuous student journey ("from campus to
  career"), and it keeps navigation instant with no full-page reloads.
- **Mobile-first breakpoints** (see `assets/css/style.css`, section 22) collapse
  every multi-column grid down to a single column below 640px, and the nav becomes
  a slide-down burger menu below 860px.
- **Card-based layout** for opportunities, resources, clubs and events was chosen
  because it scans quickly and scales to any number of items without redesign.
