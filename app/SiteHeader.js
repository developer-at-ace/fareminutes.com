import Link from "next/link";
import homeStyles from "./page.module.css";
import infoStyles from "./info-page.module.css";
import SiteIcon from "./SiteIcon";

const infoPages = [
  ["About Us", "/about-us"],
  ["FAQ", "/faq"],
  ["Assistance", "/assistance"],
  ["Cancellation & Refund Policy", "/cancellation-refund"],
  ["Contact Us", "/contact-us"],
  ["Disclaimer", "/disclaimer"],
  ["Terms & Conditions", "/terms-and-conditions"],
  ["Privacy Policy", "/privacy-policy"],
];

export default function SiteHeader({ variant = "home" }) {
  if (variant === "info") {
    return (
      <header className={infoStyles.header}>
        <Link className={infoStyles.brand} href="/">FareMinutes<span>.com</span></Link>
        <nav className={infoStyles.nav} aria-label="Information pages">
          {infoPages.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          <a className={infoStyles.callButton} href="tel:+18555837015">Call us</a>
        </nav>
      </header>
    );
  }

  if (variant === "flight") {
    return (
      <header className={homeStyles.header}>
        <div className={homeStyles.topBar}>
          <Link className={homeStyles.brand} href="/" aria-label="FareMinutes home">
            <span>FareMinutes<span className={homeStyles.brandDomain}>.com</span></span>
          </Link>
          <Link className={`${homeStyles.headerCta} ${homeStyles.flightHeaderCta}`} href="/?mode=flights#flight-search">
            New flight search <SiteIcon name="arrow" size={14} />
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className={homeStyles.header}>
      <div className={homeStyles.topBar}>
        <a className={homeStyles.brand} href="#top" aria-label="FareMinutes home">
          <span>FareMinutes<span className={homeStyles.brandDomain}>.com</span></span>
        </a>
        <div className={homeStyles.headerActions}>
          <button type="button" className={homeStyles.localeButton}><span className={homeStyles.flag}>US</span> EN</button>
          <a className={homeStyles.headerCall} href="tel:+18555837015" aria-label="Call FareMinutes at +1 855-583-7015">Call us <SiteIcon name="phone" size={13} /></a>
        </div>
      </div>
      <nav className={homeStyles.primaryNav} aria-label="Main navigation">
        {infoPages.map(([label, href]) => <Link key={href} href={href} className={homeStyles.navItem}>{label}</Link>)}
      </nav>
    </header>
  );
}
