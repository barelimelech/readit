# from rest_framework import serializers
# from users.models import Profile

# class ProfileSerializer(serializers.ModelSerializer):
 
#     class Meta:
#         model = Profile
#         fields = '__all__'
from rest_framework import serializers
from users.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
