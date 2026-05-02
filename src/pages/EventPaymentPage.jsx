import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getEventById } from "../api/events";
import EventCheckoutForm from "../components/EventCheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const EventPaymentPage = () => {
  const { id } = useParams();

  const {
    data: event,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["eventPayment", id],
    queryFn: async () => {
      return await getEventById(id);
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Event Not Found</h2>
        <Link to="/events" className="btn btn-primary rounded-full">
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-base-100 py-12 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-base-300">
          <img
            src={event.eventImage}
            alt={event.title}
            className="w-full h-72 object-cover"
          />

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="badge badge-primary badge-lg">Paid Event</span>
              <span className="badge badge-outline badge-lg">
                ${event.eventFee}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
              {event.title}
            </h2>

            <p className="text-base-content/70 leading-7 mb-6">
              {event.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="rounded-2xl bg-base-200 p-4">
                <p className="text-slate-400">Date</p>
                <p className="font-semibold">
                  {new Date(event.eventDate).toLocaleString()}
                </p>
              </div>

              <div className="rounded-2xl bg-base-200 p-4">
                <p className="text-slate-400">Location</p>
                <p className="font-semibold">{event.location}</p>
              </div>

              <div className="rounded-2xl bg-base-200 p-4">
                <p className="text-slate-400">Max Attendees</p>
                <p className="font-semibold">{event.maxAttendees}</p>
              </div>

              <div className="rounded-2xl bg-base-200 p-4">
                <p className="text-slate-400">Fee</p>
                <p className="font-semibold text-primary">${event.eventFee}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-base-300 p-6 md:p-8 sticky top-24">
          <h3 className="text-2xl font-extrabold text-slate-800 mb-2">
            Complete Event Payment
          </h3>
          <p className="text-slate-500 mb-6">
            Pay securely to confirm your event registration.
          </p>

          <Elements stripe={stripePromise}>
            <EventCheckoutForm event={event} />
          </Elements>

          <Link
            to={`/events/${event._id}`}
            className="btn btn-outline w-full rounded-2xl mt-4"
          >
            Back to Event Details
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventPaymentPage;