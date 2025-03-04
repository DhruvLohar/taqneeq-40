'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useState } from 'react';
import { toast } from 'sonner';
import PageContainer from '@/components/layout/page-container';
import { BusinessPlanForm } from '@/components/personal/onboarding/BusinessPlan';
import { PersonalInfoForm } from '@/components/personal/onboarding/PersonalInformation';
import { WorkExperienceForm } from '@/components/personal/onboarding/WorkExperienceForm';
import { useRouter } from 'next/navigation';

export default function OnboardingForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: null,
    workExperience: null,
    businessPlan: null
  });

  const handlePersonalInfo = (data: any) => {
    setFormData({ ...formData, personalInfo: data });
    setStep(2);
    toast.success('Personal information saved!');
  };

  const handleWorkExperience = (data: any) => {
    setFormData({ ...formData, workExperience: data });
    setStep(3);
    toast.success('Work experience saved!');
  };

  const handleBusinessPlan = (data: any) => {
    const completeFormData = {
      ...formData,
      businessPlan: data
    };
    setFormData(completeFormData);
    console.log('Complete form data:', completeFormData);
    toast.success('Onboarding completed successfully!');
    router.push('/');
  };

  const stepComponents = {
    1: <PersonalInfoForm onSubmit={handlePersonalInfo} />,
    2: <WorkExperienceForm onSubmit={handleWorkExperience} />,
    3: <BusinessPlanForm onSubmit={handleBusinessPlan} />
  };

  const stepTitles = {
    1: 'Personal Information',
    2: 'Work Experience',
    3: 'Business Plans'
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
