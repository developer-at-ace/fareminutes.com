# Google Ads Landing-Page Compliance Audit

**Assessment date:** November 12, 2026  
**Site reviewed:** [fareminutes.com](https://www.fareminutes.com/)

## Executive summary

**Do not send paid traffic to the flight-search flow until it is working and its provider/booking model is clear.** A live JFK–LAX search returned a 503 configuration error instead of flight results. The eight informational pages load and their titles and descriptions match the requested SEO copy, but all eight still display the unrelated “TRAVELLA” brand in their shared heading. That brand label has been corrected in the local source but the fix is not yet visible on the live site.

The website's disclosures that FareMinutes is independent and does not issue tickets or manage reservations are useful. They do not establish whether the live search is purely informational, a referral/affiliate service, or part of a booking journey. That distinction, along with business-contact details and tracking practices, needs confirmation before a final readiness decision.

This is a landing-page review, not a Google Ads account review or a guarantee of approval.

## Scope and method

- Reviewed the live homepage and the About, Assistance, Contact, Disclaimer, Privacy, Terms, Cancellation & Refund, and FAQ pages on November 12, 2026.
- Checked page status, title, description, shared brand label, visible contact information, and initial-page scripts/consent UI.
- Submitted a one-way search for **JFK → LAX**, **December 15, 2026**, **1 adult**, **Economy**. No fare, availability, or booking results were returned.
- Checked mobile layout at a 375px viewport for the homepage, contact page, and flight-results route; no horizontal overflow was observed in those samples.
- Reviewed relevant local source files. No Google Ads account, campaign, ad creative, Tag Manager configuration, server environment values, provider agreement, or business registry records were available for verification.

## Findings

| Priority | Finding | Evidence and assessment | Recommended action |
|---|---|---|---|
| **P0 — fix before search ads** | Flight search is unavailable | The tested search displayed “We couldn’t load flight results” and reported that required server configuration is missing. The live search endpoint returned HTTP 503. This is a confirmed functionality issue and creates destination-quality risk for ads promising flight search or results. No prices or itineraries were verified. | Configure the provider through the deployment’s secure environment settings and verify successful searches end to end. Until then, pause ads that lead to search or clearly remove/disable the search feature and any claims that imply it works. |
| **P0 — deploy and verify** | Unrelated “TRAVELLA” brand appears across information pages | All eight live information pages displayed “TRAVELLA · TRAVEL INFORMATION” while the site identifies itself as FareMinutes. The local shared component has been changed to “FAREMINUTES · TRAVEL INFORMATION” in [app/InfoPage.js](./app/InfoPage.js), but production still showed the old label during this review. A brand mismatch can undermine user trust and create a misleading-identity concern. | Deploy the local correction and recheck all eight live pages. |
| **P1 — confirm business facts** | Business identity and support availability need verification | The live site lists E-TECH LLC, an Austin address, support@fareminutes.com, and +1 855-583-7015. The stated “9-hour support window (U.S. hours)” gives no specific days, start/end times, or time zone. The review did not verify ownership, authorization, deliverability, or real support coverage. | Confirm the legal operator, address, phone ownership/answering arrangements, and exact support hours/time zone. Publish only verified details and keep them consistent across the site and ads. |
| **P1 — clarify the service model** | Flight-search experience and “no booking” disclosures may be ambiguous | The homepage offers flight search, while the legal copy says FareMinutes does not sell tickets, manage reservations, or process payments/refunds. The search did not return results, so the provider relationship, referral/affiliate status, any fees or commissions, and the post-search journey could not be checked. | State clearly whether FareMinutes provides research only, referrals, lead generation, or a booking handoff; identify the responsible provider and disclose any commercial relationship or fee where applicable. Align the homepage, search results, contact copy, and legal pages with the actual flow. |
| **P1 — verify privacy implementation** | Privacy and consent practices are not confirmed | The Privacy Policy describes possible analytics, advertising, cookies, and contact-form data. The live contact form says it opens the visitor’s email app; local code uses a `mailto:` link rather than submitting to a website endpoint. No cookie/consent interface or third-party script URL was observed in the initial homepage DOM. This does not rule out delayed, server-side, or account-level tracking. Since that live review, a GTM loader has been added to the local root layout for all routes; it has not been deployed or verified live. | Inventory actual analytics, advertising, remarketing, and form/email processing; update the policy to describe real vendors, purposes, retention, and choices. Review the GTM container’s configured tags and, if applicable to your ads, users, and regions, implement the required consent flow before relevant tracking. |
| **P2 — technical improvement** | `robots.txt` and `sitemap.xml` are missing | Both `https://www.fareminutes.com/robots.txt` and `/sitemap.xml` returned 404. This is a crawl/discovery improvement, not by itself a Google Ads policy violation. | Add accurate robots and sitemap endpoints and include the canonical public information routes. |
| **P2 — usability improvement** | Email-draft form depends on a configured email app | The form is transparent about opening the visitor’s email app and does not silently claim to submit to a website service. Visitors without a configured email app may not be able to complete it. | Consider a secure server-backed form or add a clearly visible direct email fallback and explain that no website submission occurs. |

## Positive checks

- All eight requested informational routes returned HTTP 200.
- Their live SEO titles and descriptions matched the supplied page-specific copy.
- The site visibly identifies itself as an independent travel-information resource and says it is not an airline or official airline support service.
- The contact page visibly provides an email, phone, and business address; the form explains its email-app behavior.
- No horizontal overflow was observed in the sampled mobile layouts.

These positive checks do not verify that travel content is current, that contact details are accurate, or that a Google Ads account/ad will be approved.

## Policy relevance

The observations above may be relevant to Google Ads policies covering **misrepresentation and business identity**, **destination requirements**, **data collection and use**, and, if applicable, **pricing, unavailable offers, trademarks, or personalized advertising**. Whether a policy applies depends on the actual ads, tracking, geography, and booking model. The observed flight-search error is a confirmed site defect; it is not, by itself, a determination that Google has found a policy violation.

- [Misrepresentation](https://support.google.com/adspolicy/answer/6020955?hl=en)
- [Unacceptable business practices](https://support.google.com/adspolicy/answer/15938071?hl=en)
- [Destination requirements](https://support.google.com/adspolicy/answer/6368661?hl=en)
- [Insufficient original content](https://support.google.com/adspolicy/answer/16427718?hl=en)
- [Data collection and use](https://support.google.com/adspolicy/answer/6020956?hl=en)
- [Personalized advertising](https://support.google.com/adspolicy/answer/143465?hl=en)
- [EU user consent policy](https://www.google.com/about/company/user-consent-policy/)
- [Dishonest pricing practices](https://support.google.com/adspolicy/answer/15938375?hl=en) and [unavailable offers](https://support.google.com/adspolicy/answer/15937063?hl=en)
- [Trademark policy](https://support.google.com/adspolicy/answer/6118?hl=en)
- If running call ads/assets: [call ad requirements](https://support.google.com/adspolicy/answer/6130299?hl=en) and [call asset requirements](https://support.google.com/adspolicy/answer/1054212?hl=en)

## Facts to confirm before a final readiness decision

1. Is E-TECH LLC the legal operator, and are the published address and phone authorized for FareMinutes?
2. What are the actual support days/hours and time zone, and is the listed phone answered during those hours?
3. What is the flight-search provider relationship? Does FareMinutes receive referral/affiliate compensation, and where does a user go after selecting an itinerary?
4. Which analytics, ad, remarketing, or consent tools are active, and which countries/regions will campaigns target?
5. Are messages created through the contact form sent only by the visitor’s email client, and what mailbox access and retention practices apply?

## Overall assessment

The informational-page structure and independence disclosures are a reasonable foundation, but **the live site is not ready for ads that promise working flight search**. Resolve the P0 issues, confirm the facts above, and retest the deployed site and complete user journey before scaling or making claims about results, prices, or bookings. No approval outcome can be guaranteed by this review.
