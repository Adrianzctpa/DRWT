from rest_framework import serializers
from ...models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'username', 'email',
        )        

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'uuid', 'username', 'name', 'email', 'password'
        )
        read_only_fields = ("uuid",)
        write_only_fields = ("password",)      

    def save(self, *args, **kwargs):
        password = self.validated_data['password']
        user = User(**self.validated_data)
        user.set_password(password)
        user.save()    
