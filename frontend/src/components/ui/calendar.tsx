'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('w-full p-3', className)} // Added w-full for full width
      classNames={{
        months:
          'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 w-full justify-center', // Added w-full and center justification
        month: 'space-y-6 w-full', // Added w-full to month
        caption: 'flex justify-center pt-1 relative items-center mb-8',
        caption_label: 'text-xl font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-9 w-9 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-3 ml-4',
        head_row: 'flex w-full justify-between ', // Added justify-between for proper spacing
        head_cell:
          'text-muted-foreground rounded-md flex-1 mr-10 font-medium text-lg text-center', // Added flex-1 for equal width
        row: 'flex w-full mt-4 justify-between ml-12', // Added justify-between for proper spacing
        cell: cn(
          'relative p-0 text-center text-base focus-within:relative focus-within:z-20 flex-1', // Added flex-1 for equal width
          '[&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md'
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-14 w-full p-0 font-normal aria-selected:opacity-100 text-base' // Changed to w-full from fixed w-14
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn('h-6 w-6', className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn('h-6 w-6', className)} {...props} />
        )
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
