from rest_framework import generics, status, viewsets, mixins
from rest_framework.permissions import IsAuthenticated, AllowAny
from .permissions import AllowIsntAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, CreateUserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class UserViewSet(mixins.ListModelMixin,
                mixins.UpdateModelMixin,
                viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer 
    lookup_field = "uuid"

    def get_queryset(self):
        action_list = ["partial_update"]

        if self.action in action_list:
            return User.objects.filter(username=self.request.user, uuid=self.kwargs.get("uuid"))
        return User.objects.filter(username=self.request.user)
        
class CreateUserView(generics.CreateAPIView):
    permission_classes = [AllowIsntAuthenticated]
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