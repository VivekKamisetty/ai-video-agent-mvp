import { useState } from 'react'

export default function App() {
  const [query, setQuery] = useState('')
  const [gptResponse, setGptResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // This function will ONLY call /generate-text
  // and display the GPT output (no video logic).
  const handleGenerateExplanation = async () => {
    if (!query.trim()) return
    setIsLoading(true)
    setErrorMsg('')
    setGptResponse('')

    try {
      // Replace with your actual backend URL if needed (e.g., your server IP or domain)
      const res = await fetch('http://127.0.0.1:8000/generate-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      })

      if (!res.ok) {
        throw new Error(`Server error: ${res.status} ${res.statusText}`)
      }

      const data = await res.json()
      // Expecting data.text from your /generate-text endpoint
      setGptResponse(data.text || '')
    } catch (err) {
      console.error(err)
      setErrorMsg('An error occurred while generating the explanation.')
    } finally {
      setIsLoading(false)
    }
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
            onClick={handleGenerateExplanation}
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? 'Generating...' : 'Generate Explanation'}
          </button>
        </div>

        {/* LOADING / ERROR STATE */}
        <div className="mt-8 w-full max-w-lg">
          {isLoading && (
            <div className="bg-white/80 p-4 rounded-xl shadow-lg text-center animate-pulse">
              <p className="text-gray-700">Processing your request, please wait...</p>
            </div>
          )}
          {errorMsg && (
            <div className="bg-red-100 p-4 rounded-xl shadow-md text-red-600 mt-4">
              {errorMsg}
            </div>
          )}
        </div>

        {/* AI EXPLANATION RESULT */}
        {!isLoading && gptResponse && (
          <div className="mt-8 w-full max-w-lg bg-white p-4 rounded-xl shadow-lg">
            <h3 className="font-bold text-gray-800 mb-2">Explanation:</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {gptResponse}
            </p>
          </div>
        )}
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
