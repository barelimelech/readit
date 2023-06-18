from .serializers import SearchSerializer
from searches.models import Search
from rest_framework import generics

class SearchesList(generics.ListAPIView):
    queryset = Search.objects.all().order_by('-timestamp')
    serializer_class = SearchSerializer

class SearchCreate(generics.CreateAPIView):
    queryset = Search.objects.all()
    serializer_class = SearchSerializer


class SearchDetail(generics.RetrieveAPIView):
    queryset = Search.objects.all()
    serializer_class = SearchSerializer


class SearchDelete(generics.DestroyAPIView):
    queryset = Search.objects.all()
    serializer_class = SearchSerializer


class SearchUpdate(generics.UpdateAPIView):
    queryset = Search.objects.all()
    serializer_class = SearchSerializer