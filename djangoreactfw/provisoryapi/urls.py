from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView, 
    TokenRefreshView
)
from .views import VRoomView

urlpatterns = [
    path('videoroom', VRoomView.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='obtain_token'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refresh_token')
]
