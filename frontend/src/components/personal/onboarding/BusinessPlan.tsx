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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const BUSINESS_TYPE_CHOICES = [
  { value: 'TECH', label: 'Technology' },
  { value: 'PHARMA', label: 'Pharmaceutical' },
  { value: 'ECOM', label: 'E-Commerce' },
  { value: 'HEALTH', label: 'Healthcare' },
  { value: 'FIN', label: 'Financial Services' },
  { value: 'EDU', label: 'Education' },
  { value: 'RETAIL', label: 'Retail' },
  { value: 'FOOD', label: 'Food & Beverage' },
  { value: 'CONS', label: 'Consulting' },
  { value: 'OTHER', label: 'Other' }
];

const TARGET_MARKET_CHOICES = [
  { value: 'B2B', label: 'Business to Business' },
  { value: 'B2C', label: 'Business to Consumer' },
  { value: 'B2B2C', label: 'Business to Business to Consumer' },
  { value: 'B2G', label: 'Business to Government' }
];

const TECHNICAL_PROFICIENCY_CHOICES = [
  { value: 'NONE', label: 'No Technical Background' },
  { value: 'BASIC', label: 'Basic Computer Skills' },
  { value: 'INTERMEDIATE', label: 'Some Technical Knowledge' },
  { value: 'ADVANCED', label: 'Strong Technical Background' }
];

const businessPlanSchema = z.object({
  business_idea: z
    .string()
    .min(50, 'Please provide more detail about your business idea'),
  market_opportunity: z
    .string()
    .min(50, 'Please provide more detail about your target market'),
  business_type: z.string().min(1, 'Please select a business type'),
  target_market: z.string().min(1, 'Please select a target market'),
  technical_proficiency: z
    .string()
    .min(1, 'Please select your technical proficiency')
});

export function BusinessPlanForm({
  onSubmit
}: {
  onSubmit: (data: any) => void;
}) {
  const form = useForm({
    resolver: zodResolver(businessPlanSchema),
    defaultValues: {
      business_idea: '',
      market_opportunity: '',
      business_type: '',
      target_market: '',
      technical_proficiency: ''
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='business_idea'
            render={({ field }) => (
              <FormItem className='col-span-1 md:col-span-2'>
                <FormLabel>Business Idea Overview</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Description of business idea and problem solved...'
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
            name='market_opportunity'
            render={({ field }) => (
              <FormItem className='col-span-1 md:col-span-2'>
                <FormLabel>Market Opportunity & Target Audience</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Target audience and value proposition...'
                    className='min-h-[120px]'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-3'>
          <FormField
            control={form.control}
            name='business_type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select business type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BUSINESS_TYPE_CHOICES.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='target_market'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Market</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select target market' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TARGET_MARKET_CHOICES.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='technical_proficiency'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technical Proficiency</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select proficiency level' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TECHNICAL_PROFICIENCY_CHOICES.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type='submit' className='mt-6 w-full'>
          Complete Onboarding
        </Button>
      </form>
    </Form>
  );
}
