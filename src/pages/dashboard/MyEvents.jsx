import { use } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Authprovider/AuthProvider";
import { getUserRegisteredEvents } from "../../api/eventRegistrations";

const MyEvents = () => {
  const { user } = use(AuthContext);

  const {
    data: registeredEvents = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myRegisteredEvents", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      return await getUserRegisteredEvents(user.email);
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center text-center">
        <h2 className="text-2xl font-bold">Failed to load your events</h2>
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 p-7 md:p-9 text-white shadow-xl overflow-hidden relative">
          <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-white/10"></div>
          <div className="absolute right-24 -bottom-20 w-60 h-60 rounded-full bg-white/10"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="uppercase tracking-[0.25em] text-xs font-semibold text-white/80 mb-2">
                Member Dashboard
              </p>

              <h1 className="text-3xl md:text-5xl font-extrabold">
                My Registered Events
              </h1>

              <p className="mt-3 text-white/90 max-w-2xl">
                Track the events you joined, review schedules, and revisit event
                details anytime.
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20">
              <p className="text-sm text-white/80">Total Registered</p>
              <h3 className="text-4xl font-extrabold">
                {registeredEvents.length}
              </h3>
            </div>
          </div>
        </div>

        {registeredEvents.length === 0 ? (
          <div className="rounded-3xl bg-white border border-base-300 shadow-md p-10 text-center">
            <h3 className="text-2xl font-bold mb-3">
              No registered events yet
            </h3>
            <p className="text-base-content/70 mb-5">
              You have not registered for any event yet. Explore upcoming events
              and join one.
            </p>
            <Link to="/events" className="btn btn-primary rounded-xl">
              Explore Events
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
            {registeredEvents.map((item) => {
              const event = item.event;

              if (!event) return null;

              return (
                <div
                  key={item._id}
                  className="group bg-white border border-base-300 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className="flex flex-col xl:flex-row h-full">
                    {/* Image */}
                    <div className="relative w-full xl:w-72 h-64 xl:h-auto overflow-hidden bg-slate-100">
                      <img
                        src={event.eventImage}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      <div className="absolute top-4 left-4">
                        <span className="badge bg-white text-slate-800 border-none px-4 py-3 shadow-md">
                          {event.isPaid ? "Paid Event" : "Free Event"}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5 md:p-6 flex flex-col">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div>
                          <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 line-clamp-2">
                            {event.title}
                          </h2>

                          <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                            {event.description}
                          </p>
                        </div>

                        <span className="badge badge-success px-4 py-3 text-white capitalize">
                          {item.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm text-slate-600 my-5">
                        <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 border border-slate-100">
                          <p className="text-xs text-slate-400">Event Date</p>
                          <p className="font-bold text-slate-700">
                            {new Date(event.eventDate).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 border border-slate-100">
                          <p className="text-xs text-slate-400">Location</p>
                          <p className="font-bold text-slate-700">
                            {event.location}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 border border-slate-100">
                          <p className="text-xs text-slate-400">Fee</p>
                          <p className="font-bold text-primary">
                            {event.isPaid ? `$${event.eventFee}` : "Free"}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 border border-slate-100">
                          <p className="text-xs text-slate-400">Registered</p>
                          <p className="font-bold text-slate-700">
                            {new Date(item.registeredAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="mt-auto flex flex-wrap justify-end gap-3 pt-4 border-t border-base-200">
                        <Link
                          to={`/events/${event._id}`}
                          className="btn btn-sm btn-outline rounded-xl"
                        >
                          View Details
                        </Link>

                        <Link
                          to="/events"
                          className="btn btn-sm btn-primary rounded-xl"
                        >
                          Browse More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyEvents;