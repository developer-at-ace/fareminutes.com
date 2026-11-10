import InfoPage from "../InfoPage";

export const metadata = {
  title: "About Us | FareMinutes",
  description: "Learn about FareMinutes’ independent destination guides and travel planning information.",
};

export default function AboutUsPage() {
  return (
    <InfoPage title="About Us">
      <p>FareMinutes is an independent travel information resource for destinations, flight routes, and practical trip planning. We help travelers research options and prepare for their journeys before booking with a provider.</p>
      <h2>What FareMinutes is</h2>
      <p>FareMinutes is a free, independent travel information platform built to help travelers research routes and destinations. We provide general guidance and planning notes to make traveling easier to understand.</p>
      <h2>How we help</h2>
      <p>We provide route information, destination details, and general travel guidance to help you research your options before booking with a provider. This can include practical trip-planning information, airport and route insights, and destination basics.</p>
      <h2>No affiliation, no fees</h2>
      <p>FareMinutes works independently and does not charge service fees for general travel research. We are not an airline, airport operator, or booking provider, and we do not manage reservations on behalf of any airline.</p>
    </InfoPage>
  );
}
