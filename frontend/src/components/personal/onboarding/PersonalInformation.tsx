'use client';
import { Button } from '@/components/ui/button';
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
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const personalInfoSchema = z.object({
  bio: z.string().min(20, 'Bio must be at least 20 characters')
});

export function PersonalInfoForm({
  onSubmit
}: {
  onSubmit: (data: any) => void;
}) {
  const form = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      bio: ''
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brief Bio/Background</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Tell us about yourself, interests, and business motivations...'
                  className='min-h-[150px]'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full'>
          Continue
        </Button>
      </form>
    </Form>
  );
}
