# Content · Supporting Pages

`/about` · `/contact` · `/privacy` · `/terms` · `/consent`. Neutral accent (black/white grounds, accent used sparingly).

---

## `/about` — Company

### 1. Statement — `<HeroA>` · white
- **Eyebrow:** About · A product of Roni Analytics
- **Headline (h1):** Hiring should be decided on merit, not keywords.
- **Descriptor:** HireHouse takes the slow, expensive top of the hiring funnel off companies' hands and gives candidates a fair, fast way to be seen. Built by Roni Analytics, for the UAE and India.

### 2. What / why — `<StaggerC>` · white
- **Chips:** ["Why we built it"]
- **Headline:** We got tired of watching good people vanish into filters.
- **Cards:**
  1. **For candidates.** Every application read on merit, with feedback and assets you keep.
  2. **For companies.** A verified shortlist in days, free, so hiring isn't weeks of manual screening.
  3. **For institutions.** Whole batches interview-ready, with a clear readiness picture.
  4. **The rule.** Merit decides. Speed can be bought; a better score cannot.

### 3. Roni Analytics — `<ClosingM>` · black
- **Headline (Hero):** Built by Roni Analytics.
- **Descriptor:** HireHouse and MockHouse are products of Roni Analytics.
- **Contact grid:** Parent company · Roni Analytics · Markets · UAE & India · Products · HireHouse, MockHouse, Fast Track · Contact · `/contact`
- **Note:** Team, funding, and metrics — to be added as they're confirmed. (No placeholder bios or numbers.)

---

## `/contact` — Contact + routing

### 1. Split — `<ScorecardD>` · white
- **Chips:** ["Contact"]
- **Headline (h1):** Tell us who you are. We'll point you the right way.
- **Routes (intent cards, honour `?intent=` query):**
  - **I'm hiring.** Post a role or book a walkthrough → company form.
  - **I'm job hunting.** Browse jobs or ask about Fast Track → `/jobs`, `/fast-track`.
  - **I'm an institution.** Book a MockHouse demo → institution form.
  - **I want to partner.** Book a partner call → cal.com.
  - **Press / other.** General enquiry → email.
- **Form (server action + Zod):** name, email, intent (pre-filled from query), message. No sensitive data collected. Consent-aware. Success + error states written in-voice.
- **Panel (accent):** eyebrow WHERE WE ARE · body: UAE (Dubai) and India. Remote-friendly team.

---

## `/consent` — Interview-recording consent policy  *(first-class, brand doc §12.4)*

### `<ClosingM>`-long · white, single column, hairline section rules
- **Headline (h1):** How we handle your interview recordings.
- **Sections (plain, honest, readable):**
  1. **What we record.** Structured interview and mock rounds, when a video round applies.
  2. **Why.** To evaluate fairly, give you feedback, and share with the relevant hiring team only.
  3. **Your consent.** Recording only happens with your explicit consent. You can decline and still use the free path where a video round isn't required.
  4. **Who can see it.** Access is limited to the hiring team for roles you apply to, and our review team. Not public, not sold.
  5. **How long we keep it.** Retained under a defined limit, then deleted. You can request deletion.
  6. **Young candidates.** Many candidates are 18–22. Consent, access control, and retention are built in, not optional.
  7. **Your rights.** Access, correction, and deletion requests, per UAE and India rules.
- **Note:** This is a plain-language summary. The full legal terms live in `/terms` and `/privacy`.

---

## `/privacy` and `/terms` — long-form legal

### `<ClosingM>`-long · white
- Single readable column, `--fs-body`, hairline section rules, table of contents anchor list at top.
- **Privacy:** data collected, purposes, legal bases, cross-border transfer (UAE/India, and India→UAE payment/data flows), retention, cookies/consent, candidate video handling (links `/consent`), rights, contact.
- **Terms:** service description (marketplace + MockHouse + Fast Track), the optional-priority-service framing and free-alternative statement, 72h-or-refund terms, payments by market (MoR / PA-CB boundary, AED/INR, GST/OIDAR note), no-guarantee-of-outcome statement, acceptable use, liability, governing law by market.
- **Rule:** legal copy is placeholder-structured with `TODO(counsel)` markers where local counsel must sign off (brand doc §12.3, §12.5). Nothing ships as final legal text without review.

---

**Non-negotiables check across supporting pages:** no fabricated team/funding/metrics (about §3 note) · consent policy is first-class and linked from every recording mention · legal framing of the fee + free alternative in terms · payments-by-market documented · `TODO(counsel)` gates on legal.
