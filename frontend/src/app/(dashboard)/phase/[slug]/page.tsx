import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { TracingBeam } from "@/components/ui/tracing-beam";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";


export default function PhaseView() {

    const ideationRoadmap = [
        {
            title: "Talk to Actual Business Owners",
            description: (
                <>
                    <p>
                        Before diving into development, have real conversations with business owners
                        in your target industry. Understand their pain points, workflows, and what
                        solutions they actually need. This helps validate if your idea has real-world
                        demand.
                    </p>
                    <p>
                        Cold outreach works best—send personalized emails, LinkedIn messages, or
                        even cold-call local businesses. Offer a short call in exchange for their
                        insights.
                    </p>
                </>
            ),
            badge: "User Research",
        },
        {
            title: "Conduct Surveys via Market Research Firms",
            description: (
                <>
                    <p>
                        A broader way to validate demand is through structured surveys. Use market
                        research firms like Nielsen, Qualtrics, or SurveyMonkey to collect insights
                        from a larger audience.
                    </p>
                    <p>
                        Design surveys with direct questions about the problem, existing solutions,
                        and willingness to pay. Incentivize responses with gift cards or exclusive
                        access to your solution.
                    </p>
                </>
            ),
            badge: "Market Research",
        },
        {
            title: "Analyze Competitor Offerings & Gaps",
            description: (
                <>
                    <p>
                        Research existing competitors in your space. What are they doing well? Where
                        do users complain the most? This will help you find opportunities to create a
                        better solution rather than reinventing the wheel.
                    </p>
                    <p>
                        Use tools like G2, Capterra, Reddit, and Twitter to see unfiltered feedback.
                        If possible, talk to their users and learn about their pain points.
                    </p>
                </>
            ),
            badge: "Competitive Analysis",
        },
    ];


    return (
        <PageContainer>
            <div className='flex flex-1 flex-col space-y-2'>
                <div className='flex items-center justify-between space-y-2'>
                    <h2 className='text-2xl font-bold tracking-tight'>
                        📌 Current Roadmap Status
                    </h2>

                    <Link href={"/phase/ideation/roadmap"}>
                        <Button variant={"ghost"} size={"sm"}>View Roadmap</Button>
                    </Link>
                </div>

                <h2 className='text-2xl font-bold tracking-tight'>
                    ✏️ Kanban Board
                </h2>
            </div>
        </PageContainer>
    )
}