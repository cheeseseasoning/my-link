"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

interface LinkItem {
  id: string;
  title: string;
  url: string;
  createdAt?: unknown;
  clicks?: number;
}

export default function Home() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [displayName, setDisplayName] = useState("CHJ");
  const [bio, setBio] = useState("안녕하세요! 바이브 코딩을 배우고 있는 대학생입니다.");
  
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
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
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error adding link: ", error);
      setMessage("링크 추가 중 오류가 발생했습니다.");
    } finally {
      setAdding(false);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "users", "anonymous");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.displayName) setDisplayName(data.displayName);
          if (data.bio) setBio(data.bio);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    // Listen to real-time updates from Firestore
    const q = query(
      collection(db, "users", "anonymous", "links"),
      orderBy("createdAt", "desc")
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
        {/* Profile Edit Link */}
        <div className="w-full flex justify-end mb-2">
          <Link href="/mypage" className="text-sm font-semibold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
            프로필 수정
          </Link>
        </div>

        {/* Profile Image Placeholder */}
        <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 shadow-lg flex items-center justify-center text-white text-2xl font-bold">
          {displayName ? displayName.substring(0, 3).toUpperCase() : "USR"}
        </div>
        
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2 text-center">
          {displayName}
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-400 mb-8 text-center font-medium">
          {bio}
        </p>

        {/* Add Link Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full mb-8">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-3 text-sm border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="링크 제목 (예: 내 포트폴리오)"
          />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full px-4 py-3 text-sm border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="URL (https://example.com)"
          />
          <button
            type="submit"
            disabled={adding}
            className="w-full py-3 px-4 text-sm bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50"
          >
            {adding ? "추가 중..." : "링크 추가하기"}
          </button>
          {message && (
            <p className="text-center text-sm font-medium text-green-600 dark:text-green-400 mt-1">
              {message}
            </p>
          )}
        </form>

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
                className="flex items-center justify-between w-full py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white bg-white dark:bg-zinc-800/80 hover:bg-gray-50 dark:hover:bg-zinc-700/80 rounded-2xl border border-gray-200 dark:border-zinc-700 transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-95 shadow-sm"
              >
                <div className="w-16"></div> {/* Spacer for centering */}
                <span className="flex-1 text-center truncate">{link.title}</span>
                <div className="w-16 flex items-center justify-end gap-1.5 text-xs font-bold text-gray-600 dark:text-gray-300">
                  <span className="text-sm">👁️</span>
                  <span>{link.clicks || 0}</span>
                </div>
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

