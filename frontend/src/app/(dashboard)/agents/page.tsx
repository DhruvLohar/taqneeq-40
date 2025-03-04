import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import PageContainer from "@/components/layout/page-container"
import Link from "next/link"

interface PhaseAgent {
    id: string
    name: string
    avatarUrl: string
    initials: string
    phase: string
    expertise: string
    description: string
}

const phaseAgents: PhaseAgent[] = [
    {
        id: '1',
        name: 'IdeaGenius AI',
        avatarUrl: 'https://api.slingacademy.com/public/sample-users/1.png',
        initials: 'IG',
        phase: 'ideation',
        expertise: 'Idea Validation & Research',
        description: 'Specialized in market research and business idea validation'
    },
    {
        id: '2',
        name: 'StrategyForge AI',
        avatarUrl: 'https://api.slingacademy.com/public/sample-users/2.png',
        initials: 'SF',
        phase: 'planning',
        expertise: 'Planning and Strategy Development',
        description: 'Expert in business planning and strategic roadmapping'
    },
    {
        id: '3',
        name: 'LaunchPilot AI',
        avatarUrl: 'https://api.slingacademy.com/public/sample-users/3.png',
        initials: 'LP',
        phase: 'launch',
        expertise: 'Launch & Execution',
        description: 'Specialized in product launch and execution strategies'
    },
    {
        id: '4',
        name: 'LegalGuard AI',
        avatarUrl: 'https://api.slingacademy.com/public/sample-users/4.png',
        initials: 'LG',
        phase: 'legal',
        expertise: 'Legal Foundations & Finance',
        description: 'Expert in legal compliance and financial planning'
    },
    {
        id: '5',
        name: 'GrowthOptimize AI',
        avatarUrl: 'https://api.slingacademy.com/public/sample-users/5.png',
        initials: 'GO',
        phase: 'growth',
        expertise: 'Growth Marketing & Scaling',
        description: 'Specialized in business scaling and growth strategies'
    },
    {
        id: '6',
        name: 'InnoSpark AI',
        avatarUrl: 'https://api.slingacademy.com/public/sample-users/6.png',
        initials: 'IS',
        phase: 'ideation',
        expertise: 'Creative Brainstorming',
        description:
            'Helps generate innovative ideas and brainstorm creative solutions.'
    },
    {
        id: '7',
        name: 'TrendSeeker AI',
        avatarUrl: 'https://api.slingacademy.com/public/sample-users/7.png',
        initials: 'TS',
        phase: 'ideation',
        expertise: 'Market Trends & Insights',
        description:
            'Analyzes current trends and consumer behavior to shape viable business ideas.'
    },
    {
        id: '8',
        name: 'Visionary AI',
        avatarUrl: 'https://api.slingacademy.com/public/sample-users/8.png',
        initials: 'VA',
        phase: 'ideation',
        expertise: 'Future Forecasting',
        description:
            'Provides insights on emerging technologies and future market needs to refine ideas.'
    }
]

export default function PhaseAgentsPage() {
    return (
        <PageContainer>
            <div className="min-h-screen bg-background w-full">
                <div className=" w-full px-4 py-8">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">Need expert advice? We got you!</h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Discover the ai agents finely tuned in specific niche to help you with the result you really need!
                        </p>
                    </div>

                    {/* Search Section */}
                    <div className="relative max-w-2xl mx-auto mb-8">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input type="search" placeholder="Search Phase Agents" className="w-full pl-10 bg-muted/50 border-none h-12" />
                    </div>

                    {/* main agent card */}
                    <div className="w-full mx-auto mb-12">
                        <Link href="/agents/main">
                            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-none hover:shadow-lg transition-all">
                                <CardHeader className="flex flex-row items-center gap-4 justify-start">
                                    <div>
                                        <CardTitle className="text-xl">Solopreneur.ai - Your Main Assistant</CardTitle>
                                        <p className="text-muted-foreground mt-1">Your all-in-one startup journey companion</p>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        I can help you navigate through all phases of your startup journey - from ideation to scaling.
                                        Ask me anything about your startup plans, and I'll guide you with personalized advice.
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Ideation</span>
                                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Planning</span>
                                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Launch</span>
                                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Legal</span>
                                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Growth</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>


                    {/* Featured Section */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-2">Talk to your specialised Agents</h2>
                        <p className="text-muted-foreground mb-6">You can talk and interact with the bots below to help you get thru</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {phaseAgents.map((agent) => (
                                <Link href={`/agents/${agent.phase}`} key={agent.id}>
                            <Card key={agent.id} className="bg-muted/50 border-none hover:bg-muted/80 transition-colors">
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src={agent.avatarUrl} alt={agent.name} />
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-lg">{agent.name}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-2">{agent.description}</p>
                                    <p className="text-sm text-muted-foreground">Expertise: {agent.expertise}</p>
                                </CardContent>
                            </Card>
                        </Link>
                            ))}
                    </div>
                </div>
            </div>
        </div>
        </PageContainer >
    )
}