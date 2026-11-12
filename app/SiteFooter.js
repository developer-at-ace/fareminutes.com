import Link from "next/link";
import homeStyles from "./page.module.css";

export default function SiteFooter() {
  return (
    <footer className={homeStyles.footer}>
      <div className={homeStyles.footerColumns}>
        <div className={homeStyles.footerBrand}>
          <a className={homeStyles.brand} href="/"><span>FareMinutes<span className={homeStyles.brandDomain}>.com</span></span></a>
          <p>
            <strong>Travel information made simple.</strong><br />
            FareMinutes is an independent travel information platform providing free guidance on flight routes, destinations, airline policies, and travel preparation.
            <br /><br />
            <strong>Operated by: E-TECH LLC</strong>
          </p>
          <a className={homeStyles.footerPhoneButton} href="tel:+18555837015">Call +1 855-583-7015</a>
        </div>
        <div>
          <h3>Quick Links</h3>
          <Link href="/">Home</Link>
          <Link href="/about-us">About Us</Link>
          <Link href="/assistance">Assistance</Link>
          <Link href="/contact-us">Contact Us</Link>
          <Link href="/faq">FAQs</Link>
        </div>
        <div>
          <h3>Legal</h3>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
          <Link href="/disclaimer">Disclaimer</Link>
          <Link href="/cancellation-refund">Cancellation &amp; Refund Policy</Link>
        </div>
        <div>
          <h3>Contact Information</h3>
          <span className={homeStyles.footerContactLabel}>Email:</span>
          <a href="mailto:support@fareminutes.com">support@fareminutes.com</a>
          <span className={homeStyles.footerContactLabel}>Phone:</span>
          <a href="tel:+18555837015">+1 855-583-7015</a>
          <span className={homeStyles.footerContactLabel}>Address:</span>
          <address className={homeStyles.footerContactAddress}>8120 RESEARCH BLVD STE 105 PMB 280, AUSTIN, TX 78758</address>
        </div>
      </div>
      <div className={homeStyles.footerBottom}>
        <strong>Independent Travel Information Disclaimer</strong>
        <p>FareMinutes is not an airline or an official airline customer service provider. We do not issue tickets, manage reservations, or process airline refunds. Airline names and trademarks belong to their respective owners.</p>
        <span>© {new Date().getFullYear()} FareMinutes. All rights reserved.</span>
      </div>
    </footer>
  );
}
