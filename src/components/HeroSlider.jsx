// import { Link } from "react-router";

// const slides = [
//   {
//     id: "slide1",
//     prev: "slide3",
//     next: "slide2",
//     badge: "Welcome to ClubSphere",
//     title: "Discover Local Clubs & Build Real Connections",
//     text: "Join photography, tech, hiking, book, and social clubs near you. Explore communities, attend events, and grow your network.",
//     image:
//       "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80",
//     primary: "Explore Clubs",
//     primaryLink: "/clubs",
//     secondary: "Join Now",
//     secondaryLink: "/register",
//     stat: "120+ Clubs",
//   },
//   {
//     id: "slide2",
//     prev: "slide1",
//     next: "slide3",
//     badge: "Join Amazing Communities",
//     title: "Meet People Who Share Your Passion",
//     text: "Find your perfect community and grow together with people who share your interests.",
//     image:
//       "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=80",
//     primary: "View Clubs",
//     primaryLink: "/clubs",
//     secondary: "How It Works",
//     secondaryLink: "/how-it-works",
//     stat: "5k+ Members",
//   },
//   {
//     id: "slide3",
//     prev: "slide2",
//     next: "slide1",
//     badge: "Events • Community • Growth",
//     title: "Explore Clubs, Attend Events",
//     text: "Join events, connect with members, and grow your personal and professional network.",
//     image:
//       "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
//     primary: "Explore Events",
//     primaryLink: "/events",
//     secondary: "Get Started",
//     secondaryLink: "/register",
//     stat: "300+ Events",
//   },
// ];

// const HeroSlider = () => {
//   return (
//     <section className="relative bg-gradient-to-br from-base-200 via-base-100 to-primary/10 py-6 md:py-10 overflow-hidden">
//       <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl"></div>
//       <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-secondary/20 blur-3xl"></div>

//       <div className="w-full px-4 md:px-8 lg:px-12">
//         <div className="carousel w-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/20">
//           {slides.map((slide) => (
//             <div
//               key={slide.id}
//               id={slide.id}
//               className="carousel-item relative w-full min-h-[560px] md:min-h-[680px]"
//             >
//               <div
//                 className="relative w-full bg-cover bg-center"
//                 style={{ backgroundImage: `url('${slide.image}')` }}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20"></div>
//                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.18),transparent_28%)]"></div>

//                 <div className="relative z-10 flex min-h-[560px] md:min-h-[680px] items-center px-6 md:px-14 lg:px-20">
//                   <div className="max-w-3xl text-white">
//                     <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-5 py-2 text-sm font-semibold backdrop-blur-md shadow-lg">
//                       <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
//                       {slide.badge}
//                     </span>

//                     <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
//                       {slide.title}
//                     </h1>

//                     <p className="mt-6 max-w-2xl text-base md:text-xl text-white/85 leading-relaxed">
//                       {slide.text}
//                     </p>

//                     <div className="mt-9 flex flex-wrap gap-4">
//                       <Link
//                         to={slide.primaryLink}
//                         className="btn btn-primary rounded-full px-8 shadow-lg shadow-primary/30"
//                       >
//                         {slide.primary}
//                       </Link>

//                       <Link
//                         to={slide.secondaryLink}
//                         className="btn rounded-full border-white/40 bg-white/10 px-8 text-white backdrop-blur-md hover:bg-white hover:text-black"
//                       >
//                         {slide.secondary}
//                       </Link>
//                     </div>
//                   </div>

//                   <div className="hidden lg:block absolute right-14 bottom-16 w-72 rounded-3xl border border-white/20 bg-white/15 p-5 text-white backdrop-blur-xl shadow-2xl">
//                     <p className="text-sm text-white/70">ClubSphere Highlight</p>
//                     <h3 className="mt-2 text-3xl font-black">{slide.stat}</h3>
//                     <p className="mt-2 text-sm text-white/80">
//                       Active communities waiting for new members like you.
//                     </p>
//                   </div>

//                   <div className="hidden md:flex absolute right-20 top-16 h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md">
//                     <span className="text-3xl">✦</span>
//                   </div>

//                   <div className="absolute left-8 bottom-8 hidden md:flex gap-2">
//                     {slides.map((item) => (
//                       <a
//                         key={item.id}
//                         href={`#${item.id}`}
//                         className={`h-2 rounded-full bg-white/70 ${
//                           item.id === slide.id ? "w-10" : "w-2"
//                         }`}
//                       ></a>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="absolute left-4 right-4 top-1/2 z-20 flex -translate-y-1/2 justify-between md:left-8 md:right-8">
//                 <a
//                   href={`#${slide.prev}`}
//                   className="btn btn-circle border-white/20 bg-white/20 text-white backdrop-blur-md hover:bg-white hover:text-black"
//                 >
//                   ❮
//                 </a>
//                 <a
//                   href={`#${slide.next}`}
//                   className="btn btn-circle border-white/20 bg-white/20 text-white backdrop-blur-md hover:bg-white hover:text-black"
//                 >
//                   ❯
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSlider;



