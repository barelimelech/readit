from rest_framework import serializers
from waitinglist.models import WaitingList

class WaitingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaitingList
        fields = '__all__'

