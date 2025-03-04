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
import { useParams } from "next/navigation"

export default function AgentChat() {

    const params = useParams<{ slug: string }>()
    const agentSlug = params.slug // This will get the current slug from the URL
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
        {
            text: "Hello, I'm your AI assistant. How can I help you today?",
            isUser: false,
        },
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
            <div className="w-full flex flex-col justify-center items-center h-[87vh] bg-background">
                {messages.length === 0 ? (
                    <div className="w-full flex flex-col items-center justify-center gap-8">
                        <h1 className="text-4xl font-semibold text-foreground">Hello, Dhruv!</h1>

                        <div className="w-full max-w-2xl">
                            <form onSubmit={handleSubmit} className="relative">
                                <Textarea
                                    placeholder="Talk about your clients, pitching ideas, or let us know whats on your mind."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="min-h-[56px] rounded-2xl pl-12 pr-14 py-4 bg-muted/50 border-none resize-none"
                                />
                                <div className="absolute left-3 top-3 flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </form>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 -mt-4">
                            <Button variant="outline" className="rounded-full bg-muted/50 border-none">
                                <Lightbulb className="mr-2 h-4 w-4" />
                                Select Clients
                            </Button>
                        </div>

                        <p className="text-center text-gray-600">You can select any current client and ask questions specific to the current client.</p>

                    </div>
                ) : (
                    <div className="flex flex-col w-full flex-1 justify-between">
                        <div className="flex-[0.9] space-y-4">
                            {messages.map((message, index) => (
                                <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                                    <Card
                                        className={`
                                            p-4 max-w-[80%] 
                                            ${message.isUser
                                                ? 'bg-primary text-primary-foreground ml-auto'
                                                : 'bg-muted/50 text-foreground mr-auto'
                                            }
                                            border-none rounded-2xl
                                            ${message.isUser
                                                ? 'rounded-tr-none'
                                                : 'rounded-tl-none'
                                            }
                                        `}
                                    >
                                        <p className="text-sm">{message.text}</p>
                                    </Card>
                                </div>
                            ))}

                        </div>

                        <div className="mt-4">
                            <form onSubmit={handleSubmit} className="relative">
                                <Textarea
                                    placeholder="Talk about your clients, pitching ideas, or let us know whats on your mind"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="min-h-[50px] rounded-2xl pl-12 pr-14 py-4 bg-muted/50 border-none resize-none"
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
                        
                        <div className="flex flex-wrap justify-center gap-2 mt-2">
                            <Button variant="outline" className="rounded-full bg-muted/50 border-none">
                                <Lightbulb className="mr-2 h-4 w-4" />
                                Select Clients
                            </Button>
                        </div>

                        <p className="text-center text-gray-600">You can select any current client and ask questions specific to the current client.</p>
                    </div>
                )}
            </div>
        </PageContainer >
    )
}