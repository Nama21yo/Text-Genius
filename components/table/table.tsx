import React from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { Copy } from "lucide-react";

interface QueryResponse {
  _id: string;
  template: any;
  email: string;
  query: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
interface Props {
  data: QueryResponse[];
}

const wordCount = (text: string) => text.split(" ").length;

const QueryTable: React.FC<Props> = ({ data = [] }) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Content copied to clipboard!");
  };
  return (
    <div className="overflow-x-auto rounded-lg shadow-md bg-white dark:bg-gray-800">
      <Toaster />
      <table className="min-w-full bg-white dark:bg-gray-800 text-sm">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="py-2 px-4 text-left font-semibold">TEMPLATE</th>
            <th className="py-2 px-4 text-left font-semibold">QUERY</th>
            <th className="py-2 px-4 text-left font-semibold">DATE</th>
            <th className="py-2 px-4 text-left font-semibold">WORDS</th>
            <th className="py-2 px-4 text-left font-semibold">COPY</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item._id}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <td className="py-2 px-4 border-b">
                <div className="flex">
                  <Image
                    src={item.template.icon}
                    alt="icon"
                    width={20}
                    height={20}
                  />
                  <div className="ml-2">{item.template?.name}</div>
                </div>
              </td>
              <td className="py-2 px-4 border-b line-clamp-2">{item.query}</td>
              <td className="py-2 px-4 border-b">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b">{wordCount(item.content)}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleCopy(item.content)}
                  className="flex items-center"
                >
                  <Copy className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                  &nbsp;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueryTable;
