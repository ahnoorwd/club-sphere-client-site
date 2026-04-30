import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { getAllUsers, updateUserRole } from "../../api/users";

const ManageUsers = () => {
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      return await getAllUsers();
    },
  });

  const roleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      return await updateUserRole(id, role);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
    },
  });

  const handleRoleChange = async (id, role) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `You want to make this user ${role}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      const result = await roleMutation.mutateAsync({ id, role });

      if (result.modifiedCount > 0 || result.acknowledged) {
        Swal.fire({
          icon: "success",
          title: "Role Updated",
          text: `User role changed to ${role}.`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to update user role.",
      });
    }
  };

  const roleBadgeClass = (role) => {
    if (role === "admin") return "badge-error";
    if (role === "clubManager") return "badge-primary";
    return "badge-success";
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
      <div className="min-h-[60vh] flex justify-center items-center text-center">
        <h2 className="text-2xl font-bold">Failed to load users</h2>
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 p-7 md:p-9 text-white shadow-xl overflow-hidden relative">
          <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-white/10"></div>
          <div className="absolute right-24 -bottom-20 w-60 h-60 rounded-full bg-white/10"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="uppercase tracking-[0.25em] text-xs font-semibold text-white/80 mb-2">
                Admin Dashboard
              </p>

              <h1 className="text-3xl md:text-5xl font-extrabold">
                Manage Users
              </h1>

              <p className="mt-3 text-white/90 max-w-2xl">
                View users and control their roles inside the ClubSphere system.
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20">
              <p className="text-sm text-white/80">Total Users</p>
              <h3 className="text-4xl font-extrabold">{users.length}</h3>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto rounded-3xl border border-base-300 shadow-md bg-white">
          <table className="table">
            <thead className="bg-base-200 text-slate-700">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Current Role</th>
                <th>Change Role</th>
                <th>Quick Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>

                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          user.photoURL ||
                          "https://i.ibb.co/2kR5zqM/user.png"
                        }
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover ring ring-primary ring-offset-2"
                      />

                      <div>
                        <p className="font-bold text-slate-800">
                          {user.name || "No Name"}
                        </p>
                        <p className="text-xs text-slate-500">
                          Joined{" "}
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="break-all">{user.email}</td>

                  <td>
                    <span
                      className={`badge text-white capitalize px-4 py-3 ${roleBadgeClass(
                        user.role
                      )}`}
                    >
                      {user.role || "member"}
                    </span>
                  </td>

                  <td>
                    <select
                      defaultValue={user.role || "member"}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      className="select select-bordered select-sm rounded-xl"
                    >
                      <option value="member">Member</option>
                      <option value="clubManager">Club Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>

                  <td>
                    <div className="flex flex-wrap gap-2">
                      <button
                        disabled={user.role === "clubManager"}
                        onClick={() =>
                          handleRoleChange(user._id, "clubManager")
                        }
                        className="btn btn-xs btn-primary rounded-xl"
                      >
                        Make Manager
                      </button>

                      <button
                        disabled={user.role === "admin"}
                        onClick={() => handleRoleChange(user._id, "admin")}
                        className="btn btn-xs btn-error text-white rounded-xl"
                      >
                        Make Admin
                      </button>

                      <button
                        disabled={user.role === "member"}
                        onClick={() => handleRoleChange(user._id, "member")}
                        className="btn btn-xs btn-outline rounded-xl"
                      >
                        Make Member
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div className="rounded-3xl bg-white border border-base-300 shadow-md p-10 text-center mt-6">
            <h3 className="text-2xl font-bold mb-3">No users found</h3>
            <p className="text-base-content/70">
              No registered users are available right now.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ManageUsers;