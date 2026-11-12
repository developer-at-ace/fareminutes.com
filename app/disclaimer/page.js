import Link from "next/link";
import styles from "../info-page.module.css";
import InfoPage from "../InfoPage";

export const metadata = {
  title: "Disclaimer — FareMinutes",
  description: "Read the FareMinutes disclaimer covering independent travel information, third-party resources, and airline references.",
};

export default function DisclaimerPage() {
  return (
    <InfoPage title="Disclaimer">
      <p><strong>Last Updated: November 12, 2026</strong></p>
      <p>Welcome to FareMinutes. Please read this disclaimer carefully before using our website.</p>

      <h2>1. General Information</h2>
      <p>FareMinutes is an independent travel information platform providing educational resources, destination information, airline policy guidance, and general travel planning content.</p>
      <p>Information published on this website is intended for general reference and should not be considered an official statement from an airline, airport, travel provider, or government authority.</p>

      <h2>2. Independent Platform</h2>
      <p>FareMinutes is not an airline, airport operator, or official airline customer support service.</p>
      <p>We are not affiliated with, sponsored by, or endorsed by any airline unless a specific relationship is expressly disclosed.</p>
      <p>We do not operate flights, issue airline tickets, access airline reservation systems, modify reservations, or process airline refunds.</p>

      <h2>3. Accuracy of Information</h2>
      <p>We aim to publish useful and accurate travel information. However, airline schedules, baggage policies, fare conditions, travel restrictions, and other details may change without notice.</p>
      <p>We cannot guarantee that all information will remain complete, current, or error-free.</p>
      <p>Travelers should verify important information with the relevant airline, travel provider, or government authority.</p>

      <h2>4. Airline Names and Trademarks</h2>
      <p>Airline names, logos, trademarks, and other brand references mentioned on FareMinutes belong to their respective owners.</p>
      <p>These references are used for identification and informational purposes only. Their appearance does not imply an official relationship, partnership, or endorsement.</p>

      <h2>5. Third-Party Websites</h2>
      <p>Our website may contain links to external websites, including airline websites, travel resources, and other third-party services.</p>
      <p>FareMinutes does not control the content, policies, security, or availability of these external websites.</p>

      <h2>6. Travel Decisions</h2>
      <p>Visitors are responsible for reviewing relevant travel information and making their own travel arrangements.</p>
      <p>FareMinutes does not guarantee airline availability, ticket prices, travel eligibility, or the outcome of any booking-related request.</p>

      <h2>7. Advertising and Affiliate Disclosure</h2>
      <p>Where applicable, FareMinutes may display advertisements, sponsored content, or affiliate links. Any commercial relationships will be disclosed as required.</p>
      <p>Advertising or referral arrangements do not establish an official affiliation with an airline.</p>

      <h2>8. Limitation of Liability</h2>
      <p>To the extent permitted by applicable law, FareMinutes is not responsible for losses arising from inaccurate third-party information, airline schedule changes, travel disruptions, or decisions made solely in reliance on general website content.</p>
      <p>Nothing in this disclaimer excludes liability that cannot legally be excluded.</p>

      <h2>9. Contact</h2>
      <p>For questions about this disclaimer, please <Link className={styles.inlineLink} href="/contact-us">contact us</Link>.</p>
    </InfoPage>
  );
}
