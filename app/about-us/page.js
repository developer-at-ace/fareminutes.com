import InfoPage from "../InfoPage";

export const metadata = {
  title: "About FareMinutes — Independent Travel Information",
  description: "Learn about FareMinutes and how we help travelers understand airline policies, explore routes, and plan their journeys.",
};

export default function AboutUsPage() {
  return (
    <InfoPage title="About FareMinutes">
      <h2>Making Travel Information Easier to Understand</h2>
      <p>Planning a trip often begins with questions. Which route makes sense? What should you know about baggage? Where can you find an airline&apos;s cancellation policy?</p>
      <p>At FareMinutes, we believe travelers should be able to find useful answers without spending hours searching through different websites.</p>
      <p>FareMinutes is an independent travel information platform created to help people understand common travel topics, explore destinations, and prepare for upcoming journeys.</p>

      <h2>What We Do</h2>
      <p>We provide practical information about flight routes, airline policies, travel preparation, and common questions travelers face before and after making reservations.</p>
      <p>Our resources cover topics such as:</p>
      <ul>
        <li>Flight routes and destination research</li>
        <li>General airline reservation information</li>
        <li>Baggage rules and travel preparation</li>
        <li>Flight changes and cancellation policies</li>
        <li>Refund procedures and airline contact guidance</li>
        <li>General travel tips for domestic and international journeys</li>
      </ul>
      <p>Our goal is to explain travel-related information in clear, everyday language.</p>

      <h2>Our Approach</h2>
      <p>Travel plans are personal, and every journey comes with different requirements. We focus on making information understandable so visitors can research their options and make informed decisions.</p>
      <p>We encourage travelers to confirm important details directly with their airline, travel provider, or relevant government authority.</p>

      <h2>An Independent Travel Resource</h2>
      <p>FareMinutes operates independently and is not owned, operated, sponsored, or endorsed by any airline.</p>
      <p>We do not operate flights, issue airline tickets, manage reservations, or act as an airline&apos;s official customer service department.</p>
      <p>Our website is intended for general travel research and informational guidance.</p>

      <h2>Travel with Better Information</h2>
      <p>Whether you&apos;re planning a family vacation, preparing for a business trip, or simply trying to understand an airline policy, FareMinutes is here to make your research a little easier.</p>
    </InfoPage>
  );
}
