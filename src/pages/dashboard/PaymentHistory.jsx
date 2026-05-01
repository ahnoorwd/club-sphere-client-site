// import { use } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { AuthContext } from "../../Authprovider/AuthProvider";
// import { getUserPayments } from "../../api/payments";

// const PaymentHistory = () => {
//   const { user } = use(AuthContext);

//   const {
//     data: payments = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["paymentHistory", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       return await getUserPayments(user.email);
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="min-h-[60vh] flex justify-center items-center">
//         <span className="loading loading-spinner loading-lg text-primary"></span>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="min-h-[60vh] flex flex-col justify-center items-center text-center">
//         <h2 className="text-3xl font-bold mb-3">
//           Failed to load payment history
//         </h2>
//         <p className="text-base-content/70">Please try again later.</p>
//       </div>
//     );
//   }

//   return (
//     <section className="py-10 px-4 md:px-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-10">
//           <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
//             Payment History
//           </h1>
//           <p className="mt-3 text-slate-500 max-w-2xl">
//             Review all your membership payments, including amount, club name,
//             payment status, and transaction details.
//           </p>
//         </div>

//         {payments.length === 0 ? (
//           <div className="rounded-3xl border border-base-300 bg-white shadow-md p-10 text-center">
//             <h3 className="text-2xl font-bold mb-3">
//               No payment history found
//             </h3>
//             <p className="text-base-content/70">
//               You have not made any membership payments yet.
//             </p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto rounded-3xl shadow-md border border-base-300 bg-white">
//             <table className="table">
//               <thead className="bg-base-200 text-slate-700">
//                 <tr>
//                   <th>#</th>
//                   <th>Payment For</th>
//                   <th>Amount</th>
//                   <th>Type</th>
//                   <th>Status</th>
//                   <th>Payment ID</th>
//                   <th>Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {payments.map((payment, index) => (
//                   <tr key={payment._id} className="hover">
//                     <td>{index + 1}</td>
//                     <td className="font-semibold">
//                       {payment.clubName || payment.eventTitle || "N/A"}
//                     </td>
//                     <td className="text-primary font-bold">
//                       ${payment.amount}
//                     </td>
//                     <td className="capitalize">{payment.type}</td>
//                     <td>
//                       <span className="badge badge-success badge-outline capitalize">
//                         {payment.status}
//                       </span>
//                     </td>
//                     <td className="max-w-[200px] truncate">
//                       {payment.stripePaymentIntentId}
//                     </td>
//                     <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default PaymentHistory;


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

  const totalAmount = payments.reduce(
    (sum, payment) => sum + Number(payment.amount || 0),
    0
  );

  return (
    <section className="relative py-10 px-4 md:px-6 overflow-hidden">
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-cyan-300/25 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 right-0 w-96 h-96 bg-violet-300/25 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="mb-10 rounded-[2rem] bg-slate-950 p-7 md:p-9 text-white shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.35),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.35),transparent_35%)]"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="uppercase tracking-[0.25em] text-xs font-bold text-cyan-300 mb-2">
                Member Dashboard
              </p>

              <h1 className="text-3xl md:text-5xl font-black">
                Payment History
              </h1>

              <p className="mt-3 text-white/70 max-w-2xl leading-7">
                Review all your membership payments, including amount, club
                name, payment status, and transaction details.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 min-w-[260px]">
              <div className="rounded-3xl bg-white/10 border border-white/10 p-5 backdrop-blur-xl">
                <p className="text-sm text-white/50">Total Paid</p>
                <p className="text-2xl font-black text-cyan-300 mt-1">
                  ${totalAmount}
                </p>
              </div>

              <div className="rounded-3xl bg-white/10 border border-white/10 p-5 backdrop-blur-xl">
                <p className="text-sm text-white/50">Payments</p>
                <p className="text-2xl font-black text-violet-300 mt-1">
                  {payments.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {payments.length === 0 ? (
          <div className="rounded-[2rem] border border-white bg-white/85 backdrop-blur-xl shadow-xl p-12 text-center">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-r from-cyan-500 to-violet-500 flex items-center justify-center text-white text-3xl shadow-xl">
              $
            </div>

            <h3 className="text-2xl font-black text-slate-900 mt-6 mb-3">
              No payment history found
            </h3>

            <p className="text-slate-600">
              You have not made any membership payments yet.
            </p>
          </div>
        ) : (
          <div className="rounded-[2rem] bg-white/90 backdrop-blur-xl shadow-2xl border border-white overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Transaction Records
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Your completed ClubSphere payment activity.
                </p>
              </div>

              <span className="inline-flex w-fit rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2 text-white font-black text-sm shadow-lg">
                Secure Payments
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="bg-gradient-to-r from-cyan-50 via-white to-violet-50 text-slate-700">
                    <th className="py-5">#</th>
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
                    <tr
                      key={payment._id}
                      className="hover:bg-cyan-50/60 transition-all"
                    >
                      <td className="font-black text-slate-500">
                        {index + 1}
                      </td>

                      <td>
                        <p className="font-black text-slate-900">
                          {payment.clubName || payment.eventTitle || "N/A"}
                        </p>
                      </td>

                      <td>
                        <span className="font-black text-lg bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent">
                          ${payment.amount}
                        </span>
                      </td>

                      <td>
                        <span className="capitalize rounded-2xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
                          {payment.type}
                        </span>
                      </td>

                      <td>
                        <span className="rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-600 capitalize">
                          {payment.status}
                        </span>
                      </td>

                      <td className="max-w-[220px]">
                        <p className="truncate rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
                          {payment.stripePaymentIntentId}
                        </p>
                      </td>

                      <td className="font-semibold text-slate-600">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PaymentHistory;