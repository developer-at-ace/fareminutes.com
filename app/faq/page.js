import InfoPage from "../InfoPage";
import styles from "../info-page.module.css";

export const metadata = {
  title: "FAQ | FareMinutes",
  description: "Frequently asked questions about FareMinutes, route research, and trip planning.",
};

const faqItems = [
  {
    question: "What is FareMinutes?",
    answer: "FareMinutes is an independent travel information resource that helps travelers research routes, destinations, and trip planning details before making travel arrangements with a provider.",
  },
  {
    question: "Does FareMinutes book flights or issue tickets?",
    answer: "No. FareMinutes provides general travel information and research guidance. Flights, reservations, and booking terms are managed by the airline, travel agency, or other provider involved in the booking.",
  },
  {
    question: "How can FareMinutes help me plan a trip?",
    answer: "We provide destination guides, route research, and practical planning notes so travelers can compare travel options, understand common travel requirements, and prepare for their journey.",
  },
  {
    question: "Are flight prices and schedules always current?",
    answer: "No. Airfares, schedules, availability, taxes, and travel conditions can change. Always review the latest details from the relevant airline or provider before booking or traveling.",
  },
  {
    question: "Should I check entry or visa requirements before traveling?",
    answer: "Yes. Passport, visa, entry, health, and travel-document requirements can change. Confirm the latest requirements with the relevant government authority or official provider before departure.",
  },
  {
    question: "Is FareMinutes affiliated with any airline or booking provider?",
    answer: "FareMinutes operates independently and is not affiliated with or officially endorsed by any airline or travel provider unless specifically stated.",
  },
];

export default function FAQPage() {
  return (
    <InfoPage title="FAQ">
      <p>Common questions about our travel information, route research, and general trip-planning guidance.</p>
      {faqItems.map((item) => (
        <section key={item.question}>
          <h2>{item.question}</h2>
          <p>{item.answer}</p>
        </section>
      ))}
      <h2>Still have a question?</h2>
      <p>For general travel information, please contact FareMinutes using the details on our <a className={styles.inlineLink} href="/contact-us">contact page</a>. For booking-specific issues, contact the airline or provider involved in your reservation.</p>
    </InfoPage>
  );
}
