# Cantabridge Technologies — Project Structure Specification

## 1. Project Overview

Build the official website for **Cantabridge Technologies** as a production-ready, modern, premium, professional, technical, trustworthy, and enterprise-oriented corporate website.

This file defines the **initial project architecture and folder structure only**.

At this stage:

- Do not build the final website.
- Do not write final page content.
- Do not add a CMS.
- Do not add a backend.
- Do not add a database.
- Do not add authentication.
- Do not add an admin dashboard.
- Do not add unnecessary dependencies.
- Do not invent company information.

The goal is to create a clean and scalable foundation so that the website can be developed page-by-page later.

---

# 2. Confirmed Technology Stack

Use:

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React**
- **Git**
- **GitHub**

Production hosting will be:

- **Hostinger**

DNS and security may use:

- **Cloudflare**

The website should be designed as a **static-first corporate website**.

---

# 3. Current Architecture Decisions

The V1 website will NOT use:

- Express
- Separate Node.js backend
- MongoDB
- PostgreSQL
- CMS
- Authentication
- Admin dashboard
- Redux
- Docker
- Kubernetes
- Microservices
- Complex server infrastructure

Do not add any of these unless explicitly requested later.

---

# 4. Core Architecture Principle

Follow this separation strictly:

```text
Pages
    ↓
Page composition and routing

Components
    ↓
Reusable UI and sections

Data
    ↓
Website content

Types
    ↓
TypeScript data contracts

Config
    ↓
Global website configuration

Lib
    ↓
Reusable utilities and helpers

Public
    ↓
Images, icons and static assets
```

Use this rule throughout the project:

> Pages contain composition.  
> Components contain reusable UI.  
> Data contains content.  
> Types define data structures.  
> Config contains global configuration.  
> Lib contains reusable application logic.

Avoid duplicated JSX and hardcoded repeated content.

---

# 5. Required Pages

The initial website architecture should support these routes.

## Core Pages

```text
/
```

Home

```text
/about
```

About Us

```text
/services
```

Services overview

```text
/services/[slug]
```

Reusable individual service page

```text
/training
```

Training

```text
/case-studies
```

Case studies overview

```text
/case-studies/[slug]
```

Reusable case study page

```text
/contact
```

Contact

---

## Legal Pages

```text
/privacy-policy
/terms
/cookie-policy
```

---

# 6. Initial Services

The data architecture must support the following services:

1. AI & Machine Learning
2. IoT Solutions
3. Cybersecurity
4. Salesforce CRM
5. Web Application Development
6. Mobile Application Development
7. Cloud Computing
8. IT Infrastructure Services
9. Technical Support

Do NOT create nine completely separate service page implementations.

Use:

```text
/services/[slug]
```

as the reusable route.

Each service should come from structured data.

---

# 7. Recommended Complete Folder Structure

Create this structure:

