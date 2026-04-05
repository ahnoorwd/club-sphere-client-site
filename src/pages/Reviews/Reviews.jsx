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
    <section className="py-20 bg-gradient-to-b from-slate-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-semibold tracking-wide shadow-sm">
            Testimonials
          </span>

          <h2 className="mt-5 text-3xl md:text-5xl font-extrabold text-slate-800 leading-tight">
            What Our Users Say About
            <span className="text-cyan-600"> ClubSphere</span>
          </h2>

          <p className="mt-5 text-base md:text-lg text-slate-600 leading-8">
            Real feedback from our community members who explored clubs, joined
            new circles, and enjoyed a smoother experience through ClubSphere.
          </p>
        </div>

        {/* Slider */}
        <Swiper
          loop={true}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          coverflowEffect={{
            rotate: 18,
            stretch: 0,
            depth: 120,
            modifier: 1,
            scale: 0.94,
            slideShadows: false,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper py-8"
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