export type Song = {
  title: string
  composer: string
  period: string
  country: string
}

export const songs: Song[] = [
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
