import Link from "next/link";
import InfoPage from "../InfoPage";
import styles from "../info-page.module.css";

export const metadata = {
  title: "Terms & Conditions — FareMinutes",
  description: "Review the terms governing access to FareMinutes and its independent travel information resources.",
};

export default function TermsAndConditionsPage() {
  return (
    <InfoPage title="Terms & Conditions">
      <p><strong>Last Updated: November 12, 2026</strong></p>
      <p>Welcome to FareMinutes. These Terms and Conditions govern your use of our website and its informational resources.</p>
      <p>By accessing or using FareMinutes, you agree to comply with these terms, subject to applicable law.</p>

      <h2>1. About Our Website</h2>
      <p>FareMinutes provides general travel information, route research resources, destination guidance, and educational content related to air travel.</p>
      <p>Our website is designed to help visitors understand travel-related topics and locate useful information.</p>
      <p>FareMinutes does not operate an airline, sell airline tickets, manage reservations, or provide official airline customer service.</p>

      <h2>2. Acceptable Use</h2>
      <p>Visitors agree to use the website for lawful purposes.</p>
      <p>You must not attempt to disrupt website operations, gain unauthorized access to our systems, submit malicious content, or use our platform for fraudulent activities.</p>

      <h2>3. Information Accuracy</h2>
      <p>We make reasonable efforts to maintain useful and accurate information.</p>
      <p>However, travel schedules, fare rules, airport information, baggage policies, and travel requirements may change.</p>
      <p>FareMinutes does not guarantee the accuracy, completeness, or continued availability of any travel information published on the website.</p>

      <h2>4. Third-Party Services</h2>
      <p>FareMinutes may provide references or links to airlines, booking providers, airports, and other travel-related organizations.</p>
      <p>These organizations operate independently and maintain their own terms, conditions, and policies.</p>
      <p>Visitors are responsible for reviewing the applicable provider&apos;s terms before completing a reservation or purchase.</p>

      <h2>5. Reservations and Payments</h2>
      <p>FareMinutes does not directly issue airline tickets, confirm reservations, or collect payments for airline bookings.</p>
      <p>Any booking or payment completed through an external provider is governed by that provider&apos;s terms and conditions.</p>

      <h2>6. Cancellation and Refund Information</h2>
      <p>FareMinutes may publish general information about cancellation procedures, ticket restrictions, and refund eligibility.</p>
      <p>We do not determine refund eligibility for airline tickets or process refunds on behalf of airlines.</p>
      <p>Travelers should contact the airline or booking provider responsible for their reservation.</p>

      <h2>7. Intellectual Property</h2>
      <p>Unless otherwise stated, the original text, website design, graphics, and other materials published by FareMinutes are owned by or licensed to the website operator.</p>
      <p>Visitors may access the content for personal, noncommercial purposes.</p>
      <p>Unauthorized reproduction, distribution, or commercial use of protected materials is prohibited except as permitted by law.</p>

      <h2>8. External Links</h2>
      <p>Links to external websites are provided for convenience and informational purposes.</p>
      <p>FareMinutes is not responsible for the availability, accuracy, security, or practices of external websites.</p>

      <h2>9. Website Availability</h2>
      <p>We aim to keep FareMinutes accessible and functional, but uninterrupted availability cannot be guaranteed.</p>
      <p>The website may occasionally be unavailable due to maintenance, technical problems, security updates, or other circumstances.</p>

      <h2>10. Limitation of Liability</h2>
      <p>To the extent permitted by law, FareMinutes is not liable for indirect or consequential losses arising from reliance on general website information, external travel services, or temporary website interruptions.</p>
      <p>Nothing in these terms limits rights or remedies that cannot legally be excluded.</p>

      <h2>11. Privacy</h2>
      <p>Use of the website is also subject to our <Link className={styles.inlineLink} href="/privacy-policy">Privacy Policy</Link>, which explains how personal information is handled.</p>

      <h2>12. Changes to These Terms</h2>
      <p>FareMinutes may update these Terms and Conditions when necessary.</p>
      <p>Revised terms will be published on this page with an updated date.</p>

      <h2>13. Applicable Law</h2>
      <p>These terms are subject to the laws applicable to the website&apos;s actual operating entity and any mandatory consumer protection requirements.</p>

      <h2>14. Contact Us</h2>
      <p>If you have questions about these Terms and Conditions, please contact FareMinutes through our <Link className={styles.inlineLink} href="/contact-us">Contact Us page</Link>.</p>
    </InfoPage>
  );
}
