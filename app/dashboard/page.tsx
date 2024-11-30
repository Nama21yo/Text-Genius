"use client";
import template from "@/utils/template";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const filteredTemplates = template.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });

  if (template.length === 0) {
    return <p className="text-center text-gray-500">No templates available.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Search Section */}
      <div className="p-10 mx-5 mb-5 rounded-lg bg-slate-200 dark:bg-slate-800 flex flex-col justify-center items-center shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-4">
          What would you like to create today?
        </h1>
        <div className="w-full max-w-md flex justify-center">
          <div className="flex gap-2 items-center border border-gray-300 dark:border-gray-700 rounded-md bg-transparent my-5 w-full p-2">
            <Search className="text-primary" />
            <input
              type="text"
              placeholder="Search templates"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent w-full outline-none text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
            />
          </div>
        </div>
      </div>

      {/* Template Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-5 mb-10">
        {filteredTemplates.length === 0 ? (
          <div className="col-span-3 text-center text-lg text-gray-500">
            No matching templates found
          </div>
        ) : (
          filteredTemplates.map((item) => (
            <Link key={item.slug} href={`/dashboard/template/${item.slug}`}>
              <div className="flex flex-col p-5 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer">
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={60}
                  height={60}
                  unoptimized={true}
                  className="mx-auto rounded-full border-4 border-blue-500"
                />
                <h2 className="font-medium text-lg text-center text-gray-900 dark:text-white mt-4">
                  {item.name}
                </h2>
                <p className="text-gray-500 dark:text-gray-300 text-sm text-center line-clamp-3 mt-2">
                  {item.desc}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
