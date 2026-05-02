import React from "react";
import { Quote, Star, Sparkles } from "lucide-react";

const ReviewsCard = ({ review }) => {
  const {
    review: userreview,
    userName,
    delivery_email,
    user_photoURL,
    ratings,
    date,
  } = review;

  return (
    <div className="group relative mx-auto max-w-md min-h-[350px] rounded-[2rem] p-[2px] bg-gradient-to-br from-cyan-400 via-blue-500 to-fuchsia-500 shadow-2xl shadow-cyan-500/20 transition-all duration-500 hover:-translate-y-3 hover:shadow-fuchsia-500/30">
      <div className="relative h-full min-h-[350px] rounded-[2rem] bg-white/85 backdrop-blur-2xl p-7 overflow-hidden">
        
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-cyan-300/40 blur-3xl group-hover:bg-fuchsia-300/40 transition-all duration-500"></div>
        <div className="absolute -bottom-20 -left-20 w-44 h-44 rounded-full bg-violet-300/40 blur-3xl"></div>

        <div className="absolute right-6 top-24 text-cyan-300/40 group-hover:rotate-12 transition">
          <Sparkles className="w-12 h-12" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-fuchsia-500 flex items-center justify-center shadow-xl shadow-cyan-500/30 group-hover:scale-110 transition">
              <Quote className="text-white w-8 h-8" />
            </div>

            <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-2 rounded-full shadow-md">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-black text-slate-800">{ratings}</span>
            </div>
          </div>

          <p className="text-slate-700 leading-8 min-h-[105px] text-[15px]">
            “{userreview}”
          </p>

          <div className="my-6 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={user_photoURL}
                alt={userName}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-xl"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 border-2 border-white"></span>
            </div>

            <div className="min-w-0">
              <h3 className="font-black text-slate-900 text-lg">
                {userName}
              </h3>

              <p className="text-sm text-slate-500 truncate max-w-[220px]">
                {delivery_email}
              </p>

              {date && (
                <p className="text-xs font-semibold text-cyan-600 mt-1">
                  {new Date(date).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex gap-1">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className="w-4 h-4 text-yellow-400 fill-yellow-400"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsCard;