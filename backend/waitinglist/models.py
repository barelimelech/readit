from django.db import models
from django.utils import timezone


class WaitingList(models.Model):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    timestamp = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.email