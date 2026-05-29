"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy, doc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useParams } from "next/navigation";
import Link from "next/link";

interface LinkItem {
  id: string;
  title: string;
  url: string;
  clicks?: number;
  path: string;
}

export default function UserPage() {
  const params = useParams();
  const rawUsername = params?.username as string;
  const username = rawUsername ? decodeURIComponent(rawUsername) : "";

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<{ displayName: string; bio: string } | null>(null);
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [error, setError] = useState(false);

  const handleLinkClick = async (path: string) => {
    try {
      await updateDoc(doc(db, path), {
        clicks: increment(1)
      });
    } catch (err) {
      console.error("Failed to increment click count:", err);
    }
  };

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Search userId by username
        const usersRef = collection(db, "users");
        // We assume username maps to the displayName field
        const q = query(usersRef, where("displayName", "==", username));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError(true);
          setLoading(false);
          return;
        }

        // Get first match
        const userDoc = querySnapshot.docs[0];
        const userId = userDoc.id;
        
        const profileData = {
          displayName: userDoc.data().displayName || username,
          bio: userDoc.data().bio || ""
        };

        // Try to fetch users/{userId}/profile collection just in case it exists,
        // but default to the data on users/{userId} which is what mypage uses.
        try {
          const profileDocs = await getDocs(collection(db, "users", userId, "profile"));
          if (!profileDocs.empty) {
            const pDoc = profileDocs.docs[0].data();
            if (pDoc.displayName) profileData.displayName = pDoc.displayName;
            if (pDoc.bio) profileData.bio = pDoc.bio;
          }
        } catch {
          // ignore
        }

        setProfile(profileData);

        // 2. Fetch links
        // Priority 1: users/{userId}/links
        let linksRef = collection(db, "users", userId, "links");
        let linksQuery = query(linksRef, orderBy("createdAt", "desc"));
        let linksSnapshot = await getDocs(linksQuery).catch(() => null);

        // Priority 2: user/{userId}/links (fallback for previous dashboard typo)
        if (!linksSnapshot || linksSnapshot.empty) {
          linksRef = collection(db, "user", userId, "links");
          linksQuery = query(linksRef, orderBy("createdAt", "desc"));
          linksSnapshot = await getDocs(linksQuery).catch(() => null);
        }

        const fetchedLinks: LinkItem[] = [];
        if (linksSnapshot) {
          linksSnapshot.forEach((docSnap) => {
            fetchedLinks.push({ id: docSnap.id, path: docSnap.ref.path, ...docSnap.data() } as LinkItem);
          });
        }
        setLinks(fetchedLinks);
        
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white p-4">
        <h1 className="text-6xl font-extrabold mb-4 text-gray-800 dark:text-gray-200">404</h1>
        <p className="text-xl mb-8 font-medium text-gray-600 dark:text-gray-400">존재하지 않는 페이지입니다.</p>
        <Link href="/" className="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold shadow-md hover:bg-blue-600 transition-colors">
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-black p-4 py-12">
      <main className="flex flex-col items-center w-full max-w-md p-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-200 dark:border-zinc-800 transition-all">
        {/* Profile Card */}
        <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 shadow-lg flex items-center justify-center text-white text-3xl font-bold">
          {profile?.displayName?.substring(0, 3).toUpperCase() || "USR"}
        </div>
        
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2 text-center">
          {profile?.displayName}
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-400 mb-8 text-center font-medium whitespace-pre-wrap">
          {profile?.bio}
        </p>

        {/* Links List */}
        <div className="flex flex-col w-full gap-4">
          {links.length > 0 ? (
            links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleLinkClick(link.path)}
                className="flex items-center justify-between w-full py-4 px-6 text-sm font-bold text-gray-900 dark:text-white bg-white dark:bg-zinc-800/80 hover:bg-gray-50 dark:hover:bg-zinc-700/80 rounded-2xl border border-gray-200 dark:border-zinc-700 transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-95 shadow-sm"
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
            <p className="text-center text-gray-500 text-sm py-4 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl border border-gray-200 dark:border-zinc-700/50">
              등록된 링크가 없습니다.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
