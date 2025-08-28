"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [emailText, setEmailText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!emailText) return;

    setLoading(true);
    setSummary("");

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailText }),
      });

      const data = await res.json();
      setSummary(data.summary || "No summary generated.");
    } catch (error) {
      console.error(error);
      setSummary("Error summarizing email.");
    }

    setLoading(false);
  };

  const clearAll = () => {
    setEmailText("");
    setSummary("");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 transition-all duration-500">
      {/* Header */}
      <div className="pt-8 pb-6 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Email Summarizer
          </h1>
          <p className="text-gray-300 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Transform lengthy emails into clear, actionable summaries with AI precision
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-2 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className={`grid gap-6 transition-all duration-700 ${
            summary ? 'lg:grid-cols-2' : 'grid-cols-1 max-w-4xl mx-auto'
          }`}>
            
            {/* Input Section */}
            <div className="space-y-4">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                    Email Input
                  </h2>
                  {summary && (
                    <button
                      onClick={clearAll}
                      className="text-sm text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                
                <textarea
                  className="w-full h-80 md:h-80 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-inner focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all duration-300 resize-none backdrop-blur-sm"
                  placeholder="Paste your email content here..."
                  value={emailText}
                  onChange={(e) => setEmailText(e.target.value)}
                />
                
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={handleSummarize}
                    disabled={loading || !emailText}
                    className="flex-1 px-8 py-4 rounded-2xl text-white font-semibold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="relative flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Summarize Email
                        </>
                      )}
                    </span>
                  </button>
                </div>
                
                <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                  {emailText.length} characters • Created by Vishwas
                </div>
              </div>
            </div>

            {/* Summary Section */}
            {summary && (
              <div className="space-y-4 animate-in slide-in-from-right-5 duration-700">
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                      AI Summary
                    </h2>
                    <div className="ml-auto">
                      <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                        ✨ Generated
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-70 md:h-91 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="prose prose-gray dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl p-6 border border-blue-200/30 dark:border-blue-800/30">
                        <ReactMarkdown 
                          components={{
                            h1: ({children}) => <h1 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">{children}</h1>,
                            h2: ({children}) => <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{children}</h2>,
                            h3: ({children}) => <h3 className="text-base font-medium mb-2 text-gray-700 dark:text-gray-300">{children}</h3>,
                            p: ({children}) => <p className="mb-3 last:mb-0">{children}</p>,
                            ul: ({children}) => <ul className="list-disc pl-5 mb-3 space-y-1">{children}</ul>,
                            ol: ({children}) => <ol className="list-decimal pl-5 mb-3 space-y-1">{children}</ol>,
                            li: ({children}) => <li className="text-gray-700 dark:text-gray-300">{children}</li>,
                            strong: ({children}) => <strong className="font-semibold text-gray-900 dark:text-gray-100">{children}</strong>,
                            em: ({children}) => <em className="italic text-gray-700 dark:text-gray-300">{children}</em>,
                          }}
                        >
                          {summary}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span className="px-2 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-lg">
                        📊 Summary Complete
                      </span>
                      <span className="px-2 py-1 bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 rounded-lg">
                        🎯 Key Points Extracted
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
