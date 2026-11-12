"use client";

import styles from "../info-page.module.css";

export default function ContactForm() {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const subject = String(formData.get("subject") || "");
    const message = String(formData.get("message") || "");
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const params = new URLSearchParams({ subject, body });

    window.location.href = `mailto:support@fareminutes.com?${params.toString()}`;
  }

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <label className={styles.formField}>
        Full Name
        <input className={styles.formInput} type="text" name="name" autoComplete="name" required />
      </label>
      <label className={styles.formField}>
        Email Address
        <input className={styles.formInput} type="email" name="email" autoComplete="email" required />
      </label>
      <label className={styles.formField}>
        Subject
        <input className={styles.formInput} type="text" name="subject" required />
      </label>
      <label className={styles.formField}>
        Message
        <textarea className={styles.formTextarea} name="message" rows="6" required />
      </label>
      <button className={styles.formSubmit} type="submit">Send Message</button>
    </form>
  );
}
