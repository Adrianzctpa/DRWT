from django.urls import path
from .views import VRoomView

urlpatterns = [
    path('', VRoomView.as_view()),
]
