"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (data?.summary) {
        setResult(data.summary);
      } else {
        setResult(data?.error || "No response from AI");
      }
    } catch {
      setResult("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">

        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          AI Text Summarizer
        </h1>

        <textarea
          className="w-full border border-gray-300 p-3 rounded-lg h-40 text-black focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          {loading ? "Processing..." : "Summarize"}
        </button>

        {result && (
          <div className="mt-6 p-5 bg-gray-100 rounded-xl">
            <h2 className="text-sm text-gray-600 mb-3">
              AI Summary
            </h2>

            <p className="whitespace-pre-line text-black text-[15px] leading-relaxed">
              {result}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}