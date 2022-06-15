from django.urls import path
from .views import index, indexSPA

urlpatterns = [
    path("login/", index),
    path("register", index),
    path("selectvroom/", index),
    path("videoroom/<uuid:uuid>/", indexSPA),
    path("createvroom/", index),
    path("createvroom/<uuid:uuid>/", indexSPA),
    path("", index),
]