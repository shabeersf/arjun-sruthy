import React, { useState, useEffect } from 'react';
import { MapPin, CalendarPlus, Heart } from 'lucide-react';

const FloralWreath = ({ className = "" }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 180C55.8172 180 20 144.183 20 100C20 55.8172 55.8172 20 100 20C144.183 20 180 55.8172 180 100" stroke="#b5985a" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4"/>
    <path d="M100 190C45.3 190 10 149.7 10 100C10 50.3 45.3 10 100 10C154.7 10 190 50.3 190 100" stroke="#6b705c" strokeWidth="0.5" strokeLinecap="round"/>
    {/* Leaves and flowers */}
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

export default function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target date: May 4, 2026 at 6:00 PM
    const targetDate = new Date('2026-05-04T18:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addToCalendar = () => {
    const text = encodeURIComponent("Arjun & Sruthi Wedding Reception");
    const dates = "20260504T120000Z/20260504T160000Z"; 
    const details = encodeURIComponent("Join us for the wedding reception of Arjun & Sruthi.");
    const location = encodeURIComponent("Ayodhya Auditorium, Payyanur");
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-wedding-bg flex justify-center">
      <div className="w-full max-w-md bg-white shadow-2xl relative overflow-hidden pb-16">
        
        {/* Top Floral Decoration */}
        <div className="w-full h-56 relative overflow-hidden flex items-center justify-center bg-wedding-light/30">
          <img 
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Floral decoration" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white"></div>
          <FloralWreath className="w-48 h-48 absolute -top-12 opacity-60" />
        </div>

        {/* Custom Art Section */}
        <div className="px-6 pt-8 pb-4 flex justify-center relative z-10">
          <div className="relative w-64 h-64 flex items-center justify-center">
            <FloralWreath className="w-full h-full absolute inset-0 z-10 pointer-events-none drop-shadow-sm" />
            <div className="w-48 h-48 rounded-full overflow-hidden relative z-0 border-4 border-white shadow-inner">
              <img 
                src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Wedding Couple" 
                className="w-full h-full object-cover opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-wedding-accent/10 mix-blend-overlay"></div>
            </div>
          </div>
        </div>

        {/* Header Section */}
        <div className="text-center px-6 relative z-10">
          <p className="text-sm uppercase tracking-widest text-wedding-accent mb-4 font-medium">
            Together with their families
          </p>
          <h1 className="font-cursive text-7xl text-wedding-accent leading-tight mb-2 drop-shadow-sm">
            Arjun
            <span className="block text-4xl my-2 text-wedding-gold">&</span>
            Sruthi
          </h1>
          <p className="text-lg uppercase tracking-[0.2em] text-wedding-gold mt-6 border-y border-wedding-light py-3 inline-block px-8">
            Wedding Reception
          </p>
        </div>

        {/* Invitation & Countdown */}
        <div className="mt-12 px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Heart className="w-5 h-5 text-wedding-gold fill-wedding-gold/20" />
            <h2 className="text-2xl font-medium text-wedding-accent">You are Invited!</h2>
            <Heart className="w-5 h-5 text-wedding-gold fill-wedding-gold/20" />
          </div>

          {/* Countdown Timer */}
          <div className="flex justify-center gap-4 mb-8">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-wedding-accent/30 flex items-center justify-center mb-2 relative bg-white shadow-sm">
                  <div className="absolute inset-1 rounded-full border border-wedding-accent/10"></div>
                  <span className="text-xl font-semibold text-wedding-accent">{item.value}</span>
                </div>
                <span className="text-xs uppercase tracking-wider text-gray-500">{item.label}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 italic mb-12">
            Can't wait for you to be a part of our special day, it's almost time
          </p>
        </div>

        {/* Event Details */}
        <div className="px-8 py-10 bg-wedding-light/30 border-y border-wedding-light relative">
          <FloralWreath className="w-64 h-64 absolute -right-32 -top-32 opacity-10 rotate-45 pointer-events-none" />
          <FloralWreath className="w-64 h-64 absolute -left-32 -bottom-32 opacity-10 -rotate-45 pointer-events-none" />
          
          {/* Reception Details */}
          <div className="flex items-center justify-center gap-6 mb-10 relative z-10">
            <div className="text-right">
              <p className="text-3xl font-medium text-wedding-accent">04</p>
              <p className="text-sm uppercase tracking-wider text-wedding-gold">May 2026</p>
            </div>
            <div className="w-px h-16 bg-wedding-gold/30"></div>
            <div className="text-left">
              <p className="font-semibold text-wedding-accent text-lg">Reception</p>
              <p className="text-sm text-gray-600">5:30 PM - 9:30 PM</p>
              <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Ayodhya Auditorium, Payyanur
              </p>
            </div>
          </div>

          <div className="flex justify-center mb-10 relative z-10">
            <button 
              onClick={addToCalendar}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors text-sm font-medium bg-white px-4 py-2 rounded-full shadow-sm border border-blue-100"
            >
              <CalendarPlus className="w-4 h-4" />
              Add to Calendar
            </button>
          </div>

          {/* Marriage Details */}
          <div className="text-center space-y-3 relative z-10">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px bg-wedding-gold/30 flex-1"></div>
              <Heart className="w-3 h-3 text-wedding-gold" />
              <div className="h-px bg-wedding-gold/30 flex-1"></div>
            </div>
            
            <p className="text-sm text-gray-700 leading-relaxed">
              Marriage will be solemnised on <br/>
              <span className="font-semibold text-wedding-accent">Wednesday, 29th April 2026</span>
            </p>
            <p className="text-xs text-gray-500 leading-relaxed px-4">
              at Lavandis Convention Centre, Mokavoor Road, Eranhikkal, Calicut
            </p>
            <p className="text-sm font-medium text-wedding-gold mt-2">
              Muhurtham: 10:40 AM – 11:25 AM
            </p>
          </div>
        </div>

        {/* Location Section */}
        <div className="mt-12 px-6 text-center">
          <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden mb-6 relative border border-wedding-light shadow-inner">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Map placeholder" 
              className="w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/5">
              <div className="bg-white p-3 rounded-full shadow-lg">
                <MapPin className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>
          <a 
            href="https://maps.app.goo.gl/mJ4g6bGMvx8jaiE87?g_st=iw" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-wedding-accent text-white rounded-full hover:bg-wedding-accent/90 transition-colors text-sm font-medium shadow-md"
          >
            <MapPin className="w-4 h-4" />
            Get Location
          </a>
        </div>

        {/* Compliments Section */}
        <div className="mt-16 px-8 text-center space-y-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-wedding-light flex-1"></div>
            <p className="text-xs uppercase tracking-widest text-wedding-gold italic">Best Compliments from</p>
            <div className="h-px bg-wedding-light flex-1"></div>
          </div>
          
          <p className="text-sm text-gray-700 leading-relaxed">
            Ashwin O.K, Souparnika Ashwin, <br/>
            Thanishka Ashwin, Adwaith Sumithran O.K
          </p>
          
          <div className="space-y-1 pt-4">
            <p className="text-sm text-gray-600">Pavithra Jewellery, Payyanur</p>
            <p className="text-sm text-gray-600">Pavithra Jewellery, Cherupuzha</p>
            <p className="text-sm text-gray-600">Panjami Jewellery, Payyanur</p>
          </div>

          <p className="text-xs text-gray-400 italic pt-6">
            NB: No function on previous day
          </p>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center pb-8 relative">
          <FloralWreath className="w-32 h-32 mx-auto mb-4 opacity-40" />
          <h3 className="font-cursive text-4xl text-wedding-accent mb-6">Arjun & Sruthi</h3>
          <p className="text-sm text-gray-600 px-8 mb-8">
            We are looking forward to your presence on our wedding day and the party thereafter.
          </p>
          <p className="text-xl font-medium text-wedding-accent mb-12">Thank you</p>
          
          <div className="text-xs text-gray-400 tracking-widest uppercase">
            Wedads Photography
          </div>
        </div>

        {/* Bottom Floral Decoration */}
        <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none flex items-end justify-center overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Floral decoration" 
            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-multiply rotate-180"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/80 to-white"></div>
        </div>

      </div>
    </div>
  );
}
