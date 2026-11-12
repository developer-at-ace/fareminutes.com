import InfoPage from "../InfoPage";
import styles from "../info-page.module.css";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact FareMinutes — General Inquiries",
  description: "Contact FareMinutes for questions about our travel information, website resources, and general inquiries.",
};

export default function ContactUsPage() {
  return (
    <InfoPage title="Contact FareMinutes">
      <h2>We&apos;d Love to Hear from You</h2>
      <p>Have a question about our website or the travel information we publish? Our team welcomes general inquiries, feedback, and suggestions.</p>
      <p>Whether you&apos;ve found something that needs updating or would like us to cover a particular travel topic, we&apos;d be happy to hear from you.</p>

      <h2>Get in Touch</h2>
      <div className={styles.contactDetails}>
        <p><strong>Website:</strong> <a className={styles.inlineLink} href="https://www.fareminutes.com">www.fareminutes.com</a></p>
        <p><strong>Email:</strong> <a className={styles.inlineLink} href="mailto:support@fareminutes.com">support@fareminutes.com</a></p>
        <p><strong>Phone:</strong> <a className={styles.inlineLink} href="tel:+18005896584">+1 800-589-6584</a></p>
        <p><strong>Business Address:</strong> 8120 RESEARCH BLVD STE 105 PMB 280, AUSTIN, TX 78758</p>
        <p><strong>Support Hours:</strong> 9-hour support window (U.S. hours)</p>
      </div>

      <h2>Send Us a Message</h2>
      <p>Use our contact form to share your inquiry. Submitting the form opens your email app with your message addressed to FareMinutes.</p>
      <ContactForm />

      <h2>What Can You Contact Us About?</h2>
      <p>You can reach out regarding general travel information, website content, corrections, feedback, or questions about FareMinutes.</p>
      <p>Please note that we cannot retrieve airline reservations, process ticket changes, or handle refunds on behalf of airlines.</p>
      <p>For an existing reservation or payment-related issue, contact the airline or booking provider listed on your confirmation.</p>

      <h2>Our Commitment</h2>
      <p>We aim to provide clear, helpful information and respond to general inquiries within our normal operating hours.</p>
      <p>Please avoid sending payment card details, passport numbers, or other sensitive personal information through our contact form.</p>
    </InfoPage>
  );
}
