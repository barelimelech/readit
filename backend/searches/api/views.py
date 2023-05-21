from .serializers import SearchSerializer
from searches.models import Search
from rest_framework import generics

class SearchesList(generics.ListAPIView):
    queryset = Search.objects.all().order_by('-timestamp')
    serializer_class = SearchSerializer