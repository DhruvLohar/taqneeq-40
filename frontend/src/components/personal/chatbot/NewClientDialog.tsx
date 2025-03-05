'use client';

import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Upload, Trash2, FileAudio } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  voiceRecording: z.instanceof(File)
    .nullable()
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, 'Max file size is 5MB')
    .refine((file) => !file || file.type.startsWith('audio/'), 'Only audio files are allowed'),
});

export function AddClientDialog() {
  const router = useRouter();
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      voiceRecording: undefined,
    },
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.includes('audio/')) {
        toast.error("Invalid file type", {
          description: "Please upload an audio file",
        });
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setAudioPreview(previewUrl);
      setAudioFile(file);
      form.setValue('voiceRecording', file);
    }
  };

  const clearRecording = () => {
    setAudioPreview(null);
    setAudioFile(null);
    form.setValue('voiceRecording', undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      // Simulating API call
      // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/clients`, formData);

      // Simulate success response
      const dummyClientId = Math.random().toString(36).substr(2, 9);

      toast.success("New client created successfully", {
        description: `Client ID: ${dummyClientId}`,
      });

      setOpen(false);
      form.reset();
      clearRecording();

      // Redirect to client page
      router.push(`/clients/${dummyClientId}`);
    } catch (error) {
      toast.error("Failed to create client", {
        description: "Please try again later",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full bg-muted/50 border-none w-fit">
          <Plus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Client name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="voiceRecording"
              render={() => (
                <FormItem>
                  <FormLabel>Voice Recording</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <Input
                        type="file"
                        accept="audio/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                      />
                      {audioPreview && (
                        <div className="flex items-center gap-2">
                          <audio controls className="flex-1">
                            <source src={audioPreview} />
                          </audio>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={clearRecording}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Create Client
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}