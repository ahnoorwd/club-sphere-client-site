import { use } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Authprovider/AuthProvider";
import { createClub } from "../../api/clubs";
import Swal from "sweetalert2";

const AddClub = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();

  const handleAddClub = async (e) => {
    e.preventDefault();
    const form = e.target;

    const clubName = form.clubName.value;
    const description = form.description.value;
    const category = form.category.value;
    const location = form.location.value;
    const bannerImage = form.bannerImage.value;
    const membershipFee = form.membershipFee.value;

    const clubData = {
      clubName,
      description,
      category,
      location,
      bannerImage,
      membershipFee: Number(membershipFee),
      managerEmail: user?.email,
    };

    try {
      const result = await createClub(clubData);

      if (result.insertedId || result.acknowledged) {
        Swal.fire({
          icon: "success",
          title: "Club Submitted",
          text: "Your club has been submitted successfully and is now pending approval.",
        });

        form.reset();
        navigate("/dashboard/manage-clubs");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to create club. Please try again.",
      });
    }
  };

  return (
    <section className="py-10 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
            Add New Club
          </h1>
          <p className="mt-3 text-slate-500 max-w-2xl">
            Create a new club and submit it for approval. Once approved, it will
            appear publicly on the platform.
          </p>
        </div>

        <div className="bg-white border border-base-300 rounded-3xl shadow-md p-6 md:p-8">
          <form onSubmit={handleAddClub} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Club Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 text-slate-700">
                Club Name
              </label>
              <input
                type="text"
                name="clubName"
                placeholder="Enter club name"
                className="input input-bordered w-full rounded-xl"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">
                Category
              </label>
              <select
                name="category"
                className="select select-bordered w-full rounded-xl"
                required
              >
                <option value="">Select category</option>
                <option value="Photography">Photography</option>
                <option value="Tech">Tech</option>
                <option value="Sports">Sports</option>
                <option value="Book Club">Book Club</option>
                <option value="Music">Music</option>
                <option value="Art">Art</option>
                <option value="Gaming">Gaming</option>
                <option value="Social Service">Social Service</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="Enter location"
                className="input input-bordered w-full rounded-xl"
                required
              />
            </div>

            {/* Banner Image */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 text-slate-700">
                Banner Image URL
              </label>
              <input
                type="text"
                name="bannerImage"
                placeholder="Enter image URL"
                className="input input-bordered w-full rounded-xl"
                required
              />
            </div>

            {/* Membership Fee */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">
                Membership Fee
              </label>
              <input
                type="number"
                name="membershipFee"
                placeholder="Enter membership fee"
                className="input input-bordered w-full rounded-xl"
                min="0"
                required
              />
            </div>

            {/* Manager Email */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">
                Manager Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full rounded-xl bg-base-200"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 text-slate-700">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Write club description"
                className="textarea textarea-bordered w-full rounded-xl min-h-[140px]"
                required
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex justify-end gap-3 pt-2">
              <button
                type="reset"
                className="btn btn-outline rounded-xl px-6"
              >
                Reset
              </button>
              <button
                type="submit"
                className="btn btn-primary rounded-xl px-8"
              >
                Submit Club
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddClub;