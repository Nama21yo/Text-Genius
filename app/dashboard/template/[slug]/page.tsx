"use client";

import Link from "next/link";
import { ArrowLeft, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { runAi } from "@/actions/ai";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import template from "@/utils/template"; // Ensure correct path
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import toast from "react-hot-toast";
import { saveQuery } from "@/actions/ai";
import { useUser } from "@clerk/nextjs";
import { Template } from "@/utils/types";
import { useUsage } from "@/context/usage";

const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const [slug, setSlug] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const { fetchUsage, subscribed, count } = useUsage();
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";

  const editorRef = React.useRef<any>(null);

  useEffect(() => {
    // Unwrap params when the component mounts
    (async () => {
      const { slug } = await params;
      setSlug(slug);
    })();
  }, [params]);

  useEffect(() => {
    if (content && editorRef.current) {
      editorRef.current.getInstance().setMarkdown(content);
    }
  }, [content]);

  if (!slug) {
    return <div>Loading...</div>;
  }

  const templateData = template.find((item) => item.slug === slug) as Template;

  if (!templateData) {
    return (
      <div className="text-center py-10">
        <p className="text-2xl font-bold text-red-600">Template not found.</p>
        <p className="mt-2 text-lg">Please check the URL.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await runAi(templateData.aiPrompt + query);
      setContent(data);
      await saveQuery(templateData, email, query, data);
      fetchUsage();
    } catch (err) {
      setContent("Failed to generate content. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    const editorInstance = editorRef.current.getInstance();
    const content = editorInstance.getMarkdown();

    try {
      await navigator.clipboard.writeText(content);
      toast.success("Content copied successfully.");
    } catch (err) {
      console.error("Error copying content:", err);
      toast.error("Failed to copy content. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Link
          href="/dashboard"
          className="flex items-center text-lg text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-2" /> <span>Back</span>
        </Link>
        <Button
          onClick={handleCopy}
          className="flex items-center bg-blue-500 text-white hover:bg-blue-600 rounded-md px-4 py-2 shadow-md"
        >
          <Copy className="mr-2" /> <span>Copy</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <div className="col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col gap-4">
          <div className="flex flex-col items-center">
            <Image
              src={templateData.icon}
              alt={templateData.name}
              width={70}
              height={70}
              className="rounded-full border-4 border-blue-500"
            />
            <h2 className="text-2xl font-semibold text-center mt-4">
              {templateData.name}
            </h2>
            <p className="text-gray-500 text-center">{templateData.desc}</p>
          </div>

          <form className="mt-6" onSubmit={handleSubmit}>
            {templateData.form.map((item) => (
              <div key={item.name} className="flex flex-col gap-3 mb-6">
                <label className="font-semibold text-lg">{item.label}</label>
                {item.field === "input" ? (
                  <Input
                    name={item.name}
                    onChange={(e) => setQuery(e.target.value)}
                    required={item.required}
                    className="rounded-md border-2 border-gray-300 p-3 text-lg"
                  />
                ) : (
                  <Textarea
                    name={item.name}
                    onChange={(e) => setQuery(e.target.value)}
                    required={item.required}
                    className="rounded-md border-2 border-gray-300 p-3 text-lg"
                  />
                )}
              </div>
            ))}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md disabled:opacity-50 flex justify-center items-center shadow-md hover:bg-blue-700"
              disabled={
                loading ||
                (!subscribed &&
                  count >= Number(process.env.NEXT_PUBLIC_FREE_TIER_USAGE))
              }
            >
              {loading && (
                <Loader2Icon className="animate-spin text-white mr-2" />
              )}
              {subscribed ||
              count < Number(process.env.NEXT_PUBLIC_FREE_TIER_USAGE)
                ? "Generate Content"
                : "Subscribe to generate content"}
            </button>
          </form>
        </div>

        <div className="col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <Editor
            ref={editorRef}
            initialValue="Generated content will appear here"
            previewStyle="vertical"
            height="500px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            onChange={() =>
              setContent(editorRef.current?.getInstance()?.getMarkdown() || "")
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
