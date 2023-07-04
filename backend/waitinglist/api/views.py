from rest_framework import generics

from .serializers import WaitingListSerializer
from waitinglist.models import WaitingList


class WaitingListList(generics.ListAPIView):
    queryset = WaitingList.objects.all().order_by('-timestamp')
    serializer_class = WaitingListSerializer

class WaitingListDetail(generics.RetrieveAPIView):
    queryset = WaitingList.objects.all()
    serializer_class = WaitingListSerializer
    lookup_field = 'id'

class WaitingListCreate(generics.CreateAPIView):
    queryset = WaitingList.objects.all()
    serializer_class = WaitingListSerializer

class WaitingListUpdate(generics.UpdateAPIView):
    queryset = WaitingList.objects.all()
    serializer_class = WaitingListSerializer
    lookup_field = 'id'

