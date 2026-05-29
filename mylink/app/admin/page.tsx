"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await addDoc(collection(db, "users", "anonymous", "links"), {
        title,
        url,
        createdAt: serverTimestamp(),
        clicks: 0,
      });
      setTitle("");
      setUrl("");
      setMessage("링크가 성공적으로 추가되었습니다.");
    } catch (error) {
      console.error("Error adding link: ", error);
      setMessage("링크 추가 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-black p-4">
      <main className="flex flex-col w-full max-w-md p-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-200 dark:border-zinc-800 transition-all">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          링크 추가
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              링크 제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="예: 포트폴리오"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="https://example.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "추가 중..." : "링크 추가하기"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm font-medium text-green-600 dark:text-green-400">
            {message}
          </p>
        )}
      </main>
    </div>
  );
}
