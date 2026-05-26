"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface LinkItem {
  id: string;
  title: string;
  url: string;
  createdAt?: unknown;
}

export default function Home() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to real-time updates from Firestore
    const q = query(
      collection(db, "user", "anonymous", "links"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedLinks: LinkItem[] = [];
      snapshot.forEach((doc) => {
        fetchedLinks.push({ id: doc.id, ...doc.data() } as LinkItem);
      });
      setLinks(fetchedLinks);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-black p-4">
      <main className="flex flex-col items-center justify-center w-full max-w-md p-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-200 dark:border-zinc-800 transition-all">
        {/* Profile Image Placeholder */}
        <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 shadow-lg flex items-center justify-center text-white text-2xl font-bold">
          CHJ
        </div>
        
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">
          CHJ
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-400 mb-8 text-center font-medium">
          안녕하세요! 바이브 코딩을 배우고 있는 대학생입니다.
        </p>

        {/* Links Section */}
        <div className="flex flex-col w-full gap-4">
          {loading ? (
            <p className="text-center text-gray-500 text-sm">링크를 불러오는 중...</p>
          ) : links.length > 0 ? (
            links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-zinc-800/50 hover:bg-gray-100 dark:hover:bg-zinc-700/50 rounded-2xl border border-gray-200 dark:border-zinc-700/50 transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
              >
                {link.title}
              </a>
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm">등록된 링크가 없습니다.</p>
          )}
        </div>
      </main>
    </div>
  );
}

