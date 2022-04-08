from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser
from .serializers import VRoomSerializer, PatcherSerializer
from ..models import VideoRoom

class VRoomViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]   
    parser_classes = [MultiPartParser]
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
        return Response({'status':status.HTTP_200_OK})