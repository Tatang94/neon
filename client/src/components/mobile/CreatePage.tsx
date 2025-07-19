import { useState } from 'react';
import { Camera, Video, Upload, Music, Palette, Sparkles, Timer, RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

const CreatePage = () => {
  const [recordingMode, setRecordingMode] = useState<'video' | 'photo'>('video');
  const [selectedMusic, setSelectedMusic] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(15);

  const musicTracks = [
    { id: '1', title: 'Electric Dreams', artist: 'Synthwave Mix', duration: '3:24' },
    { id: '2', title: 'Neon Nights', artist: 'DJ Cyber', duration: '2:45' },
    { id: '3', title: 'Future Bass', artist: 'Digital Beats', duration: '3:12' },
    { id: '4', title: 'Retro Wave', artist: 'Synth Master', duration: '4:01' },
  ];

  const filters = [
    { id: 'none', name: 'Original', color: 'bg-gray-500' },
    { id: 'neon', name: 'Neon Glow', color: 'bg-gradient-to-r from-pink-500 to-purple-500' },
    { id: 'retro', name: 'Retro Vibe', color: 'bg-gradient-to-r from-orange-500 to-red-500' },
    { id: 'cyberpunk', name: 'Cyberpunk', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { id: 'dreamy', name: 'Dreamy', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'vintage', name: 'Vintage', color: 'bg-gradient-to-r from-yellow-500 to-orange-500' },
  ];

  const timeOptions = [15, 30, 60];

  return (
    <div className="h-full bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="sm">
          <X className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
          Create
        </h1>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          Draft
        </Button>
      </div>

      {/* Camera Preview */}
      <div className="flex-1 relative bg-black">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center text-white">
            <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-sm opacity-70">Camera preview will appear here</p>
          </div>
        </div>

        {/* Recording Controls Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          {/* Top Controls */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button
                variant={recordingMode === 'video' ? 'default' : 'secondary'}
                size="sm"
                onClick={() => setRecordingMode('video')}
                className="bg-black/50 backdrop-blur-sm text-white border-border"
              >
                <Video className="w-4 h-4 mr-1" />
                Video
              </Button>
              <Button
                variant={recordingMode === 'photo' ? 'default' : 'secondary'}
                size="sm"
                onClick={() => setRecordingMode('photo')}
                className="bg-black/50 backdrop-blur-sm text-white border-border"
              >
                <Camera className="w-4 h-4 mr-1" />
                Photo
              </Button>
            </div>

            <Button size="sm" className="bg-black/50 backdrop-blur-sm text-white border-border">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          {/* Time Selector */}
          {recordingMode === 'video' && (
            <div className="self-center">
              <div className="flex gap-2">
                {timeOptions.map((time) => (
                  <Button
                    key={time}
                    variant={recordingTime === time ? 'default' : 'secondary'}
                    size="sm"
                    onClick={() => setRecordingTime(time)}
                    className={`w-12 h-8 text-xs ${
                      recordingTime === time 
                        ? 'gradient-primary text-white' 
                        : 'bg-black/50 backdrop-blur-sm text-white border-border'
                    }`}
                  >
                    {time}s
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Controls */}
          <div className="flex justify-center items-center gap-8">
            <Button variant="secondary" size="sm" className="bg-black/50 backdrop-blur-sm text-white border-border">
              <Upload className="w-5 h-5" />
            </Button>

            {/* Record Button */}
            <div className="relative">
              <Button
                size="lg"
                className="w-20 h-20 rounded-full gradient-primary glow-pink"
              >
                <div className="w-6 h-6 bg-white rounded-full" />
              </Button>
            </div>

            <Button variant="secondary" size="sm" className="bg-black/50 backdrop-blur-sm text-white border-border">
              <Sparkles className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tools Panel */}
      <div className="bg-surface border-t border-border p-4 space-y-4">
        {/* Music Selection */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Music className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Add Music</h3>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {musicTracks.map((track) => (
              <Button
                key={track.id}
                variant={selectedMusic === track.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMusic(selectedMusic === track.id ? null : track.id)}
                className={`whitespace-nowrap ${
                  selectedMusic === track.id 
                    ? 'gradient-primary text-white' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Music className="w-3 h-3 mr-1" />
                {track.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Palette className="w-5 h-5 text-secondary" />
            <h3 className="font-semibold text-foreground">Filters</h3>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <div
                key={filter.id}
                onClick={() => setSelectedFilter(selectedFilter === filter.id ? null : filter.id)}
                className="flex flex-col items-center gap-2 cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-full ${filter.color} ${
                  selectedFilter === filter.id 
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface' 
                    : 'group-hover:scale-110'
                } transition-smooth`} />
                <span className={`text-xs ${
                  selectedFilter === filter.id ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}>
                  {filter.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1 border-border hover:border-primary/50">
            Save Draft
          </Button>
          <Button className="flex-1 gradient-primary text-white">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;