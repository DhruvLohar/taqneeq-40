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
import { Checkbox } from '@/components/ui/checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Define budget choices (you can replace these with your actual budget options)
const BUDGET_CHOICES = [
  'Under 25L',
  '25L - 50L',
  '50L - 75L',
  '75L - 1Cr',
  'Above 1Cr'
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
  propertyType: z.enum(PROPERTY_TYPES).optional(),
  budget: z.enum(BUDGET_CHOICES).optional(),
  preferredLocations: z.string().optional(),
  possessionTimeline: z.enum(POSSESSION_TIMELINES).optional(),
  amenities: z.string().optional(),
  loanRequired: z.boolean().default(false),
  loanAmount: z.coerce.number()
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
      propertyType: undefined,
      budget: undefined,
      preferredLocations: '',
      possessionTimeline: undefined,
      amenities: '',
      loanRequired: false,
      loanAmount: undefined
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {/* Property Type Field */}
        <FormField
          control={form.control}
          name='propertyType'
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
          name='preferredLocations'
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
          name='possessionTimeline'
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
          name='loanRequired'
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
        {form.watch('loanRequired') && (
          <FormField
            control={form.control}
            name='loanAmount'
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