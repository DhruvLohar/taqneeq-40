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
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { OtpDialog } from '@/components/personal/authentication/LoginOtp';
import { getOTP, login } from '@/lib/auth';
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  name: z.string({ message: 'Enter a valid email address' }),
  phone_number: z.string().regex(phoneRegex, 'Invalid Number!')
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const router = useRouter();
  // const [loading, startTransition] = useTransition();
  const [showOtpDialog, setShowOtpDialog] = useState(false);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const [uid, setUID] = useState<any>();

  const defaultValues = {
    email: '',
    name: '',
    phone_number: ''
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (values: UserFormValue) => {
    try {
      const res = await login(values);

      if (res.success) {
        setUID(res.data?.id);
        setEmail(values.email);

        const emailSent = await getOTP(res.data?.id);

        if (emailSent.success) {
          setShowOtpDialog(true);
          toast.success('Verification code sent to your phone!');

          setLoading(false);
        } else {
          toast.error('Error in sending OTP');
        }
      } else {
        alert('Something went wrong: ' + (res.err?.message || 'Unknown error'));
      }
    } catch (err: any) {
      alert('Something went wrong: ' + err.message);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-4'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter your name'
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Enter your email...'
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone_number'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter your Phone number'
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={loading}
            className='ml-auto mt-4 w-full'
            type='submit'
          >
            Continue With Email
          </Button>
        </form>
      </Form>

      <OtpDialog
        uid={uid}
        open={showOtpDialog}
        onOpenChange={setShowOtpDialog}
      />
    </>
  );
}
