import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { getAllEvents } from "../api/events";

const Events = () => {
  const [searchText, setSearchText] = useState("");
  const [eventType, setEventType] = useState("all");
  const [sortOrder, setSortOrder] = useState("upcoming");

  const {
    data: events = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      return await getAllEvents();
    },
  });

  const filteredEvents = events
    .filter((event) => {
      const search = searchText.toLowerCase();

      const matchesSearch =
        event.title?.toLowerCase().includes(search) ||
        event.location?.toLowerCase().includes(search) ||
        event.description?.toLowerCase().includes(search);

      const matchesType =
        eventType === "all" ||
        (eventType === "free" && !event.isPaid) ||
        (eventType === "paid" && event.isPaid);

      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortOrder === "upcoming") {
        return new Date(a.eventDate) - new Date(b.eventDate);
      }

      if (sortOrder === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      return 0;
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
        {/* Header */}
        <div className="text-center mb-12">
          {/* Small Label */}
          <p className="text-sm font-semibold uppercase tracking-[0.3em] bg-gradient-to-r from-cyan-500 to-violet-500 text-transparent bg-clip-text mb-3">
            Discover Events
          </p>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 text-transparent bg-clip-text">
            Upcoming Events
          </h1>

          {/* Description */}
          <p className="mt-5 text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Explore exciting{" "}
            <span className="font-semibold text-primary">club events</span>,
            workshops, meetups, and community gatherings happening soon.
          </p>

          {/* Decorative Line */}
          <div className="mt-6 flex justify-center">
            <div className="w-24 h-1 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500"></div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-12 rounded-[2rem] bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 p-[2px] shadow-2xl">
          <div className="rounded-[2rem] bg-white/95 backdrop-blur-xl p-5 md:p-7">
            <div className="mb-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Find Your Event
                </p>
                <h3 className="text-2xl font-extrabold text-slate-800 mt-1">
                  Search & Filter Events
                </h3>
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-3 text-white shadow-md">
                <p className="text-sm">
                  Showing{" "}
                  <span className="text-xl font-extrabold">
                    {filteredEvents.length}
                  </span>{" "}
                  event(s)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <input
                  type="text"
                  placeholder="Search by title, location, or description..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="input input-bordered w-full rounded-2xl pl-12 h-14 bg-slate-50 border-slate-200 focus:border-primary focus:outline-none"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                  🔍
                </span>
              </div>

              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="select select-bordered w-full rounded-2xl h-14 bg-slate-50 border-slate-200 focus:border-primary focus:outline-none"
              >
                <option value="all">All Events</option>
                <option value="free">Free Events</option>
                <option value="paid">Paid Events</option>
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="select select-bordered w-full rounded-2xl h-14 bg-slate-50 border-slate-200 focus:border-primary focus:outline-none"
              >
                <option value="upcoming">Upcoming First</option>
                <option value="latest">Latest Created</option>
              </select>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-outline px-4 py-3">
                  Search: {searchText ? searchText : "None"}
                </span>
                <span className="badge badge-primary px-4 py-3 capitalize">
                  {eventType}
                </span>
                <span className="badge badge-secondary px-4 py-3">
                  {sortOrder === "upcoming"
                    ? "Upcoming First"
                    : "Latest Created"}
                </span>
              </div>

              <button
                onClick={() => {
                  setSearchText("");
                  setEventType("all");
                  setSortOrder("upcoming");
                }}
                className="btn btn-outline rounded-2xl px-6 hover:bg-primary hover:text-white"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Events */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-md border border-base-300">
            <h3 className="text-2xl font-semibold mb-2">No events found</h3>
            <p className="text-base-content/70">
              Try changing your search or filter options.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event._id}
                className="group bg-white border border-base-300 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
              >
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

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <p className="text-sm text-base-content/60 mb-2">
                      {new Date(event.eventDate).toLocaleDateString()}
                    </p>

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
                        <span className="font-semibold">Admition Fee:</span>{" "}
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
