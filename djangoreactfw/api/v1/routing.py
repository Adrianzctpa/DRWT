from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path("ws/video/<uuid>", consumers.VRoomConsumer.as_asgi()),
]