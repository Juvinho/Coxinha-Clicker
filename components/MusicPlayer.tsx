import React, { useEffect, useRef, useState } from 'react';

interface MusicPlayerProps {
  enabled: boolean;
  volume?: number;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ enabled, volume = 0.3 }) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainsRef = useRef<GainNode[]>([]);
  const masterGainRef = useRef<GainNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!enabled || isPlaying) return;

    const initAudio = () => {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;

      audioContextRef.current = new AudioContext();
      const ctx = audioContextRef.current;

      // Create master gain
      masterGainRef.current = ctx.createGain();
      masterGainRef.current.gain.setValueAtTime(volume, ctx.currentTime);
      masterGainRef.current.connect(ctx.destination);

      // Create ambient background music using oscillators
      const frequencies = [110, 220, 330]; // A2, A3, A4 (ambient A minor)
      
      frequencies.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        // Add slight modulation for dynamic feel
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.5, ctx.currentTime);
        lfoGain.gain.setValueAtTime(20, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        
        // Volume envelope
        gain.gain.setValueAtTime(0.15 / (index + 1), ctx.currentTime);
        
        osc.connect(gain);
        gain.connect(masterGainRef.current!);
        
        oscillatorsRef.current.push(osc);
        gainsRef.current.push(gain);
        
        lfo.start();
        osc.start();
      });

      setIsPlaying(true);
    };

    initAudio();

    return () => {
      if (audioContextRef.current && oscillatorsRef.current.length > 0) {
        oscillatorsRef.current.forEach(osc => {
          try {
            osc.stop();
          } catch (e) {
            // Already stopped
          }
        });
        oscillatorsRef.current = [];
        gainsRef.current = [];
      }
    };
  }, [enabled, isPlaying, volume]);

  useEffect(() => {
    if (!enabled && isPlaying) {
      if (audioContextRef.current && masterGainRef.current) {
        masterGainRef.current.gain.linearRampToValueAtTime(
          0,
          audioContextRef.current.currentTime + 1
        );
        
        setTimeout(() => {
          oscillatorsRef.current.forEach(osc => {
            try {
              osc.stop();
            } catch (e) {
              // Already stopped
            }
          });
          oscillatorsRef.current = [];
          gainsRef.current = [];
          setIsPlaying(false);
        }, 1000);
      }
    }
  }, [enabled, isPlaying]);

  return <div style={{ display: 'none' }} />;
};

export default MusicPlayer;
