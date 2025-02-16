'use client';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const workExperienceSchema = z.object({
  professional_summary: z
    .string()
    .min(50, 'Please provide more detail about your current role'),
  past_roles: z
    .string()
    .min(50, 'Please provide more detail about your past experience'),
  skills: z.string().min(20, 'Please list your relevant skills'),
  industry_experience: z
    .string()
    .min(50, 'Please provide more detail about your industry experience')
});

export function WorkExperienceForm({
  onSubmit
}: {
  onSubmit: (data: any) => void;
}) {
  const form = useForm({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      professional_summary: '',
      past_roles: '',
      skills: '',
      industry_experience: ''
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='professional_summary'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Current role and responsibilities...'
                      className='min-h-[120px]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='skills'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relevant Skills & Expertise</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='List your key skills...'
                      className='min-h-[120px]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='past_roles'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Past Roles and Achievements</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Previous work experience and achievements...'
                      className='min-h-[120px]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='industry_experience'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry Experience</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Relevant industry experience and projects...'
                      className='min-h-[120px]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type='submit' className='mt-6 w-full'>
          Continue
        </Button>
      </form>
    </Form>
  );
}
