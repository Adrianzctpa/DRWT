from django.db import models
from uuid import uuid4
from django.contrib.auth import get_user_model

User = get_user_model()
class VideoRoom(models.Model):
    title = models.CharField(max_length=20, default='VideoRoom')
    uuid = models.UUIDField(unique=True, default=uuid4, editable=False, db_index=True)
    owner = models.ForeignKey(User, related_name='videorooms', on_delete=models.CASCADE)
    guest_pause_permission = models.BooleanField(null=False,default=False)
    videopath = models.FileField(upload_to='content/%Y/%m/%d')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title