from django.conf.urls import include
from django.urls import path

urlpatterns = [
    path("v1/", include("provisoryapi.v1.urls")),
]