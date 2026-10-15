# mpetvet.com — Website audit and recommendations

Prepared by East Coast Tech, October 2026. Audited pages: Home, About, Services, Patient Center, Not-For-Profit Rescue.

## Summary

Massapequa Pet Vet has a genuinely strong story — family-owned since 1996, eight veterinarians, NYS accreditation, rare exotic and aquatic expertise, Spanish-speaking staff, a wildlife rescue partnership — but the current website hides almost all of it. The site runs on a generic Roya.com template (apparently built for real-estate listings), shows content from 2017, and buries the four actions clients actually come for: booking, records, refills and the phone number.

## Critical issues (trust and conversion)

1. **Template leftovers are visible in the page code and modals.** The site ships Bootstrap placeholder text ("Modal title", "One fine body…"), a "Save Search / Saved Searches" feature from a real-estate template, a site-login and "Update Profile" modal, and raw form error strings ("Dynamic Error Description").
2. **Contradictory hours.** The contact block says "open 7 days a week" while the hours table says Sunday is closed. Third-party listings (e.g., PetsBest) show different hours again (9am–9pm, open Sundays). Inconsistent hours hurt local SEO and frustrate clients.
3. **Primary actions are buried.** "Request an Appointment", "Pet Portal", "Request a Refill" and "Online Pharmacy" are small headings in the header, not buttons. There's no persistent call/book bar on mobile.
4. **Homepage hero repeats the same paragraph three times** (a slider with identical slides).
5. **Blog content is stale** — every featured "Client Education" article is dated 2017.
6. **Team inconsistencies.** Homepage lists 7 vets; About lists 8 (Dr. Nana Kramer missing from home). Name formats vary ("Dr. Taylor Sforza" vs "Ned Horowitz"). Dr. Kramer's education reads "Coming Soon".
7. **Copy errors** — "Your Informations is SAFE with us", "Visit Us?", duplicated "Massapequa Pet Vet" headings.
8. **Registration is a misspelled .docx download** (`Registrstion_form_new.docx`) that clients must print, fill and carry in.

## Technical issues

- **Mixed content:** CareCredit and Trupanion badges load over `http://`, which modern browsers block or flag on an HTTPS page.
- **Images borrowed from another Roya site** (`Site-3fe0bf15…`) for the sidebar CTAs — generic stock that doesn't show this clinic.
- **Heavy, duplicated markup:** navigation, contact blocks and article lists are rendered multiple times per page; hidden modals add weight.
- **No structured data** (`VeterinaryCare` schema) for hours, phone and location, so Google has to guess.
- **Slow, slider-driven hero** with no meaningful content above the fold on mobile.
- **Weak accessibility:** missing alt text on most images, low-contrast text over photos, form fields without visible labels.

## Missed opportunities

- **Exotic and aquatic medicine** — a real differentiator (Dr. Hall is a certified aquatic vet working with the Long Island Aquarium) — appears only as a line in a services list.
- **"Se habla español"** is hidden inside the services list instead of being a visible trust signal.
- **No reviews or social proof** on the site.
- **LIWAR wildlife rescue sponsorship** is a powerful community story with no visuals.
- **Payment and insurance info** (CareCredit, Trupanion direct pay) lives deep in Patient Center.
- **No "open now" or after-hours guidance** where anxious owners look first.

## What the concept landing page fixes

| Problem | Concept solution |
|---|---|
| Buried actions | Four task tiles directly under the hero + sticky Call / Book bar on mobile |
| Confusing hours | Live "Open now / Closed, opens at…" status in Eastern Time, today's row highlighted |
| Generic template look | Custom illustrations, South Shore palette, distinctive typography |
| Exotics hidden | Dedicated "Not just dogs and cats" section with species badges |
| Long unsorted services list | Filterable services by need (everyday, diagnostics, urgent, exotic, end of life) |
| Team inconsistency | All 8 vets, consistent naming, owner featured with credentials |
| No onboarding | 3-step new-client flow + payment options |
| No SEO structure | `VeterinaryCare` JSON-LD with hours, phone, address, languages |
| Accessibility | Semantic HTML, skip link, keyboard focus, reduced-motion support, AA contrast |

## Recommended tech stack

| Layer | Recommendation | Why |
|---|---|---|
| Framework | **Astro** (static-first) or **Next.js** | Near-instant page loads, excellent Core Web Vitals and SEO for a content site |
| Styling | Tailwind CSS or the hand-written CSS in this concept | Consistent design tokens, small CSS |
| CMS | **Sanity** or **Decap CMS** | Staff can update hours, vets, services and articles without a developer |
| Hosting | **Vercel** or **Netlify** | Free SSL, global CDN, automatic deploys |
| Booking / portal | Keep **AllyDVM** and **VetsFirstChoice** links (already in use) | No change to the clinic's workflow |
| Forms | Online new-client registration via Formspree / Tally → email to reception | Replaces the .docx download |
| Reviews | Google Business Profile reviews widget | Social proof on the homepage |
| Analytics | GA4 or Plausible + call/booking click tracking | Measure calls and bookings from the site |
| Local SEO | Schema markup, one source of truth for hours, sync to Google / Yelp / PetsBest | Fixes the inconsistent-hours problem |

## Notes for the pitch

- Staff photos in the concept load from the clinic's current site; if a photo fails, initials appear instead.
- The logo is a placeholder wordmark; the clinic's official logo drops in at `images/` and the `.brand` element.
- Illustrations are original artwork created for this concept.
