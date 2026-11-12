import InfoPage from "../InfoPage";

export const metadata = {
  title: "Travel Information & Guidance — FareMinutes",
  description: "Find helpful information about reservations, baggage, cancellations, refunds, and travel preparation.",
};

export default function AssistancePage() {
  return (
    <InfoPage title="Travel Information & Assistance">
      <h2>Have a Travel Question? Start Here.</h2>
      <p>Airline policies and travel requirements can sometimes be difficult to understand, especially when you&apos;re preparing for a trip.</p>
      <p>FareMinutes provides general travel information to help you find relevant resources, understand common travel procedures, and identify the right next steps.</p>

      <h2>Flight Reservation Guidance</h2>
      <p>Before making a reservation, it&apos;s helpful to review your travel dates, airport locations, passenger information, and fare conditions.</p>
      <p>We explain common reservation terms and provide general guidance on what travelers should check before completing a purchase through an airline or authorized booking provider.</p>

      <h2>Flight Changes and Cancellations</h2>
      <p>Travel plans don&apos;t always go as expected.</p>
      <p>If you need to change or cancel a trip, understanding the applicable fare rules is an important first step.</p>
      <p>FareMinutes provides general information about change restrictions, cancellation procedures, and questions you may want to ask your airline.</p>

      <h2>Refund Information</h2>
      <p>Refund eligibility depends on several factors, including the ticket type, airline policy, reason for cancellation, and applicable consumer protections.</p>
      <p>We help visitors understand common refund terminology and where to find official refund information.</p>

      <h2>Baggage and Travel Preparation</h2>
      <p>Different airlines may have different rules for checked baggage, carry-on items, personal belongings, and restricted items.</p>
      <p>Our informational resources help travelers identify the details they should verify before departure.</p>

      <h2>Finding the Right Airline Contact</h2>
      <p>For reservation changes, payment questions, refunds, or flight-specific concerns, the airline or booking provider responsible for your reservation is usually the appropriate point of contact.</p>
      <p>FareMinutes can provide general guidance on finding official airline contact resources.</p>

      <h2>Important Information</h2>
      <p>FareMinutes is an independent travel information website. We do not access airline reservation systems, modify bookings, issue tickets, process refunds, or represent airline customer service departments.</p>
      <p>For actions involving an existing reservation, please contact the airline or travel provider directly.</p>
    </InfoPage>
  );
}
