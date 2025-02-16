import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Timeline } from "@/components/ui/timeline";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { KanbanBoard } from "@/features/kanban/components/kanban-board";
import NewTaskDialog from "@/features/kanban/components/new-task-dialog";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";


export default function PhaseView() {

    const roadmapData = [
        {
            title: 'Understanding the Problem',
            duration: '1-2 weeks',
            content: (
                <div>
                    <h3 className='mb-2 text-lg font-semibold'>
                        Identifying Pain Points & Market Needs
                    </h3>
                    <p className='mb-4 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm'>
                        Conduct research to understand the challenges faced by tournament organizers, players, and audiences. Identify gaps in existing solutions and define how your app will solve these problems effectively.
                    </p>

                    <h4 className='mb-2 text-sm font-medium'>Things to Do:</h4>
                    <ul className='mb-6 space-y-2'>
                        <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
                            ✅ Interview event organizers, gamers, and referees
                        </li>
                        <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
                            ✅ Research competitors (e.g., Challenge, Tournament)
                        </li>
                        <li className='flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm'>
                            ✅ Study tournament workflows and common pain points
                        </li>
                    </ul>
                </div>
            )
        },
    ]


    return (
        <PageContainer>
            <div className='flex flex-1 flex-col space-y-2'>
                <div className='flex items-center justify-between space-y-4'>
                    <h2 className='text-2xl font-bold tracking-tight'>
                        📌 Current Roadmap Status
                    </h2>

                    <Link href={"/phase/ideation/roadmap"}>
                        <Button variant={"ghost"} size={"sm"}>View Entire Roadmap</Button>
                    </Link>
                </div>

                <Timeline data={roadmapData} />

                <div className="w-full mt-4">
                    <div className='flex items-center justify-between space-y-4 mb-8'>
                        <h2 className='text-2xl font-bold tracking-tight'>
                            ✏️ Kanban Board
                        </h2>

                        <NewTaskDialog />
                    </div>

                    <KanbanBoard />
                </div>

            </div>
        </PageContainer>
    )
}