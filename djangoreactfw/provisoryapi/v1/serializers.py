from django.contrib.auth import get_user_model
from rest_framework import serializers
from ..models import VideoRoom
user = get_user_model()

class VRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoRoom
        fields = (
            'title', 'uuid', 'owner',
            'guest_pause_permission', 
            'created_at', 'videopath'
        )
        read_only_fields = (
            "uuid", "created_at",
        )

    def validate(self, data):
        super().validate(data)
        types = ["image", "video"]
        filetype = data['videopath'].content_type.split('/')[0]
        
        if not filetype in types:
            raise serializers.ValidationError({
                'videopath': 'File must be a Video or Image'
            })

        if self.instance:
            try:
                data.pop("owner")
            except KeyError:
                pass
        return data

    def to_representation(self, obj):
        data = super().to_representation(obj)
        data["owner"] = obj.owner.username
        return data