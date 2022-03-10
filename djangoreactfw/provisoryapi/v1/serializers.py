from rest_framework import serializers
from ..models import VideoRoom

class VRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoRoom
        fields = (
            'owner',
            'guest_pause_permission', 
            'created_at',
        )

    def to_representation(self, obj):
        data = super().to_representation(obj)
        data["owner"] = obj.owner.username
        return data
    

class CreateVRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoRoom
        fields = (
            'title', 'uuid', 'owner',
            'guest_pause_permission', 
            'created_at',
        )

    def to_representation(self, obj):
        data = super().to_representation(obj)
        data["owner"] = obj.owner.username
        return data
