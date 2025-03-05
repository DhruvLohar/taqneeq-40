"use client"

import type React from "react"
import { useState } from "react"
import axios from "axios"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
    Plus,
    Lightbulb,
    CircleArrowRight
} from "lucide-react"
import PageContainer from "@/components/layout/page-container"
import { useParams } from "next/navigation"

// Mock client data - replace with your actual client data
const clients = [
    { id: '1', name: 'Rajesh Kumar', status: 'Active', industry: 'Technology' },
    { id: '2', name: 'Ravi Krishna Das', status: 'Pending', industry: 'Consulting' },
    { id: '3', name: 'Aadish gotekar', status: 'Active', industry: 'Retail' },
    { id: '4', name: 'Puroshottam Lohar', status: 'Pending', industry: 'Sustainability' },
];

export default function AgentChat() {
    const params = useParams<{ slug: string }>()
    const agentSlug = params.slug
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
        {
            text: "Hello, I'm your AI assistant. How can I help you today?",
            isUser: false,
        },
    ])
    const [inputValue, setInputValue] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputValue.trim() || isLoading) return

        const userMessage = { text: inputValue, isUser: true }
        setMessages(prev => [...prev, userMessage])
        setInputValue("")
        setIsLoading(true)

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
                message: inputValue
            })

            if (response.data.success) {
                setMessages(prev => [...prev, {
                    text: response.data.message,
                    isUser: false
                }])
            }
        } catch (error) {
            setMessages(prev => [...prev, {
                text: "Sorry, I couldn't process your message at this time.",
                isUser: false
            }])
        } finally {
            setIsLoading(false)
        }
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

                        <ClientSelectionDialog />
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

                        <form onSubmit={handleSubmit} className="relative">
                            <Textarea
                                placeholder="Talk about your clients, pitching ideas, or let us know whats on your mind"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="rounded-2xl bg-muted/50 border-none flex items-center placeholder:mt-4"
                            />
                            <div className="absolute right-3 top-3 flex items-center">
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                                    <CircleArrowRight className="h-6 w-6" />
                                </Button>
                            </div>
                        </form>

                        <ClientSelectionDialog />
                    </div>
                )}
            </div>
        </PageContainer>
    )
}

function ClientSelectionDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                    <Button variant="outline" className="rounded-full bg-muted/50 border-none">
                        <Lightbulb className="mr-2 h-4 w-4" />
                        Select Clients
                    </Button>
                </div>

            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Select a Client</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {clients.map((client) => (
                        <Link
                            key={client.id}
                            href={`/clients/${client.id}`}
                            className="block"
                        >
                            <Card
                                className={`
                                    p-4 hover:bg-muted/50 cursor-pointer transition-colors
                                    ${client.status === 'Active'
                                        ? 'border-green-500'
                                        : client.status === 'Pending'
                                            ? 'border-yellow-500'
                                            : 'border-red-500'
                                    } 
                                    
                                `}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-semibold">{client.name}</h3>
                                    </div>
                                    <span
                                        className={`
                                            px-2 py-1 rounded-full text-xs w-16 text-center
                                            ${client.status === 'Active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                            }
                                        `}
                                    >
                                        {client.status}
                                    </span>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
                <p className="text-center text-gray-600">
                    Select a client to view details or start a conversation
                </p>
            </DialogContent>
        </Dialog>
    )
}