from django.shortcuts import render
from rest_framework import generics, viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser
from django_filters import rest_framework as filters
from .serializers import VRoomSerializer, PatcherSerializer
from ..models import VideoRoom

class VRoomFilter(filters.FilterSet):
    title = filters.CharFilter(lookup_expr='icontains')

    class Meta: 
        model = VideoRoom
        fields = ('title', 'created_at')

class VRoomViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]   
    parser_classes = [MultiPartParser]
    filterset_class = VRoomFilter
    lookup_field = "uuid"

    def get_serializer_class(self):
        if self.action == 'partial_update':
            return PatcherSerializer
        return VRoomSerializer

    def get_queryset(self):
        action_list = ["partial_update"]

        if self.action in action_list:
            return VideoRoom.objects.filter(owner=self.request.user, uuid=self.kwargs.get("uuid"))
        return VideoRoom.objects.filter(owner=self.request.user)

    def create(self, request, *args, **kwargs):
        if not 'videopath' in self.request.FILES:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        req = request.POST.copy()
        req['owner'] = request.user.id
        req['videopath'] = self.request.FILES['videopath']
        serializer = self.get_serializer(data=req)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'status':status.HTTP_200_OK, 'resp': serializer.data})

class GetAllVRoomsViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = VRoomSerializer
    filterset_class = VRoomFilter
    lookup_field = "uuid"

    def get_queryset(self):
        if self.action == 'retrieve':
            return VideoRoom.objects.filter(uuid=self.kwargs.get("uuid"))
        return VideoRoom.objects.all()

