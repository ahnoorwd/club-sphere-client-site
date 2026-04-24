import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Authprovider/AuthProvider";
import { getUserPayments } from "../../api/payments";

const PaymentHistory = () => {
  const { user } = use(AuthContext);

  const {
    data: payments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      return await getUserPayments(user.email);
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center text-center">
        <h2 className="text-3xl font-bold mb-3">
          Failed to load payment history
        </h2>
        <p className="text-base-content/70">Please try again later.</p>
      </div>
    );
  }

  return (
    <section className="py-10 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
            Payment History
          </h1>
          <p className="mt-3 text-slate-500 max-w-2xl">
            Review all your membership payments, including amount, club name,
            payment status, and transaction details.
          </p>
        </div>

        {payments.length === 0 ? (
          <div className="rounded-3xl border border-base-300 bg-white shadow-md p-10 text-center">
            <h3 className="text-2xl font-bold mb-3">
              No payment history found
            </h3>
            <p className="text-base-content/70">
              You have not made any membership payments yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl shadow-md border border-base-300 bg-white">
            <table className="table">
              <thead className="bg-base-200 text-slate-700">
                <tr>
                  <th>#</th>
                  <th>Payment For</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Payment ID</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment._id} className="hover">
                    <td>{index + 1}</td>
                    <td className="font-semibold">
                      {payment.clubName || payment.eventTitle || "N/A"}
                    </td>
                    <td className="text-primary font-bold">
                      ${payment.amount}
                    </td>
                    <td className="capitalize">{payment.type}</td>
                    <td>
                      <span className="badge badge-success badge-outline capitalize">
                        {payment.status}
                      </span>
                    </td>
                    <td className="max-w-[200px] truncate">
                      {payment.stripePaymentIntentId}
                    </td>
                    <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default PaymentHistory;
