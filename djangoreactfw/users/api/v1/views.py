from rest_framework import generics, status, viewsets
from rest_framework.permissions import BasePermission, IsAuthenticated, AllowAny, SAFE_METHODS
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, CreateUserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer 
    
    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
        
class CreateUserView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"data": request.data, "status": status.HTTP_200_OK})  

class BlacklistView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        try: 
            rt = request.data["refresh_token"]
            token = RefreshToken(rt)
            token.blacklist()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'status':status.HTTP_404_NOT_FOUND, 'data': request.data})    