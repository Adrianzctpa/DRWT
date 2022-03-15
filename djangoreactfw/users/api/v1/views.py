from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, CreateUserSerializer, LoginSerializer
from django.contrib.auth import get_user_model, login

User = get_user_model()
class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"data": request.data, "status": status.HTTP_200_OK})  

class LoginUserView(APIView): 
    serializer_class = LoginSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return Response({"status": status.HTTP_200_OK, "authenticated": request.user.is_authenticated})

class BlacklistView(APIView):
    def post(self, request):
        try: 
            rt = request.data["refresh_token"]
            token = RefreshToken(rt)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({'status':status.HTTP_404_NOT_FOUND, 'data': request.data})    