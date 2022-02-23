from django.shortcuts import render
from rest_framework import generics
from .serializers import VRoomSerializer
from .models import VideoRoom

class VRoomView(generics.CreateAPIView):
    queryset = VideoRoom.objects.all()
    serializer_class = VRoomSerializer