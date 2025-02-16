"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import {
    Plus,
    Globe,
    Lightbulb,
    Copy,
    ThumbsUp,
    ThumbsDown,
    Volume2,
    Share2,
    RotateCcw,
    ImagePlus,
    Brain,
    HelpCircle,
    Eye,
    MoreHorizontal,
    Mic,
    Users,
    DollarSign,
    Rocket,
} from "lucide-react"
import PageContainer from "@/components/layout/page-container"

export default function AgentChat() {
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    ])
    const [inputValue, setInputValue] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputValue.trim()) return

        setMessages([...messages, { text: inputValue, isUser: true }])
        setInputValue("")
    }

    return (
        <PageContainer>
            <div className="w-full flex flex-col justify-center items-center min-h-screen bg-background">
                {messages.length === 0 ? (
                    <div className="w-full flex flex-col items-center justify-center gap-8">
                        <h1 className="text-4xl font-semibold text-foreground">Hello, Dhruv!</h1>

                        <div className="w-full max-w-2xl">
                            <form onSubmit={handleSubmit} className="relative">
                                <Textarea
                                    placeholder="Talk about your roadmap, new ideas, or let us know whats on your mind."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="min-h-[56px] rounded-2xl pl-12 pr-14 py-4 bg-muted/50 border-none resize-none"
                                />
                                <div className="absolute left-3 top-3 flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                {/* <div className="absolute right-3 top-3 flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                                        <Globe className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                                        <Lightbulb className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                                        <Mic className="h-4 w-4" />
                                    </Button>
                                </div> */}
                            </form>
                        </div>

                        <div className="flex flex-wrap justify-center gap-2">
                            <Button variant="outline" className="rounded-full bg-muted/50 border-none">
                                <Lightbulb className="mr-2 h-4 w-4" />
                                Phase 1: Ideation
                            </Button>
                            <Button variant="outline" className="rounded-full bg-muted/50 border-none">
                                <Brain className="mr-2 h-4 w-4" />
                                Phase 2: Planning
                            </Button>
                            <Button variant="outline" className="rounded-full bg-muted/50 border-none">
                                <Rocket className="mr-2 h-4 w-4" />
                                Phase 3: Execution
                            </Button>
                            <Button variant="outline" className="rounded-full bg-muted/50 border-none">
                                <DollarSign className="mr-2 h-4 w-4" />
                                Phase 4: Legal & Finance
                            </Button>
                            <Button variant="outline" className="rounded-full bg-muted/50 border-none">
                                <Users className="mr-2 h-4 w-4" />
                                Phase 5: Marketing & Customer Growth
                            </Button>
                        </div>

                        <p className="text-gray-600">You can tap-in and get insights from any point of your journey by selecting a phase!</p>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col">
                        <div className="flex-1 space-y-4">
                            {messages.map((message, index) => (
                                <Card key={index} className="bg-muted/50 border-none p-4">
                                    <p className="mb-4">{message.text}</p>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <ThumbsUp className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <ThumbsDown className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Volume2 className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Share2 className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <RotateCcw className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className="mt-4">
                            <form onSubmit={handleSubmit} className="relative">
                                <Textarea
                                    placeholder="Message ChatGPT"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="min-h-[56px] rounded-2xl pl-12 pr-14 py-4 bg-muted/50 border-none resize-none"
                                />
                                <div className="absolute left-3 top-3 flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="absolute right-3 top-3 flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                                        <Globe className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                                        <Lightbulb className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                                        <Mic className="h-4 w-4" />
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </PageContainer>
    )
}

