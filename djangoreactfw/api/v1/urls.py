from django.urls import path
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView, 
    TokenRefreshView
)
from .views import VRoomViewSet, GetAllVRoomsViewSet
from users.api.v1.views import BlacklistView

router = routers.SimpleRouter()
router.register(r"vroomset", VRoomViewSet, basename='vroom-vs')
router.register(r'getvrooms', GetAllVRoomsViewSet, basename='gvroom-vs')

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='obtain_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('token/blacklist', BlacklistView.as_view()),
] + router.urls
