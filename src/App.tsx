import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  CalendarPlus,
  Heart,
  Music,
  Pause,
  Play,
  Volume2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const FloralWreath = ({ className = "" }) => (
  <svg
    viewBox="0 0 200 200"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 180C55.8172 180 20 144.183 20 100C20 55.8172 55.8172 20 100 20C144.183 20 180 55.8172 180 100"
      stroke="#b5985a"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="4 4"
    />
    <path
      d="M100 190C45.3 190 10 149.7 10 100C10 50.3 45.3 10 100 10C154.7 10 190 50.3 190 100"
      stroke="#6b705c"
      strokeWidth="0.5"
      strokeLinecap="round"
    />
    <g fill="#6b705c" opacity="0.8">
      <path d="M30 100C30 90 40 85 50 95C40 105 30 100 30 100Z" />
      <path d="M170 100C170 90 160 85 150 95C160 105 170 100 170 100Z" />
      <path d="M100 30C90 30 85 40 95 50C105 40 100 30 100 30Z" />
      <path d="M50 50C45 60 55 70 65 60C55 50 50 50 50 50Z" />
      <path d="M150 50C155 60 145 70 135 60C145 50 150 50 150 50Z" />
      <path d="M50 150C45 140 55 130 65 140C55 150 50 150 50 150Z" />
      <path d="M150 150C155 140 145 130 135 140C145 150 150 150 150 150Z" />
    </g>
    <g fill="#b5985a" opacity="0.9">
      <circle cx="100" cy="20" r="4" />
      <circle cx="20" cy="100" r="4" />
      <circle cx="180" cy="100" r="4" />
      <circle cx="43" cy="43" r="3" />
      <circle cx="157" cy="43" r="3" />
      <circle cx="43" cy="157" r="3" />
      <circle cx="157" cy="157" r="3" />
    </g>
  </svg>
);

const CircularCountdown = ({ value, label, total }) => {
  const percentage = (value / total) * 100;
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 md:w-24 md:h-24">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            className="stroke-wedding-light fill-none"
            strokeWidth="4"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r={radius}
            className="stroke-wedding-olive fill-none"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ strokeDasharray: circumference }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl md:text-2xl font-serif font-bold text-wedding-olive leading-none">
            {value}
          </span>
        </div>
      </div>
      <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 mt-2 font-medium">
        {label}
      </span>
    </div>
  );
};

