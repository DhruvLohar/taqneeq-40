"use client";

import PageContainer from "@/components/layout/page-container";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchFromAPI } from "@/lib/api";
import { FollowUpDialogDetails } from "./FollowUpDialog";

// Mock data for follow-ups (replace with actual data source)
const FOLLOW_UPS_DATA = [
    {
        id: 1,
        clientId: 1,
        clientName: 'John Doe',
        clientEmail: 'john.doe@example.com',
        status: 'pending',
        sentiment: 'positive',
        needs: ['2BHK', 'near school'],
        date: '2023-10-25'
    },
    {
        id: 2,
        clientId: 2,
        clientName: 'Jane Smith',
        clientEmail: 'jane.smith@example.com',
        status: 'completed',
        sentiment: 'neutral',
        needs: ['3BHK', 'near metro'],
        date: '2023-10-24'
    },
    {
        id: 3,
        clientId: 3,
        clientName: 'Mike Johnson',
        clientEmail: 'mike.johnson@example.com',
        status: 'pending',
        sentiment: 'negative',
        needs: ['4BHK', 'luxury amenities'],
        date: '2023-10-23'
    }
];

export default function AllFollowUps() {
    const [followUps, setFollowUps] = useState<any>(FOLLOW_UPS_DATA);
    const [selectedFollowUp, setSelectedFollowUp] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    async function getFollowUps() {
        const res: any = await fetchFromAPI('follow-ups/');
        if (res?.success) {
            setFollowUps(res.data);
        }
    }

    // useEffect(() => {
    //     getFollowUps();
    // }, []);

    const handleViewDetails = (followUp: any) => {
        setSelectedFollowUp(followUp);
        setIsDialogOpen(true);
    };

    return (
        <PageContainer>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>All Follow-ups</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Client Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Sentiment</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className='text-right'>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {followUps.length > 0 && followUps.map((followUp: any) => (
                                <TableRow key={followUp?.id}>
                                    <TableCell className='font-medium'>{followUp?.clientName}</TableCell>
                                    <TableCell>{followUp?.clientEmail}</TableCell>
                                    <TableCell>
                                        <Badge>
                                            {followUp?.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={followUp?.sentiment === 'positive' ? 'default' : followUp?.sentiment === 'negative' ? 'destructive' : 'outline'}>
                                            {followUp?.sentiment}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{followUp?.date}</TableCell>
                                    <TableCell className='text-right'>
                                        <Button variant='outline' size='sm' onClick={() => handleViewDetails(followUp)}>
                                            View Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Follow-up Dialog */}
            {selectedFollowUp && (
                <FollowUpDialogDetails
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    clientId={selectedFollowUp.clientId}
                    clientName={selectedFollowUp.clientName}
                    clientEmail={selectedFollowUp.clientEmail}
                    client={selectedFollowUp}
                />
            )}
        </PageContainer>
    );
}