import React from "react";
import Link from "next/link";

interface PromoCardProps {
  title: string;
  description: string;
  link: string;
}

const Card: React.FC<PromoCardProps> = ({ title, description, link }) => {
  return (
    <Link href={link}>
      <div className="relative flex flex-col items-start p-6 border rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#0f172a] h-80 overflow-hidden group">
        {/* Gradient Background Accent */}
        <div className="absolute inset-0 opacity-30 bg-gradient-to-tl from-blue-500 to-purple-600 blur-lg rounded-xl"></div>

        {/* Title */}
        <h3 className="relative text-xl font-bold mb-3 text-white z-10 group-hover:text-blue-300 transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="relative text-gray-300 mb-6 z-10 group-hover:text-gray-200 transition-colors duration-300">
          {description}
        </p>

        {/* Learn More Link */}
        <div className="mt-auto">
          <span className="relative text-blue-400 hover:text-blue-500 z-10 transition-colors duration-300">
            Learn more &rarr;
          </span>
        </div>

        {/* Border Glow Effect */}
        <div className="absolute inset-0 border-2 border-transparent rounded-xl group-hover:border-blue-400 group-hover:shadow-[0_0_15px_4px_rgba(59,130,246,0.6)] transition-all duration-300"></div>
      </div>
    </Link>
  );
};

export default Card;
