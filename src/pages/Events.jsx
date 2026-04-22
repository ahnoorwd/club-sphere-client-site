import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { getAllEvents } from "../api/events";

const Events = () => {
  const { data: events = [], isLoading, isError } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      return await getAllEvents();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Failed to load events</h2>
        <p className="text-base-content/70">Please try again later.</p>
      </div>
    );
  }

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 bg-base-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-base-content">
            Upcoming Events
          </h1>
          <p className="mt-4 text-base md:text-lg text-base-content/70 max-w-2xl mx-auto">
            Explore exciting club events, workshops, meetups, and community
            gatherings happening soon.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold mb-2">No events found</h3>
            <p className="text-base-content/70">
              There are no upcoming events right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {events.map((event) => (
              <div
                key={event._id}
                className="group bg-white border border-base-300 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
              >
                {/* Event Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={event.eventImage}
                    alt={event.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute top-4 left-4">
                    <span className="badge badge-primary badge-outline bg-white/90 backdrop-blur-sm px-4 py-3">
                      {event.isPaid ? "Paid Event" : "Free Event"}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="text-sm text-base-content/60">
                        {new Date(event.eventDate).toLocaleDateString()}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-800 mb-3 line-clamp-2">
                      {event.title}
                    </h2>

                    <p className="text-base-content/70 mb-4 line-clamp-3">
                      {event.description}
                    </p>

                    <div className="space-y-2 text-sm text-base-content/80">
                      <p>
                        <span className="font-semibold">Location:</span>{" "}
                        {event.location}
                      </p>
                      <p>
                        <span className="font-semibold">Max Attendees:</span>{" "}
                        {event.maxAttendees || "Unlimited"}
                      </p>
                      <p>
                        <span className="font-semibold">Fee:</span>{" "}
                        <span className="text-primary font-bold">
                          {event.isPaid ? `$${event.eventFee}` : "Free"}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-base-300 flex items-center justify-between">
                    <p className="text-sm text-base-content/60">
                      Event Details
                    </p>
                    <Link
                      to={`/events/${event._id}`}
                      className="btn btn-primary btn-sm rounded-full px-5"
                    >
                      View Event
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;