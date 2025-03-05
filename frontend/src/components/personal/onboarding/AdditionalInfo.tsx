'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Mic,
  MicOff,
  Upload,
  Trash2,
  FileAudio,
  Timer
} from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Zod schema for voice recording validation
const voiceRecordingSchema = z.object({
  voice_recording: z.instanceof(File)
    .nullable()
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, 'Max file size is 5MB')
    .refine((file) => !file || file.type === 'audio/wav', 'Only WAV files are allowed'),
});

// Type inference for the form data
type VoiceRecordingFormData = z.infer<typeof voiceRecordingSchema>;

export function VoiceRecordingForm({
  onSubmit
}: {
  onSubmit: (data: VoiceRecordingFormData) => void;
}) {
  // State variables
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  // Refs for managing recording
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]); // Store raw Blob chunks
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Form setup
  const form = useForm<VoiceRecordingFormData>({
    resolver: zodResolver(voiceRecordingSchema),
    defaultValues: {
      voice_recording: undefined,
    }
  });

  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Ensure only WAV files can be uploaded
      if (file.type !== 'audio/wav') {
        alert('Please upload a WAV file');
        return;
      }

      // Create a URL for audio preview
      const previewUrl = URL.createObjectURL(file);
      setAudioPreview(previewUrl);
      setAudioBlob(file);

      // Set the file in the form
      form.setValue('voice_recording', file);
    }
  };

  // Helper function to write strings to WAV header
  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  const convertToWav = async (blob: Blob): Promise<Blob> => {
    const arrayBuffer = await blob.arrayBuffer();
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Create WAV file
    const wavBuffer = new ArrayBuffer(44 + audioBuffer.length * 2);
    const view = new DataView(wavBuffer);

    // RIFF chunk descriptor
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + audioBuffer.length * 2, true);
    writeString(view, 8, 'WAVE');

    // FMT sub-chunk
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // Subchunk1Size
    view.setUint16(20, 1, true); // Audio format (PCM)
    view.setUint16(22, 1, true); // Number of channels
    view.setUint32(24, audioContext.sampleRate, true); // Sample rate
    view.setUint32(28, audioContext.sampleRate * 2, true); // Byte rate
    view.setUint16(32, 2, true); // Block align
    view.setUint16(34, 16, true); // Bits per sample

    // Data sub-chunk
    writeString(view, 36, 'data');
    view.setUint32(40, audioBuffer.length * 2, true);

    // Write audio data
    const samples = new Int16Array(audioBuffer.length);
    for (let i = 0; i < audioBuffer.length; i++) {
      const s = Math.max(-1, Math.min(1, audioBuffer.getChannelData(0)[i]));
      samples[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }

    // Write samples to buffer
    const output = new Uint8Array(wavBuffer);
    const input = new Uint8Array(samples.buffer);
    output.set(input, 44);

    return new Blob([output], { type: 'audio/wav' });
  };

  // Start audio recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Reset recording duration and chunks
      setRecordingDuration(0);
      audioChunksRef.current = [];

      // Start timer
      recordingTimerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);

      // Create media recorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm; codecs=opus'
      });

      mediaRecorderRef.current = mediaRecorder;

      // Handle data available event
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      // Handle recording stop
      mediaRecorder.onstop = async () => {
        // Stop timer
        if (recordingTimerRef.current) {
          clearInterval(recordingTimerRef.current);
        }

        // Combine audio chunks into a single Blob
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

        // Convert to WAV format
        const wavBlob = await convertToWav(audioBlob);

        // Create preview and set blob
        const previewUrl = URL.createObjectURL(wavBlob);
        setAudioPreview(previewUrl);
        setAudioBlob(wavBlob);

        // Convert Blob to File for form submission
        const audioFile = new File([wavBlob], 'recording.wav', { type: 'audio/wav' });
        form.setValue('voice_recording', audioFile);

        // Stop all tracks in the stream
        stream.getTracks().forEach(track => track.stop());
      };

      // Start recording
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Clear current recording
  const clearRecording = () => {
    setAudioPreview(null);
    setAudioBlob(null);
    form.setValue('voice_recording', undefined);
  };

  // Submit handler
  const handleSubmit = (data: VoiceRecordingFormData) => {
    if (audioBlob) {
      onSubmit(data);
    } else {
      alert('Please upload or record an audio file first.');
    }
  };

  // Format duration in MM:SS
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Voice Recording</CardTitle>
        <CardDescription>You can either upload a audio talking about the property or just record it right away!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            <div className="grid grid-cols-2 gap-4">
              {/* File Upload Section */}
              <Card className="p-4 border">
                <div className="flex flex-col items-center space-y-2">
                  <FileAudio className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-center">Have an audio file?</p>
                  <FormField
                    control={form.control}
                    name='voice_recording'
                    render={() => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            type='file'
                            accept='.wav'
                            onChange={handleFileChange}
                            className='w-full'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>

              {/* Record Audio Section */}
              <Card className="p-4 border">
                <div className="flex flex-col items-center space-y-2">
                  {!isRecording ? (
                    <>
                      <Mic className="h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-center">Record a new audio</p>
                      <Button
                        type='button'
                        variant='outline'
                        onClick={startRecording}
                        className="w-full"
                      >
                        Start Recording
                      </Button>
                    </>
                  ) : (
                    <>
                      <MicOff className="h-8 w-8 text-destructive animate-pulse" />
                      <p className="text-sm text-center">Recording in progress</p>
                      <div className="flex items-center space-x-2">
                        <Timer className="h-5 w-5" />
                        <Badge variant="secondary">
                          {formatDuration(recordingDuration)}
                        </Badge>
                      </div>
                      <Button
                        type='button'
                        variant='destructive'
                        onClick={stopRecording}
                        className="w-full"
                      >
                        Stop Recording
                      </Button>
                    </>
                  )}
                </div>
              </Card>
            </div>

            {/* Audio Preview */}
            {audioPreview && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <audio controls className='flex-grow'>
                    <source src={audioPreview} type='audio/webm' />
                    Your browser does not support the audio element.
                  </audio>
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    onClick={clearRecording}
                    title='Clear Recording'
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            )}

            <Button
              type='submit'
              className='w-full'
              disabled={!audioBlob}
            >
              <Upload className='mr-2 h-4 w-4' />
              Submit Recording
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}