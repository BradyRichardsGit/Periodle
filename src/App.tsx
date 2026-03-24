import { useState, useEffect, useRef } from "react"
import MidiPlayer from "midi-player-js"
import Soundfont from "soundfont-player"
import { songs } from "./songs"
import "./App.css"

function App() {
  // State for the Quiz
  const [index, setIndex] = useState(0)
  const [composer, setComposer] = useState("")
  const [period, setPeriod] = useState("")
  const [year, setYear] = useState("")
  const [country, setCountry] = useState("")
  const [language, setLanguage] = useState("")
  const [result, setResult] = useState("")
  
  // State for Audio
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)

  const playerRef = useRef<any>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const instrumentRef = useRef<any>(null)

  const song = songs[index]

  // Initialize MIDI Engine
  useEffect(() => {
    playerRef.current = new MidiPlayer.Player((event: any) => {
      if (event.name === 'Note on' && instrumentRef.current) {
        instrumentRef.current.play(event.noteName, audioContextRef.current!.currentTime, { 
          gain: event.velocity / 100 
        })
      }
    })
    loadMidi(song.audio)
    return () => stopMidi()
  }, [index])

  const initAudio = async () => {
    if (!audioContextRef.current) {
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext
      audioContextRef.current = new AudioContextClass()
      const choir = await Soundfont.instrument(audioContextRef.current!, 'choir_aahs')
      instrumentRef.current = choir
      setIsReady(true)
    }
  }

  const loadMidi = (url: string) => {
    fetch(url)
      .then(res => res.arrayBuffer())
      .then(arrayBuffer => playerRef.current.loadArrayBuffer(arrayBuffer))
  }

  const togglePlay = async () => {
    if (!isReady) await initAudio()
    if (audioContextRef.current?.state === 'suspended') await audioContextRef.current.resume()
    
    if (isPlaying) {
      playerRef.current.pause()
    } else {
      playerRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const stopMidi = () => {
    playerRef.current?.stop()
    setIsPlaying(false)
  }

  const normalize = (text: string) => text.trim().toLowerCase()

  function checkAnswer() {
    const isCorrect = 
      normalize(composer) === normalize(song.composer) &&
      normalize(period) === normalize(song.period) &&
      normalize(year) === normalize(song.year) &&
      normalize(country) === normalize(song.country) &&
      normalize(language) === normalize(song.language)

    if (isCorrect) {
      setResult("Correct! Well done.")
    } else {
      setResult(`Incorrect. Correct: ${song.composer}, ${song.period}, ${song.year}, ${song.country}, ${song.language}`)
    }
  }

  function nextSong() {
    stopMidi()
    setIndex((prev) => (prev + 1) % songs.length)
    setComposer(""); setPeriod(""); setYear(""); setCountry(""); setLanguage(""); setResult("")
  }

  return (
    <div className="app-container">
      <h1>Choral History Quiz</h1>

      <div className="audio-card">
        <button className="btn-play" onClick={togglePlay}>
          {!isReady ? "Load Instruments" : isPlaying ? "Pause ⏸" : "Play MIDI ▶"}
        </button>
        <button className="btn-stop" onClick={stopMidi}>Stop ⏹</button>
      </div>

      <div className="inputs-grid">
        <input placeholder="Composer" value={composer} onChange={e => setComposer(e.target.value)} />
        <input placeholder="Period" value={period} onChange={e => setPeriod(e.target.value)} />
        <input placeholder="Year" value={year} onChange={e => setYear(e.target.value)} />
        <input placeholder="Country" value={country} onChange={e => setCountry(e.target.value)} />
        <input placeholder="Language" value={language} onChange={e => setLanguage(e.target.value)} />
      </div>

      <div className="button-group">
        <button className="btn-submit" onClick={checkAnswer}>Submit</button>
        <button className="btn-next" onClick={nextSong}>Next Song</button>
      </div>

      {result && <div className="result-box">{result}</div>}
    </div>
  )
}

export default App