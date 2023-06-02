from .serializers import UserSerializer
from users.models import User
from rest_framework import generics

class UsersList(generics.ListAPIView):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'

class UserUpdate(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'