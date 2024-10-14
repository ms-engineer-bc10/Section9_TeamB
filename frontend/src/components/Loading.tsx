"use client";
import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-200 to-orange-100 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="relative"></div>

      <p className="mt-8 text-2xl text-orange-800 font-comic">Loading...</p>

      <div className="mt-12 flex space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-4 h-4 bg-orange-500 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
}
