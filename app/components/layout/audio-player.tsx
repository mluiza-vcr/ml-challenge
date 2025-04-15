import { useRef, useState } from "react";
import { Button } from "../ui/button";
import MusicTheme from "/music-theme.mp3";
import { Music } from "lucide-react";

export function AudioPlayer({ text }: { text: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center" data-testid="audio-player">
      <Button onClick={togglePlayback} variant="outline" className="p-3 w-full">
        {text ? (
          <>
            <Music className="mr-1" width={20} />
            {isPlaying ? "Pausar música" : "Tocar música"}{" "}
          </>
        ) : (
          <Music width={20} />
        )}
      </Button>
      {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
      <audio ref={audioRef} src={MusicTheme} loop />
    </div>
  );
}
