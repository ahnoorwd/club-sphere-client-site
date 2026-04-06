import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CheckoutForm from "../components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const { id } = useParams();

  const { data: club, isLoading, isError } = useQuery({
    queryKey: ["paymentClub", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/clubs/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError || !club) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-4">Club Not Found</h2>
        <Link to="/clubs" className="btn btn-primary">
          Back to Clubs
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-base-100 py-12 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-start">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-base-300">
          <img
            src={club.bannerImage}
            alt={club.clubName}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-3">{club.clubName}</h2>
            <p className="text-base-content/70 mb-4">{club.description}</p>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">Category:</span> {club.category}
              </p>
              <p>
                <span className="font-semibold">Location:</span> {club.location}
              </p>
              <p>
                <span className="font-semibold">Membership Fee:</span>{" "}
                <span className="text-primary font-bold">
                  ${club.membershipFee}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-base-300 p-6">
          <h3 className="text-2xl font-bold mb-5">Complete Payment</h3>

          <Elements stripe={stripePromise}>
            <CheckoutForm club={club} />
          </Elements>
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;