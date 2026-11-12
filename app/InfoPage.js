import Link from "next/link";
import styles from "./info-page.module.css";

import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export default function InfoPage({ title, children }) {
  return (
    <div className={styles.page}>
      <SiteHeader variant="info" />
      <main className={styles.main}>
        <Link className={styles.backLink} href="/">← Back to FareMinutes</Link>
        <article className={styles.content}>
          <span className={styles.eyebrow}>FAREMINUTES · TRAVEL INFORMATION</span>
          <h1>{title}</h1>
          {children}
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
