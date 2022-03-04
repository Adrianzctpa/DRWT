from rest_framework import serializers
from .models import VideoRoom

class VRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoRoom
        fields = (
            'uuid', 'owner', 
            'guest_pause_permission', 
            'created_at'
        )

class CreateVRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoRoom
        fields = (
            'guest_pause_permission'
        )        