import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 flex flex-col font-sans">
      {/* Header / Navbar */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-200 dark:border-zinc-800">
        <div className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          마이링크
        </div>
        <nav>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
          >
            로그인
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6">
            <span className="block mb-2 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">마이링크</span>
            <span className="block text-3xl sm:text-4xl md:text-5xl text-blue-600 dark:text-blue-400 font-bold mt-4">
              나만의 링크 페이지를 30분만에
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            여러분의 모든 링크를 하나의 아름다운 페이지로 모아보세요.
            쉽고 빠르게 만들고, 누구에게나 공유할 수 있습니다.
          </p>
          <div className="flex justify-center">
            <Link
              href="/dashboard"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-black dark:bg-white dark:text-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-2xl"
            >
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black dark:to-white"></span>
              <span className="relative flex items-center gap-2">
                시작하기
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
            </Link>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto px-4">
          
          {/* Card 1 */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 shadow-xl shadow-gray-200/50 dark:shadow-none hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">링크 관리</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              여러 개의 링크를 한 곳에서 쉽게 추가하고 수정하며 관리하세요. 직관적인 인터페이스를 제공합니다.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 shadow-xl shadow-gray-200/50 dark:shadow-none hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">클릭 통계</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              방문자들이 어떤 링크를 가장 많이 클릭하는지 한눈에 파악하고 전략을 세워보세요.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 shadow-xl shadow-gray-200/50 dark:shadow-none hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">개인 URL</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              나만의 고유한 URL을 만들어 인스타그램, 틱톡 등 다양한 SNS 프로필에 간편하게 공유하세요.
            </p>
          </div>

        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-sm text-gray-500 dark:text-gray-500 border-t border-gray-200 dark:border-zinc-800 mt-20">
        &copy; {new Date().getFullYear()} 마이링크. All rights reserved.
      </footer>
    </div>
  );
}
