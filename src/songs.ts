export interface Song {
  audio: string;
  composer: string;
  period: string;
  year: string;
  country: string;
  language: string;
  genre: string;
}

export const songs: Song[] = [
  {
    audio: "/audio/Ws-moz-lacr.mid", 
    composer: "Wolfgang Amadeus Mozart",
    period: "Classical",
    year: "1791",
    country: "Austria",
    language: "Latin",
    genre: "Sacred"
  },
  {
    audio: "/audio/palestrina-sicut.mp3",
    composer: "Giovanni Pierluigi da Palestrina",
    period: "Renaissance",
    year: "1584",
    country: "Italy",
    language: "Latin",
    genre: "Sacred"
  }
  // Add more here...
];