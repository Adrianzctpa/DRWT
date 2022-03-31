from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .serializers import VRoomSerializer
from ..models import VideoRoom

class VRoomViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]   
    serializer_class = VRoomSerializer
    lookup_field = "uuid"

    def get_queryset(self):
        action_list = ["partial_update"]

        if self.action in action_list:
            return VideoRoom.objects.filter(owner=self.request.user, uuid=self.kwargs.get("uuid"))
        return VideoRoom.objects.filter(owner=self.request.user)

    def create(self, request, *args, **kwargs):
        request.data['owner'] = self.request.user.id
        return super().create(request, *args, **kwargs)