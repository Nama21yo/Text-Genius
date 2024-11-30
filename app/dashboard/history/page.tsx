"use client";
import { getQueries } from "@/actions/ai";
import QueryTable from "@/components/table/table";
import { useUser } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";

interface QueryResponse {
  queries: [];
  totalPages: number;
}

const Page = () => {
  const [queries, setQueries] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";

  useEffect(() => {
    if (page === 1 && email) fetchQueries();
  }, [email]);

  useEffect(() => {
    if (page > 1 && email) loadMore();
  }, [page]);

  const fetchQueries = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = (await getQueries(
        email,
        page,
        perPage
      )) as QueryResponse;
      setQueries(response.queries);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError("Failed to load queries. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = (await getQueries(
        email,
        page,
        perPage
      )) as QueryResponse;
      setQueries((prevQueries) => [...prevQueries, ...response.queries]);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError("Failed to load more queries. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (loading && !queries.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2Icon className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-10 my-5 mx-5 rounded-lg bg-gradient-to-r from-slate-200 via-slate-300 to-slate-300 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600 flex flex-col justify-center">
        <h1 className="text-2xl text-center font-semibold text-gray-800 dark:text-gray-200">
          Search History
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          View your previously searched queries.
        </p>
      </div>

      {error && <div className="text-center text-red-500 py-2">{error}</div>}

      <div className="p-5 rounded-lg flex flex-col">
        <QueryTable data={queries} />
      </div>

      <div className="text-center my-5">
        {page < totalPages && (
          <button
            onClick={handleLoadMore}
            className="py-2 px-4 text-white bg-primary rounded hover:bg-primary-dark transition disabled:opacity-50"
            disabled={loading}
            aria-label="Load more queries"
          >
            {loading ? (
              <Loader2Icon className="animate-spin w-5 h-5 inline-block" />
            ) : (
              "Load More"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Page;
