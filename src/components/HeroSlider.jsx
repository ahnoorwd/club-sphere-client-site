import { Link } from "react-router";

const HeroSlider = () => {
  return (
    <section className="bg-base-200 py-8">
      {/* ✅ CENTER WRAPPER */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* ✅ HERO CARD */}
        <div className="carousel w-full rounded-3xl overflow-hidden shadow-2xl">

          {/* Slide 1 */}
          <div
            id="slide1"
            className="carousel-item relative w-full min-h-[500px] md:min-h-[600px]"
          >
            <div
              className="w-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80')",
              }}
            >
              <div className="w-full h-full bg-gradient-to-r from-black/70 via-black/40 to-black/70 flex items-center">
                <div className="max-w-2xl px-6 md:px-12 text-white">
                  <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium mb-4">
                    Welcome to ClubSphere
                  </span>

                  <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">
                    Discover Local Clubs <br /> Build Real Connections
                  </h1>

                  <p className="text-base md:text-lg text-white/85 mb-8">
                    Join photography, tech, hiking, book, and social clubs near
                    you. Explore communities, attend events, and grow your
                    network.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link to="/clubs" className="btn btn-primary rounded-full px-8">
                      Explore Clubs
                    </Link>
                    <Link
                      to="/register"
                      className="btn btn-outline text-white border-white hover:bg-white hover:text-black rounded-full px-8"
                    >
                      Join Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
              <a href="#slide3" className="btn btn-circle bg-white/80 border-none">
                ❮
              </a>
              <a href="#slide2" className="btn btn-circle bg-white/80 border-none">
                ❯
              </a>
            </div>
          </div>

          {/* Slide 2 */}
          <div
            id="slide2"
            className="carousel-item relative w-full min-h-[500px] md:min-h-[600px]"
          >
            <div
              className="w-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1400&q=80')",
              }}
            >
              <div className="w-full h-full bg-gradient-to-r from-black/70 via-black/40 to-black/70 flex items-center">
                <div className="max-w-2xl px-6 md:px-12 text-white">
                  <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium mb-4">
                    Join Amazing Communities
                  </span>

                  <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">
                    Meet People Who Share <br /> Your Passion
                  </h1>

                  <p className="text-base md:text-lg text-white/85 mb-8">
                    Find your perfect community and grow together with people
                    who share your interests.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link to="/clubs" className="btn btn-primary rounded-full px-8">
                      View Clubs
                    </Link>
                    <Link
                      to="/how-it-works"
                      className="btn btn-outline text-white border-white hover:bg-white hover:text-black rounded-full px-8"
                    >
                      How It Works
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
              <a href="#slide1" className="btn btn-circle bg-white/80 border-none">
                ❮
              </a>
              <a href="#slide3" className="btn btn-circle bg-white/80 border-none">
                ❯
              </a>
            </div>
          </div>

          {/* Slide 3 */}
          <div
            id="slide3"
            className="carousel-item relative w-full min-h-[500px] md:min-h-[600px]"
          >
            <div
              className="w-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80')",
              }}
            >
              <div className="w-full h-full bg-gradient-to-r from-black/70 via-black/40 to-black/70 flex items-center">
                <div className="max-w-2xl px-6 md:px-12 text-white">
                  <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium mb-4">
                    Events • Community • Growth
                  </span>

                  <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">
                    Explore Clubs, <br /> Attend Events
                  </h1>

                  <p className="text-base md:text-lg text-white/85 mb-8">
                    Join events, connect with members, and grow your personal and
                    professional network.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link to="/events" className="btn btn-primary rounded-full px-8">
                      Explore Events
                    </Link>
                    <Link
                      to="/register"
                      className="btn btn-outline text-white border-white hover:bg-white hover:text-black rounded-full px-8"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
              <a href="#slide2" className="btn btn-circle bg-white/80 border-none">
                ❮
              </a>
              <a href="#slide1" className="btn btn-circle bg-white/80 border-none">
                ❯
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSlider;