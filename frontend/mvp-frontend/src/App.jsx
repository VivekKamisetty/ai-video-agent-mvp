import { useState } from 'react'

export default function App() {
  const [query, setQuery] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Placeholder function simulating video generation flow
  const handleGenerateVideo = async () => {
    setIsLoading(true)
    // In the future, replace this with an actual fetch call to your backend
    setTimeout(() => {
      setVideoUrl('https://example.com/fake-video-link.mp4')
      setIsLoading(false)
    }, 2500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col">
      {/* HEADER / NAVBAR */}
      <header className="py-4 px-8 flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold tracking-tight hover:scale-105 transition-transform">
          Explain@AI
        </h1>
        <nav>
          {/* Future Nav Links (e.g. 'About', 'Contact') can go here */}
        </nav>
      </header>

      {/* HERO / MAIN CONTENT */}
      <main className="flex-grow flex flex-col justify-center items-center px-4">
        <div className="text-center max-w-2xl mb-12">
          <h2 className="text-white text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow">
            Instantly Turn Your Queries into AI-Generated Videos
          </h2>
          <p className="text-white/90 text-lg sm:text-xl">
            Explain@AI transforms your ideas, questions, and topics into engaging videos at the click of a button.
          </p>
        </div>

        {/* CARD CONTAINER */}
        <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              What do you want to explain?
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="E.g. Explain bubble sort, Summarize a Netflix show..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={handleGenerateVideo}
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? 'Generating...' : 'Generate Video'}
          </button>
        </div>

        {/* VIDEO RESULT */}
        <div className="mt-8 w-full max-w-lg">
          {isLoading && (
            <div className="bg-white/80 p-4 rounded-xl shadow-lg text-center animate-pulse">
              <p className="text-gray-700">Processing your request, please wait...</p>
            </div>
          )}
          {!isLoading && videoUrl && (
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <h3 className="font-bold text-gray-800 mb-2">Your Video:</h3>
              {/* Link or embed your video here */}
              <a
                href={videoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 hover:underline"
              >
                Click to watch your AI-generated video
              </a>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-4 text-center bg-white/10">
        <p className="text-white/90 text-sm">
          © {new Date().getFullYear()} Explain@AI. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