export default function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const targetDate = new Date("2026-05-04T18:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleInitialClick = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      if (audioRef.current) {
        audioRef.current
          .play()
          .catch((e) => console.log("Autoplay blocked", e));
        setIsPlaying(true);
      }
    }
  };

  const addToCalendar = () => {
    const text = encodeURIComponent("Arjun & Sruthi Wedding Reception");
    const dates = "20260504T120000Z/20260504T160000Z";
    const location = encodeURIComponent("Ayodhya Auditorium, Payyanur");
    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&location=${location}`,
      "_blank",
    );
  };

  return (
    <div
      className="min-h-screen bg-wedding-bg selection:bg-wedding-gold/20"
      onClick={handleInitialClick}
    >
      <audio ref={audioRef} loop src="/warm-memories.mp3" />

      {/* Floating Music Control */}
      <AnimatePresence>
        {hasInteracted && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => {
              e.stopPropagation();
              toggleMusic();
            }}
            className="fixed bottom-6 right-6 z-50 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-wedding-gold/20 text-wedding-gold hover:scale-110 transition-transform"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hero Header Decoration */}
      <div className="relative w-full overflow-hidden h-[30vh]">
        <img
          src="/floral_header.png"
          alt="Floral header"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-wedding-bg/50 to-wedding-bg"></div>
      </div>

      <main className="max-w-6xl mx-auto px-6 -mt-32 relative z-10 pb-32">
        {/* Top Floating Status (Desktop Only) */}
        <div className="hidden lg:flex justify-end gap-12 mb-16 text-wedding-olive uppercase tracking-[0.2em] text-[10px] font-bold">
          <div className="text-right">
            <p>Marriage: Wed 29 Apr. 2026</p>
            <p className="text-gray-500">At Lavandis Convention Centre, Calicut</p>
            <p className="text-wedding-gold italic">Muhurtham: 10:40 AM – 11:25 AM</p>
          </div>

          <div className="text-right border-l border-wedding-gold/20 pl-12">
            <p className="text-wedding-gold">Reception: Mon 04 May. 2026</p>
          </div>

          <div className="text-right border-l border-wedding-gold/20 pl-12">
            <p className="text-2xl font-serif text-wedding-gold leading-none">
              {timeLeft.days}
            </p>
            <p>Days to go</p>
          </div>
        </div>


        {/* Hero Content Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left space-y-8"
          >
            <div className="lg:hidden mb-12 space-y-2 uppercase tracking-[0.2em] text-[10px] font-bold text-wedding-olive border-b border-wedding-gold/10 pb-8">
              <p>Marriage: Wed 29 Apr. 2026</p>
              <p className="text-gray-500">At Lavandis Convention Centre, Calicut</p>
              <p className="text-wedding-gold italic font-medium">Muhurtham: 10:40 AM – 11:25 AM</p>
            </div>

            <h1 className="font-cursive text-7xl md:text-8xl text-wedding-olive leading-[0.8]">
              Arjun <br />
              <span className="text-4xl md:text-5xl my-4 block text-wedding-gold">
                &
              </span>
              Sruthi
            </h1>
            <p className="text-sm uppercase tracking-[0.3em] text-wedding-gold font-bold mb-4">
              Wedding Reception
            </p>

            <p className="font-serif text-xl md:text-2xl text-gray-600 max-w-lg italic font-light">
              Join us to celebrate love and new beginnings on our wedding
              reception. Your presence will make our special day even more
              memorable.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <FloralWreath className="absolute inset-0 w-full h-full z-10 animate-spin-slow opacity-60" />
              <div className="absolute inset-8 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                <img
                  src="/hero_couple.jpg"
                  alt="Wedding Couple"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Middle Floral Break */}
        <div className="flex justify-center pt-4 pb-8">
          <img
            src="/floral_break.png"
            alt="Floral decor"
            className="w-full max-w-2xl opacity-40 mix-blend-multiply"
          />
        </div>


        {/* Invitation Section */}
        <section className="text-center space-y-16 mb-32">
          <div className="space-y-4">
            <Heart className="mx-auto text-wedding-gold w-8 h-8 opacity-40" />
            <h2 className="text-4xl md:text-5xl font-serif text-wedding-olive">
              You are Invited!
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <CircularCountdown value={timeLeft.days} label="Days" total={365} />
            <CircularCountdown
              value={timeLeft.hours}
              label="Hours"
              total={24}
            />
            <CircularCountdown
              value={timeLeft.minutes}
              label="Minutes"
              total={60}
            />
            <CircularCountdown
              value={timeLeft.seconds}
              label="Seconds"
              total={60}
            />
          </div>

          <p className="text-gray-500 italic max-w-md mx-auto">
            Can't wait for you to be a part of our special day, it's almost time
          </p>
        </section>

        {/* Event Timeline - Focused on Reception */}
        <div className="space-y-8 mb-32">
          {/* Reception Detail */}
          <div className="grid md:grid-cols-2 gap-12 bg-white/40 backdrop-blur-sm rounded-3xl p-8 md:p-16 border border-white shadow-xl relative overflow-hidden">
            <div className="text-center md:text-right space-y-2 border-b md:border-b-0 md:border-r border-wedding-gold/20 pb-8 md:pb-0 md:pr-12">
              <p className="text-6xl font-serif text-wedding-gold">04</p>
              <p className="text-2xl uppercase tracking-[0.2em] text-wedding-olive">
                Mon
              </p>
              <p className="text-sm text-gray-400">May, 2026</p>
            </div>
            <div className="space-y-6 md:pl-4">
              <div>
                <h3 className="text-2xl font-serif text-wedding-olive mb-2">
                  Wedding Reception
                </h3>
                <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2">
                  <MapPin size={16} /> Ayodhya Auditorium, Payyanur
                </p>
                <p className="text-gray-600 mt-1 italic">5:30 PM - 9:30 PM</p>
              </div>
              <button
                onClick={addToCalendar}
                className="px-6 py-2 rounded-full border border-wedding-gold/30 text-wedding-gold hover:bg-wedding-gold hover:text-white transition-all text-sm font-medium inline-flex items-center gap-2"
              >
                <CalendarPlus size={16} /> Add to Calendar
              </button>
            </div>
          </div>
        </div>


        {/* Map Section */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white mb-32 h-[400px] relative group">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3896.262502693714!2d75.2046206!3d12.0995641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba46c4b82d6eb27%3A0x20094304a51fb159!2sAyodhya%20Auditorium!5e0!3m2!1sen!2sin!4v1712750000000!5m2!1sen!2sin"
            className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <a
              href="https://maps.app.goo.gl/mJ4g6bGMvx8jaiE87"
              target="_blank"
              className="bg-white px-8 py-3 rounded-full shadow-lg text-wedding-olive font-bold flex items-center gap-2"
            >
              <MapPin size={18} /> Get Location
            </a>
          </div>
        </div>


        {/* Footer */}
        <footer className="text-center space-y-8">
          <h4 className="font-cursive text-5xl text-wedding-olive">
            Arjun & Sruthi
          </h4>
          <p className="text-gray-600 max-w-sm mx-auto">
            We are looking forward to your presence on our wedding day and the
            party thereafter.
          </p>
          <div className="pt-16 pb-8 border-t border-wedding-gold/10">
            <p className="text-3xl font-serif text-wedding-gold">Thank you</p>
          </div>
        </footer>
      </main>

      {/* CSS for slow spin */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
