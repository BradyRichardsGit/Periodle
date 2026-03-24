import { useState, useEffect, useRef } from "react"
import MidiPlayer from "midi-player-js"
import Soundfont from "soundfont-player"
import { songs } from "./songs"
import "./App.css"

function App() {
  const [index, setIndex] = useState(0)
  const [result, setResult] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  
  // Refs to hold the player and the audio context
  const playerRef = useRef<any>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const instrumentRef = useRef<any>(null)

  const song = songs[index]

  useEffect(() => {
    // Initialize Audio Context on first interaction
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()

    // Load the Soundfont (Acoustic Grand Piano is standard, 'choir_aahs' is better for you)
    Soundfont.instrument(audioContextRef.current, 'choir_aahs').then((choir) => {
      instrumentRef.current = choir
      
      // Initialize MIDI Player
      playerRef.current = new MidiPlayer.Player((event: any) => {
        if (event.name === 'Note on') {
          instrumentRef.current.play(event.noteName, audioContextRef.current!.currentTime, { gain: event.velocity / 100 })
        }
      })
      
      loadMidi(song.audio)
    })

    return () => stopMidi()
  }, [index])

  const loadMidi = (url: string) => {
    fetch(url)
      .then(res => res.arrayBuffer())
      .then(arrayBuffer => {
        playerRef.current.loadArrayBuffer(arrayBuffer)
      })
  }

  const togglePlay = () => {
    if (isPlaying) {
      playerRef.current.pause()
    } else {
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume()
      }
      playerRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const stopMidi = () => {
    playerRef.current?.stop()
    setIsPlaying(false)
  }

  // ... (keep your existing checkAnswer and nextSong functions)

  return (
    <div className="app-container">
      <h1>Choral MIDI Quiz</h1>

      <div className="audio-card">
        <button className="play-btn" onClick={togglePlay}>
          {isPlaying ? "Pause ⏸" : "Play MIDI ▶"}
        </button>
        <button onClick={stopMidi}>Stop ⏹</button>
      </div>

      {/* ... keep your inputs and result display here ... */}
    </div>
  )
}

export default App