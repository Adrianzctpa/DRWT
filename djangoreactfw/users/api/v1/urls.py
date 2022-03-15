from django.urls import path
from .views import UserView, CreateUserView, LoginUserView, BlacklistView

urlpatterns = [
   path('users', UserView.as_view()),
   path('createusers', CreateUserView.as_view()),
   path('login', LoginUserView.as_view(), name='login'),
   path('logout/blacklist', BlacklistView.as_view()),
]