```text
cantabridge-technologies/
│
├── public/
│   │
│   ├── images/
│   │   ├── branding/
│   │   ├── hero/
│   │   ├── about/
│   │   ├── services/
│   │   ├── case-studies/
│   │   ├── training/
│   │   ├── team/
│   │   ├── technologies/
│   │   └── general/
│   │
│   ├── icons/
│   │
│   └── fonts/
│
├── src/
│   │
│   ├── app/
│   │   │
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── not-found.tsx
│   │   │
│   │   ├── about/
│   │   │   └── page.tsx
│   │   │
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   │
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── training/
│   │   │   └── page.tsx
│   │   │
│   │   ├── case-studies/
│   │   │   ├── page.tsx
│   │   │   │
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   │
│   │   ├── privacy-policy/
│   │   │   └── page.tsx
│   │   │
│   │   ├── terms/
│   │   │   └── page.tsx
│   │   │
│   │   └── cookie-policy/
│   │       └── page.tsx
│   │
│   ├── components/
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── PageShell.tsx
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Container.tsx
│   │   │   ├── Section.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Divider.tsx
│   │   │   └── IconWrapper.tsx
│   │   │
│   │   ├── common/
│   │   │   ├── PageHero.tsx
│   │   │   ├── CTASection.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── SocialLinks.tsx
│   │   │   └── Breadcrumbs.tsx
│   │   │
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── CapabilityStrip.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── WhyChooseUsSection.tsx
│   │   │   ├── TechnologySection.tsx
│   │   │   ├── FeaturedCaseStudies.tsx
│   │   │   ├── TrainingPreview.tsx
│   │   │   └── HomeCTA.tsx
│   │   │
│   │   ├── services/
│   │   │   ├── ServiceCard.tsx
│   │   │   ├── ServicesGrid.tsx
│   │   │   ├── ServiceHero.tsx
│   │   │   ├── ServiceOverview.tsx
│   │   │   ├── ServiceFeatures.tsx
│   │   │   ├── ServiceBenefits.tsx
│   │   │   ├── ServiceProcess.tsx
│   │   │   ├── ServiceTechnologies.tsx
│   │   │   ├── ServiceFAQ.tsx
│   │   │   └── RelatedServices.tsx
│   │   │
│   │   ├── about/
│   │   │   ├── CompanyOverview.tsx
│   │   │   ├── MissionVision.tsx
│   │   │   ├── CompanyValues.tsx
│   │   │   ├── LeadershipSection.tsx
│   │   │   └── CompanyStats.tsx
│   │   │
│   │   ├── case-studies/
│   │   │   ├── CaseStudyCard.tsx
│   │   │   ├── CaseStudiesGrid.tsx
│   │   │   ├── CaseStudyHero.tsx
│   │   │   ├── CaseStudyOverview.tsx
│   │   │   ├── CaseStudyChallenge.tsx
│   │   │   ├── CaseStudySolution.tsx
│   │   │   ├── CaseStudyResults.tsx
│   │   │   └── CaseStudyGallery.tsx
│   │   │
│   │   ├── training/
│   │   │   ├── TrainingCard.tsx
│   │   │   ├── TrainingGrid.tsx
│   │   │   ├── TrainingOverview.tsx
│   │   │   └── TrainingCTA.tsx
│   │   │
│   │   ├── contact/
│   │   │   ├── ContactForm.tsx
│   │   │   ├── ContactInfo.tsx
│   │   │   ├── ContactCard.tsx
│   │   │   └── ContactMap.tsx
│   │   │
│   │   └── seo/
│   │       ├── JsonLd.tsx
│   │       └── OrganizationSchema.tsx
│   │
│   ├── data/
│   │   ├── site.ts
│   │   ├── navigation.ts
│   │   ├── services.ts
│   │   ├── technologies.ts
│   │   ├── case-studies.ts
│   │   ├── training.ts
│   │   ├── testimonials.ts
│   │   ├── faqs.ts
│   │   ├── team.ts
│   │   └── social-links.ts
│   │
│   ├── types/
│   │   ├── site.ts
│   │   ├── navigation.ts
│   │   ├── service.ts
│   │   ├── technology.ts
│   │   ├── case-study.ts
│   │   ├── training.ts
│   │   ├── testimonial.ts
│   │   ├── faq.ts
│   │   └── common.ts
│   │
│   ├── config/
│   │   ├── site-config.ts
│   │   └── seo-config.ts
│   │
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── seo.ts
│   │   ├── metadata.ts
│   │   ├── services.ts
│   │   └── case-studies.ts
│   │
│   └── hooks/
│       └── use-mobile-menu.ts
│
├── .env.example
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

# 8. Folder Responsibilities

## `/src/app`

Only use this directory for:

- Routing
- Page composition
- Page-level metadata
- Dynamic routes
- Root layout
- Global stylesheet
- Error/not-found handling

Do not put large reusable UI implementations directly inside page files.

Pages should stay relatively small.

Example:

```text
page.tsx
    ↓
