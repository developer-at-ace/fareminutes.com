import InfoPage from "../InfoPage";
import styles from "../info-page.module.css";

export const metadata = {
  title: "Privacy Policy | FareMinutes",
  description: "Learn how information entered into FareMinutes flight search is used.",
};

export default function PrivacyPolicyPage() {
  return (
    <InfoPage title="Privacy Policy">
      <p>FareMinutes respects your privacy and is committed to handling personal information responsibly. This policy explains how information may be used when you visit or use our website.</p>
      <h2>Information we may collect</h2>
      <p>When you use our travel research tools, information such as the airports, dates, travel class, and passenger counts may be processed to help return relevant results. We do not request sensitive payment details through our website.</p>
      <h2>How information is used</h2>
      <p>We use the information needed to provide route research, destination guides, and useful travel planning information. Information may also be used to improve site performance, support, and general service quality.</p>
      <h2>Third-party providers</h2>
      <p>FareMinutes does not take bookings or payments. Any information you provide to an airline, provider, agency, or other booking company is subject to that company’s own privacy terms and practices.</p>
      <h2>Questions</h2>
      <p>For questions about this policy, please <a className={styles.inlineLink} href="/contact-us">contact FareMinutes</a>.</p>
    </InfoPage>
  );
}
