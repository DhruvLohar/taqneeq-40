import PageContainer from "@/components/layout/page-container";
import { TracingBeam } from "@/components/ui/tracing-beam";
import Image from "next/image";
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
            <main className="min-h-screen bg-background">

                <h1 className="text-lg">Your Roadmap</h1>

                <TracingBeam className="px-6">
                    <div className="max-w-2xl mx-auto antialiased pt-4 relative">
                        {ideationRoadmap.map((item, index) => (
                            <div key={`content-${index}`} className="mb-10">
                                <h2 className="bg-black text-white rounded-full text-sm w-fit py-1 mb-4">
                                    {index+1} - {item.badge}
                                </h2>
                                <p className={twMerge("text-xl mb-4")}>
                                    {item.title}
                                </p>

                                <div className="text-sm text-gray-500 prose prose-sm dark:prose-invert">
                                    {/* {item?.image && (
                                        <Image
                                            src={item.image}
                                            alt="blog thumbnail"
                                            height="1000"
                                            width="1000"
                                            className="rounded-lg mb-10 object-cover"
                                        />
                                    )} */}
                                    {item.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </TracingBeam>
            </main>
        </PageContainer>
    )
}