from django.contrib.auth import get_user_model
from rest_framework import serializers
from ..models import VideoRoom
user = get_user_model()

def VPathValidate(data):
    types = ["image", "video"]
    filetype = data['videopath'].content_type.split('/')[0]
    if filetype in types:
        return True
    return False    

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
        
        if not VPathValidate(data):
            raise serializers.ValidationError({
                'videopath': 'File must be a Video or Image'
            })

        return data

    def to_representation(self, obj):
        data = super().to_representation(obj)
        data["owner"] = obj.owner.username
        return data

class PatcherSerializer(serializers.ModelSerializer):
    videopath = serializers.FileField(required=False)
    class Meta: 
        model = VideoRoom
        fields = (
            'title',
            'guest_pause_permission',
            'videopath'
        )

    def validate(self, data):
        super().validate(data)

        if 'videopath' in data:
            if not VPathValidate(data):
                raise serializers.ValidationError({
                    'videopath': 'File must be a Video or Image'
                })

        return data      