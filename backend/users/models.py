from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email','first_name', 'last_name']
    def get_full_name(self):
        full_name = '%s %s' % (self.last_name.upper(), self.first_name)
        return full_name.strip()
  
    def is_stuff(self):
        return self.is_staff

# class Profile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     first_name = models.CharField(max_length=150)
#     last_name = models.CharField(max_length=150)
#     # agency_name = models.CharField(max_length=100, null=True, blank=True)
#     # phone_number = models.CharField(max_length=25, null=True, blank=True)
#     # bio = models.TextField(null=True, blank=True)
#     # profile_picture = models.ImageField(upload_to='profile_pictures/%Y/%m/%d/', null=True, blank=True)

#     def __str__(self):
#         return f"Profile of {self.user.username}"
    