import React from 'react';

const destinations = [
  { name: 'Delhi', img: 'public/delhi.jpg', accommodations: '2,004 Houses' },
  { name: 'Kolkata', img: 'public/mussoorie.jpg', accommodations: '2,224 Villas' },
  { name: 'Jaipur', img: 'public/udaipur.jpg', accommodations: '2,007 Plots' },
  { name: 'Bangalore', img: 'public/Ranikhet3.jpg', accommodations: '2,000 Apartments' },
  { name: 'Chennai', img: 'public/Munnar2.jpg', accommodations: '1,200 Flats' },
  { name: 'Ahmedabad', img: 'public/ladhak...jpg', accommodations: '500 Plots' },
  { name: 'Pune', img: 'public/goa...jpg', accommodations: '1,550 Houses' },
  { name: 'Kota', img: 'public/Auli9.jpg', accommodations: '1,800 Flats' },
  { name: 'Mumbai', img: 'public/Gulmarg8.jpg', accommodations: '2,500 Plots' },
  { name: 'Hyderabad', img: 'public/Darjeeling7.jpg', accommodations: '2,300 Villas' },
];

export const TopDest = () => {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-gray-900">
          Top Popular <span className="text-purple-500">Real Estate Cities</span>
        </h3>

        <div className="flex justify-center mb-10">
          <div className="w-32 border-t-2 border-gray-400 relative flex items-center justify-center">
            <span className="absolute left-0 -top-2 w-3 h-3 bg-black rounded-full"></span>
            <span className="absolute right-0 -top-2 w-3 h-3 bg-black rounded-full"></span>
            <span className="absolute left-1/2 -translate-x-1/2 -top-3 text-2xl text-gray-400 select-none">
              ✧
            </span>
          </div>
        </div>

        {/* Destinations grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-10 gap-6 justify-center">
          {destinations.map((dest) => (
            <div
              key={dest.name}
              className="flex flex-col items-center cursor-pointer group transition-transform duration-200 hover:scale-105"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-lg mb-2 border-4 border-white transition-all duration-200 group-hover:border-blue-400 group-hover:shadow-xl">
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                />
              </div>
              <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-0 text-center truncate w-24 sm:w-28 group-hover:text-blue-600 transition-colors duration-200">
                {dest.name}
              </h4>
              <p className="text-gray-500 text-[10px] sm:text-xs text-center truncate w-24 sm:w-28 group-hover:text-blue-400 transition-colors duration-200">
                {dest.accommodations}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
