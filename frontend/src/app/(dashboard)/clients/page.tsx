"use client"

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

// Mock data for clients (replace with actual data source)
const CLIENTS_DATA = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        status: 'active'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        status: 'pending'
    },
    {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        status: 'active'
    },
    {
        id: 4,
        name: 'Sarah Williams',
        email: 'sarah.williams@example.com',
        status: 'pending'
    }
];

export default function AllClients() {

    const [clients, setClients] = useState([]);

    async function getClients() {
        const res: any = await fetchFromAPI('clients/');

        if (res?.success) {
            setClients(res.data)
        }
    }

    useEffect(() => {
        getClients();
    }, [])

    return (
        <PageContainer>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>All Clients</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className='text-right'>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clients.length > 0 && clients.map((client: any) => (
                                <TableRow key={client?.id}>
                                    <TableCell className='font-medium'>{client?.name}</TableCell>
                                    <TableCell>{client?.email}</TableCell>
                                    <TableCell>
                                        <Badge>
                                            {client?.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className='text-right'>
                                        <Button variant='outline' size='sm' asChild>
                                            <Link href={`/clients/${client?.id}`}>
                                                View Details
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </PageContainer>
    )
}