import Image from "next/image";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Next.js + NHL 🏒</h1>
          <p className="text-lg text-gray-600 mt-4">
            Built as an introduction project to Next.js.
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="bg-white rounded-full p-4 shadow-sm border-2 border-gray-900">
            <Image
              src="/nhl.png"
              alt="NHL Logo"
              width={180}
              height={180}
              priority
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            className="btn-primary flex items-center justify-center gap-3 min-w-[180px]"
            href="/teams"
          >
            🏒 Explore Teams 
          </a>

          <a
            className="btn-secondary flex items-center justify-center min-w-[180px]"
            href="/schedule"
          >
            View Current Schedule 📅
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-gray-900">Track Your Teams</h2>
            <p className="mt-2 text-gray-600">
              Follow your favorite NHL teams and never miss a game. Get easy access to schedules and team information.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-gray-900">Live Schedule</h2>
            <p className="mt-2 text-gray-600">
              View upcoming games and game results in real-time. Never miss a moment of the action!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
