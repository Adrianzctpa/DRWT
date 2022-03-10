from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import VRoomSerializer, CreateVRoomSerializer
from ..models import VideoRoom

class VRoomView(generics.ListAPIView):
    queryset = VideoRoom.objects.all()
    serializer_class = VRoomSerializer

class CreateVRoomView(generics.CreateAPIView):
    queryset = VideoRoom.objects.all() 
    serializer_class = CreateVRoomSerializer
    
    def post(self, request, *args, **kwargs):
        copy_dict = request.data.copy()
        copy_dict['owner'] = self.request.user
        serializer = CreateVRoomSerializer(data=copy_dict)
        return super().post(request, *args, **kwargs)