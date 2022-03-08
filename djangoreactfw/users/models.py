from django.contrib.auth.models import AbstractUser
from django.db import models
from uuid import uuid4

class User(AbstractUser):
    uuid = models.UUIDField(unique=True, default=uuid4, editable=False, db_index=True)
    username = models.CharField(("username"),max_length=30,unique=True)
    name = models.CharField(("name"), max_length=250)
    email = models.EmailField(("email address"), blank=False, unique=True)