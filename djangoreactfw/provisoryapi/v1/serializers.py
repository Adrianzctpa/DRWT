from rest_framework import serializers
from ..models import VideoRoom

class VRoomSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(source="owner.username")
    class Meta:
        model = VideoRoom
        fields = (
            'owner', 'uuid', 'title',
            'guest_pause_permission', 
            'videopath',
            'created_at',
        )
        read_only_fields = (
            "owner", "uuid", "created_at",
        )
    
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