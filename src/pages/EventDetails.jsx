import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getEventById } from "../api/events";

const EventDetails = () => {
    const { id } = useParams();

    const { data: event, isLoading, isError } = useQuery({
        queryKey: ["eventDetails", id],
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
                <p className="text-base-content/70 mb-6">
                    The event you are looking for does not exist or failed to load.
                </p>
                <Link to="/events" className="btn btn-primary rounded-full px-6">
                    Back to Events
                </Link>
            </div>
        );
    }

    return (
        <section className="py-14 px-4 sm:px-6 lg:px-8 bg-base-100 min-h-screen">
            <div className="max-w-5xl mx-auto">
                <div className="bg-white border border-base-300 rounded-3xl shadow-lg p-8 md:p-10">
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                        <span className="badge badge-primary badge-lg">
                            {event.isPaid ? "Paid Event" : "Free Event"}
                        </span>
                        <span className="badge badge-outline badge-lg">
                            {new Date(event.eventDate).toLocaleDateString()}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-4">
                        {event.title}
                    </h1>

                    <p className="text-base md:text-lg text-base-content/70 leading-8 mb-8">
                        {event.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-base-200 rounded-2xl p-5">
                            <h3 className="text-xl font-bold mb-4">Event Information</h3>
                            <div className="space-y-3 text-sm md:text-base">
                                <p>
                                    <span className="font-semibold">Location:</span>{" "}
                                    {event.location}
                                </p>
                                <p>
                                    <span className="font-semibold">Event Date:</span>{" "}
                                    {new Date(event.eventDate).toLocaleString()}
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

                        <div className="bg-gradient-to-br from-cyan-500 via-blue-500 to-violet-500 rounded-2xl p-6 text-white flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold mb-3">Join this event</h3>
                                <p className="text-white/90 leading-7">
                                    This is the event details page. Next we will add the event
                                    registration flow for members.
                                </p>
                            </div>

                            <button className="btn btn-white mt-6 rounded-full bg-white text-slate-800 hover:bg-slate-100 border-none">
                                Registration Coming Next
                            </button>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Link to="/events" className="btn btn-outline rounded-full px-6">
                            Back to Events
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventDetails;