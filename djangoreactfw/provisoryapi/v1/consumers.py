import json
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.authentication import JWTAuthentication
from channels.generic.websocket import AsyncWebsocketConsumer

class VRoomConsumer(AsyncWebsocketConsumer):
    
    #user_model = get_user_model().objects.all()

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

        # jwt = JWTAuthentication

        # try: 
        #     jwt.get_validated_token(data['token'])
        # except:
        #     self.close()
        # self.user_id = data["from"]

        if data['type'] == "chat_message":
            await self.channel_layer.group_send(self.room_group_name,
            {
                'type': 'chat_message',
                'message': data['message'],
                'from': data['from'],
            })

        #Synchronizing guest video time with owner 
        if data['type'] == 'time_sync':
            await self.channel_layer.group_send(self.room_group_name,
            {
                'type': 'time_sync',
                'time': data['time'],
                'from': data['from'],
            })

        #Track state (paused, playing) from owner
        if data['type'] == 'video_state':
            await self.channel_layer.group_send(self.room_group_name,
            {
                'type': 'video_state',
                'state': data['state'],
                'from': data['from'],
            })                     

    # Funcs based on the logic above
    async def chat_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'type': 'chat',
            'message': message,
            'from': event['from'],
        }))

    async def time_sync(self, event):
        time = event['time']

        await self.send(text_data=json.dumps({
            'type': 'sync',
            'time': time,
            'from': event['from'],
        }))

    async def video_state(self, event):
        state = event['state']

        await self.send(text_data=json.dumps({
            'type': 'state',
            'state': state,
            'from': event['from'],
        }))    