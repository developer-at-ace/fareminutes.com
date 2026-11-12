import InfoPage from "../InfoPage";
import styles from "../info-page.module.css";
import Link from "next/link";

export const metadata = {
  title: "Frequently Asked Questions — FareMinutes",
  description: "Find answers to common questions about FareMinutes, airline policies, reservations, baggage, and travel planning.",
};

const faqItems = [
  {
    question: "1. What is FareMinutes?",
    answer: "FareMinutes is an independent travel information website that helps visitors research flight routes, understand common airline policies, and prepare for their journeys.",
  },
  {
    question: "2. Is FareMinutes an airline?",
    answer: "No. FareMinutes is not an airline, airport, or aircraft operator. We provide general travel information and are not an official customer support service for any airline.",
  },
  {
    question: "3. Does FareMinutes charge for travel information?",
    answer: "No. Our general travel information and guidance are available free of charge.",
  },
  {
    question: "4. Can I book an airline ticket through FareMinutes?",
    answer: "FareMinutes does not directly sell or issue airline tickets. Travelers should complete reservations through an airline or an authorized booking provider.",
  },
  {
    question: "5. Can FareMinutes change my existing reservation?",
    answer: "No. We do not have access to airline reservation systems and cannot modify an existing booking.",
  },
  {
    question: "6. Where can I find information about airline baggage policies?",
    answer: "You can explore general baggage guidance on FareMinutes. For exact baggage allowances, fees, and restrictions, consult the official airline website.",
  },
  {
    question: "7. How do I cancel a flight reservation?",
    answer: "Contact the airline or booking provider responsible for your reservation. Review your ticket conditions and applicable cancellation rules before submitting a request.",
  },
  {
    question: "8. Can I get a refund for a canceled flight?",
    answer: "Refund eligibility depends on the airline, fare conditions, reason for cancellation, and applicable consumer protection rules. Contact the responsible provider for confirmation.",
  },
  {
    question: "9. Can flight prices change after I research a route?",
    answer: "Yes. Airline fares and availability can change frequently. Always confirm the current price and conditions before completing a reservation.",
  },
  {
    question: "10. Does FareMinutes provide international travel information?",
    answer: "Yes. Our informational content may cover both domestic and international travel topics, including destination research and general preparation tips.",
  },
  {
    question: "11. Can FareMinutes help me understand airline policies?",
    answer: "We publish general explanations of common airline procedures and policies. For the terms applicable to your specific ticket, consult your airline.",
  },
  {
    question: "12. Does FareMinutes provide visa or passport services?",
    answer: "No. We do not issue visas, passports, or other official travel documents. Travelers should consult the relevant government authority for current requirements.",
  },
  {
    question: "13. Why does FareMinutes mention airline names?",
    answer: "Airline names may be mentioned to help visitors identify relevant routes, policies, and travel resources. These references do not indicate an official affiliation or endorsement.",
  },
  {
    question: "14. Is my personal information secure?",
    answer: <>We take reasonable measures to protect information submitted through our website. Please review our <Link className={styles.inlineLink} href="/privacy-policy">Privacy Policy</Link> for details about how information is collected and handled.</>,
  },
  {
    question: "15. How can I contact FareMinutes?",
    answer: <>You can reach us using the official contact information published on our <Link className={styles.inlineLink} href="/contact-us">Contact Us page</Link>.</>,
  },
  {
    question: "16. Can FareMinutes help with delayed or canceled flights?",
    answer: "We can provide general information about common airline procedures. For flight-specific updates, rebooking, compensation, or refunds, contact the operating airline or your booking provider.",
  },
  {
    question: "17. Does FareMinutes guarantee the accuracy of travel information?",
    answer: "We work to provide useful information, but travel details may change. Visitors should confirm important information with official sources before traveling.",
  },
  {
    question: "18. Who should I contact about an airline payment or billing issue?",
    answer: "Contact the airline, travel agency, or booking provider that processed your payment. FareMinutes does not have access to third-party billing records.",
  },
];

export default function FAQPage() {
  return (
    <InfoPage title="Frequently Asked Questions">
      {faqItems.map((item) => (
        <section key={item.question}>
          <h2>{item.question}</h2>
          <p>{item.answer}</p>
        </section>
      ))}
    </InfoPage>
  );
}
