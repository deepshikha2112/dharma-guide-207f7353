import { useState, useCallback, useRef, useEffect } from 'react';
import { MoodType } from './useDivineAudio';

interface UseMeditationMusicOptions {
  onError?: (error: string) => void;
}

interface MeditationMusicState {
  isLoading: boolean;
  isPlaying: boolean;
  currentMood: MoodType | null;
  error: string | null;
  audioUrl: string | null;
}

export const useMeditationMusic = (options?: UseMeditationMusicOptions) => {
  const [state, setState] = useState<MeditationMusicState>({
    isLoading: false,
    isPlaying: false,
    currentMood: null,
    error: null,
    audioUrl: null,
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cacheRef = useRef<Map<string, string>>(new Map());

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      // Revoke cached URLs
      cacheRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      cacheRef.current.clear();
    };
  }, []);

  const generateMeditationMusic = useCallback(async (mood: MoodType, duration: number = 30): Promise<string | null> => {
    // Check cache first
    const cacheKey = `${mood}-${duration}`;
    if (cacheRef.current.has(cacheKey)) {
      return cacheRef.current.get(cacheKey)!;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/meditation-music`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ mood, duration }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.audioContent) {
        throw new Error("No audio content received");
      }

      // Create audio URL from base64
      const audioUrl = `data:audio/mpeg;base64,${data.audioContent}`;
      
      // Cache the URL
      cacheRef.current.set(cacheKey, audioUrl);
      
      setState(prev => ({ ...prev, isLoading: false, audioUrl }));
      return audioUrl;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to generate music";
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
      options?.onError?.(errorMessage);
      return null;
    }
  }, [options]);

  const play = useCallback(async (mood: MoodType, duration: number = 30) => {
    // Stop current audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setState(prev => ({ ...prev, currentMood: mood }));

    const audioUrl = await generateMeditationMusic(mood, duration);
    
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.loop = true; // Enable looping for continuous meditation
      audioRef.current = audio;
      
      audio.onended = () => {
        setState(prev => ({ ...prev, isPlaying: false }));
      };

      audio.onerror = () => {
        setState(prev => ({ 
          ...prev, 
          isPlaying: false, 
          error: "Failed to play audio" 
        }));
      };

      await audio.play();
      setState(prev => ({ ...prev, isPlaying: true }));
    }
  }, [generateMeditationMusic]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setState(prev => ({ ...prev, isPlaying: false, currentMood: null }));
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const resume = useCallback(async () => {
    if (audioRef.current) {
      await audioRef.current.play();
      setState(prev => ({ ...prev, isPlaying: true }));
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  }, []);

  return {
    ...state,
    play,
    stop,
    pause,
    resume,
    setVolume,
    generateMeditationMusic,
  };
};
