import { useState } from "react"
import "./App.css"

type Song = {
  title: string
  composer: string
  period: string
  country: string
}

const songs: Song[] = [
  {
    title: "Brandenburg Concerto No.3",
    composer: "Bach",
    period: "Baroque",
    country: "Germany"
  },
  {
    title: "Moonlight Sonata",
    composer: "Beethoven",
    period: "Classical",
    country: "Germany"
  },
  {
    title: "Symphony No.40",
    composer: "Mozart",
    period: "Classical",
    country: "Austria"
  },
  {
    title: "Nocturne Op.9 No.2",
    composer: "Chopin",
    period: "Romantic",
    country: "Poland"
  }
]

function App() {

  const [currentSong, setCurrentSong] = useState(0)
  const [composer, setComposer] = useState("")
  const [period, setPeriod] = useState("")
  const [country, setCountry] = useState("")
  const [result, setResult] = useState("")

  const checkAnswer = () => {

    const correct = songs[currentSong]

    if (
      composer === correct.composer &&
      period === correct.period &&
      country === correct.country
    ) {
      setResult("✅ Correct!")
    } else {
      setResult(
        `❌ Wrong! Correct: ${correct.composer}, ${correct.period}, ${correct.country}`
      )
    }
  }

  const nextSong = () => {

    setCurrentSong((currentSong + 1) % songs.length)

    setComposer("")
    setPeriod("")
    setCountry("")
    setResult("")
  }

  return (
    <div className="quiz">

      <h1>🎼 Music History Quiz</h1>

      <h2>{songs[currentSong].title}</h2>

      <div className="question">

        <label>Composer</label>

        <select value={composer} onChange={(e) => setComposer(e.target.value)}>
          <option value="">Select</option>
          <option>Bach</option>
          <option>Mozart</option>
          <option>Beethoven</option>
          <option>Chopin</option>
        </select>

      </div>

      <div className="question">

        <label>Period</label>

        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="">Select</option>
          <option>Baroque</option>
          <option>Classical</option>
          <option>Romantic</option>
        </select>

      </div>

      <div className="question">

        <label>Country</label>

        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="">Select</option>
          <option>Germany</option>
          <option>Austria</option>
          <option>Poland</option>
        </select>

      </div>

      <button onClick={checkAnswer}>Submit</button>
      <button onClick={nextSong}>Next</button>

      <h3>{result}</h3>

    </div>
  )
}

export default App
