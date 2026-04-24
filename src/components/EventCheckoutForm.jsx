import { useEffect, useState, use } from "react";
import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { AuthContext } from "../Authprovider/AuthProvider";
import { createPaymentIntent, saveEventPayment } from "../api/payments";

const EventCheckoutForm = ({ event }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { user } = use(AuthContext);

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (event?.eventFee > 0) {
      createPaymentIntent(event.eventFee).then((data) => {
        setClientSecret(data.clientSecret);
      });
    }
  }, [event]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: error.message,
      });
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: confirmError.message,
      });
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const paymentInfo = {
        userEmail: user.email,
        amount: event.eventFee,
        eventId: event._id,
        eventTitle: event.title,
        clubId: event.clubId,
        stripePaymentIntentId: paymentIntent.id,
      };

      const result = await saveEventPayment(paymentInfo);

      if (result.inserted) {
        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: "You have successfully registered for this paid event.",
        });

        navigate("/dashboard/my-events");
      } else {
        Swal.fire({
          icon: "info",
          title: "Already Registered",
          text: result.message || "You already registered for this event.",
        });

        navigate("/dashboard/my-events");
      }
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="border border-base-300 rounded-2xl p-5 bg-base-100">
        <CardElement />
      </div>

      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="btn btn-primary w-full rounded-2xl"
      >
        {processing ? "Processing..." : `Pay $${event.eventFee}`}
      </button>
    </form>
  );
};

export default EventCheckoutForm;