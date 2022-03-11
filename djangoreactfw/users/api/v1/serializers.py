from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

User = get_user_model()
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
        password = self.validated_data.pop('password')
        user = User(**self.validated_data)
        user.set_password(password)
        user.save()    

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=255)
    password = serializers.CharField(
        label= ("Password"),
        style={'input_type': 'password'},
        trim_whitespace=False,
        max_length=128,
        write_only=True
    )

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = authenticate(
                request=self.context.get('request'),
                email=email, password=password
                )
            if not user:
                msg = ('LOG IN FAILED')
                raise serializers.ValidationError(msg, code='Auth error')     
        else: 
            msg = ("FIELDS ARE REQUIRED") 
            raise serializers.ValidationError(msg, code='Auth error')      

        data['user'] = user
        return data        