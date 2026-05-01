import { Link } from "react-router";
import Swal from "sweetalert2";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaCalendarCheck,
  FaShieldAlt,
  FaHeart,
} from "react-icons/fa";

const AboutUs = () => {
  const handleSendMessage = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    const subject = `ClubSphere Contact Message from ${name}`;
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;

    window.location.href = `mailto:ahnoor232official@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;

    Swal.fire({
      title: "Message Ready!",
      text: "Your email app is opening. Please send the message from there.",
      icon: "success",
      confirmButtonColor: "#06b6d4",
    });

    form.reset();
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#ecfeff_0%,#ffffff_40%,#f5f3ff_75%,#fff1f2_100%)] py-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:54px_54px]"></div>
      <div className="absolute -top-28 -left-28 w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-violet-400/25 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-300/25 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex px-6 py-2 rounded-2xl bg-white/80 backdrop-blur-xl border border-white shadow-lg text-sm font-black text-cyan-600">
            ✦ About ClubSphere
          </span>

          <h1 className="mt-6 text-4xl md:text-6xl font-black text-slate-900 leading-tight">
            Connecting People Through{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 bg-clip-text text-transparent">
              Clubs & Events
            </span>
          </h1>

          <p className="mt-6 text-slate-600 text-base md:text-lg leading-8">
            ClubSphere is a modern community platform where members discover
            clubs, join events, connect with people, and grow together through
            shared interests.
          </p>
        </div>

        {/* keep your previous middle sections here exactly same */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="rounded-[2.5rem] bg-slate-950 p-8 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.35),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.35),transparent_35%)]"></div>

            <div className="relative">
              <span className="inline-flex px-5 py-2 rounded-2xl bg-white/10 border border-white/15 text-cyan-300 text-sm font-black">
                Contact Information
              </span>

              <h2 className="mt-6 text-3xl md:text-4xl font-black text-white">
                Let’s connect with ClubSphere
              </h2>

              <p className="mt-4 text-white/65 leading-8">
                Have questions about clubs, events, memberships, or management?
                Contact us anytime.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex items-center gap-4 text-white">
                  <span className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-cyan-300">
                    <FaEnvelope />
                  </span>

                  <div>
                    <p className="text-sm text-white/50">Email</p>

                    <a
                      href="mailto:support@clubsphere.com"
                      className="block font-bold hover:text-cyan-300 transition"
                    >
                      support@clubsphere.com
                    </a>

                    <a
                      href="mailto:ahnoor232official@gmail.com"
                      className="block font-bold hover:text-cyan-300 transition"
                    >
                      ahnoor232official@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-white">
                  <span className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-cyan-300">
                    <FaPhoneAlt />
                  </span>
                  <div>
                    <p className="text-sm text-white/50">Phone</p>
                    <a
                      href="tel:+8801313173095"
                      className="font-bold hover:text-cyan-300 transition"
                    >
                      +880 1313173095
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-white">
                  <span className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-cyan-300">
                    <FaMapMarkerAlt />
                  </span>
                  <div>
                    <p className="text-sm text-white/50">Location</p>
                    <p className="font-bold">Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {[
                  ["https://facebook.com", <FaFacebookF />],
                  ["https://twitter.com", <FaTwitter />],
                  ["https://instagram.com", <FaInstagram />],
                  ["https://linkedin.com", <FaLinkedinIn />],
                ].map(([url, icon], index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 text-white flex items-center justify-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-violet-500 hover:scale-110 transition-all"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[2.5rem] bg-white/85 backdrop-blur-xl border border-white p-8 md:p-10 shadow-2xl">
            <span className="inline-flex px-5 py-2 rounded-2xl bg-cyan-50 text-cyan-600 text-sm font-black">
              Send Message
            </span>

            <h2 className="mt-5 text-3xl md:text-4xl font-black text-slate-900">
              Contact Us
            </h2>

            <form onSubmit={handleSendMessage} className="mt-8 space-y-5">
              <div>
                <label className="font-bold text-sm text-slate-700">
                  Your Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="input input-bordered mt-2 w-full rounded-2xl bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-sm text-slate-700">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="input input-bordered mt-2 w-full rounded-2xl bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-sm text-slate-700">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  placeholder="Write your message..."
                  className="textarea textarea-bordered mt-2 w-full min-h-[140px] rounded-2xl bg-white"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn w-full rounded-2xl border-none bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white font-black shadow-xl shadow-cyan-500/25 hover:scale-[1.02] transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;