from django.db import models
from uuid import uuid4

letters = ['a','b','c','d','e','f'
          ,'g','h','i','j','k','l'
          ,'m','n','o','p','q','r'
          ,'s','t','u','v','w','x'
          ,'y','z']

def IdGen():
    id = uuid.uuid4()
    return id


class VideoRoom(models.Model):
    uuid = models.UUIDField(unique=True, default=uuid4, editable=False, db_index=True)
    owner = models.CharField(max_length=20, unique=True)
    guest_pause_permission = models.BooleanField(null=False,default=False)
    created_at = models.DateTimeField(auto_now_add=True)