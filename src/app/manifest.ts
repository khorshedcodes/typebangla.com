import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TypeBangla — Complete Bangla & English Typing Platform",
    short_name: "TypeBangla",
    description: "Master Bangla (UniBijoy, Jatiya, Avro, Probhat, Inscript) and English touch typing with official government job exam tests, interactive games, and instant certificates.",
    start_url: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#090d16",
    theme_color: "#10b981",
    categories: ["education", "productivity", "utilities"],
    shortcuts: [
      {
        name: "Govt Exam Center",
        url: "/exam/govt",
        description: "Practice official government recruitment exam papers"
      },
      {
        name: "Timed Speed Test",
        url: "/practice/test",
        description: "1, 3, 5, and 10 minute speed tests"
      },
      {
        name: "Typing Arcade Games",
        url: "/game",
        description: "Interactive car racing and reflex games"
      }
    ],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/logo/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
