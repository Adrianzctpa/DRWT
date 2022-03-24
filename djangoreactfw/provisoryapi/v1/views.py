from django.shortcuts import render
from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import VRoomSerializer, CreateVRoomSerializer
from ..models import VideoRoom

class GetVRoomView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = VRoomSerializer
    
    def get_queryset(self):
        return VideoRoom.objects.filter(owner=self.request.user)

class CreateVRoomView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset = VideoRoom.objects.all() 
    serializer_class = CreateVRoomSerializer
    
    def post(self, request, *args, **kwargs):
        copy_dict = request.data.copy()
        copy_dict['owner'] = self.request.user
        serializer = CreateVRoomSerializer(data=copy_dict)
        return super().post(request, *args, **kwargs)

class UpdateVRoomViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]   
    serializer_class = VRoomSerializer
    lookup_field = "uuid"

    def get_queryset(self):
        action_list = ["PATCH"]

        if self.action in action_list:
            return VideoRoom.objects.filter(user=self.request.user, uuid=self.kwargs.get("uuid"))
        return VideoRoom.objects.all()

    def patch(self, request, *args, **kwargs):
        obj = self.get_object()
        serializer = self.get_serializer(instance=obj, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status.HTTP_201_CREATED, data=serializer.data) 