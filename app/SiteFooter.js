import Link from "next/link";
import homeStyles from "./page.module.css";

export default function SiteFooter() {
  return (
    <footer className={homeStyles.footer}>
      <div className={homeStyles.footerColumns}>
        <div className={homeStyles.footerBrand}>
          <a className={homeStyles.brand} href="/"><span>FareMinutes<span className={homeStyles.brandDomain}>.com</span></span></a>
          <p>An independent travel information platform for destination research and trip-planning guidance.</p>
          <a className={homeStyles.footerPhoneButton} href="tel:+18005896584">Call +1 800-589-6584</a>
        </div>
        <div>
          <h3>Company</h3>
          <Link href="/about-us">About Us</Link>
        </div>
        <div>
          <h3>Legal</h3>
          <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/faq">Frequently Asked Questions</Link>
        </div>
        <div>
          <h3>Contact</h3>
          <span className={homeStyles.footerContactLabel}>For general questions</span>
          <span className={homeStyles.footerContactLabel}>Phone</span>
          <a href="tel:+18005896584">+1 800-589-6584</a>
          <span className={homeStyles.footerContactLabel}>Email</span>
          <a href="mailto:support@fareminutes.com">support@fareminutes.com</a>
        </div>
      </div>
      <div className={homeStyles.footerBottom}>
        <strong>Disclaimer</strong>
        <p>FareMinutes provides independent travel information and general flight-planning resources. We do not operate flights, issue tickets, manage bookings, or provide official support on behalf of airlines. Confirm current details with the relevant provider or authority.</p>
        <span>© {new Date().getFullYear()} FareMinutes. All rights reserved.</span>
      </div>
    </footer>
  );
}
