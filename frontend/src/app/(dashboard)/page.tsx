'use client';
import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Users, Clock, Share } from 'lucide-react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';

import { format } from 'date-fns';
import { useState } from 'react';

// Mock data for clients (replace with actual data source)
const CLIENTS_DATA = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    status: 'active'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    status: 'pending'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    status: 'active'
  },
  {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    status: 'pending'
  }
];

// Define the type for our card data
interface CardData {
  title: string;
  description: string;
  icon: React.ReactNode;
  backgroundImage: string;
}

interface NoteData {
  title: string;
  content: string;
  updated: boolean;
}

interface NotesDataType {
  [key: string]: NoteData;
}

// Mock data for notes (this would come from your backend in a real app)
const PREFILLED_NOTES: NotesDataType = {
  '2025-02-18': {
    title: 'Team Meeting',
    content: 'Discuss Q1 goals and project timeline',
    updated: false
  },
  '2025-02-20': {
    title: 'Client Presentation',
    content: 'Present the new product features to ABC Corp',
    updated: true
  },
  '2025-02-25': {
    title: 'Product Launch',
    content: 'Finalize details for the new product launch',
    updated: false
  }
};

export default function ClientManagementPage() {

  const [notesData, setNotesData] = useState(PREFILLED_NOTES);

  // Calculate client statistics
  const totalClients = CLIENTS_DATA.length;
  const activeClients = CLIENTS_DATA.filter(client => client.status === 'active').length;
  const pendingClients = CLIENTS_DATA.filter(client => client.status === 'pending').length;

  const renderDay = (day: Date) => {
    const dateKey = format(day, 'yyyy-MM-dd');
    const hasNote = notesData[dateKey] !== undefined;
    const isUpdated = hasNote && notesData[dateKey].updated;
    let bgColor = '';
    let textColor = '';

    if (hasNote) {
      if (isUpdated) {
        bgColor = 'bg-green-500';
        textColor = 'text-white';
      } else {
        bgColor = 'bg-black border-white border-2';
        textColor = 'text-white';
      }
    }

    return (
      <div
        className={`flex h-14 w-14 items-center justify-center ${bgColor} ${textColor} ${hasNote ? 'rounded-full' : ''}`}
      >
        <Link href={`/Reminders?date=${dateKey}`}>{day.getDate()}</Link>
      </div>
    );
  };

  return (
    <PageContainer>
      <div className='w-full flex flex-1 flex-col space-y-4'>
        {/* Page Header */}
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Client Management
          </h2>
        </div>

        {/* Client Management Cards */}
        <div className='grid gap-4 md:grid-cols-3'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Share Link With Client</CardTitle>
              <Share className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <Button
                className='my-4'
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Client Link',
                      text: 'Share this link with your client to get started with basic details and lead generation.',
                      url: 'http://localhost:3000/broker/2/onboarding'
                    }).catch((error) => console.error('Error sharing', error));
                  } else {
                    alert('Sharing is not supported in this browser.');
                  }
                }}
              >
                <Share className='h-4 w-4 mr-2' />
                Share Link
              </Button>
              <p className='text-xs text-muted-foreground'>
                You can share this link with your clients to get started
                with basic details and lead generation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Active Clients</CardTitle>
              <Users className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{activeClients}</div>
              <p className='mt-auto text-xs text-muted-foreground'>
                Out of {totalClients} total clients
              </p>
            </CardContent>
          </Card>

          {/* Pending Clients Card */}
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Pending Clients</CardTitle>
              <Clock className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{pendingClients}</div>
              <p className='text-xs text-muted-foreground'>
                Awaiting further action
              </p>
            </CardContent>
          </Card>
        </div>

        <div className='w-full rounded-lg border p-4'>
          <h3 className='mb-4 text-xl font-bold'>Your Journal</h3>
          <div className='mb-2 flex items-center space-x-4 text-sm text-gray-500'>
            <div className='flex items-center'>
              <div className='mr-2 h-3 w-3 rounded-full border-2 border-white bg-black'></div>
              <span>Has notes</span>
            </div>
            <div className='flex items-center'>
              <div className='mr-2 h-3 w-3 rounded-full bg-green-500'></div>
              <span>Recently updated</span>
            </div>
          </div>
          <Calendar
            className='min-h-[400px] w-full'
            mode='single'
            components={{
              Day: ({ date }) => renderDay(date)
            }}
          />
        </div>
      </div>

    </PageContainer>
  );
}