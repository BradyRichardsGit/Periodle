import { useState } from "react"
import "./App.css"
import { songs } from "./songs"


type Song = {
  title: string
  composer: string
  period: string
  country: string
}


function App() {

  const [index, setIndex] = useState(0)

  const [composerGuess, setComposerGuess] = useState("")
  const [periodGuess, setPeriodGuess] = useState("")
  const [countryGuess, setCountryGuess] = useState("")

  const [result, setResult] = useState("")

  const normalize = (text: string) => text.trim().toLowerCase()

  const checkAnswer = () => {

    const song = songs[index]

    const composerCorrect =
      normalize(composerGuess) === normalize(song.composer)

    const periodCorrect =
      normalize(periodGuess) === normalize(song.period)

    const countryCorrect =
      normalize(countryGuess) === normalize(song.country)

    if (composerCorrect && periodCorrect && countryCorrect) {
      setResult("All correct!")
    } else {
      setResult(
        ` Correct answers: ${song.composer}, ${song.period}, ${song.country}`
      )
    }
  }

  const nextSong = () => {

    setIndex((index + 1) % songs.length)

    setComposerGuess("")
    setPeriodGuess("")
    setCountryGuess("")
    setResult("")
  }

  const song = songs[index]

  return (
    <div className="quiz">

      <h1>🎼 Music History Trainer</h1>

      <h2>{song.title}</h2>

      <div className="inputGroup">

        <label>Composer</label>
        <input
          value={composerGuess}
          onChange={(e) => setComposerGuess(e.target.value)}
        />

      </div>

      <div className="inputGroup">

        <label>Period</label>
        <input
          value={periodGuess}
          onChange={(e) => setPeriodGuess(e.target.value)}
        />

      </div>

      <div className="inputGroup">

        <label>Country</label>
        <input
          value={countryGuess}
          onChange={(e) => setCountryGuess(e.target.value)}
        />

      </div>

      <button onClick={checkAnswer}>Check Answer</button>
      <button onClick={nextSong}>Next Song</button>

      <p className="result">{result}</p>

    </div>
  )
}

export default App
