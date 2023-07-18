from rest_framework import serializers
from users.models import User, WaitingList, Link

class UserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    class Meta:
        model = User
        fields = '__all__'


class WaitingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaitingList
        fields = '__all__'


class LinkSerializer(serializers.ModelSerializer):
    user_username = serializers.SerializerMethodField()

    def get_user_username(self, obj):
        return obj.user.username if hasattr(obj, 'user') else obj['user'].username

    class Meta:
        model = Link  
        fields = '__all__'
