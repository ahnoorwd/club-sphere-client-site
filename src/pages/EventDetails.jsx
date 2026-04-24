import { use } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { getEventById } from "../api/events";
import { AuthContext } from "../Authprovider/AuthProvider";
import {
  checkEventRegistration,
  registerEvent,
} from "../api/eventRegistrations";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: event,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["eventDetails", id],
    queryFn: async () => {
      return await getEventById(id);
    },
  });

  const { data: registrationStatus = { registered: false } } = useQuery({
    queryKey: ["eventRegistrationStatus", user?.email, id],
    enabled: !!user?.email && !!id,
    queryFn: async () => {
      return await checkEventRegistration(user.email, id);
    },
  });

  const handleRegisterEvent = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login first to register for this event.",
      });
      navigate("/login");
      return;
    }

    if (event?.isPaid) {
      navigate(`/event-payment/${event._id}`);
      return;
    }

    const registrationInfo = {
      eventId: event._id,
      userEmail: user.email,
      clubId: event.clubId,
      status: "registered",
    };

    try {
      const result = await registerEvent(registrationInfo);

      if (result.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Registered",
          text: "You have successfully registered for this event.",
        });

        queryClient.invalidateQueries([
          "eventRegistrationStatus",
          user?.email,
          id,
        ]);
      } else {
        Swal.fire({
          icon: "info",
          title: "Already Registered",
          text: "You have already registered for this event.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to register for event.",
      });
    }
  };

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
      <div className="max-w-6xl mx-auto">
        <div className="bg-white border border-base-300 rounded-3xl overflow-hidden shadow-lg">
          <img
            src={event.eventImage}
            alt={event.title}
            className="w-full h-64 md:h-96 object-cover"
          />

          <div className="p-6 md:p-10">
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
              <div className="bg-base-200 rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-4">Event Information</h3>
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
                    Register for this event and become part of the ClubSphere
                    community experience.
                  </p>
                </div>

                <button
                  onClick={handleRegisterEvent}
                  disabled={registrationStatus.registered}
                  className={`btn mt-6 rounded-full border-none ${
                    registrationStatus.registered
                      ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                      : "bg-white text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  {registrationStatus.registered
                    ? "Already Registered"
                    : event.isPaid
                      ? `Pay & Register $${event.eventFee}`
                      : "Register Now"}
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
      </div>
    </section>
  );
};

export default EventDetails;
