import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

const images = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1526772662000-3f88f10405ff",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
];

const destinations = ["Manali", "Goa", "Jaipur", "Kerala", "Rishikesh", "Udaipur"];

const HeroSection = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [search, setSearch] = useState({
    location: "",
    startDate: "",
    endDate: "",
    guests: 1,
  });
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fullPhrase = "Incredible India";
    const typingSpeed = 150;
    const deletingSpeed = 80;
    const pauseTime = 2000;

    const handleTyping = () => {
      const currentText = fullPhrase.slice(
        0,
        isDeleting ? displayText.length - 1 : displayText.length + 1
      );

      setDisplayText(currentText);

      if (!isDeleting && currentText === fullPhrase) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
      }
    };

    if (!(displayText === fullPhrase && !isDeleting)) {
      const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
      return () => clearTimeout(timer);
    }

    return undefined;
  }, [displayText, isDeleting]);

  const filteredDestinations = destinations.filter((destination) =>
    destination.toLowerCase().includes(search.location.toLowerCase())
  );

  return (
    <div className="relative min-h-[720px] w-full overflow-hidden md:h-[75vh] md:min-h-[550px]">
      <img
        src={images[index]}
        alt="Hero Background"
        className="absolute h-full w-full object-cover transition-all duration-1000 ease-in-out"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="hero-entrance relative z-10 flex h-full flex-col items-center justify-center px-3 pb-10 pt-24 text-center text-white sm:px-6 md:px-4 md:pt-16">
        <h1 className="animate-fadeIn mb-4 min-h-[112px] max-w-[16rem] text-[1.85rem] font-extrabold leading-tight tracking-tight sm:min-h-[132px] sm:max-w-[26rem] sm:text-5xl md:min-h-[80px] md:max-w-4xl md:text-6xl">
          <span className="block md:inline">Explore </span>
          <span className="animate-word-appear block break-words text-orange-500 md:inline">
            {displayText}
          </span>
        </h1>

        <p
          className="stagger-word mb-6 max-w-[16rem] px-1 text-sm opacity-90 sm:mb-8 sm:max-w-xl md:max-w-2xl md:px-2 md:text-xl"
          style={{ animationDelay: "0.5s" }}
        >
          "Experience the soul of the subcontinent"
        </p>

        <div className="hover-lift flex w-full max-w-[17.25rem] flex-col gap-3 rounded-2xl bg-white/20 p-2.5 shadow-2xl backdrop-blur-md sm:max-w-md sm:p-4 md:max-w-5xl md:flex-row">
          <div className="hover-lift relative flex w-full min-w-0 items-center rounded-xl bg-white px-4 py-3">
            <FaMapMarkerAlt className="smooth-transition mr-2 text-orange-500" />
            <input
              type="text"
              placeholder="Where to?"
              className="smooth-transition focus-glow w-full outline-none text-black"
              value={search.location}
              onFocus={() => setShowSuggestions(true)}
              onChange={(event) => setSearch({ ...search, location: event.target.value })}
            />
            {showSuggestions && search.location && (
              <div className="slide-down absolute left-0 top-14 z-20 w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">
                {filteredDestinations.map((item, index) => (
                  <div
                    key={index}
                    className="smooth-transition hover-lift cursor-pointer p-3 text-black hover:bg-orange-50"
                    onClick={() => {
                      setSearch({ ...search, location: item });
                      setShowSuggestions(false);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="hover-lift flex w-full min-w-0 items-center rounded-xl bg-white px-4 py-3">
            <FaCalendarAlt className="smooth-transition mr-2 text-orange-500" />
            <input
              type="date"
              className="smooth-transition focus-glow w-full outline-none text-black"
              onChange={(event) => setSearch({ ...search, startDate: event.target.value })}
            />
          </div>

          <div className="hover-lift flex w-full min-w-0 items-center rounded-xl bg-white px-4 py-3">
            <FaCalendarAlt className="smooth-transition mr-2 text-orange-500" />
            <input
              type="date"
              className="smooth-transition focus-glow w-full outline-none text-black"
              onChange={(event) => setSearch({ ...search, endDate: event.target.value })}
            />
          </div>

          <div className="hover-lift flex w-full min-w-0 items-center rounded-xl bg-white px-4 py-3">
            <FaUsers className="smooth-transition mr-2 text-orange-500" />
            <input
              type="number"
              min="1"
              value={search.guests}
              className="smooth-transition focus-glow w-full outline-none text-black"
              onChange={(event) => setSearch({ ...search, guests: event.target.value })}
            />
          </div>

          <button
            onClick={() => navigate(`/tour?location=${search.location}&guests=${search.guests}`)}
            className="smooth-transition hover-lift w-full rounded-xl bg-orange-500 px-8 py-3 font-bold text-white shadow-lg hover:bg-orange-600 hover:shadow-orange-500/25 active:scale-95 md:w-auto"
          >
            Search
          </button>
        </div>

        <div
          className="animate-fadeIn mt-6 flex max-w-[17.25rem] flex-wrap justify-center gap-3 sm:max-w-md md:mt-8 md:max-w-none"
          style={{ animationDelay: "0.8s" }}
        >
          {destinations.map((item, index) => (
            <button
              key={index}
              onClick={() => setSearch({ ...search, location: item })}
              className="smooth-transition hover-lift rounded-full bg-white/20 px-5 py-3 text-sm font-semibold backdrop-blur-sm hover:bg-white/40 active:scale-95"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
