'use client';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import React, { useState } from 'react';
import { toast } from 'sonner';
import PageContainer from '@/components/layout/page-container';
import { PropertyInfoForm } from '@/components/personal/onboarding/PropertyInfo';
import { PersonalInfoForm } from '@/components/personal/onboarding/PersonalInformation';
import { VoiceRecordingForm } from '@/components/personal/onboarding/AdditionalInfo';
import { useRouter } from 'next/navigation';
import { postDataToAPI } from '@/lib/api';

export default function OnboardingForm({ params }: { params: Promise<{ id: number }> }) {

    const resolveParams = React.use(params);

    const router = useRouter();
    const [step, setStep] = useState(3);
    const [formData, setFormData] = useState({
        personalInfo: null,
        propertyInfo: null,
        additionalInfo: null
    });

    const handlePersonalInfo = (data: any) => {
        setFormData({ ...formData, personalInfo: data });
        setStep(2);
        toast.success('Personal information saved!');
    };

    const handlePropertyInfo = (data: any) => {
        setFormData({ ...formData, propertyInfo: data });
        setStep(3);
        toast.success('Work experience saved!');
    };

    const handleAdditionalInfo = async (data: any) => {
        const completeFormData = {
            ...formData,
            broker: resolveParams.id,
            additionalInfo: data
        };
        setFormData(completeFormData);
        
        console.log('Complete form data:', completeFormData)

        // const res = await postDataToAPI('clients/', completeFormData, true);

        // if (res.success) {
        //     toast.success('Onboarding completed successfully!');
        // }

        // router.push('/');
    };

    const stepComponents = {
        1: <PersonalInfoForm onSubmit={handlePersonalInfo} />,
        2: <PropertyInfoForm onSubmit={handlePropertyInfo} />,
        3: <VoiceRecordingForm onSubmit={handleAdditionalInfo} />
    };

    const stepTitles = {
        1: 'Personal Information',
        2: 'Property Related Information',
        3: 'Additional Details (you can upload the audio file here)'
    };

    return (
        <PageContainer>
            <Card className='w-full rounded-none border-none'>
                <CardHeader>
                    <CardTitle>
                        Step {step} of 3: {stepTitles[step as keyof typeof stepTitles]}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {stepComponents[step as keyof typeof stepComponents]}
                </CardContent>
                <CardFooter className='justify-between'>
                    {step > 1 && (
                        <Button variant='outline' onClick={() => setStep(step - 1)}>
                            Previous
                        </Button>
                    )}
                    <div className='text-sm text-muted-foreground'>Step {step} of 3</div>
                </CardFooter>
            </Card>
        </PageContainer>
    );
}
