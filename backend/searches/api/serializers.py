from rest_framework import serializers
from searches.models import Search

class SearchSerializer(serializers.ModelSerializer):
    user_username = serializers.SerializerMethodField()

    def get_user_username(self, obj):
        return obj.user.username if hasattr(obj, 'user') else obj['user'].username
    
    # def upsert_value(value):
    #     try:
    #         obj = Search.objects.get(value=value)
    #         obj.timestamp = timezone.now  # Update the timestamp
    #         obj.save()
    #     except Search.DoesNotExist:
    #         pass
    #         # Search.objects.create(value=value)


    class Meta:
        model = Search  
        fields = '__all__'
