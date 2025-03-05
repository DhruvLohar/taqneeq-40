'use client';
import PageContainer from "@/components/layout/page-container";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Timeline } from "@/components/ui/timeline";
import {
    FileText,
    MessageCircle,
    MapPin,
    PhoneCall,
    Mail,
    Building,
    DollarSign,
    Clock,
    FileCheck,
    FileWarning
} from 'lucide-react';
import React, { useEffect, useState } from "react";
import ChatInterface from "@/components/personal/chatbot/MainChatbot";
import { FollowUpDialog } from "@/components/IndividualClient/Followup";
import { fetchFromAPI } from "@/lib/api";
export default function EnhancedClientDetails({ params }: { params: Promise<{ id: number }> }) {

    const resolveParams = React.use(params)
    const [isFollowUpOpen, setIsFollowUpOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Add these state variables at the top of your component
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Add these state variables at the top of your component
    const [newObjection, setNewObjection] = useState<string>('');
    const [showObjectionDialog, setShowObjectionDialog] = useState(false);

    // Mock data for the client (replace with API calls)
    const _client = {
        id: resolveParams.id,
        name: "Rajesh Kumar",
        phone: "+91 98765 43210",
        email: "rajesh.kumar@example.com",
        preferredLanguage: "Hindi",
        status: "Site Visit Scheduled",
        dealValue: "₹1.5 Cr",
        nextFollowUp: "Friday, 27 Oct, 3:00 PM",
        conversionProbability: 70,
        preferences: {
            propertyType: "2BHK",
            budget: "₹1.5 Cr - ₹2 Cr",
            locations: ["Andheri", "Goregaon"],
            amenities: ["Swimming Pool", "Parking"],
            possessionTimeline: "Immediate",
        },
        objections: [
            "Price too high",
            "Uncertain about builder reputation",
        ],
        followUps: [
            { task: "Schedule site visit", status: "Pending", date: "2024-02-25" },
            { task: "Send loan approval documents", status: "Completed", date: "2024-02-20" },
        ],
        documents: [
            { name: "Income Proof", status: "Uploaded", icon: FileCheck },
            { name: "Agreement", status: "Pending Signature", icon: FileWarning },
        ],
        interactions: [
            {
                date: "2024-02-20",
                type: "Call",
                summary: "Discussed property details and initial concerns",
                duration: "15 mins"
            },
            {
                date: "2024-02-22",
                type: "Email",
                summary: "Sent property brochure and price list",
                duration: null
            }
        ],
        properties: [
            {
                name: "Green Valley Residency",
                type: "2BHK",
                location: "Andheri West",
                price: "₹1.8 Cr",
                matchPercentage: 85
            },
            {
                name: "Skyline Apartments",
                type: "3BHK",
                location: "Goregaon East",
                price: "₹2.2 Cr",
                matchPercentage: 65
            }
        ]
    };

    const [followUps, setFollowUps] = useState(_client.followUps);

    interface FollowUp {
        task: string;
        status: string;
        date: string;
    }

    const handleFollowUpAdded = (newFollowUp: FollowUp): void => {
        setFollowUps(prev => [...prev, newFollowUp]);
        setIsFollowUpOpen(false);
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    // Update the handleFileChange function
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Create preview URL for supported file types
        if (file.type.startsWith('image/')) {
            setFilePreview(URL.createObjectURL(file));
        } else {
            // For non-image files, we'll just show the file name
            setFilePreview(null);
        }

        setSelectedFile(file);
        setShowConfirmation(true);
    };

    // Add new function to handle actual upload
    const handleConfirmUpload = async () => {
        if (!selectedFile) return;

        setIsLoading(true);
        try {
            // TODO: Implement your file upload logic here
            const formData = new FormData();
            formData.append('file', selectedFile);
            // await fetch('/api/upload', {
            //   method: 'POST',
            //   body: formData
            // });

            console.log('File uploaded:', selectedFile.name);

            // Reset states after successful upload
            setSelectedFile(null);
            setFilePreview(null);
            setShowConfirmation(false);
        } catch (error) {
            console.error('Error uploading file:', error);
            setError('Failed to upload file');
        } finally {
            setIsLoading(false);
        }
    };

    // Add function to cancel upload
    const handleCancelUpload = () => {
        setSelectedFile(null);
        setFilePreview(null);
        setShowConfirmation(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Add these handlers before the return statement
    const handleAddObjectionClick = () => {
        setShowObjectionDialog(true);
    };

    const handleObjectionConfirm = async () => {
        if (!newObjection.trim()) return;

        setIsLoading(true);
        try {
            // TODO: Implement your API call to save the objection
            // await fetch('/api/objections', {
            //     method: 'POST',
            //     body: JSON.stringify({ 
            //         clientId: client.id, 
            //         objection: newObjection 
            //     })
            // });

            // Update local state (replace with API response)
            client.objections.push(newObjection);

            // Reset states
            setNewObjection('');
            setShowObjectionDialog(false);
        } catch (error) {
            console.error('Error adding objection:', error);
            setError('Failed to add objection');
        } finally {
            setIsLoading(false);
        }
    };

    const handleObjectionCancel = () => {
        setNewObjection('');
        setShowObjectionDialog(false);
    };

    return (
        <PageContainer>
            <Tabs defaultValue="overview" className="w-full space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Client Profile: {client?.name}</h1>
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="interactions">Interactions</TabsTrigger>
                        <TabsTrigger value="chatsession">Messages</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="overview">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Client Overview Card */}
                        <Card className="md:col-span-1">
                            <CardHeader>
                                <CardTitle>Client Overview</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <Avatar className="h-16 w-16">
                                        <AvatarFallback className="text-2xl">JD</AvatarFallback>
                                        <AvatarImage src="/avatar.png" />
                                    </Avatar>
                                    <div>
                                        <p className="text-xl font-semibold">{client?.name}</p>
                                        <div className="flex items-center space-x-2 text-muted-foreground">
                                            <PhoneCall className="h-4 w-4" />
                                            <p className="text-sm">{client?.phone_number}</p>
                                        </div>
                                        <div className="flex items-center space-x-2 text-muted-foreground">
                                            <Mail className="h-4 w-4" />
                                            <p className="text-sm">{client?.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">Conversion Probability</span>
                                        <Badge variant="outline">{_client.conversionProbability}%</Badge>
                                    </div>
                                    <Progress value={_client.conversionProbability} />

                                    <div className="grid grid-cols-2 gap-3 mt-4">
                                        <div className="flex items-center space-x-2">
                                            <Building className="h-5 w-5 text-muted-foreground" />
                                            <span className="text-sm">Status</span>
                                        </div>
                                        <Badge>{client?.status}</Badge>

                                        <div className="flex items-center space-x-2">
                                            <Clock className="h-5 w-5 text-muted-foreground" />
                                            <span className="text-sm">Next Follow-Up</span>
                                        </div>
                                        <span className="text-sm">{_client.nextFollowUp}</span>

                                        <div className="w-full flex items-center space-x-2">
                                            <span className="text-semibold">Transcription</span>
                                        </div>
                                        <span className="font-sm">{client?.transcription}</span>

                                        <div className="w-full flex items-center space-x-2">
                                            <span className="text-semibold">Client Estimated Loan</span>
                                        </div>
                                        <span className="font-sm">{client?.loan_amount} Lacs</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Property Preferences & Follow-Ups */}
                        <div className="md:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Property Preferences</CardTitle>
                                </CardHeader>
                                <CardContent className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Building className="h-5 w-5 text-muted-foreground" />
                                            <span className="font-semibold">Property Type</span>
                                        </div>
                                        <p>{client?.extracted_details?.bhk} BHK</p>

                                        <div className="flex items-center space-x-2">
                                            <DollarSign className="h-5 w-5 text-muted-foreground" />
                                            <span className="font-semibold">Amenities</span>
                                        </div>
                                        <p>{client?.extracted_details?.amenities?.join(', ')}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <MapPin className="h-5 w-5 text-muted-foreground" />
                                            <span className="font-semibold">Locations</span>
                                        </div>
                                        <p>{client?.extracted_details?.preferred_location}</p>

                                        <div className="flex items-center space-x-2">
                                            <FileText className="h-5 w-5 text-muted-foreground" />
                                            <span className="font-semibold">Possession Timeline</span>
                                        </div>
                                        <p>{_client.preferences.possessionTimeline}</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Follow-Ups and Interactions Timeline */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Follow-Ups & Recent Interactions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {error ? (
                                        <div className="text-red-500 text-center p-4">{error}</div>
                                    ) : (
                                        <Timeline
                                            data={followUps.map(followUp => ({
                                                title: followUp.status,
                                                duration: followUp.date,
                                                content: followUp.task
                                            }))}
                                        />
                                    )}
                                </CardContent>
                                <CardFooter className="w-full">
                                    <Button
                                        className="w-full"
                                        onClick={() => setIsFollowUpOpen(true)}
                                    >
                                        Add Follow-Up
                                    </Button>
                                    <FollowUpDialog
                                        open={isFollowUpOpen}
                                        onOpenChange={setIsFollowUpOpen}
                                        clientId={client.id}
                                        clientName={client?.name}
                                        clientPhone={client?.phone_number}
                                        client={client}
                                        onFollowUpAdded={handleFollowUpAdded}
                                    />
                                </CardFooter>
                            </Card>
                        </div>
                    </div>

                    {/* Objections and Documents */}
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Objections & Concerns</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {_client.objections.map((objection, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <p>{objection}</p>
                                        <Button variant="outline">Resolve</Button>
                                    </div>
                                ))}

                                {showObjectionDialog && (
                                    <div className="mt-4 p-4 border rounded-lg">
                                        <h4 className="font-semibold mb-2">Add New Objection</h4>
                                        <div className="space-y-4">
                                            <Textarea
                                                placeholder="Enter client's objection or concern..."
                                                value={newObjection}
                                                onChange={(e) => setNewObjection(e.target.value)}
                                                className="w-full min-h-[100px]"
                                            />
                                            <div className="flex space-x-2">
                                                <Button
                                                    onClick={handleObjectionConfirm}
                                                    disabled={isLoading || !newObjection.trim()}
                                                >
                                                    {isLoading ? "Adding..." : "Confirm"}
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    onClick={handleObjectionCancel}
                                                    disabled={isLoading}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full"
                                    onClick={handleAddObjectionClick}
                                    disabled={showObjectionDialog}
                                >
                                    Add Objection
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Documents</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {_client.documents.map((doc, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <doc.icon className="h-5 w-5" />
                                            <p>{doc.name}</p>
                                        </div>
                                        <Badge variant={doc.status === "Uploaded" ? "default" : "destructive"}>
                                            {doc.status}
                                        </Badge>
                                    </div>
                                ))}

                                {showConfirmation && selectedFile && (
                                    <div className="mt-4 p-4 border rounded-lg">
                                        <h4 className="font-semibold mb-2">Preview Upload</h4>
                                        <div className="space-y-2">
                                            <p className="text-sm">File: {selectedFile.name}</p>
                                            <p className="text-sm">Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
                                            {filePreview && (
                                                <div className="mt-2">
                                                    <img
                                                        src={filePreview}
                                                        alt="Preview"
                                                        className="max-h-40 rounded-lg"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex space-x-2 mt-4">
                                                <Button
                                                    onClick={handleConfirmUpload}
                                                    disabled={isLoading}
                                                >
                                                    {isLoading ? "Uploading..." : "Confirm Upload"}
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    onClick={handleCancelUpload}
                                                    disabled={isLoading}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full"
                                    onClick={handleUploadClick}
                                    disabled={showConfirmation}
                                >
                                    Upload Document
                                </Button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                />
                            </CardFooter>
                        </Card>
                    </div>
                </TabsContent>

                {/* Interactions Tab */}
                <TabsContent value="interactions">
                    <Card>
                        <CardHeader>
                            <CardTitle>Client Interaction History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Timeline data={_client.interactions.map(interaction => ({
                                title: `${interaction.type} Interaction`,
                                duration: interaction.date,
                                content: (
                                    <div>
                                        <p className="text-sm text-muted-foreground">{interaction.summary}</p>
                                        {interaction.duration && (
                                            <p className="text-xs text-muted-foreground">Duration: {interaction.duration}</p>
                                        )}
                                    </div>
                                )
                            }))} />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Recommended Properties Tab */}
                <TabsContent value="chatsession">
                    <ChatInterface />
                </TabsContent>
            </Tabs>
        </PageContainer>
    );
}