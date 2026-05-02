import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { getUpcomingEvents } from "../../api/events";

const UpcomingEvents = () => {
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["upcomingEvents"],
    queryFn: getUpcomingEvents,
  });

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section className="relative py-24 px-4 md:px-6 overflow-hidden bg-[linear-gradient(135deg,#ecfeff_0%,#ffffff_35%,#f5f3ff_70%,#fff1f2_100%)]">
      
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:52px_52px]"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-violet-400/25 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-28 left-1/3 w-96 h-96 bg-pink-300/25 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-white shadow-lg text-sm font-black text-cyan-600">
            ✦ ClubSphere Events
          </span>

          <h2 className="mt-6 text-4xl md:text-6xl font-black text-slate-900 leading-tight">
            Upcoming{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 bg-clip-text text-transparent">
              Events
            </span>
          </h2>

          <p className="mt-6 text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-8">
            Discover exciting club events, meetups, workshops, and community
            gatherings happening soon.
          </p>

          <div className="mt-8 flex justify-center gap-2">
            <span className="w-16 h-1.5 rounded-full bg-cyan-500"></span>
            <span className="w-8 h-1.5 rounded-full bg-blue-500"></span>
            <span className="w-16 h-1.5 rounded-full bg-violet-500"></span>
          </div>
        </div>

        {/* Empty State */}
        {events.length === 0 ? (
          <div className="max-w-2xl mx-auto rounded-[2rem] bg-white/80 backdrop-blur-xl border border-white shadow-2xl p-12 text-center">
            <h3 className="text-2xl font-black text-slate-800">
              No upcoming events found
            </h3>
            <p className="text-slate-500 mt-3">
              Please check again later for new events.
            </p>
          </div>
        ) : (
          
          /* Grid Updated → 2 Cards Per Row */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {events.map((event) => (
              <div
                key={event._id}
                className="group relative rounded-[2.2rem] p-[1.5px] bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-full rounded-[2.2rem] bg-white/95 backdrop-blur-xl overflow-hidden">

                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={event.eventImage}
                      alt={event.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                    {/* Badge */}
                    <span
                      className={`absolute top-5 left-5 px-4 py-2 rounded-full text-xs font-bold text-white shadow-lg ${
                        event.isPaid
                          ? "bg-gradient-to-r from-violet-500 to-fuchsia-500"
                          : "bg-gradient-to-r from-emerald-500 to-teal-500"
                      }`}
                    >
                      {event.isPaid ? "Paid Event" : "Free Event"}
                    </span>

                    {/* Date */}
                    <span className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md text-slate-900 px-4 py-2 rounded-full text-sm font-bold shadow-md">
                      {new Date(event.eventDate).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-7">
                    <h3 className="font-black text-2xl text-slate-900 leading-snug line-clamp-2 group-hover:text-cyan-600 transition">
                      {event.title}
                    </h3>

                    <p className="mt-4 text-sm text-slate-600 line-clamp-2 leading-7">
                      {event.description}
                    </p>

                    {/* Info Box */}
                    <div className="mt-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 p-4">
                      <p className="text-sm text-slate-700">
                        📍 <span className="font-semibold">{event.location}</span>
                      </p>

                      <p className="text-sm text-slate-700 mt-2">
                        Admission Fee:{" "}
                        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600">
                          {event.isPaid ? `$${event.eventFee}` : "Free"}
                        </span>
                      </p>
                    </div>

                    {/* Button */}
                    <Link
                      to={`/events/${event._id}`}
                      className="btn mt-7 w-full rounded-full border-none bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white font-bold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                    >
                      View Event
                    </Link>
                  </div>

                  {/* Glow */}
                  <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl group-hover:bg-violet-400/25 transition"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Button */}
        <div className="text-center mt-14">
          <Link
            to="/events"
            className="btn px-12 rounded-full border-none bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white font-black shadow-xl shadow-cyan-500/25 hover:shadow-violet-500/35 hover:scale-105 transition-all"
          >
            Explore All Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;