'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  ChevronLeft
} from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

// Mock data for prefilled notes - in a real app, this would come from an API or database
const PREFILLED_NOTES = {
  '2025-02-18': {
    title: 'Team Meeting',
    content: 'Discuss Q1 goals and project timeline',
    format: { bold: false, italic: false, underline: false, align: 'left' },
    updated: false
  },
  '2025-02-20': {
    title: 'Client Presentation',
    content: 'Present the new product features to ABC Corp',
    format: { bold: true, italic: false, underline: false, align: 'left' },
    updated: true
  },
  '2025-02-25': {
    title: 'Product Launch',
    content: 'Finalize details for the new product launch',
    format: { bold: false, italic: false, underline: false, align: 'center' },
    updated: false
  }
};

export default function NotesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date');

  const [dateKey, setDateKey] = useState<string>('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [format, setFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
    align: 'left' as 'left' | 'center' | 'right'
  });
  const [notesData, setNotesData] =
    useState<Record<string, any>>(PREFILLED_NOTES);

  // Load notes for the date from URL parameter
  useEffect(() => {
    if (dateParam) {
      setDateKey(dateParam);

      if (notesData[dateParam]) {
        const { title, content, format } = notesData[dateParam];
        setTitle(title || '');
        setContent(content || '');
        setFormat(
          format || {
            bold: false,
            italic: false,
            underline: false,
            align: 'left'
          }
        );
      } else {
        // Reset for dates without notes
        setTitle('');
        setContent('');
        setFormat({
          bold: false,
          italic: false,
          underline: false,
          align: 'left'
        });
      }
    }
  }, [dateParam, notesData]);

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  const saveNote = () => {
    if (dateKey) {
      // Update note and mark as updated
      setNotesData((prev) => ({
        ...prev,
        [dateKey]: {
          title,
          content,
          format,
          updated: true
        }
      }));

      // In a real app, you would save to backend here
      console.log('Saving note for', dateKey, { title, content, format });
    }
  };

  const handleSaveAndReturn = () => {
    saveNote();
    router.push('/');
  };

  return (
    <PageContainer>
      <div className='flex w-full flex-col space-y-4'>
        <div className='flex items-center justify-between'>
          <Button variant='ghost' onClick={() => router.push('/')}>
            <ChevronLeft className='mr-2 h-4 w-4' />
            Back to Dashboard
          </Button>

          <Button onClick={handleSaveAndReturn}>Save & Return</Button>
        </div>

        <Card className='w-full'>
          <CardHeader>
            <CardTitle>{dateKey ? formatDate(dateKey) : 'Note'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col space-y-6'>
              {/* Formatting Toolbar */}
              <div className='flex items-center space-x-2 border-b pb-2'>
                <ToggleGroup type='multiple' variant='outline'>
                  <ToggleGroupItem
                    value='bold'
                    aria-label='Toggle bold'
                    data-state={format.bold ? 'on' : 'off'}
                    onClick={() => setFormat((f) => ({ ...f, bold: !f.bold }))}
                  >
                    <Bold className='h-4 w-4' />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value='italic'
                    aria-label='Toggle italic'
                    data-state={format.italic ? 'on' : 'off'}
                    onClick={() =>
                      setFormat((f) => ({ ...f, italic: !f.italic }))
                    }
                  >
                    <Italic className='h-4 w-4' />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value='underline'
                    aria-label='Toggle underline'
                    data-state={format.underline ? 'on' : 'off'}
                    onClick={() =>
                      setFormat((f) => ({ ...f, underline: !f.underline }))
                    }
                  >
                    <Underline className='h-4 w-4' />
                  </ToggleGroupItem>
                </ToggleGroup>

                <div className='mx-2 h-6 border-l' />

                <ToggleGroup
                  type='single'
                  value={format.align}
                  variant='outline'
                >
                  <ToggleGroupItem
                    value='left'
                    aria-label='Align left'
                    onClick={() => setFormat((f) => ({ ...f, align: 'left' }))}
                  >
                    <AlignLeft className='h-4 w-4' />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value='center'
                    aria-label='Align center'
                    onClick={() =>
                      setFormat((f) => ({ ...f, align: 'center' }))
                    }
                  >
                    <AlignCenter className='h-4 w-4' />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value='right'
                    aria-label='Align right'
                    onClick={() => setFormat((f) => ({ ...f, align: 'right' }))}
                  >
                    <AlignRight className='h-4 w-4' />
                  </ToggleGroupItem>
                </ToggleGroup>

                <div className='mx-2 h-6 border-l' />

                <Button variant='ghost' size='icon'>
                  <List className='h-4 w-4' />
                </Button>
                <Button variant='ghost' size='icon'>
                  <ListOrdered className='h-4 w-4' />
                </Button>
              </div>

              {/* Title Input */}
              <input
                type='text'
                placeholder='Note title'
                className='w-full rounded-md border-none p-2 text-xl font-semibold outline-none'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              {/* Content Textarea */}
              <textarea
                placeholder='Write your note here...'
                className={`min-h-[50vh] w-full resize-none rounded-md border p-2 outline-none ${
                  format.bold ? 'font-bold' : ''
                } ${format.italic ? 'italic' : ''} ${
                  format.underline ? 'underline' : ''
                }`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ textAlign: format.align }}
              />

              {/* Save Button (at bottom for mobile convenience) */}
              <div className='flex justify-end lg:hidden'>
                <Button onClick={saveNote}>Save Note</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
