import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface FollowUpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId: number;
  clientName: string;
  clientEmail?: string;
  client?: any;
}

export function FollowUpDialogDetails({
  open,
  onOpenChange,
  clientId,
  clientName,
  clientEmail = 'example@example.com',
  client = null,
}: FollowUpDialogProps) {
  const [emailContent, setEmailContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');

  // Generate follow-up content based on sentiment and needs
  useEffect(() => {
    if (open && client) {
      let template = '';

      if (client.sentiment === 'positive') {
        template = `Hi ${clientName}, I hope you're doing well! Based on our recent conversation, I'm excited to share some great options for ${client.needs.join(', ')}. Let's schedule a call to discuss further!`;
      } else if (client.sentiment === 'negative') {
        template = `Hi ${clientName}, I understand your concerns. Let's work together to find the perfect ${client.needs.join(', ')} that meets your expectations. Please let me know a convenient time to connect.`;
      } else {
        template = `Hi ${clientName}, I hope you're having a great day! I wanted to follow up on your interest in ${client.needs.join(', ')}. Let me know if you have any questions or need further assistance.`;
      }

      setEmailContent(template);
    }
  }, [open, client, clientName]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const submissionData = {
        clientId,
        clientName,
        clientEmail,
        emailContent,
        scheduledDate: scheduledDate || new Date().toISOString().split('T')[0],
        status: scheduledDate ? 'Scheduled' : 'Pending'
      };

      console.log('Follow-up submission data:', submissionData);

      // Simulate API call
      // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/follow-up`, submissionData);
      // console.log('Follow-up submitted:', response.data);

      onOpenChange(false);
    } catch (error) {
      console.error('Error sending follow-up:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Follow-up Details</DialogTitle>
          <DialogDescription>
            Customize your follow-up based on client sentiment and needs.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Email Content */}
          <Textarea
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            className="min-h-[200px]"
            placeholder="Compose your follow-up email..."
          />

          {/* Follow-up Scheduling */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Schedule Follow-up (Optional)
            </label>
            <Input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="w-full"
              placeholder="Select follow-up date"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Follow-up'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}