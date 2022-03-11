from django.urls import path
from .views import UserView, CreateUserView, LoginUserView

urlpatterns = [
   path('users', UserView.as_view()),
   path('createusers', CreateUserView.as_view()),
   path('login', LoginUserView.as_view(), name='login')
]