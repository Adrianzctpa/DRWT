from django.urls import path
from .views import index, indexSPA

urlpatterns = [
    path("login/", index),
    path("selectvroom/", index),
    path("videoroom/<uuid:uuid>", indexSPA),
    path("", index),
]