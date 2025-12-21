import React from "react";

const Banner = () => {
  return (
    <section className="bg-green-100 py-20 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-800">
        Report City Issues Easily
      </h1>
      <p className="text-lg md:text-xl text-green-700 max-w-2xl">
        Submit issues like broken streetlights, potholes, water leakage and get real-time updates on their resolution.
      </p>
      <button className="mt-6 px-6 py-3 bg-green-700 text-white rounded hover:bg-green-800">
        Report an Issue
      </button>
    </section>
  );
};

export default Banner;
