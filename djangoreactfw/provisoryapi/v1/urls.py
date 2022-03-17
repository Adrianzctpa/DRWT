from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView, 
    TokenRefreshView
)
from .views import VRoomView, CreateVRoomView
from users.api.v1.views import BlacklistView

urlpatterns = [
    path('videoroom', VRoomView.as_view()),
    path('createvroom', CreateVRoomView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='obtain_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('token/blacklist', BlacklistView.as_view()),
]
