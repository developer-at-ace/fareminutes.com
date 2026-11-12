import Link from "next/link";
import styles from "../info-page.module.css";
import InfoPage from "../InfoPage";

export const metadata = {
  title: "Cancellation & Refund Policy — FareMinutes",
  description: "Understand FareMinutes' informational role and where to find airline cancellation and refund guidance.",
};

export default function CancellationRefundPage() {
  return (
    <InfoPage title="Cancellation & Refund Policy">
      <p><strong>Last Updated: November 12, 2026</strong></p>
      <p>At FareMinutes, we understand that travel plans can change unexpectedly. This page explains our role in providing cancellation and refund information and helps visitors understand where to direct reservation-related requests.</p>

      <h2>1. Our Services</h2>
      <p>FareMinutes is an independent travel information platform.</p>
      <p>We provide general guidance about airline policies, travel planning, reservation procedures, and refund-related topics.</p>
      <p>We do not sell airline tickets, collect booking payments, issue reservations, or process airline cancellations and refunds.</p>

      <h2>2. Fees for Our Information Services</h2>
      <p>FareMinutes provides its general travel information and guidance free of charge.</p>
      <p>Because we do not charge visitors for these informational services, there are no FareMinutes service fees to cancel or refund.</p>

      <h2>3. Airline Reservation Cancellations</h2>
      <p>If you need to cancel an airline reservation, please contact the airline or travel provider through which your ticket was purchased.</p>
      <p>Cancellation rules may depend on your ticket type, fare restrictions, airline policy, and the timing of your request.</p>

      <h2>4. Refund Eligibility</h2>
      <p>Refund eligibility is determined by the applicable airline or travel provider, together with relevant consumer protection laws.</p>
      <p>Some tickets may be refundable, while others may have restrictions or conditions.</p>
      <p>Travelers should review the terms provided at the time of purchase.</p>

      <h2>5. Flight Changes and Disruptions</h2>
      <p>If your airline cancels or significantly changes a flight, your available options may depend on the circumstances and applicable rules.</p>
      <p>Depending on the situation, these options may include alternative travel arrangements, travel credits, or refunds.</p>
      <p>Please contact the responsible airline or booking provider for information specific to your reservation.</p>

      <h2>6. Refund Processing Times</h2>
      <p>FareMinutes does not control airline refund processing.</p>
      <p>The time required to receive a refund may depend on the provider&apos;s procedures, payment method, financial institution, and applicable legal requirements.</p>

      <h2>7. Third-Party Transactions</h2>
      <p>If you purchase a travel service through a website linked from FareMinutes, that transaction is between you and the relevant provider.</p>
      <p>FareMinutes is not responsible for processing or approving refunds for transactions completed through independent third parties.</p>

      <h2>8. Need More Information?</h2>
      <p>Our website provides general information about travel policies and common cancellation procedures.</p>
      <p>For assistance with an actual reservation, contact the airline or booking provider shown on your booking confirmation.</p>
      <p>For questions about FareMinutes itself, please use our <Link className={styles.inlineLink} href="/contact-us">Contact Us page</Link>.</p>
    </InfoPage>
  );
}