HeroSection
ServicesSection
WhyChooseUsSection
TechnologySection
CTASection
```

---

# 9. `/src/components/ui`

This should contain very small reusable UI building blocks.

Examples:

- Button
- Card
- Container
- Badge
- Section
- SectionHeading
- Divider

These should be generic enough to reuse across multiple pages.

---

# 10. `/src/components/layout`

Use for components that form the global website shell:

- Navbar
- Mobile navigation
- Footer
- Page shell

These components may use global site configuration and navigation data.

---

# 11. `/src/components/common`

Use for components reused across multiple page types.

Examples:

- Page hero
- CTA
- Breadcrumbs
- Social links

Do not place highly page-specific components here.

---

# 12. Page-Specific Component Folders

Maintain separate folders for major domains.

Examples:

```text
components/home/
components/services/
components/about/
components/case-studies/
components/training/
components/contact/
```

This keeps the project easy to navigate as it grows.

---

# 13. Data Architecture

All repeated content should come from typed data.

Do not hardcode repeated cards inside JSX.

Example:

```text
services.ts
```

should hold service information.

The UI should work like:

```text
services.ts
      ↓
ServicesGrid
      ↓
ServiceCard
```

Adding a new service should normally require adding a new data entry instead of duplicating JSX.

---

# 14. Services Data Model

Create a strongly typed service model that can support fields like:

```text
id
title
slug
shortTitle
shortDescription
description
icon
image
hero
features
benefits
technologies
process
faqs
relatedServices
cta
seo
featured
order
```

Exact implementation can be adjusted where technically appropriate.

Avoid unnecessary fields if they serve no purpose yet.

---

# 15. Dynamic Service Route

The route:

```text
/services/[slug]
```

must use the same page template for every service.

Example:

```text
/services/artificial-intelligence
/services/iot
/services/cybersecurity
/services/salesforce
```

should all be generated from service data.

The route should:

1. Read the slug.
2. Find the matching service.
3. Return not-found when invalid.
4. Generate metadata from service data.
5. Compose reusable service sections.
6. Support static generation where appropriate.

---

# 16. Case Study Architecture

Use the same pattern for case studies.

```text
/case-studies
```

uses a grid/list.

```text
/case-studies/[slug]
```

uses one reusable case-study template.

Case studies should come from:

```text
data/case-studies.ts
```

not duplicated page files.

---

# 17. Static-First Requirement

The site should be optimized for static generation wherever possible.

Do not introduce server-side functionality unless it becomes necessary.

Prefer:

- Static pages
- Static generation
- Server Components
- Build-time data

Avoid unnecessary:

- Client Components
- API routes
- server-side rendering
- server actions

unless a real requirement needs them.

---

# 18. Server vs Client Components

Prefer Next.js Server Components by default.

Only use:

```text
"use client"
```

where actual browser interaction requires it.

Examples that might need client components:

- Mobile menu
- Interactive accordion
- Form interaction
- Framer Motion animations
- Carousels

Do not mark an entire page as a Client Component simply because one section needs interaction.

Keep client-side JavaScript as small as possible.

---

# 19. Reusability Rules

Follow these rules:

### Create a reusable component when:

- The UI appears more than once.
- The UI is expected to be reused.
- The component has a clear responsibility.
- Extracting it improves readability.

### Do not create a component when:

- It contains only trivial markup used once.
- Extracting it makes the code harder to understand.
- It creates unnecessary abstraction.

The goal is good architecture, not the maximum number of component files.

---

# 20. Styling Rules

Use Tailwind CSS.

Create a consistent design foundation for:

- Brand colors
- Neutral colors
- Typography
- Container widths
- Section spacing
- Card radius
- Button styles
- Borders
- Shadows
- Responsive spacing

Avoid random visual values being repeated everywhere.

Use reusable UI components to enforce consistency.

---

# 21. Visual Direction

The website must eventually feel:

- Modern
- Premium
- Technical
- Professional
- Trustworthy
- Enterprise-ready

Avoid:

- Generic IT template design
- Excessive gradients
- Overuse of blue glow
- Excessive neon
- Unnecessary 3D effects
- Excessive glassmorphism
- Excessive animation
- Huge amounts of decorative noise

Whitespace, typography, structure and good composition should create the premium appearance.

---

# 22. Responsive Design

Build mobile-first.

The architecture must support:

- Mobile phones
- Tablets
- Small laptops
- Standard desktop
- Large desktop

Reusable sections and grids should adapt without needing separate mobile implementations.

---

# 23. Animation Architecture

Framer Motion is available.

Do not use it unnecessarily.

Appropriate uses include:

- Section reveal
- Hero entrance
- Mobile menu transitions
- Card interaction
- CTA interaction
- Small visual transitions

Avoid turning every component into a Client Component purely for animation.

Respect reduced-motion preferences.

---

# 24. Navigation Data

Navigation should be stored separately.

Example:

```text
data/navigation.ts
```

The Navbar and Footer should consume shared navigation data where appropriate.

Do not duplicate navigation labels and URLs across multiple files.

---

# 25. Global Site Configuration

Create:

```text
config/site-config.ts
```

for global information such as:

```text
companyName
siteName
siteUrl
email
phone
address
socialLinks
defaultTitle
defaultDescription
logo paths
```

Use placeholder values when actual information has not yet been approved.

Clearly mark placeholders.

---

# 26. Do Not Invent Business Information

Do not invent:

- Client names
- Client logos
- Testimonials
- Revenue
- Project counts
- Years of experience
- Employee counts
- Certifications
- Awards
- Office locations
- Phone numbers
- Email addresses
- Partnerships
- Technologies that the company has not confirmed

Use safe placeholder values such as:

```text
TODO: Add approved company description
```

or neutral placeholder data.

---

# 27. SEO Architecture

Prepare the project for proper SEO from the beginning.

Support:

- Next.js metadata API
- Page titles
- Meta descriptions
- Canonical URLs
- Open Graph
- Twitter/X metadata
- sitemap
- robots.txt
- JSON-LD
- Organization schema
- Breadcrumbs
- Service metadata
- Case study metadata

Do not create duplicate SEO logic on every page.

Create reusable helpers in:

```text
lib/seo.ts
lib/metadata.ts
config/seo-config.ts
```

---

# 28. Accessibility

The foundation must support good accessibility.

Follow:

- Semantic HTML
- Correct heading hierarchy
- Accessible buttons
- Accessible links
- Proper labels
- Keyboard navigation
- Visible focus state
- Alt text
- Sufficient color contrast
- Reduced-motion preferences
- Accessible mobile navigation

Aim for WCAG 2.2 AA principles where practical.

---

# 29. Performance Rules

The project should be performance-conscious from the beginning.

Prioritize:

- Server Components
- Static generation
- Minimal client JavaScript
- Optimized images
- Proper font loading
- Lazy loading where appropriate
- Responsive image sizes
- Minimal dependencies
- Core Web Vitals

Avoid installing libraries for tasks that can easily be implemented without them.

---

# 30. Images

Keep image assets organized under:

```text
public/images/
```

Use categories such as:

```text
branding
hero
about
services
case-studies
training
team
technologies
general
```

Use Next.js image handling where compatible with the final deployment approach.

Do not insert random remote images during the initial setup.

---

# 31. Contact Form

Create the component architecture for a future contact form, but do not create a backend.

The initial structure may contain:

```text
components/contact/ContactForm.tsx
```

but external form/email integration will be decided later.

Do not add:

- Database storage
- API backend
- SMTP credentials
- Nodemailer
- serverless backend

unless requested later.

---

# 32. CMS Readiness

There is NO CMS in V1.

However, avoid tightly coupling UI components directly to local TypeScript data.

Architect the project so that later we could replace:

```text
services.ts
```

with:

```text
CMS API
```

without rewriting all Service components.

Think in terms of:

```text
Data Source
      ↓
