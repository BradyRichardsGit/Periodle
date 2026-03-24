import { useState, useEffect, useRef } from "react"
import MidiPlayer from "midi-player-js"
import Soundfont from "soundfont-player"
import { songs } from "./songs"
import "./App.css"

function App() {
  // Quiz State
  const [index, setIndex] = useState(0)
  const [composer, setComposer] = useState("")
  const [period, setPeriod] = useState("")
  const [year, setYear] = useState("")
  const [country, setCountry] = useState("")
  const [language, setLanguage] = useState("")
  const [result, setResult] = useState("")
  
  // Audio Engine State
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const playerRef = useRef<any>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const instrumentRef = useRef<any>(null)

  const song = songs[index]

  // Initialize MIDI Player
  useEffect(() => {
    playerRef.current = new MidiPlayer.Player((event: any) => {
      if (event.name === 'Note on' && instrumentRef.current) {
        instrumentRef.current.play(event.noteName, audioContextRef.current!.currentTime, { 
          gain: event.velocity / 100 
        })
      }
      // Auto-reset UI when song ends
      if (event.name === 'End of Track') {
        setIsPlaying(false)
      }
    })
    loadMidi(song.audio)
    return () => stopMidi()
  }, [index])

  const loadMidi = (url: string) => {
    fetch(url)
      .then(res => res.arrayBuffer())
      .then(arrayBuffer => playerRef.current.loadArrayBuffer(arrayBuffer))
      .catch(err => console.error("Error loading MIDI file:", err))
  }

  const handlePlayPause = async () => {
    // Load soundfonts on first click
    if (!isReady) {
      setIsLoading(true)
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext
      audioContextRef.current = new AudioContextClass()
      try {
        const choir = await Soundfont.instrument(audioContextRef.current!, 'choir_aahs')
        instrumentRef.current = choir
        setIsReady(true)
      } catch (err) {
        console.error("Soundfont failed:", err)
      }
      setIsLoading(false)
    }

    if (audioContextRef.current?.state === 'suspended') {
      await audioContextRef.current.resume()
    }

    if (isPlaying) {
      playerRef.current.pause()
      setIsPlaying(false)
    } else {
      playerRef.current.play()
      setIsPlaying(true)
    }
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
      setResult("Correct! ✨")
    } else {
      setResult(`Incorrect. It was: ${song.composer}, ${song.period}, ${song.year}, ${song.country}, ${song.language}`)
    }
  }

  function nextSong() {
    stopMidi()
    const nextIndex = Math.floor(Math.random() * songs.length)
    setIndex(nextIndex)
    setComposer(""); setPeriod(""); setYear(""); setCountry(""); setLanguage(""); setResult("")
  }

  return (
    <div className="app-container">
      <h1>Choral Music History Quiz</h1>

      <div className="audio-card">
        <button 
          className={`play-toggle ${isPlaying ? 'playing' : ''}`} 
          onClick={handlePlayPause}
          disabled={isLoading}
        >
          {isLoading ? "Loading Voices..." : isPlaying ? "Pause ⏸" : "Play Song ▶"}
        </button>
        <button className="btn-stop" onClick={stopMidi}>Reset Track</button>
      </div>

      <div className="inputs-grid">
        <input placeholder="Composer" value={composer} onChange={e => setComposer(e.target.value)} />
        <input placeholder="Period" value={period} onChange={e => setPeriod(e.target.value)} />
        <input placeholder="Year" value={year} onChange={e => setYear(e.target.value)} />
        <input placeholder="Country" value={country} onChange={e => setCountry(e.target.value)} />
        <input placeholder="Language" value={language} onChange={e => setLanguage(e.target.value)} />
      </div>

      <div className="button-group">
        <button className="btn-submit" onClick={checkAnswer}>Submit Answer</button>
        <button className="btn-next" onClick={nextSong}>Random Song ↻</button>
      </div>

      {result && (
        <div className={`result-box ${result.includes('Correct') ? 'success' : 'error'}`}>
          {result}
        </div>
      )}
    </div>
  )
}

export default App