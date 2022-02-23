from rest_framework import serializers
from .models import VideoRoom

class VRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoRoom
        fields = ('id', 'uuid', 'owner', 'guest_pause_permission'
        , 'created_at')