Typed Data
      ↓
Components
```

rather than:

```text
Local file directly embedded everywhere
```

---

# 33. Backend Readiness

Do not create backend infrastructure now.

If backend functionality becomes necessary later, it should be possible to add it without rebuilding the frontend architecture.

Examples of future functionality might include:

- CRM integration
- Lead storage
- Authentication
- Client portal
- LMS
- Payment
- Admin portal

But none should exist in the current foundation.

---

# 34. Hostinger Deployment Considerations

The production target is Hostinger.

Keep the architecture compatible with a static-first deployment.

Do not introduce unnecessary Next.js server-only functionality.

When the actual Hostinger plan is known, deployment may use either:

```text
Next.js Static Export
        ↓
Hostinger
```

or, if required and supported:

```text
Next.js Node Application
        ↓
Hostinger Node.js Hosting
```

The initial architecture should favor the first option wherever practical.

Do not prematurely configure a complex production server.

---

# 35. Cloudflare

Cloudflare may later sit in front of Hostinger for:

- DNS
- CDN
- DDoS protection
- Security
- Caching

Do not make the application depend heavily on Cloudflare-specific APIs in V1.

---

# 36. Git

The project should be Git-ready.

Ensure:

- Proper `.gitignore`
- No secrets committed
- No `.env` committed
- Clean project structure
- Meaningful README

Use:

```text
main
```

as the production branch.

Future development can use feature branches.

---

# 37. Environment Variables

Create:

```text
.env.example
```

Do not create or populate real secrets.

Only include placeholder environment variable names if actually necessary.

---

# 38. TypeScript Rules

Use TypeScript strictly.

Requirements:

- Avoid `any`.
- Prefer interfaces/types for structured data.
- Use clear prop types.
- Avoid unsafe casts.
- Keep shared types centralized.
- Do not duplicate similar interfaces.

---

# 39. Code Quality

Follow professional code standards.

Do:

- Clear naming
- Small focused components
- Reusable patterns
- Consistent imports
- Separation of concerns
- Strong typing
- Semantic HTML
- Clean file structure

Avoid:

- Huge components
- 500-line page files
- Copy-pasted components
- Repeated content
- Inline business data everywhere
- Unnecessary state
- Unnecessary effects
- Unnecessary dependencies
- Premature abstractions

---

# 40. Placeholder Page Requirement

During the initial setup, each route may contain only a minimal placeholder page.

Example:

```text
About Us
Page foundation ready.
```

Do not create the final design/content yet.

The purpose of creating these routes initially is to verify that:

- Routing works
- Dynamic routing works
- Imports work
- Build succeeds
- Architecture is correct

---

# 41. Initial Reusable Component Requirement

Do not fully design all reusable components yet.

Create minimal but functional foundations for the most important primitives, such as:

```text
Button
Container
Section
SectionHeading
Navbar
Footer
PageHero
CTASection
```

Other component files may initially be placeholders if they are needed to establish the architecture.

Do not spend time styling final components during the structure setup stage.

---

# 42. Dynamic Route Testing

Create enough placeholder data to verify:

```text
/services/[slug]
```

works.

At minimum, placeholder service data should include the nine approved service names.

Each slug should resolve successfully.

Invalid service slugs should correctly produce a 404/not-found response.

The same pattern may be created for case studies with one safe placeholder case study.

Do not invent a real client.

---

# 43. Initial Build Validation

After creating the structure, ensure the following commands succeed:

```bash
npm run lint
```

and:

```bash
npm run build
```

If there are TypeScript or lint errors, fix them.

Do not leave the initial foundation in a broken state.

---

# 44. Development Validation

The application should also run successfully using:

```bash
npm run dev
```

All created routes should load without runtime errors.

---

# 45. README Requirements

Create or update:

```text
README.md
```

Include:

- Project name
- Project purpose
- Technology stack
- Folder architecture
- Development commands
- Build commands
- Main architectural rules
- Content/data approach
- Current no-backend/no-CMS decision
- Future CMS readiness
- Hostinger deployment target
- Instructions for adding a new service
- Instructions for adding a new page
- Instructions for adding a reusable component

Keep the README useful for future developers.

---

# 46. Adding a New Service

The architecture should allow a developer to add a new service primarily by adding data.

Expected workflow:

```text
Add service object
      ↓
