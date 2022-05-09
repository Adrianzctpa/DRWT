import json
import jwt 
from djangoreactfw.settings import SIMPLE_JWT
from provisoryapi.models import VideoRoom
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.authentication import JWTAuthentication
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async

@sync_to_async
def get_uuid_vroom(uuid):
    return list(VideoRoom.objects.filter(uuid=uuid).values_list('guest_pause_permission', 'owner'))

class VRoomConsumer(AsyncWebsocketConsumer):

    user_model = get_user_model().objects.all()

    async def connect(self):  
        self.room_group_name = self.room_name = self.scope['url_route']['kwargs']['uuid']
        await (self.channel_layer.group_add)(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        data = json.loads(text_data)

        if data['type'] == 'user_join':
            jwtauth = JWTAuthentication()

            try: 
                jwtauth.get_validated_token(data['token'])
            except:
                self.close()
            decoded_token = jwt.decode(data['token'], SIMPLE_JWT['SIGNING_KEY'], algorithms=[SIMPLE_JWT['ALGORITHM']])
            self.user_id = decoded_token['user_id']         

            result = await get_uuid_vroom(self.room_name)
            self.pause_perm = result[0][0]
            self.owner_id = result[0][1]

            await self.channel_layer.group_send(self.room_name,
            {
                'type': 'user_join',
                'from': data['from'],
            })


        #Send chat message to everyone on ws
        if data['type'] == "chat_message":
            await self.channel_layer.group_send(self.room_group_name,
            {
                'type': 'chat_message',
                'message': data['message'],
                'from': data['from'],
            })

        #Synchronizing guest video time with owner 
        if data['type'] == 'time_sync':
            
            if self.user_id == self.owner_id:
                await self.channel_layer.group_send(self.room_group_name,
                {
                    'type': 'time_sync',
                    'time': data['time'],
                    'from': data['from'],
                })

        #Track state (paused, playing) from owner
        if data['type'] == 'video_state':

            if self.pause_perm or self.user_id == self.owner_id:  

                await self.channel_layer.group_send(self.room_group_name,
                {
                    'type': 'video_state',
                    'state': data['state'],
                    'from': data['from'],
                })                     

    # Funcs based on the logic above
    async def user_join(self, event):

        await self.send(text_data=json.dumps({
            'type': 'join',
            'from': event['from'],
        }))


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