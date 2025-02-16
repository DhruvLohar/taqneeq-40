"use client"

import React from 'react';
import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Timeline } from "@/components/ui/timeline";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { KanbanBoard } from "@/features/kanban/components/kanban-board";
import NewTaskDialog from "@/features/kanban/components/new-task-dialog";
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useParams } from 'next/navigation';

interface RoadmapItem {
    title: string;
    duration: string;
    content: string;
}

interface RoadmapPhases {
    ideation: RoadmapItem[];
    planning: RoadmapItem[];
    launch: RoadmapItem[];
    legal: RoadmapItem[];
    growth: RoadmapItem[];
}

interface PageProps {
    params: {
        slug: string;
    };
}

export default function Page({ params }: PageProps) {

    const { slug } = useParams();

    const getRoadmapData = (slug: string): RoadmapItem[] => {
        const roadmapPhases: RoadmapPhases = {
            ideation: [
                {
                    title: 'Understanding the Problem',
                    duration: '2-3 weeks',
                    content: `
              ### Market Research & Validation
              Thoroughly research the tournament management space to validate your business idea and identify specific opportunities.
    
              #### Key Activities:
              - Conduct competitor analysis (Challonge, Toornament, etc.)
              - Interview 15-20 potential users (tournament organizers, players)
              - Document pain points and feature requests
              - Research market size and potential revenue streams
    
              #### Deliverables:
              - Market research report
              - User interview summaries
              - Initial feature list
              - Unique value proposition statement
            `
                },
            ],
            planning: [
                {
                    title: 'Business Strategy',
                    duration: '2 weeks',
                    content: `
              ### Business Model & Revenue Planning
              Develop a clear business model and strategy for monetization.
    
              #### Key Activities:
              - Define pricing strategy
              - Create financial projections
              - Identify key partnerships
              - Plan marketing channels
              
              #### Deliverables:
              - Business model canvas
              - 12-month financial forecast
              - Partnership strategy
              - Marketing plan outline
            `
                },
            ],
            launch: [
                {
                    title: 'MVP Development',
                    duration: '8-12 weeks',
                    content: `
              ### Core Feature Implementation
              Build the minimum viable product with essential tournament management features.
    
              #### Key Activities:
              - Develop user authentication
              - Create tournament creation flow
              - Implement bracket generation
              - Build basic reporting
              
              #### Deliverables:
              - Working MVP
              - User documentation
              - Basic admin dashboard
              - Testing reports
            `
                }
            ],
            legal: [
                {
                    title: 'Legal Setup',
                    duration: '2-3 weeks',
                    content: `
              ### Business Formation & Compliance
              Establish legal foundation for your business.
    
              #### Key Activities:
              - Register business entity
              - Draft terms of service
              - Create privacy policy
              - Set up accounting system
              
              #### Deliverables:
              - Business registration
              - Legal documents
              - Accounting setup
              - Compliance checklist
            `
                }
            ],
            growth: [
                {
                    title: 'Marketing Launch',
                    duration: '4-6 weeks',
                    content: `
              ### Marketing Strategy Implementation
              Execute marketing plan to attract users.
    
              #### Key Activities:
              - Launch content marketing
              - Implement SEO strategy
              - Start social media campaigns
              - Develop email marketing
              
              #### Deliverables:
              - Marketing materials
              - Content calendar
              - Analytics setup
              - Growth metrics
            `
                }
            ]
        };

        return roadmapPhases[slug as keyof RoadmapPhases] || [];
    };
    const roadmapData = getRoadmapData('ideation');

    return (
        <PageContainer>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">📌 Current Roadmap Status</h1>
                    <Button asChild variant="outline">
                        <Link href={`/phase/${slug}/roadmap`}>View Entire Roadmap</Link>
                    </Button>
                </div>
                <Timeline data={roadmapData} />


                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">✏️ Kanban Board</h2>
                        <NewTaskDialog />
                    </div>
                    <KanbanBoard />
                </div>

                {slug === "growth" && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">💡 Reel Script Generation</h2>
                            {/* <NewTaskDialog /> */}
                        </div>

                        <Link href={'/phase/growth/Common'}>
                            <Card className='w-[20rem] overflow-hidden'>
                                <div className='relative z-20 p-4'>
                                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                        <CardTitle className='text-lg font-medium text-white'>
                                            Why choose us for tournament planning?
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className='text-card-foreground'>Generated this script yesterday</p>
                                    </CardContent>
                                </div>
                            </Card>
                        </Link>
                    </div>
                )}
            </div>
        </PageContainer>
    );
}