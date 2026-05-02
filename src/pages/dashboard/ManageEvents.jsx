import { use } from "react";
import { Link } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AuthContext } from "../../Authprovider/AuthProvider";
import { deleteEvent, getManagerEvents } from "../../api/events";

const ManageEvents = () => {
  const { user } = use(AuthContext);
  const queryClient = useQueryClient();

  const {
    data: events = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["managerEvents", user?.email],
    enabled: !!user?.email,
    queryFn: async () => await getManagerEvents(user.email),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => await deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["managerEvents", user?.email]);
    },
  });

  const handleDeleteEvent = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This event will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      const result = await deleteMutation.mutateAsync(id);

      if (result.deletedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "Event deleted successfully.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to delete event.",
      });
    }
  };

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
        <h2 className="text-2xl font-bold">Failed to load events</h2>
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 p-7 md:p-9 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="uppercase tracking-[0.25em] text-xs font-semibold text-white/80 mb-2">
                Club Manager Panel
              </p>

              <h1 className="text-3xl md:text-5xl font-extrabold">
                Manage Events
              </h1>

              <p className="mt-3 text-white/90 max-w-2xl">
                View, update, and remove events created for your approved clubs.
              </p>
            </div>

            <Link
              to="/dashboard/create-event"
              className="btn bg-white text-slate-800 border-none hover:bg-slate-100 rounded-2xl px-7 shadow-md"
            >
              + Create Event
            </Link>
          </div>
        </div>

        {/* Empty State */}
        {events.length === 0 ? (
          <div className="rounded-3xl bg-white border border-base-300 shadow-md p-10 text-center">
            <h3 className="text-2xl font-bold mb-3">No events found</h3>
            <p className="text-base-content/70 mb-5">
              You have not created any events yet.
            </p>
            <Link
              to="/dashboard/create-event"
              className="btn btn-primary rounded-xl"
            >
              Create Your First Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white border border-base-300 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row h-full">
                  {/* Fixed image size */}
                  <div className="w-full lg:w-72 h-64 lg:h-auto overflow-hidden bg-slate-100">
                    <img
                      src={event.eventImage}
                      alt={event.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 md:p-6 flex flex-col">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 line-clamp-2">
                          {event.title}
                        </h2>
                        <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                          {event.description}
                        </p>
                      </div>

                      <span
                        className={`badge px-4 py-3 text-white ${
                          event.isPaid ? "badge-primary" : "badge-success"
                        }`}
                      >
                        {event.isPaid ? "Paid" : "Free"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm text-slate-600 my-5">
                      <div className="rounded-2xl bg-slate-100 p-3">
                        <p className="text-xs text-slate-400">Date</p>
                        <p className="font-semibold">
                          {new Date(event.eventDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-slate-100 p-3">
                        <p className="text-xs text-slate-400">Location</p>
                        <p className="font-semibold">{event.location}</p>
                      </div>

                      <div className="rounded-2xl bg-slate-100 p-3">
                        <p className="text-xs text-slate-400">Fee</p>
                        <p className="font-semibold text-primary">
                          ${event.eventFee || 0}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-slate-100 p-3">
                        <p className="text-xs text-slate-400">Max Attendees</p>
                        <p className="font-semibold">{event.maxAttendees}</p>
                      </div>
                    </div>

                    <div className="mt-auto flex flex-wrap justify-end gap-3 pt-4 border-t border-base-200">
                      <Link
                        to={`/events/${event._id}`}
                        className="btn btn-sm btn-outline rounded-xl"
                      >
                        View
                      </Link>

                      <Link
                        to={`/dashboard/update-event/${event._id}`}
                        className="btn btn-sm btn-primary rounded-xl"
                      >
                        Update
                      </Link>

                      <button
                        onClick={() => handleDeleteEvent(event._id)}
                        className="btn btn-sm btn-error text-white rounded-xl"
                      >
                        Delete
                      </button>
                    </div>
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

export default ManageEvents;