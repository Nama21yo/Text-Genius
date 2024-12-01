"use client";
import { useState } from "react";
import { runAi } from "@/actions/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { Loader2Icon } from "lucide-react";

export default function Page() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const handleClick = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await runAi(query);
      setResponse(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-5">
      {/* Form Section */}
      <form onSubmit={handleClick} className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Ask TextGenius AI
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Generate insightful responses, creative ideas, or answers to your
          questions using advanced AI.
        </p>
        <Input
          className="mb-4 w-full max-w-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your question here..."
        />
        <Button
          className="w-full max-w-xs bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium shadow-md hover:from-green-500 hover:to-blue-600"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center">
              <Loader2Icon className="animate-spin mr-2" /> Generating...
            </div>
          ) : (
            "Generate with AI"
          )}
        </Button>
      </form>

      {/* Result Section */}
      <Card className="mt-10 max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Generated Text
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 text-base">
          {loading ? (
            <div className="flex items-center justify-center text-gray-600">
              <Loader2Icon className="animate-spin mr-2" /> Preparing your
              response...
            </div>
          ) : response ? (
            <ReactMarkdown>{response}</ReactMarkdown>
          ) : (
            <p className="text-center text-gray-500">
              The generated response will appear here.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
