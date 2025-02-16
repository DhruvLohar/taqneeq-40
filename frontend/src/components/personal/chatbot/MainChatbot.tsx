'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Dummy bot responses
  const botResponses = [
    "That's an interesting point! Let me think about it...",
    "I understand what you're saying. Here's what I think...",
    'Thanks for sharing! Have you considered...',
    "That's a great question! From my perspective...",
    'I see what you mean. Let me suggest...'
  ];

  const getRandomBotResponse = () => {
    const randomIndex = Math.floor(Math.random() * botResponses.length);
    return botResponses[randomIndex];
  };

  interface Message {
    id: number;
    text: string;
    isBot: boolean;
  }

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false
    };

    // Add bot response
    const botMessage: Message = {
      id: messages.length + 2,
      text: getRandomBotResponse(),
      isBot: true
    };

    setMessages([...messages, userMessage, botMessage]);
    setInputMessage('');
  };

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle>Your Very Own Personalised Chatbot</CardTitle>
      </CardHeader>
      <CardContent className='p-4'>
        <ScrollArea className='h-[400px] pr-4'>
          <div className='space-y-4'>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isBot ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isBot
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

        <form onSubmit={handleSendMessage} className='mt-4 flex gap-2'>
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
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
