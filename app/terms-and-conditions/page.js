import InfoPage from "../InfoPage";

export const metadata = {
  title: "Terms & Conditions | FareMinutes",
  description: "Terms for using FareMinutes’ travel guides and information.",
};

export default function TermsAndConditionsPage() {
  return (
    <InfoPage title="Terms & Conditions">
      <p>By using FareMinutes, you agree to use this website and its content for lawful, personal, informational purposes.</p>
      <h2>General information only</h2>
      <p>Travel guides, route details, and planning suggestions are provided for general information. They are not a guarantee of availability, price, safety, or eligibility. Information can change, so confirm important details with the relevant airline, booking provider, government authority, or other official source.</p>
      <h2>Third-party services</h2>
      <p>FareMinutes does not operate flights, issue tickets, or manage bookings. Third-party providers are responsible for their own services, terms, schedules, fares, and booking support.</p>
      <h2>Website use</h2>
      <p>Please do not misuse the website or interfere with its operation. All content is provided to the extent permitted by applicable law, and we do not guarantee uninterrupted or error-free access.</p>
      <h2>Updates</h2>
      <p>These terms may be updated as the website changes. Continued use of FareMinutes after an update means you accept the revised terms.</p>
    </InfoPage>
  );
}
