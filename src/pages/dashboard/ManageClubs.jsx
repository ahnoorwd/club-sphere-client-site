import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Authprovider/AuthProvider";
import axios from "axios";
import { Link } from "react-router";

const ManageClubs = () => {
  const { user } = use(AuthContext);

  const { data: clubs = [], isLoading, isError } = useQuery({
    queryKey: ["managerClubs", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/clubs?email=${user.email}`);
      return res.data;
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
      <div className="min-h-[60vh] flex justify-center items-center">
        <h2 className="text-2xl font-bold">Failed to load your clubs</h2>
      </div>
    );
  }

  return (
    <section className="py-10 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
              Manage Clubs
            </h1>
            <p className="mt-2 text-slate-500">
              View the clubs you created and track their approval status.
            </p>
          </div>

          <Link to="/dashboard/add-club" className="btn btn-primary rounded-xl">
            Add New Club
          </Link>
        </div>

        {clubs.length === 0 ? (
          <div className="rounded-3xl bg-white border border-base-300 shadow-md p-10 text-center">
            <h3 className="text-2xl font-bold mb-3">No clubs found</h3>
            <p className="text-base-content/70 mb-5">
              You have not created any clubs yet.
            </p>
            <Link to="/dashboard/add-club" className="btn btn-primary rounded-xl">
              Create Your First Club
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-base-300 shadow-md bg-white">
            <table className="table">
              <thead className="bg-base-200 text-slate-700">
                <tr>
                  <th>#</th>
                  <th>Club Name</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Fee</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {clubs.map((club, index) => (
                  <tr key={club._id}>
                    <td>{index + 1}</td>
                    <td className="font-semibold">{club.clubName}</td>
                    <td>{club.category}</td>
                    <td>{club.location}</td>
                    <td>${club.membershipFee}</td>
                    <td>
                      <span
                        className={`badge capitalize ${
                          club.status === "approved"
                            ? "badge-success"
                            : club.status === "pending"
                            ? "badge-warning"
                            : "badge-error"
                        }`}
                      >
                        {club.status}
                      </span>
                    </td>
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

export default ManageClubs;