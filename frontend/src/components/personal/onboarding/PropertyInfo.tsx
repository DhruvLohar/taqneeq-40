'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Define budget choices (you can replace these with your actual budget options)
const BUDGET_CHOICES = [
  '10L-50L',
  '50L-1Cr',
  '1Cr-5Cr',
  '5Cr+'
] as const;

// Define property type choices
const PROPERTY_TYPES = [
  'Apartment (1 RK)',
  'Apartment (1 BHK)',
  'Apartment (2 BHK)',
  'Apartment (3+ BHK)',
  'Villa',
  'Independent House',
  'Plot',
  'Commercial',
  'Other'
] as const;

// Define possession timeline choices
const POSSESSION_TIMELINES = [
  'Immediate',
  '3-6 Months',
  '6-12 Months',
  '1-2 Years',
  'Under Construction'
] as const;

const propertyInfoSchema = z.object({
  property_type: z.enum(PROPERTY_TYPES).optional(),
  budget: z.enum(BUDGET_CHOICES).optional(),
  preferred_locations: z.string().optional(),
  possession_timeline: z.enum(POSSESSION_TIMELINES).optional(),
  amenities: z.string().optional(),
  loan_required: z.boolean().default(false),
  loan_amount: z.coerce.number()
    .min(0, 'Loan amount must be positive')
    .optional()
});

export function PropertyInfoForm({
  onSubmit
}: {
  onSubmit: (data: z.infer<typeof propertyInfoSchema>) => void;
}) {
  const form = useForm<z.infer<typeof propertyInfoSchema>>({
    resolver: zodResolver(propertyInfoSchema),
    defaultValues: {
      property_type: undefined,
      budget: undefined,
      preferred_locations: '',
      possession_timeline: undefined,
      amenities: '',
      loan_required: false,
      loan_amount: undefined
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {/* Property Type Field */}
        <FormField
          control={form.control}
          name='property_type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select property type' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PROPERTY_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Budget Field */}
        <FormField
          control={form.control}
          name='budget'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Range</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select budget range' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {BUDGET_CHOICES.map((budget) => (
                    <SelectItem key={budget} value={budget}>
                      {budget}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Preferred Locations Field */}
        <FormField
          control={form.control}
          name='preferred_locations'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Locations</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Enter preferred locations (comma-separated)'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Possession Timeline Field */}
        <FormField
          control={form.control}
          name='possession_timeline'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Possession Timeline</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select possession timeline' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {POSSESSION_TIMELINES.map((timeline) => (
                    <SelectItem key={timeline} value={timeline}>
                      {timeline}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Amenities Field */}
        <FormField
          control={form.control}
          name='amenities'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Desired Amenities</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Enter desired amenities (comma-separated)'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Loan Required Field */}
        <FormField
          control={form.control}
          name='loan_required'
          render={({ field }) => (
            <FormItem className='flex flex-row items-start space-x-3 space-y-0 p-4'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel>
                  Loan Required
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        {/* Loan Amount Field (conditionally rendered) */}
        {form.watch('loan_required') && (
          <FormField
            control={form.control}
            name='loan_amount'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Amount</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='Enter loan amount'
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter the loan amount you are expecting in lacs.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type='submit' className='w-full'>
          Continue
        </Button>
      </form>
    </Form>
  );
}