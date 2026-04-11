import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { getAllClubs, updateClubStatus } from "../../api/clubs";

const ManageAllClubs = () => {
  const queryClient = useQueryClient();

  const {
    data: clubs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allClubsAdmin"],
    queryFn: async () => {
      return await getAllClubs();
    },
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      return await updateClubStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allClubsAdmin"]);
    },
  });

  const handleStatusUpdate = async (id, status) => {
    const confirm = await Swal.fire({
      title: `Are you sure?`,
      text: `You want to mark this club as ${status}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${status}`,
    });

    if (!confirm.isConfirmed) return;

    try {
      await statusMutation.mutateAsync({ id, status });

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: `Club status changed to ${status}.`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not update club status.",
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

  if (isError) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <h2 className="text-2xl font-bold">Failed to load clubs</h2>
      </div>
    );
  }

  return (
    <section className="py-10 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
            Manage All Clubs
          </h1>
          <p className="mt-2 text-slate-500">
            Review all submitted clubs and approve or reject them.
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-base-300 shadow-md bg-white">
          <table className="table">
            <thead className="bg-base-200 text-slate-700">
              <tr>
                <th>#</th>
                <th>Club Name</th>
                <th>Category</th>
                <th>Manager Email</th>
                <th>Location</th>
                <th>Fee</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {clubs.map((club, index) => (
                <tr key={club._id}>
                  <td>{index + 1}</td>
                  <td className="font-semibold">{club.clubName}</td>
                  <td>{club.category}</td>
                  <td className="break-all">{club.managerEmail}</td>
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
                  <td>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          handleStatusUpdate(club._id, "approved")
                        }
                        disabled={club.status === "approved"}
                        className="btn btn-xs btn-success text-white"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          handleStatusUpdate(club._id, "rejected")
                        }
                        disabled={club.status === "rejected"}
                        className="btn btn-xs btn-error text-white"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ManageAllClubs;