import danceagain from '../assets/DanceAgain.jpg'

import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="bg-base-200">
      <div className="hero min-h-[80vh] px-6">
        <div className="hero-content flex-col lg:flex-row-reverse gap-10">

          {/* Image Section */}
          <img
            src={danceagain}
            alt="community"
            className="max-w-sm rounded-lg shadow-2xl"
          />

          {/* Text Section */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Discover Local Clubs & <br /> 
              <span className="text-primary">Join Exciting Events</span>
            </h1>

            <p className="py-6 text-gray-600 max-w-lg">
              ClubSphere helps you find and join clubs based on your interests. 
              Connect with people, attend events, and grow your community easily.
            </p>

            <div className="flex gap-4">
              <Link to="/clubs" className="btn btn-primary">
                Explore Clubs
              </Link>

              <Link to="/register" className="btn btn-outline">
                Get Started
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;