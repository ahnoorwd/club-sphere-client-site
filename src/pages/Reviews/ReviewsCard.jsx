import React from "react";
import { Quote, Star } from "lucide-react";

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
    <div className="group bg-white/90 backdrop-blur-md my-8 shadow-xl rounded-3xl p-7 border border-cyan-100 max-w-md mx-auto min-h-[320px] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Top Area */}
      <div className="flex items-center justify-between mb-5">
        <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center shadow-sm">
          <Quote className="text-cyan-600 w-7 h-7" />
        </div>

        <div className="flex items-center gap-1 text-amber-400">
          <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
          <span className="font-semibold text-sm text-slate-700">{ratings}</span>
        </div>
      </div>

      {/* Review Text */}
      <p className="text-slate-600 leading-8 text-[15px] mb-6">
        “{userreview}”
      </p>

      {/* Divider */}
      <div className="border-t border-dashed border-cyan-200 mb-5"></div>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-cyan-400 ring-offset-2 ring-offset-white shadow-md">
          <img
            className="w-full h-full object-cover"
            src={user_photoURL}
            alt={userName}
          />
        </div>

        <div className="flex-1">
          <h3 className="font-bold text-slate-800 text-lg leading-tight">
            {userName}
          </h3>
          <p className="text-slate-500 text-sm">{delivery_email}</p>
          <p className="text-xs text-slate-400 mt-1">
            {new Date(date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewsCard;