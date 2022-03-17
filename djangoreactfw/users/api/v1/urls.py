from django.urls import path
from rest_framework import routers
from .views import UserViewSet, CreateUserView

router = routers.SimpleRouter()
router.register(r"users", UserViewSet, basename='users-vs')

urlpatterns = [
   path('createusers', CreateUserView.as_view()),
] + router.urls