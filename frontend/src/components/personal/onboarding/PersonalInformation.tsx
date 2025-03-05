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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Define source choices (you can replace these with your actual source options)
const SOURCES_CHOICES = [
  'Facebook',
  'Instagram',
  'Google',
  'Referral',
  'Other'
] as const;

const personalInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone_number: z.string()
    .refine(val => /^\+?[0-9]{10,14}$/.test(val), 'Invalid phone number'),
  email: z.string().email('Invalid email address').optional(),
  preferred_language: z.string().min(2, 'Language must be specified'),
  source: z.enum(SOURCES_CHOICES).optional(),
});

export function PersonalInfoForm({   
  onSubmit 
}: {   
  onSubmit: (data: z.infer<typeof personalInfoSchema>) => void; 
}) {
  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: 'Dhruv Lohar',
      phone_number: '9321781063',
      email: 'dhruvlohar09@gmail.com',
      preferred_language: 'hindi,english',
      source: 'Instagram',
    }
  });
   
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {/* Name Field */}
        <FormField
          control={form.control}
          name='name'
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder='Enter your full name'
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number Field */}
        <FormField
          control={form.control}
          name='phone_number'
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input 
                  placeholder='Enter your phone number'
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name='email'
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Email (Optional)</FormLabel>
              <FormControl>
                <Input 
                  placeholder='Enter your email address'
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Preferred Language Field */}
        <FormField
          control={form.control}
          name='preferred_language'
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Preferred Language</FormLabel>
              <FormControl>
                <Input 
                  placeholder='Enter your preferred language'
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Source Field */}
        <FormField
          control={form.control}
          name='source'
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Source (Optional)</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select source' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SOURCES_CHOICES.map((source) => (
                    <SelectItem key={source} value={source}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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