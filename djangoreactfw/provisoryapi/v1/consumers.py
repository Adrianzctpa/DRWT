import json
from asgiref.sync import sync_to_async, async_to_sync
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.authentication import JWTAuthentication
from channels.generic.websocket import AsyncWebsocketConsumer


class VRoomConsumer(AsyncWebsocketConsumer):
    
    user_model = get_user_model().objects.all()
    users = []

    async def connect(self):  
        self.room_group_name = self.room_name = self.scope['url_route']['kwargs']['uuid']
        await (self.channel_layer.group_add)(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        pass
        # await self.channel_layer.group_send(
        #     self.room_group_name,
        #     {
        #         "type": "disconnect",
        #         "data": {"user": self.user_id},
        #     },
        # )

        # user = self.get_username(self.user_id)
        # self.users.remove(user)
        # await (self.channel_layer.group_discard)(
        #     self.room_group_name, self.channel_name
        # )


    async def receive(self, text_data):
        data = json.loads(text_data)

        jwt = JWTAuthentication

        try: 
            jwt.get_validated_token(data['token'])
        except:
            self.close()
        self.user_id = data["from"]

        if data['type'] == "chat_message":
            await self.channel_layer.group_send(self.room_group_name,
            {
                'type': 'chat_message',
                'message': data['message']
            })

    async def chat_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'type': 'chat',
            'message': message
        }))
