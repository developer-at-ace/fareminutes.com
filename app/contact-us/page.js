import InfoPage from "../InfoPage";
import styles from "../info-page.module.css";

export const metadata = {
  title: "Contact Us | FareMinutes",
  description: "Contact FareMinutes by phone for general travel information.",
};

export default function ContactUsPage() {
  return (
    <InfoPage title="Contact Us">
      <p>If you have a general question about our website, travel information, or planning resources, please use the contact details below.</p>
      <a className={styles.callLink} href="tel:+18005896584">Call +1 800-589-6584</a>
      <h2>Booking-specific questions</h2>
      <p>FareMinutes does not operate flights, issue tickets, or manage reservations. For changes, cancellations, baggage, fare rules, or other booking-specific questions, please contact the airline or travel provider associated with your reservation.</p>
      <h2>Before you travel</h2>
      <p>We recommend checking the most recent travel requirements, entry rules, baggage policies, and booking conditions directly with the airline, provider, or relevant authority before you depart.</p>
    </InfoPage>
  );
}
