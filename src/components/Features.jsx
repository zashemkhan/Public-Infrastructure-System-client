import React from "react";

const features = [
  "Real-time issue tracking",
  "Priority support for premium citizens",
  "Detailed issue timeline",
  "Upvote system to highlight important issues",
  "Admin & staff dashboards",
  "Secure authentication with JWT",
  "Responsive UI for all devices",
];

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-8">Features</h2>
      <ul className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <li key={index} className="p-4 border rounded shadow hover:shadow-lg transition">
            {feature}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Features;
