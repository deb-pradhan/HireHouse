# 03 · Sitemap & Information Architecture

---

## 1. Route map

```
/                         Candidate home            accent: candidate (lime)
├─ /fast-track            Fast Track decision + checkout entry   candidate (lime)
├─ /jobs                  Live board (filter/search)             candidate (lime)
│   └─ /jobs/[id]         Role detail + apply                    candidate (lime)
├─ /companies             Employer funnel                        employer (blue)
├─ /institutions          Placement cells / TPOs                 institution (lilac)
├─ /mockhouse             Prep product (B2C + institution)       institution (lilac)
├─ /partners              Partner ladder + booking               partner (yellow)
├─ /about                 Company / Roni Analytics                        neutral
├─ /contact              Contact + routing to demo/partner      neutral
└─ (legal)
    ├─ /privacy
    ├─ /terms
    └─ /consent           Interview-recording consent policy
```

## 2. Navigation model

**Primary header** (sticky, ground follows section, invert on scroll past hero):

- Wordmark → `/`
- Nav: **For candidates** (/), **For companies** (/companies), **For institutions** (/institutions), **MockHouse** (/mockhouse), **Partners** (/partners)
- Persistent right CTAs: **Browse jobs** (ghost) + **Fast Track** (accent pill). On employer pages the primary CTA swaps to **Post a role — free**.
- **AudienceSwitcher:** on mobile and as a subtle top-strip, lets a visitor jump to their world. Remembers last audience (localStorage) to bias the default CTA.

**Footer** (every page, deck footer discipline — the only chrome besides the header):

- Column 1 — Candidates: Home, Jobs, Fast Track, MockHouse
- Column 2 — Business: Companies, Institutions, Partners
- Column 3 — Company: About, Contact, Roni Analytics
- Column 4 — Legal: Privacy, Terms, Interview-recording consent
- Base strip: `HireHouse · a product of Roni Analytics` · markets (UAE · India) · wordmark right-aligned (deck footer outdent).

## 3. Per-page archetype + ground plan

Each page is a vertical sequence of section archetypes (see [04](04-SECTION-LIBRARY.md)) with a ground rotation that never repeats adjacently and places blue once at the climax.

| Route | Section flow (archetype · ground) |
|---|---|
| `/` | Hero-A·black → Problem-C·lime → Mechanism-I·white → Standard-vs-FastTrack-L·grey → Jobs-entry-G·black → Fairness-H·white → **Ask-B·blue** → FAQ-K·white → Footer |
| `/fast-track` | Hero-A·black → What-you-get-C·lime → Standard-vs-FastTrack-F·grey → Fairness-L·white → Proof-by-construction-H·lime → Price-D·white → **Checkout-B·blue** → FAQ-K·white |
| `/jobs` | Board header-G·white → Filters+Grid (jobs) → FastTrack-upsell strip·lime → Footer |
| `/jobs/[id]` | Role header-D·white → Details split → Apply-B·blue → Related roles-E·white |
| `/companies` | Hero-A·black → Pain-C·grey → 6-step journey-C·white → Shortlist-not-spreadsheet-L·grey → Cost drivers-H·lime → Free-model-I·black → **Post-a-role-B·blue** → FAQ-K·white |
| `/institutions` | Hero-A·white (lilac accent) → Batch problem-C·grey → Readiness scale-J·white → MockHouse B2B-I·grey → Cohort reports-D·white (lilac panel) → **Book-a-demo-B·blue** → FAQ-K·white |
| `/mockhouse` | Hero-A·black → How-it-works-C·white → B2C/Institution split-L·grey → Score+feedback-D·white (lilac panel) → Bridge-to-live-app-B·blue → FAQ-K·white |
| `/partners` | Hero-A·black → Why-partner-H·yellow → 3-tier ladder-J·white → Payout mechanics-D·grey → **Book-a-call-B·blue** → FAQ-K·white |
| `/about` | Statement-A·white → What/why-C → Roni Analytics-M·black |
| `/contact` | Split-D·white (routes: candidate / company / institution / partner / press) |
| legal | Long-form-M·white, single content column, hairline section rules |

> **Lilac is never a section ground** (design system §2.2, §10). The institution audience accent is lilac, but it appears only as accent chips, cards, and highlight panels — never as a full-width band. This is enforced in code: `Section` accepts `SectionGround`, which excludes lilac.

## 4. Conversion paths (the funnels we instrument)

- **Candidate revenue:** `/` → Standard-vs-Fast-Track → `/fast-track` → checkout entry. Secondary: `/jobs` → `/jobs/[id]` → apply → Fast Track upsell at checkout.
- **Employer:** `/companies` → Post a role (free) → contact/demo.
- **Institution:** `/institutions` or `/mockhouse` → Book a demo.
- **Partner:** `/partners` → cal.com booking.

Every page has exactly one **primary** CTA (audience-appropriate) and at most one **secondary**. The free path is always a visible sibling on candidate surfaces.

## 5. Cross-links (the marketplace is a loop)

- `/` ↔ `/jobs` ↔ `/fast-track` (candidate loop)
- `/fast-track` → `/mockhouse` (the 2 mock rounds it includes)
- `/institutions` ↔ `/mockhouse` (B2B prep)
- `/companies` → `/partners` (a company can opt in to earn)
- Footer ties all worlds together.
