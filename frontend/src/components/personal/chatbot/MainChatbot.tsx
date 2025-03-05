'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Upload, Mic, Trash2, FileAudio, MicOff } from 'lucide-react';
import axios from 'axios';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const voiceRecordingSchema = z.object({
  voiceRecording: z.instanceof(File)
    .nullable()
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, 'Max file size is 5MB')
    .refine((file) => !file || file.type.startsWith('audio/'), 'Only audio files are allowed'),
});

type VoiceRecordingFormData = z.infer<typeof voiceRecordingSchema>;

const ChatInterface = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<VoiceRecordingFormData>({
    resolver: zodResolver(voiceRecordingSchema),
    defaultValues: {
      voiceRecording: undefined,
    }
  });

  // Handle live audio recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setRecordedAudio(audioBlob);
        setAudioPreview(URL.createObjectURL(audioBlob));
        audioChunksRef.current = [];
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: any = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    try {
      const response = await axios.post<any>(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        clientId: '123', // Replace with actual client ID
        message: inputMessage
      });

      if (response.data.success) {
        const botMessage: any = {
          id: messages.length + 2,
          text: response.data.message,
          isBot: true
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error('Response failed');
      }
    } catch (error) {
      const errorMessage: any = {
        id: messages.length + 2,
        text: "Sorry, I couldn't process your message at this time.",
        isBot: true
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const convertToWav = async (audioFile: File): Promise<File> => {
    const arrayBuffer = await audioFile.arrayBuffer();
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

  const handleVoiceUpload = async (data: VoiceRecordingFormData) => {
    if (!data.voiceRecording) return;

    try {
      // Simulate backend processing
      const simulatedResponse = {
        success: true,
        transcription: 'This is a simulated transcription of your voice message.'
      };

      await new Promise(resolve => setTimeout(resolve, 500));

      if (simulatedResponse.success) {
        setMessages(prev => [
          ...prev,
          { id: prev.length + 1, text: '🎤 Voice message sent', isBot: false },
          { id: prev.length + 2, text: simulatedResponse.transcription, isBot: true }
        ]);
        clearRecording(); // Clear the form after successful upload
      }
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { id: prev.length + 1, text: "Sorry, I couldn't process your voice message.", isBot: true }
      ]);
    }
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
        setAudioFile(wavFile);
        form.setValue('voiceRecording', wavFile);
      } catch (error) {
        console.error('Error converting audio:', error);
        alert('Error converting audio file');
      }
    }
  };

  const clearRecording = () => {
    setAudioPreview(null);
    setAudioFile(null);
    setRecordedAudio(null);
    form.setValue('voiceRecording', undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className='mx-auto w-full'>
      <CardContent className='p-4'>
        <ScrollArea className='h-[400px] pr-4'>
          <div className='space-y-4'>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'
                  }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${message.isBot
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-primary text-primary-foreground'
                    }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        <div className='mt-4 space-y-4'>
          <form onSubmit={handleSendMessage} className='flex gap-2'>
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder='Type your message...'
              className='flex-1'
            />
            <Button type='button' variant='outline' size='icon' onClick={() => fileInputRef.current?.click()}>
              <Upload className='h-4 w-4' />
            </Button>
            <Button type='button' variant='outline' size='icon' onClick={isRecording ? stopRecording : startRecording}>
              {isRecording ? <MicOff className='h-4 w-4' /> : <Mic className='h-4 w-4' />}
            </Button>
            <Button type='submit' size='icon'>
              <Send className='h-4 w-4' />
            </Button>
          </form>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleVoiceUpload)} className='space-y-4'>
              {/* <div className="flex flex-col items-center space-y-2">
                <FileAudio className="h-8 w-8 text-muted-foreground" />
                <FormField
                  control={form.control}
                  name='voiceRecording'
                  render={() => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          type='file'
                          accept='.mp3'
                          onChange={handleFileChange}
                          className='w-full'
                          ref={fileInputRef}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div> */}

              {audioPreview && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant='outline' className='w-full'>
                      Play Recorded Audio
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-80'>
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
                  </PopoverContent>
                </Popover>
              )}

              <Button
                type='submit'
                className='w-full'
                disabled={!audioFile && !recordedAudio}
              >
                <Upload className='mr-2 h-4 w-4' />
                Upload Voice Message
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;