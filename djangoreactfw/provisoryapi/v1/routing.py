from django.urls import path
from . import consumers


#(?P<uuid>[0-9a-f\-]{32,})$

websocket_urlpatterns = [
    path("ws/video/<uuid>", consumers.VRoomConsumer.as_asgi()),
]