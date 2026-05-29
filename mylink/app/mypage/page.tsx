"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MyPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");
  const [initialName, setInitialName] = useState("");

  useEffect(() => {
    // Fetch initial profile
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "users", "anonymous");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setDisplayName(data.displayName || "");
          setBio(data.bio || "");
          setInitialName(data.displayName || "");
        } else {
          // No profile found, defaults are fine
          setDisplayName("CHJ");
          setInitialName("CHJ");
          setBio("안녕하세요! 바이브 코딩을 배우고 있는 대학생입니다.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleCheckDuplicate = async () => {
    if (!displayName.trim()) {
      setMessage("닉네임을 입력해주세요.");
      setIsAvailable(false);
      return;
    }

    if (displayName === initialName) {
      setMessage("현재 사용 중인 닉네임입니다.");
      setIsAvailable(true);
      return;
    }

    setChecking(true);
    setMessage("");
    
    try {
      const q = query(collection(db, "users"), where("displayName", "==", displayName.trim()));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        setIsAvailable(true);
        setMessage("사용 가능한 닉네임입니다!");
      } else {
        // If there's a match, verify it's not our own document
        let isDuplicate = false;
        querySnapshot.forEach((doc) => {
          if (doc.id !== "anonymous") {
            isDuplicate = true;
          }
        });
        
        if (isDuplicate) {
          setIsAvailable(false);
          setMessage("이미 사용 중인 닉네임입니다.");
        } else {
          setIsAvailable(true);
          setMessage("사용 가능한 닉네임입니다!");
        }
      }
    } catch (error) {
      console.error("Error checking duplicate:", error);
      setMessage("중복 확인 중 오류가 발생했습니다.");
      setIsAvailable(null);
    } finally {
      setChecking(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (displayName !== initialName && isAvailable === false) {
      setMessage("닉네임 중복 확인이 필요합니다.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      await setDoc(doc(db, "users", "anonymous"), {
        displayName: displayName.trim(),
        bio: bio.trim(),
        updatedAt: new Date()
      }, { merge: true });
      
      setInitialName(displayName.trim());
      setMessage("프로필이 성공적으로 저장되었습니다!");
      
      // Navigate to dashboard after saving
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
      
    } catch (error) {
      console.error("Error saving profile:", error);
      setMessage("프로필 저장 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-black p-4">
      <main className="flex flex-col w-full max-w-md p-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-200 dark:border-zinc-800 transition-all">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            마이페이지
          </h1>
          <Link href="/dashboard" className="text-sm font-semibold text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
            대시보드로 가기
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-10 font-medium">프로필 불러오는 중...</p>
        ) : (
          <form onSubmit={handleSave} className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                닉네임 (Display Name)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => {
                    setDisplayName(e.target.value);
                    if (e.target.value !== initialName) {
                      setIsAvailable(null);
                      setMessage("");
                    }
                  }}
                  required
                  className="flex-1 px-4 py-3 text-sm border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="닉네임을 입력하세요"
                />
                <button
                  type="button"
                  onClick={handleCheckDuplicate}
                  disabled={checking || !displayName.trim()}
                  className="px-5 py-3 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-gray-800 dark:text-gray-200 font-bold rounded-xl transition-all disabled:opacity-50 whitespace-nowrap active:scale-95 shadow-sm"
                >
                  {checking ? "확인 중..." : "중복 확인"}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                자기소개 (Bio)
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 text-sm border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                placeholder="간단한 자기소개를 작성해보세요."
              />
            </div>

            <button
              type="submit"
              disabled={saving || (displayName !== initialName && isAvailable !== true)}
              className="mt-2 w-full py-3 px-4 text-sm bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              {saving ? "저장 중..." : "프로필 저장하기"}
            </button>

            {message && (
              <p className={`text-center text-sm font-bold mt-2 ${isAvailable === false ? "text-red-500 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
                {message}
              </p>
            )}
          </form>
        )}
      </main>
    </div>
  );
}
