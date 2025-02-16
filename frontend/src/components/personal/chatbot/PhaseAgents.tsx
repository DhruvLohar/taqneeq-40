'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';

type PhaseAgent = {
  id: string;
  name: string;
  avatarUrl: string;
  initials: string;
  phase: 'IDEATION' | 'PLANNING' | 'LAUNCH' | 'LEGAL' | 'GROWTH';
  expertise: string;
  description: string;
};

const phaseAgents: PhaseAgent[] = [
  {
    id: '1',
    name: 'IdeaGenius AI',
    avatarUrl: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'IG',
    phase: 'IDEATION',
    expertise: 'Idea Validation & Research',
    description: 'Specialized in market research and business idea validation'
  },
  {
    id: '2',
    name: 'StrategyForge AI',
    avatarUrl: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'SF',
    phase: 'PLANNING',
    expertise: 'Planning and Strategy Development',
    description: 'Expert in business planning and strategic roadmapping'
  },
  {
    id: '3',
    name: 'LaunchPilot AI',
    avatarUrl: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'LP',
    phase: 'LAUNCH',
    expertise: 'Launch & Execution',
    description: 'Specialized in product launch and execution strategies'
  },
  {
    id: '4',
    name: 'LegalGuard AI',
    avatarUrl: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'LG',
    phase: 'LEGAL',
    expertise: 'Legal Foundations & Finance',
    description: 'Expert in legal compliance and financial planning'
  },
  {
    id: '5',
    name: 'GrowthOptimize AI',
    avatarUrl: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'GO',
    phase: 'GROWTH',
    expertise: 'Growth Marketing & Scaling',
    description: 'Specialized in business scaling and growth strategies'
  },
  {
    id: '6',
    name: 'InnoSpark AI',
    avatarUrl: 'https://api.slingacademy.com/public/sample-users/6.png',
    initials: 'IS',
    phase: 'IDEATION',
    expertise: 'Creative Brainstorming',
    description:
      'Helps generate innovative ideas and brainstorm creative solutions.'
  },
  {
    id: '7',
    name: 'TrendSeeker AI',
    avatarUrl: 'https://api.slingacademy.com/public/sample-users/7.png',
    initials: 'TS',
    phase: 'IDEATION',
    expertise: 'Market Trends & Insights',
    description:
      'Analyzes current trends and consumer behavior to shape viable business ideas.'
  },
  {
    id: '8',
    name: 'Visionary AI',
    avatarUrl: 'https://api.slingacademy.com/public/sample-users/8.png',
    initials: 'VA',
    phase: 'IDEATION',
    expertise: 'Future Forecasting',
    description:
      'Provides insights on emerging technologies and future market needs to refine ideas.'
  }
];

interface PhaseAgentsProps {
  currentPhase: 'IDEATION' | 'PLANNING' | 'LAUNCH' | 'LEGAL' | 'GROWTH';
}

export function PhaseAgents({ currentPhase }: PhaseAgentsProps) {
  const filteredAgents = currentPhase
    ? phaseAgents.filter((agent) => agent.phase === currentPhase)
    : phaseAgents;

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Personalised AI Agents</CardTitle>
        <CardDescription>
          Expert advisors for each phase of your startup journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          {filteredAgents.map((agent) => (
            <Link
              key={agent.id}
              href={`/chatbot/${agent.name.toLowerCase().replace(' ', '-')}`}
              className='block'
            >
              <div className='flex items-center rounded-lg p-2 transition-colors hover:bg-muted'>
                <Avatar className='h-10 w-10'>
                  <AvatarImage src={agent.avatarUrl} alt={agent.name} />
                  <AvatarFallback>{agent.initials}</AvatarFallback>
                </Avatar>
                <div className='ml-4 flex-1 space-y-1'>
                  <p className='text-sm font-medium leading-none'>
                    {agent.name}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {agent.description}
                  </p>
                </div>
                <div className='ml-auto text-sm font-medium text-muted-foreground'>
                  {agent.phase}
                </div>
                <div className='ml-4 text-sm font-medium text-muted-foreground'>
                  <span className='inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs'>
                    {agent.expertise}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
