'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Upload, Trash2, FileAudio } from 'lucide-react';
import axios from 'axios';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<VoiceRecordingFormData>({
    resolver: zodResolver(voiceRecordingSchema),
    defaultValues: {
      voiceRecording: undefined,
    }
  });

  const convertToWav = async (audioFile: File): Promise<File> => {
    const arrayBuffer = await audioFile.arrayBuffer();
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Create WAV file
    const wavBuffer = new ArrayBuffer(44 + audioBuffer.length * 2);
    const view = new DataView(wavBuffer);

    // Write WAV header
    const writeString = (view: DataView, offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + audioBuffer.length * 2, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, audioContext.sampleRate, true);
    view.setUint32(28, audioContext.sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, 'data');
    view.setUint32(40, audioBuffer.length * 2, true);

    const offset = 44;
    const data = audioBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const sample = Math.max(-1, Math.min(1, data[i]));
      view.setInt16(offset + i * 2, sample * 0x7FFF, true);
    }

    return new File([view], 'converted.wav', { type: 'audio/wav' });
  };

  interface Message {
    id: number;
    text: string;
    isBot: boolean;
  }

  interface ChatResponse {
    success: boolean;
    message: string;
    data?: any;
  }

  interface VoiceResponse {
    success: boolean;
    transcription: string;
  }

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    try {
      const response = await axios.post<ChatResponse>(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        clientId: '123', // Replace with actual client ID
        message: inputMessage
      });

      if (response.data.success) {
        const botMessage: Message = {
          id: messages.length + 2,
          text: response.data.message,
          isBot: true
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error('Response failed');
      }
    } catch (error) {
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Sorry, I couldn't process your message at this time.",
        isBot: true
      };
      setMessages(prev => [...prev, errorMessage]);
    }
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
            <Button type='submit' size='icon'>
              <Send className='h-4 w-4' />
            </Button>
          </form>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleVoiceUpload)} className='space-y-4'>
              <div className="flex flex-col items-center space-y-2">
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
