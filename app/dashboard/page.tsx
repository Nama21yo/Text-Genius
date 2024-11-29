import template from "@/utils/template";
import Image from "next/image";
import Link from "next/link";

export default function DashboardPage() {
  if (template.length === 0) {
    return <p className="text-center text-gray-500">No templates available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
      {template.map((item) => (
        <Link key={item.slug} href={`/dashboard/template/${item.slug}`}>
          <div className="flex flex-col p-5 shadow-md border gap-3 cursor-pointer hover:scale-105 transition-all">
            <Image
              src={item.icon}
              alt={item.name}
              width={50}
              height={50}
              unoptimized={true} // Optional: for external/unoptimized images
            />
            <h2 className="font-medium text-lg">{item.name}</h2>
            <p className="text-gray-500 line-clamp-3">{item.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
