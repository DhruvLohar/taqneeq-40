'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Upload, Trash2, FileAudio } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Card, CardContent } from '@/components/ui/card';

// Maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const voiceRecordingSchema = z.object({
  voice_recording: z.instanceof(File)
    .nullable()
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, 'Max file size is 5MB')
    .refine((file) => !file || file.type === 'audio/mp3' || file.type === 'audio/mpeg', 'Only MP3 files are allowed'),
});

type VoiceRecordingFormData = z.infer<typeof voiceRecordingSchema>;

export function VoiceRecordingForm({
  onSubmit
}: {
  onSubmit: (data: VoiceRecordingFormData) => void;
}) {
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);

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

    // Write WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + audioBuffer.length * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, audioContext.sampleRate, true);
    view.setUint32(28, audioContext.sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, audioBuffer.length * 2, true);

    // Write audio data
    const samples = new Int16Array(audioBuffer.length);
    const channelData = audioBuffer.getChannelData(0);
    for (let i = 0; i < audioBuffer.length; i++) {
      const sample = Math.max(-1, Math.min(1, channelData[i]));
      samples[i] = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
    }

    const wavBytes = new Uint8Array(wavBuffer);
    wavBytes.set(new Uint8Array(samples.buffer), 44);

    return new File([wavBytes], 'converted.wav', { type: 'audio/wav' });
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.includes('audio/mp3') && !file.type.includes('audio/mpeg')) {
        alert('Please upload an MP3 file');
        return;
      }

      try {
        const wavFile = await convertToWav(file);
        const previewUrl = URL.createObjectURL(wavFile);
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

  const clearRecording = () => {
    setAudioPreview(null);
    setAudioBlob(null);
    form.setValue('voice_recording', undefined);
  };

  const handleSubmit = (data: VoiceRecordingFormData) => {
    if (audioFile) {
      onSubmit({ voiceRecording: audioFile });
      clearRecording();
    } else {
      alert('Please upload an audio file first.');
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
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

            {audioPreview && (
              <div className="mt-4">
                <div className="flex items-center space-x-2">
                  <audio controls className='flex-grow'>
                    <source src={audioPreview} type='audio/wav' />
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
              disabled={!audioFile}
            >
              <Upload className='mr-2 h-4 w-4' />
              Upload Voice Message
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}