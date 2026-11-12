import InfoPage from "../InfoPage";
import { faqItems } from "../faqItems";

export const metadata = {
  title: "Frequently Asked Questions — FareMinutes",
  description: "Find answers to common questions about FareMinutes, airline policies, reservations, baggage, and travel planning.",
};

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
