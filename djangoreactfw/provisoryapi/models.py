from django.db import models
from uuid import uuid4

class VideoRoom(models.Model):
    uuid = models.UUIDField(unique=True, default=uuid4, editable=False, db_index=True)
    owner = models.CharField(max_length=20, unique=True)
    guest_pause_permission = models.BooleanField(null=False,default=False)
    created_at = models.DateTimeField(auto_now_add=True)