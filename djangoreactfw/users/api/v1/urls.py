from django.urls import path
from .views import UserView, CreateUserView, BlacklistView

urlpatterns = [
   path('users', UserView.as_view()),
   path('createusers', CreateUserView.as_view()),
   path('token/blacklist', BlacklistView.as_view()),
]