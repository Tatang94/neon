import { useState } from 'react';
import { Camera, Music, Sparkles, Upload, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient, CURRENT_USERNAME } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import VideoThumbnail from '@/components/ui/VideoThumbnail';

interface VideoUpload {
  username: string;
  caption: string;
  music: string;
  thumbnail: string;
  videoUrl: string;
  isLiked: boolean;
  isFollowing: boolean;
}

const CreatePageNew = () => {
  const [step, setStep] = useState<'record' | 'edit' | 'upload'>('record');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>('');
  const [caption, setCaption] = useState('');
  const [music, setMusic] = useState('Original sound');
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // Upload video mutation
  const uploadMutation = useMutation({
    mutationFn: async (videoData: VideoUpload) => {
      return apiRequest('/api/videos', {
        method: 'POST',
        body: JSON.stringify(videoData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/videos'] });
      toast({
        title: "Success!",
        description: "Your video has been uploaded successfully",
      });
      // Reset form
      setStep('record');
      setVideoFile(null);
      setVideoPreview('');
      setCaption('');
      setMusic('Original sound');
      setIsUploading(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to upload video. Please try again.",
        variant: "destructive",
      });
      setIsUploading(false);
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
      setStep('edit');
    }
  };

  const handleUpload = async () => {
    if (!videoFile || !caption.trim()) {
      toast({
        title: "Error",
        description: "Please add a video and caption before uploading",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setStep('upload');

    // In a real app, you would upload the video file to a cloud storage service
    // For this demo, we'll simulate the upload and use placeholder data
    const videoData: VideoUpload = {
      username: CURRENT_USERNAME,
      caption: caption.trim(),
      music: music,
      thumbnail: '/placeholder-video.svg', // In real app, this would be extracted from video
      videoUrl: '/placeholder-video.svg', // In real app, this would be the uploaded video URL
      isLiked: false,
      isFollowing: false,
    };

    // Simulate upload delay
    setTimeout(() => {
      uploadMutation.mutate(videoData);
    }, 2000);
  };

  const handleRetake = () => {
    setStep('record');
    setVideoFile(null);
    setVideoPreview('');
    setCaption('');
    setMusic('Original sound');
  };

  const renderRecordStep = () => (
    <div className="h-full flex flex-col items-center justify-center text-white p-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Create Video</h1>
        <p className="text-gray-400">Record or upload your video to get started</p>
      </div>

      <div className="space-y-6 w-full max-w-sm">
        {/* Camera Record Button */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto rounded-full gradient-primary flex items-center justify-center glow-pink cursor-pointer hover:scale-105 transition-transform">
            <Camera className="w-16 h-16 text-white" />
          </div>
          <p className="text-center mt-3 text-sm text-gray-400">Tap to record</p>
        </div>

        {/* Upload from Gallery */}
        <div className="text-center">
          <label htmlFor="video-upload" className="cursor-pointer">
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 hover:border-purple-500 transition-colors">
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-400">Upload from gallery</p>
            </div>
          </label>
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 py-6"
          >
            <Music className="w-5 h-5 mr-2" />
            Add Sound
          </Button>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 py-6"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Effects
          </Button>
        </div>
      </div>
    </div>
  );

  const renderEditStep = () => (
    <div className="h-full flex flex-col text-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <Button variant="ghost" onClick={handleRetake}>
          <X className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">Edit Video</h1>
        <Button onClick={handleUpload} className="gradient-primary text-white px-6">
          Next
        </Button>
      </div>

      {/* Video Preview */}
      <div className="flex-1 bg-black relative">
        {videoPreview ? (
          <video
            src={videoPreview}
            className="w-full h-full object-cover"
            controls
            muted
            loop
          />
        ) : (
          <VideoThumbnail className="w-full h-full" showPlayButton={false} />
        )}
      </div>

      {/* Edit Controls */}
      <div className="p-4 space-y-4 bg-gray-900">
        {/* Caption */}
        <div>
          <label className="block text-sm font-medium mb-2">Caption</label>
          <Textarea
            placeholder="Describe your video..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 resize-none"
            rows={3}
          />
          <p className="text-xs text-gray-400 mt-1">{caption.length}/150 characters</p>
        </div>

        {/* Music */}
        <div>
          <label className="block text-sm font-medium mb-2">Sound</label>
          <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
            <Music className="w-5 h-5 text-purple-400" />
            <div className="flex-1">
              <p className="text-white text-sm">{music}</p>
              <p className="text-gray-400 text-xs">Tap to change</p>
            </div>
            <Button variant="ghost" size="sm">
              Change
            </Button>
          </div>
        </div>

        {/* Quick Edit Options */}
        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
            <Sparkles className="w-4 h-4 mr-2" />
            Effects
          </Button>
          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
            Speed
          </Button>
          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
            Filter
          </Button>
        </div>
      </div>
    </div>
  );

  const renderUploadStep = () => (
    <div className="h-full flex flex-col items-center justify-center text-white p-6">
      <div className="text-center">
        {isUploading ? (
          <>
            <div className="w-16 h-16 mx-auto mb-4 relative">
              <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            </div>
            <h2 className="text-xl font-bold mb-2">Uploading your video...</h2>
            <p className="text-gray-400">Please wait while we process your content</p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-2">Video uploaded successfully!</h2>
            <p className="text-gray-400 mb-6">Your video is now live and ready to be discovered</p>
            <Button
              onClick={() => setStep('record')}
              className="gradient-primary text-white px-8"
            >
              Create Another
            </Button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-full bg-black">
      {step === 'record' && renderRecordStep()}
      {step === 'edit' && renderEditStep()}
      {step === 'upload' && renderUploadStep()}
    </div>
  );
};

export default CreatePageNew;