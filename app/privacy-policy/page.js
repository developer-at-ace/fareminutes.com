import Link from "next/link";
import InfoPage from "../InfoPage";
import styles from "../info-page.module.css";

export const metadata = {
  title: "Privacy Policy — FareMinutes",
  description: "Learn how FareMinutes handles visitor information, cookies, website analytics, and privacy requests.",
};

export default function PrivacyPolicyPage() {
  return (
    <InfoPage title="Privacy Policy">
      <p><strong>Last Updated: November 12, 2026</strong></p>
      <p>FareMinutes respects the privacy of visitors who use our website. This Privacy Policy explains how personal information may be collected, used, shared, and protected when you interact with our platform.</p>

      <h2>1. Information We Collect</h2>
      <p>Depending on the features you use, we may collect information you voluntarily provide, such as your name, email address, telephone number, and the contents of messages submitted through our contact forms.</p>
      <p>We may also collect technical information, including IP addresses, browser types, device information, referring pages, and website usage data.</p>

      <h2>2. How We Use Information</h2>
      <p>Information collected through FareMinutes may be used to:</p>
      <ul>
        <li>Respond to website inquiries and feedback.</li>
        <li>Provide requested information.</li>
        <li>Improve website functionality and content.</li>
        <li>Monitor website performance and security.</li>
        <li>Detect suspicious or unauthorized activity.</li>
        <li>Comply with applicable legal obligations.</li>
      </ul>
      <p>We do not require payment card information for general travel information inquiries.</p>

      <h2>3. Cookies and Analytics</h2>
      <p>FareMinutes may use cookies and similar technologies to support website functionality, understand visitor activity, and improve the browsing experience.</p>
      <p>Where analytics or advertising tools are enabled, these services may collect information according to their own privacy practices.</p>
      <p>Visitors can manage cookies through their browser settings and any consent controls provided on our website.</p>

      <h2>4. Sharing of Information</h2>
      <p>We do not sell personal information to third parties for monetary consideration.</p>
      <p>We may share limited information with service providers who assist with website hosting, communication, analytics, or security, subject to applicable contractual and legal requirements.</p>
      <p>Information may also be disclosed when required by law or necessary to protect legitimate rights and interests.</p>

      <h2>5. Data Security</h2>
      <p>We take reasonable technical and organizational measures to protect information against unauthorized access, misuse, alteration, and disclosure.</p>
      <p>However, no method of electronic transmission or storage can be guaranteed completely secure.</p>

      <h2>6. Data Retention</h2>
      <p>We retain personal information only for as long as reasonably necessary to fulfill the purposes described in this policy or meet applicable legal obligations.</p>
      <p>Retention periods may vary depending on the type of information and the reason it was collected.</p>

      <h2>7. Your Privacy Choices</h2>
      <p>Depending on your location and applicable law, you may have the right to request access to, correction of, or deletion of certain personal information.</p>
      <p>You may also have rights to opt out of certain data processing activities or withdraw consent where consent is the legal basis for processing.</p>
      <p>To submit a privacy request, contact us using the information on our <Link className={styles.inlineLink} href="/contact-us">Contact Us page</Link>.</p>

      <h2>8. Third-Party Links</h2>
      <p>Our website may link to external airline websites, travel resources, and other independent platforms.</p>
      <p>We are not responsible for the privacy practices of these websites. Visitors should review the applicable privacy policies before providing personal information.</p>

      <h2>9. Children&apos;s Privacy</h2>
      <p>FareMinutes is intended for a general audience and is not directed toward children under 13.</p>
      <p>We do not knowingly collect personal information from children under 13. If we learn that such information has been collected, we will take appropriate steps to delete it.</p>

      <h2>10. Changes to This Policy</h2>
      <p>We may update this Privacy Policy to reflect changes in our website, technology, business practices, or legal requirements.</p>
      <p>Updates will be published on this page with a revised date.</p>

      <h2>11. Contact Information</h2>
      <p>For questions about this Privacy Policy or requests concerning personal information, please contact FareMinutes through our official <Link className={styles.inlineLink} href="/contact-us">Contact Us page</Link>.</p>
    </InfoPage>
  );
}
