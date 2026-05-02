import React, { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewsCard from "./ReviewsCard";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);

  return (
    <section className="relative py-24 overflow-hidden bg-[radial-gradient(circle_at_top_left,#67e8f9_0%,transparent_28%),radial-gradient(circle_at_bottom_right,#c084fc_0%,transparent_30%),linear-gradient(135deg,#ecfeff,#ffffff,#faf5ff)]">
      
      <div className="absolute top-10 left-10 w-44 h-44 bg-cyan-400/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-fuchsia-400/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-300/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:48px_48px]"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 text-white text-sm font-black tracking-wide shadow-xl shadow-cyan-500/30">
            ✦ Testimonials
          </span>

          <h2 className="mt-6 text-4xl md:text-6xl font-black text-slate-900 leading-tight">
            Loved by Our{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-500 text-transparent bg-clip-text">
                ClubSphere
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-fuchsia-300/40 -z-10 rounded-full"></span>
            </span>{" "}
            Community
          </h2>

          <p className="mt-6 text-base md:text-lg text-slate-600 leading-8">
            Real stories from members who discovered clubs, joined exciting
            events, and built meaningful connections.
          </p>

          <div className="mt-8 flex justify-center gap-2">
            <span className="w-16 h-1.5 rounded-full bg-cyan-500"></span>
            <span className="w-8 h-1.5 rounded-full bg-blue-500"></span>
            <span className="w-16 h-1.5 rounded-full bg-fuchsia-500"></span>
          </div>
        </div>

        <Swiper
          loop={true}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          coverflowEffect={{
            rotate: 8,
            stretch: 0,
            depth: 180,
            modifier: 1.2,
            scale: 0.92,
            slideShadows: false,
          }}
          autoplay={{
            delay: 2400,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="pb-16"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewsCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;