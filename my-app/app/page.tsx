export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black text-black dark:text-white p-8">
      <main className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          CHJ
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md">
          안녕하세요! 바이브 코딩을 배우고 있는 대학생입니다.
        </p>
      </main>
    </div>
  );
}
