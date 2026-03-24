import { useState, useEffect, useRef } from "react"
import "./App.css"
import { songs } from "./songs"

function normalize(text: string) {
  return text.trim().toLowerCase()
}

function App() {
  const [index, setIndex] = useState(0)
  const [composer, setComposer] = useState("")
  const [period, setPeriod] = useState("")
  const [year, setYear] = useState("")
  const [country, setCountry] = useState("")
  const [language, setLanguage] = useState("")
  const [genre, setGenre] = useState("")
  const [result, setResult] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const audioRef = useRef<HTMLAudioElement>(null)
  const song = songs[index]

  // Reload audio whenever the song changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load()
    }
  }, [index])

  function checkAnswer() {
    const fields = [
      { user: composer, correct: song.composer },
      { user: period, correct: song.period },
      { user: year, correct: song.year },
      { user: country, correct: song.country },
      { user: language, correct: song.language },
      { user: genre, correct: song.genre }
    ]

    const allCorrect = fields.every(f => normalize(f.user) === normalize(f.correct))

    if (allCorrect) {
      setResult("Excellent! You got them all right.")
      setIsCorrect(true)
    } else {
      setResult(`Not quite. Correct answer: ${song.composer} (${song.year}), ${song.period}, ${song.country}, ${song.language}, ${song.genre}`)
      setIsCorrect(false)
    }
  }

  function nextSong() {
    // Logic for a random song that isn't the current one
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * songs.length);
    } while (nextIndex === index && songs.length > 1);

    setIndex(nextIndex)
    setComposer("")
    setPeriod("")
    setYear("")
    setCountry("")
    setLanguage("")
    setGenre("")
    setResult("")
    setIsCorrect(null)
  }

  return (
    <div className="app-container">
      <h1>Choral History Quiz</h1>

      <div className="audio-card">
        <audio ref={audioRef} controls>
          <source src={song.audio} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>

      <div className="inputs-grid">
        <input placeholder="Composer" value={composer} onChange={(e) => setComposer(e.target.value)} />
        <input placeholder="Period (e.g. Baroque)" value={period} onChange={(e) => setPeriod(e.target.value)} />
        <input placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
        <input placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
        <input placeholder="Language" value={language} onChange={(e) => setLanguage(e.target.value)} />
        <input placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
      </div>

      <div className="button-group">
        <button className="btn-submit" onClick={checkAnswer}>Submit Answer</button>
        <button className="btn-next" onClick={nextSong}>New Song ↻</button>
      </div>

      {result && (
        <div className={`result-box ${isCorrect ? 'success' : 'error'}`}>
          {result}
        </div>
      )}
    </div>
  )
}

export default App