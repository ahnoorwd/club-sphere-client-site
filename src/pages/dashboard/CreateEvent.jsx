import { use } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AuthContext } from "../../Authprovider/AuthProvider";
import { createEvent, getApprovedManagerClubs } from "../../api/events";

const CreateEvent = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["approvedManagerClubs", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      return await getApprovedManagerClubs(user.email);
    },
  });

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const form = e.target;

    const clubId = form.clubId.value;
    const title = form.title.value;
    const description = form.description.value;
    const eventDate = form.eventDate.value;
    const location = form.location.value;
    const eventImage = form.eventImage.value;
    const isPaid = form.isPaid.value === "true";
    const eventFee = form.eventFee.value;
    const maxAttendees = form.maxAttendees.value;

    const eventData = {
      clubId,
      title,
      description,
      eventDate,
      location,
      eventImage,
      isPaid,
      eventFee: isPaid ? Number(eventFee) : 0,
      maxAttendees: Number(maxAttendees),
    };

    try {
      const result = await createEvent(eventData);

      if (result.insertedId || result.acknowledged) {
        Swal.fire({
          icon: "success",
          title: "Event Created",
          text: "Your event has been created successfully.",
        });

        form.reset();
        navigate("/dashboard/manage-events");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to create event. Please try again.",
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

  return (
    <section className="py-10 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
            Create Event
          </h1>
          <p className="mt-3 text-slate-500 max-w-2xl">
            Create an event for one of your approved clubs and publish it to the
            platform.
          </p>
        </div>

        <div className="bg-white border border-base-300 rounded-3xl shadow-md p-6 md:p-8">
          {clubs.length === 0 ? (
            <div className="text-center py-10">
              <h3 className="text-2xl font-bold mb-3">No approved clubs found</h3>
              <p className="text-base-content/70">
                You need at least one approved club before creating events.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleCreateEvent}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2 text-slate-700">
                  Select Club
                </label>
                <select
                  name="clubId"
                  className="select select-bordered w-full rounded-xl"
                  required
                >
                  <option value="">Choose an approved club</option>
                  {clubs.map((club) => (
                    <option key={club._id} value={club._id}>
                      {club.clubName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2 text-slate-700">
                  Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter event title"
                  className="input input-bordered w-full rounded-xl"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2 text-slate-700">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Write event description"
                  className="textarea textarea-bordered w-full rounded-xl min-h-[140px]"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">
                  Event Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="eventDate"
                  className="input input-bordered w-full rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter event location"
                  className="input input-bordered w-full rounded-xl"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2 text-slate-700">
                  Event Image URL
                </label>
                <input
                  type="text"
                  name="eventImage"
                  placeholder="Enter event image URL"
                  className="input input-bordered w-full rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">
                  Event Type
                </label>
                <select
                  name="isPaid"
                  className="select select-bordered w-full rounded-xl"
                  required
                >
                  <option value="false">Free Event</option>
                  <option value="true">Paid Event</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">
                  Event Fee
                </label>
                <input
                  type="number"
                  name="eventFee"
                  placeholder="0 for free"
                  min="0"
                  className="input input-bordered w-full rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">
                  Max Attendees
                </label>
                <input
                  type="number"
                  name="maxAttendees"
                  placeholder="Enter max attendees"
                  min="1"
                  className="input input-bordered w-full rounded-xl"
                  required
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                <button type="reset" className="btn btn-outline rounded-xl px-6">
                  Reset
                </button>
                <button type="submit" className="btn btn-primary rounded-xl px-8">
                  Create Event
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default CreateEvent;