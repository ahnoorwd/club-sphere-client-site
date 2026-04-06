import { useEffect, useState, use } from "react";
import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { AuthContext } from "../Authprovider/AuthProvider";
import { createPaymentIntent, savePayment } from "../api/payments";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const CheckoutForm = ({ club }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { user } = use(AuthContext);

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (club?.membershipFee > 0) {
      createPaymentIntent(club.membershipFee).then((data) => {
        setClientSecret(data.clientSecret);
      });
    }
  }, [club]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
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
          card: card,
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
        amount: club.membershipFee,
        clubId: club._id,
        clubName: club.clubName,
        stripePaymentIntentId: paymentIntent.id,
      };

      const result = await savePayment(paymentInfo);

      if (result.inserted) {
        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: "You have successfully joined this paid club!",
        });
        navigate("/clubs");
      }
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="border border-base-300 rounded-xl p-4">
        <CardElement />
      </div>

      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="btn btn-primary w-full rounded-full"
      >
        {processing ? "Processing..." : `Pay $${club.membershipFee}`}
      </button>
    </form>
  );
};

export default CheckoutForm;