import { Link } from "react-router";

const slides = [
  {
    id: "slide1",
    prev: "slide3",
    next: "slide2",
    badge: "Welcome to ClubSphere",
    title: "Discover Local Clubs & Build Real Connections",
    text: "Join photography, tech, hiking, book, and social clubs near you. Explore communities, attend events, and grow your network.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=80",
    primary: "Explore Clubs",
    primaryLink: "/clubs",
    secondary: "Join Now",
    secondaryLink: "/register",
    stat: "120+ Clubs",
  },
  {
    id: "slide2",
    prev: "slide1",
    next: "slide3",
    badge: "Join Amazing Communities",
    title: "Meet People Who Share Your Passion",
    text: "Find your perfect community and grow together with people who share your interests.",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1800&q=80",
    primary: "View Clubs",
    primaryLink: "/clubs",
    secondary: "How It Works",
    secondaryLink: "/how-it-works",
    stat: "5k+ Members",
  },
  {
    id: "slide3",
    prev: "slide2",
    next: "slide1",
    badge: "Events • Community • Growth",
    title: "Explore Clubs, Attend Events",
    text: "Join events, connect with members, and grow your personal and professional network.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1800&q=80",
    primary: "Explore Events",
    primaryLink: "/events",
    secondary: "Get Started",
    secondaryLink: "/register",
    stat: "300+ Events",
  },
];

const HeroSlider = () => {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#ecfeff_0%,#ffffff_38%,#f5f3ff_72%,#fff1f2_100%)] px-0 pt-0 pb-16">
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl"></div>
      <div className="absolute top-24 -right-24 h-96 w-96 rounded-full bg-violet-300/30 blur-3xl"></div>
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-pink-300/20 blur-3xl"></div>

      <div className="relative w-full">
        <div className="carousel w-full overflow-hidden shadow-2xl">
          {slides.map((slide) => (
            <div
              key={slide.id}
              id={slide.id}
              className="carousel-item relative w-full min-h-[650px] md:min-h-[760px]"
            >
              <div
                className="relative w-full bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/25"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.2),transparent_28%)]"></div>

                <div className="relative z-10 flex min-h-[650px] md:min-h-[760px] items-center px-5 sm:px-8 md:px-14 lg:px-24 xl:px-32">
                  <div className="max-w-5xl text-white">
                    <span className="inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/15 px-5 py-3 text-sm font-black backdrop-blur-xl shadow-xl">
                      <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                      {slide.badge}
                    </span>

                    <h1 className="mt-7 max-w-5xl text-5xl md:text-7xl xl:text-8xl font-black leading-[1.02] tracking-tight">
                      {slide.title}
                    </h1>

                    <p className="mt-7 max-w-3xl text-lg md:text-2xl text-white/85 leading-relaxed">
                      {slide.text}
                    </p>

                    <div className="mt-10 flex flex-wrap gap-5">
                      <Link
                        to={slide.primaryLink}
                        className="btn rounded-2xl border-none bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 px-9 text-white font-black shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all"
                      >
                        {slide.primary}
                      </Link>

                      <Link
                        to={slide.secondaryLink}
                        className="btn rounded-2xl border border-white/30 bg-white/10 px-9 text-white font-black backdrop-blur-xl hover:bg-white hover:text-slate-900 transition-all"
                      >
                        {slide.secondary}
                      </Link>
                    </div>
                  </div>

                  <div className="hidden xl:block absolute right-24 bottom-24 w-96 rounded-[2rem] border border-white/20 bg-white/15 p-7 text-white backdrop-blur-2xl shadow-2xl">
                    <p className="text-sm text-white/70 font-semibold">
                      ClubSphere Highlight
                    </p>

                    <h3 className="mt-3 text-5xl font-black">{slide.stat}</h3>

                    <p className="mt-3 text-base text-white/80 leading-7">
                      Active communities waiting for new members like you.
                    </p>
                  </div>

                  <div className="hidden lg:flex absolute right-28 top-28 h-28 w-28 items-center justify-center rounded-[2rem] border border-white/20 bg-white/10 text-white backdrop-blur-xl shadow-xl">
                    <span className="text-4xl">✦</span>
                  </div>

                  <div className="absolute left-8 md:left-14 lg:left-24 xl:left-32 bottom-10 hidden md:flex gap-3">
                    {slides.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`h-2.5 rounded-full bg-white/80 transition-all ${
                          item.id === slide.id ? "w-14" : "w-2.5"
                        }`}
                      ></a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute left-4 right-4 top-1/2 z-20 flex -translate-y-1/2 justify-between md:left-8 md:right-8">
                <a
                  href={`#${slide.prev}`}
                  className="btn btn-circle border-white/20 bg-white/15 text-white backdrop-blur-xl hover:bg-white hover:text-black"
                >
                  ❮
                </a>

                <a
                  href={`#${slide.next}`}
                  className="btn btn-circle border-white/20 bg-white/15 text-white backdrop-blur-xl hover:bg-white hover:text-black"
                >
                  ❯
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;