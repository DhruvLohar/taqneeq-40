from .models import ChatSession

from users.models import User

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async

class ChatConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.session_id = self.scope['url_route']['kwargs']['session_id']
        
        # Fetch ChatSession from database
        self.session_instance = await database_sync_to_async(ChatSession.objects.get)(session_key=self.session_id)

        await self.channel_layer.group_add(
            self.session_id,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.session_id,
            self.channel_name
        )

    @database_sync_to_async
    def save_messages(self, payload):
        """Saves the chat message to the database"""
        try:
            self.session_instance.addMessage(
                sender=payload.get('uid'), 
                message=payload.get('message')
            )
        except Exception as err:
            print(f"Error saving message: {err}")

    async def receive_json(self, content, **kwargs):
        """Handles incoming WebSocket messages"""
        uid = content.get("uid")
        message = content.get("message")

        await self.save_messages(content)

        await self.channel_layer.group_send(
            self.session_id,
            {
                'type': 'broadcast_in_session',  # Fixed Typo
                'channelID': self.channel_name,
                'uid': uid,
                'message': message
            }
        )

    async def broadcast_in_session(self, event):
        """Sends message to all users except the sender"""
        uid = event['uid']
        message = event['message']

        if self.channel_name != event['channelID']:  # Send to others, not sende
            await self.send_json({
                'uid': uid,
                'message': message,
            })