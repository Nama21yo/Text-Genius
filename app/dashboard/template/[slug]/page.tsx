"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import { runAi } from "@/actions/ai";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import template from "@/utils/template"; // Check this import for correct path
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

export interface Template {
  name: string;
  slug: string;
  icon: string;
  desc: string;
  category: string;
  aiPrompt: string;
  form: Form[];
}

export interface Form {
  label: string;
  field: string;
  name: string;
  required: boolean;
}

const Page = ({ params }: { params: { slug: string } }) => {
  // State management
  const [query, setQuery] = React.useState("");
  const [content, setContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // Ref for editor instance
  const editorRef = React.useRef<any>(null);

  // Update the editor content whenever `content` changes
  useEffect(() => {
    if (content && editorRef.current) {
      editorRef.current.getInstance().setMarkdown(content);
    }
  }, [content]);

  // Find template data
  const templateData = template.find(
    (item) => item.slug === params.slug
  ) as Template;

  // If template not found, show a message
  if (!templateData) {
    return (
      <p className="text-center text-red-500">
        Template not found. Please check the URL.
      </p>
    );
  }

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await runAi(templateData.aiPrompt + query);
      setContent(data);
    } catch (error) {
      console.error("Error generating content:", error);
      alert("Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5">
      {/* Template Details */}
      <div className="col-span-1 bg-slate-100 dark:bg-slate-900 rounded-md border p-5">
        <div className="flex flex-col gap-3">
          <Image
            src={templateData.icon}
            alt={templateData.name}
            width={50}
            height={50}
          />
          <h2 className="font-medium text-lg">{templateData.name}</h2>
          <p className="text-gray-500">{templateData.desc}</p>
        </div>

        {/* Form Section */}
        <form className="mt-6" onSubmit={handleSubmit}>
          {templateData.form.map((item) => (
            <div key={item.name} className="flex flex-col gap-2 mb-4">
              <label className="font-bold">{item.label}</label>
              {item.field === "input" ? (
                <Input
                  name={item.name}
                  onChange={(e) => setQuery(e.target.value)}
                  required={item.required}
                />
              ) : (
                <Textarea
                  name={item.name}
                  onChange={(e) => setQuery(e.target.value)}
                  required={item.required}
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Generate Content"
            )}
          </button>
        </form>
      </div>

      {/* Editor Section */}
      <div className="col-span-2">
        <Editor
          ref={editorRef}
          initialValue="Generated content will appear here"
          previewStyle="vertical"
          height="600px"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          onChange={() =>
            setContent(editorRef.current?.getInstance()?.getMarkdown() || "")
          }
        />
      </div>
    </div>
  );
};

export default Page;
