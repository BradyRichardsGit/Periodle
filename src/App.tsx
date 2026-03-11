import { useState } from "react"
import "./App.css"
import { songs } from "./songs"

function normalize(text: string) {
  return text.trim().toLowerCase()
}

function App() {

  const [index, setIndex] = useState(0)

  const [composer, setComposer] = useState("")
  const [period, setPeriod] = useState("")
  const [country, setCountry] = useState("")

  const [result, setResult] = useState("")

  const song = songs[index]

  function checkAnswer() {

    const correctComposer = normalize(song.composer)
    const correctPeriod = normalize(song.period)
    const correctCountry = normalize(song.country)

    const userComposer = normalize(composer)
    const userPeriod = normalize(period)
    const userCountry = normalize(country)

    if (
      userComposer === correctComposer &&
      userPeriod === correctPeriod &&
      userCountry === correctCountry
    ) {
      setResult("Correct!")
    } else {
      setResult(
        `Correct: ${song.composer}, ${song.period}, ${song.country}`
      )
    }
  }

  function nextSong() {

    setIndex((index + 1) % songs.length)

    setComposer("")
    setPeriod("")
    setCountry("")
    setResult("")
  }

  return (
    <div className="app">

      <h1>Music History Quiz</h1>

      <audio controls src={song.audio}></audio>

      <div className="inputs">

        <input
          placeholder="Composer"
          value={composer}
          onChange={(e) => setComposer(e.target.value)}
        />

        <input
          placeholder="Period"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        />

        <input
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

      </div>

      <div className="buttons">

        <button onClick={checkAnswer}>Submit</button>
        <button onClick={nextSong}>Next Song</button>

      </div>

      <p className="result">{result}</p>

    </div>
  )
}

export default App