Add required image/assets
      ↓
Dynamic service route uses it
      ↓
Service automatically appears where configured
```

Do not require creation of another duplicate service page.

---

# 47. Adding a New Reusable Section

Reusable sections should follow domain organization.

Example:

A reusable homepage/client section should go into:

```text
components/home/
```

or:

```text
components/common/
```

depending on whether it is homepage-specific or globally reusable.

Do not place random reusable components directly inside:

```text
app/
```

---

# 48. Imports

Use the configured path alias:

```text
@/*
```

Prefer imports such as:

```text
@/components/ui/Button
@/data/services
@/types/service
```

instead of deeply nested relative imports like:

```text
../../../../components/...
```

---

# 49. Naming Convention

Use consistent naming.

### React Components

PascalCase:

```text
ServiceCard.tsx
SectionHeading.tsx
ContactForm.tsx
```

### Data and Utility Files

kebab-case or consistent lowercase naming:

```text
case-studies.ts
social-links.ts
site-config.ts
```

Do not randomly mix conventions.

---

# 50. Component Props

Components should receive content through props whenever practical.

Example concept:

```text
ServiceCard
    ← service data
```

rather than a ServiceCard that internally imports and selects unrelated service data itself.

Keep presentation components reusable.

---

# 51. Dependency Policy

Only install dependencies that are genuinely needed.

Current approved additional packages:

```text
framer-motion
lucide-react
```

Do not install:

- Axios
- Redux
- Zustand
- React Query
- Material UI
- Bootstrap
- Chakra
- shadcn/ui
- Formik
- React Hook Form
- Yup
- Zod
- CMS SDKs
- authentication packages

unless explicitly required later.

Native browser functionality and existing framework features should be preferred when sufficient.

---

# 52. Design System Preparation

Prepare the foundation so a full design system can later be introduced.

We will eventually define:

- Primary colors
- Secondary colors
- Neutral colors
- Accent colors
- Typography
- Font scale
- Section spacing
- Container widths
- Borders
- Radius
- Shadows
- Interaction states

Do not invent final brand colors in the setup stage unless they have already been officially provided.

Use neutral placeholders where needed.

---

# 53. Future Pages

Do NOT create these yet unless explicitly requested:

```text
/industries
/insights
/blog
/careers
/client-portal
/login
/dashboard
```

The architecture should be able to support them later.

---

# 54. Important Non-Goals

This initial structure setup is NOT:

- Final UI implementation
- Full homepage development
- Final content creation
- Production deployment
- CMS setup
- Backend setup
- Database setup
- Lead automation
- CRM integration
- Analytics implementation
- Final SEO implementation
- Final security configuration

It is only the **production-quality project foundation**.

---

# 55. Expected Result After Initial Setup

When complete, the project should have:

1. Clean Next.js project.
2. TypeScript configured.
3. Tailwind configured.
4. Framer Motion installed.
5. Lucide React installed.
6. Required folders created.
7. Main page routes created.
8. Reusable dynamic service route created.
9. Reusable case-study route foundation created.
10. Global layout foundation.
11. Navbar/footer foundation.
12. Reusable UI primitive foundation.
13. Typed data structure.
14. Initial service data.
15. Basic SEO utility architecture.
16. `.env.example`.
17. Clean README.
18. No unnecessary dependencies.
19. Successful lint.
20. Successful production build.

---

# 56. Final Instruction to the Coding Agent

Read this specification completely before modifying the repository.

Do not start creating random UI sections immediately.

First inspect the existing repository and determine what has already been generated by `create-next-app`.

Then:

1. Preserve valid existing Next.js configuration.
2. Install only missing approved dependencies.
3. Create the required folder hierarchy.
4. Create clean minimal foundation files.
5. Create typed placeholder data.
6. Verify dynamic routing.
7. Verify imports.
8. Run lint.
9. Run production build.
10. Fix all errors.
11. Update the README.

Do not overengineer.

Do not create a backend.

Do not create a CMS.

Do not create a database.

Do not create final marketing content.

Do not invent Cantabridge company claims.

Keep the code production-quality, strongly typed, modular, reusable, and ready for future development.

When finished, provide a concise summary containing:

- Files/folders created
- Dependencies installed
- Architecture implemented
- Build/lint status
- Any important decisions made
- Any TODOs that require company information

Do not proceed to full page development until specifically instructed.