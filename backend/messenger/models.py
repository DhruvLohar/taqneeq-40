import uuid
from django.db import models
from django.utils import timezone


class ChatSession(models.Model):
    user = models.ForeignKey("users.User", related_name='user_chat_sessions', on_delete=models.PROTECT)
    client = models.ForeignKey("clients.Client", related_name='client_chat_sessions', on_delete=models.PROTECT)
    
    is_valid = models.BooleanField(default=True)
    session_key = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    messages = models.JSONField(default=list, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.user.name} - {self.client.name}"
    
    def addMessage(self, sender, message):
        receiver_id = self.client.id if int(self.user.id) == int(sender) else self.user.id 
        msg_payload = dict(
            sender_id=sender, receiver_id=receiver_id, 
            content=message, 
            time=timezone.now().strftime("%H:%M")
        )
        
        self.messages.append(msg_payload)
        self.save()
        