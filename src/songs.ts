export type Song = {
  title: string
  composer: string
  period: string
  country: string
  audio: string
}

export const songs: Song[] = [
  {
    title: "Brandenburg Concerto No.3",
    composer: "Bach",
    period: "Baroque",
    country: "Germany",
    audio: "/audio/brandenburg3.mp3"
  },
  {
    title: "Moonlight Sonata",
    composer: "Beethoven",
    period: "Classical",
    country: "Germany",
    audio: "/audio/moonlight.mp3"
  },
  {
    title: "Symphony No.40",
    composer: "Mozart",
    period: "Classical",
    country: "Austria",
    audio: "/audio/symphony40.mp3"
  },
  {
    title: "Nocturne Op.9 No.2",
    composer: "Chopin",
    period: "Romantic",
    country: "Poland",
    audio: "/audio/nocturne9.mp3"
  }
]
