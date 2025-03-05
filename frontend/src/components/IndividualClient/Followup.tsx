import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

interface FollowUpDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  clientId: number
  clientName: string
  clientEmail?: string
  clientPhone?: string
  client?: any
  onFollowUpAdded?: (followUp: {
    task: string
    status: string
    date: string
  }) => void
}

export function FollowUpDialog({
  open,
  onOpenChange,
  clientId,
  clientName,
  clientEmail = 'RajeshKumar09@gmail.com',
  clientPhone = '8433546745',
  client=null,
  onFollowUpAdded
}: FollowUpDialogProps) {
  const [emailContent, setEmailContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [scheduledDate, setScheduledDate] = useState('')
  const [clientContactEmail, setClientContactEmail] = useState(clientEmail)
  const [clientContactPhone, setClientContactPhone] = useState(clientPhone)

  // Simulated fetch of email template
  useEffect(() => {
    const fetchEmailTemplate = async () => {
      try {
        // Dummy template
        const dummyTemplate = `Hi ${clientName}, Hope you're having a great day!  We've been working hard to find ${client?.extracted_details?.bhk} BHK properties in Whitefield that fit your budget of ${client?.budget}, and we've got some exciting options to share.  With the current market trends, now is a great time to explore these opportunities further. Let's find your dream home together!`

        setEmailContent(dummyTemplate)
      } catch (error) {
        console.error('Error fetching email template:', error)
      }
    }

    if (open) {
      fetchEmailTemplate()
      // Reset contact details when dialog opens
      setClientContactEmail(clientEmail)
      setClientContactPhone(clientPhone)
      // Reset scheduled date
      setScheduledDate('')
    }
  }, [open, clientId, clientName, clientEmail, clientPhone])

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const submissionData = {
        clientId,
        clientName,
        clientEmail: clientContactEmail,
        clientPhone: clientContactPhone,
        emailContent,
        scheduledDate: scheduledDate || new Date().toISOString().split('T')[0],
        status: scheduledDate ? 'Scheduled' : 'Pending'
      };

      console.log('Follow-up submission data:', submissionData);

      // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/follow-up`, submissionData);

      // if (response.data.success) {
      //   // Only add follow-up if API call was successful
      //   onFollowUpAdded?.({
      //     task: scheduledDate ? "Follow Up Scheduled" : "Follow Up Pending",
      //     status: scheduledDate ? 'Scheduled' : 'Pending',
      //     date: scheduledDate || new Date().toISOString().split('T')[0]
      //   });

      //   // Close dialog only on success
      //   onOpenChange(false);
      // } else {
      //   // Handle unsuccessful response
      //   console.error('Follow-up submission failed:', response.data.message);
      //   // You might want to show an error message to the user here
      // }
    } catch (error) {
      console.error('Error sending follow-up:', error);
      // You might want to show an error message to the user here
    } finally {
      onOpenChange(false);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Send Follow-up Email</DialogTitle>
          <DialogDescription>
            Customize your follow-up email and schedule if needed.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Client Contact Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Client Email
              </label>
              <Input
                value={clientContactEmail}
                onChange={(e) => setClientContactEmail(e.target.value)}
                placeholder="Client email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Client Phone
              </label>
              <Input
                value={clientContactPhone}
                onChange={(e) => setClientContactPhone(e.target.value)}
                placeholder="Client phone number"
              />
            </div>
          </div>

          {/* Email Content */}
          <Textarea
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            className="min-h-[200px] mt-4"
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
            {scheduledDate && (
              <p className="text-sm text-muted-foreground mt-2">
                Follow-up will be sent on {new Date(scheduledDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Follow-up'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}