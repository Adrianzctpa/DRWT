from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)
        read_only_fields = ("username",)    

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'uuid', 'username', 'name', 'email', 'password'
        )
        read_only_fields = ("uuid",)
        write_only_fields = ("password",)      

    def save(self, *args, **kwargs):
        password = self.validated_data.pop('password')
        user = User(**self.validated_data)
        user.set_password(password)
        user.save()  