import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Pause, Volume2, VolumeX, Sparkles, Music, Loader2 } from 'lucide-react';
import { useDivineAudio, MoodType } from '@/hooks/useDivineAudio';
import { useMeditationMusic } from '@/hooks/useMeditationMusic';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface MoodOption {
  mood: MoodType;
  label: string;
  labelHindi: string;
  description: string;
  icon: string;
}

const moodOptions: MoodOption[] = [
  { mood: 'peaceful', label: 'Calm', labelHindi: 'शांति', description: 'Flute, tanpura, stillness', icon: '😌' },
  { mood: 'stressed', label: 'Stress Relief', labelHindi: 'तनाव मुक्ति', description: 'Piano, pads, grounding', icon: '😟' },
  { mood: 'sad', label: 'Healing', labelHindi: 'उपचार', description: 'Violin, strings, release', icon: '😢' },
  { mood: 'sleep', label: 'Sleep', labelHindi: 'नींद', description: 'Deep drones, chimes', icon: '😴' },
  { mood: 'focus', label: 'Focus', labelHindi: 'एकाग्रता', description: 'Singing bowls, bells', icon: '🧘' },
  { mood: 'energy', label: 'Energy', labelHindi: 'ऊर्जा', description: 'Light percussion, beats', icon: '🔥' },
  { mood: 'happy', label: 'Happy', labelHindi: 'प्रसन्न', description: 'Bright, uplifting tones', icon: '✨' },
  { mood: 'devotional', label: 'Devotional', labelHindi: 'भक्ति', description: 'Sacred Om, temple bells', icon: '🙏' },
];

interface MoodSoundPlayerProps {
  compact?: boolean;
  className?: string;
}

const MoodSoundPlayer = ({ compact = false, className }: MoodSoundPlayerProps) => {
  const { session } = useAuth();
  const divineAudio = useDivineAudio();
  const meditationMusic = useMeditationMusic({
    onError: (error) => {
      toast({
        title: "Audio Generation Error",
        description: error,
        variant: "destructive",
      });
    },
    session
  });
  
  const [volume, setVolumeState] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [audioMode, setAudioMode] = useState<'synthesized' | 'ai'>('synthesized');

  const isPlaying = audioMode === 'synthesized' ? divineAudio.isPlaying : meditationMusic.isPlaying;
  const currentMood = audioMode === 'synthesized' ? divineAudio.currentMood : meditationMusic.currentMood;
  const isLoading = meditationMusic.isLoading;

  const handleMoodSelect = async (mood: MoodType) => {
    if (isPlaying && currentMood === mood) {
      if (audioMode === 'synthesized') {
        divineAudio.stop();
      } else {
        meditationMusic.stop();
      }
    } else {
      // Stop the other player first
      if (audioMode === 'synthesized') {
        meditationMusic.stop();
        divineAudio.play({ mood, volume: isMuted ? 0 : volume });
      } else {
        divineAudio.stop();
        await meditationMusic.play(mood, 60); // Generate 60 seconds of AI music
        meditationMusic.setVolume(isMuted ? 0 : volume);
      }
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolumeState(newVolume);
    const effectiveVolume = isMuted ? 0 : newVolume;
    divineAudio.setVolume(effectiveVolume);
    meditationMusic.setVolume(effectiveVolume);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    const effectiveVolume = isMuted ? volume : 0;
    divineAudio.setVolume(effectiveVolume);
    meditationMusic.setVolume(effectiveVolume);
  };

  const handleModeChange = (mode: string) => {
    // Stop current audio when switching modes
    divineAudio.stop();
    meditationMusic.stop();
    setAudioMode(mode as 'synthesized' | 'ai');
  };

  if (compact) {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        <div className="flex gap-2 flex-wrap">
          {moodOptions.slice(0, 4).map((option) => (
            <Button
              key={option.mood}
              variant={currentMood === option.mood ? "default" : "outline"}
              size="sm"
              onClick={() => handleMoodSelect(option.mood)}
              disabled={isLoading}
              className="text-xs gap-1"
            >
              {option.icon}
              {isLoading && currentMood === option.mood && (
                <Loader2 className="w-3 h-3 animate-spin" />
              )}
              {isPlaying && currentMood === option.mood && !isLoading && (
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              )}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleMute} className="h-8 w-8">
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <Slider
            value={[volume]}
            onValueChange={handleVolumeChange}
            max={1}
            step={0.01}
            className="w-20"
          />
        </div>
      </div>
    );
  }

  return (
    <Card className={cn("bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-cosmic-gold/20", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle className="text-lg font-heading flex items-center gap-2">
            <span className="text-xl">🎶</span>
            आज आप कैसा महसूस कर रहे हैं?
            <span className="text-sm font-normal text-muted-foreground">(How are you feeling today?)</span>
          </CardTitle>
          
          {/* Audio Mode Toggle */}
          <Tabs value={audioMode} onValueChange={handleModeChange} className="w-auto">
            <TabsList className="h-9 bg-cosmic-gold/10 border border-cosmic-gold/20">
              <TabsTrigger value="synthesized" className="gap-1.5 text-xs px-3 data-[state=active]:bg-cosmic-gold/20">
                <Music className="w-3.5 h-3.5" />
                Synthesized
              </TabsTrigger>
              <TabsTrigger value="ai" className="gap-1.5 text-xs px-3 data-[state=active]:bg-cosmic-gold/20">
                <Sparkles className="w-3.5 h-3.5" />
                AI Generated
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <p className="text-sm text-muted-foreground">
          {audioMode === 'synthesized' 
            ? 'Select your mood for instant divine music synthesis'
            : 'Select your mood for AI-generated meditation soundscape (takes a moment to generate)'}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {moodOptions.map((option) => (
            <button
              key={option.mood}
              onClick={() => handleMoodSelect(option.mood)}
              disabled={isLoading && currentMood !== option.mood}
              className={cn(
                "relative p-4 rounded-xl border-2 transition-all duration-300",
                "hover:scale-105 hover:shadow-lg",
                "flex flex-col items-center text-center gap-2",
                "disabled:opacity-50 disabled:hover:scale-100",
                currentMood === option.mood
                  ? "border-cosmic-gold bg-cosmic-gold/10 shadow-cosmic-gold/20 shadow-lg"
                  : "border-cosmic-gold/20 bg-background/50 hover:border-cosmic-gold/50"
              )}
            >
              <span className="text-2xl">{option.icon}</span>
              <span className="font-medium text-sm">{option.labelHindi}</span>
              <span className="text-xs text-muted-foreground">{option.label}</span>
              <span className="text-xs text-muted-foreground/70 line-clamp-1">
                {option.description}
              </span>
              
              {isLoading && currentMood === option.mood && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-xl">
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin text-cosmic-gold" />
                    <span className="text-xs text-muted-foreground">Generating...</span>
                  </div>
                </div>
              )}
              
              {isPlaying && currentMood === option.mood && !isLoading && (
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <Pause className="h-3 w-3 text-cosmic-gold" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-cosmic-gold/20">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="h-9 w-9"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
            <Slider
              value={[volume]}
              onValueChange={handleVolumeChange}
              max={1}
              step={0.01}
              className="w-32"
            />
          </div>

          <div className="flex items-center gap-2">
            {audioMode === 'ai' && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cosmic-gold" />
                Powered by ElevenLabs
              </span>
            )}
            
            {isPlaying && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => audioMode === 'synthesized' ? divineAudio.stop() : meditationMusic.stop()}
                className="gap-2 border-cosmic-gold/30 hover:border-cosmic-gold/50"
              >
                <Pause className="h-4 w-4" />
                Stop
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodSoundPlayer;
