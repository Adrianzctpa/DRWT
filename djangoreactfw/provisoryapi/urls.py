from django.urls import path
from .views import VRoomView

urlpatterns = [
    path('videoroom', VRoomView.as_view()),
]
