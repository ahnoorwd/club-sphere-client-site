import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { getEventById, updateEvent } from "../../api/events";

const UpdateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: event,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["updateEvent", id],
    queryFn: async () => {
      return await getEventById(id);
    },
  });

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    const form = e.target;

    const isPaid = form.isPaid.value === "true";

    const updatedData = {
      title: form.title.value,
      description: form.description.value,
      eventDate: form.eventDate.value,
      location: form.location.value,
      eventImage: form.eventImage.value,
      isPaid,
      eventFee: isPaid ? Number(form.eventFee.value) : 0,
      maxAttendees: Number(form.maxAttendees.value),
    };

    try {
      const result = await updateEvent(id, updatedData);

      if (result.modifiedCount > 0 || result.acknowledged) {
        Swal.fire({
          icon: "success",
          title: "Event Updated",
          text: "Event information updated successfully.",
        });

        navigate("/dashboard/manage-events");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to update event.",
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

  if (isError || !event) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center text-center">
        <h2 className="text-2xl font-bold">Event not found</h2>
      </div>
    );
  }

  const formattedDate = event.eventDate
    ? new Date(event.eventDate).toISOString().slice(0, 16)
    : "";

  return (
    <section className="py-10 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
            Update Event
          </h1>
          <p className="mt-3 text-slate-500 max-w-2xl">
            Edit your event details and keep the information updated for members.
          </p>
        </div>

        <div className="bg-white border border-base-300 rounded-3xl shadow-md p-6 md:p-8">
          <form
            onSubmit={handleUpdateEvent}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 text-slate-700">
                Event Title
              </label>
              <input
                type="text"
                name="title"
                defaultValue={event.title}
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
                defaultValue={event.description}
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
                defaultValue={formattedDate}
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
                defaultValue={event.location}
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
                defaultValue={event.eventImage}
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
                defaultValue={event.isPaid ? "true" : "false"}
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
                defaultValue={event.eventFee || 0}
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
                defaultValue={event.maxAttendees}
                min="1"
                className="input input-bordered w-full rounded-xl"
                required
              />
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate("/dashboard/manage-events")}
                className="btn btn-outline rounded-xl px-6"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary rounded-xl px-8">
                Update Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateEvent;