from django.urls import path
from .views import UserView, CreateUserView

urlpatterns = [
   path('users', UserView.as_view()),
   path('createusers', CreateUserView.as_view()),
]