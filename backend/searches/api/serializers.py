from rest_framework import serializers
from searches.models import Search


class SearchSerializer(serializers.ModelSerializer):
    user_username = serializers.SerializerMethodField()

    def get_user_username(self, obj):
        return obj.user.username
    
    class Meta:
        model = Search
        fields = '__all__'
