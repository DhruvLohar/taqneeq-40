'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { verifyOTP } from '@/lib/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const otpSchema = z.object({
  otp: z
    .string()
    .min(5, { message: 'OTP must be 5 digits' })
    .max(5, { message: 'OTP must be 5 digits' })
    .regex(/^\d+$/, { message: 'OTP must contain only numbers' })
});

type OtpFormValue = z.infer<typeof otpSchema>;

interface OtpDialogProps {
  uid: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OtpDialog({ uid, open, onOpenChange }: OtpDialogProps) {
  const router = useRouter();
  const form = useForm<OtpFormValue>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: ''
    }
  });

  const onSubmit = async (data: OtpFormValue) => {
    const response = await verifyOTP(uid, data.otp);

    if (response) {
      toast.success('OTP verified successfully!');
      router.replace('/');
    } else {
      toast.error('Invalid OTP. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Enter Verification Code</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='otp'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>5-digit code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter verification code'
                      {...field}
                      maxLength={5}
                      className='text-center text-lg tracking-widest'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full'>
              Verify & Continue
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
