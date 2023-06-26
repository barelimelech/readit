from .serializers import SearchSerializer
from searches.models import Search
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.exceptions import ValidationError


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


# class SearchUpdateOrCreate(generics.CreateAPIView):
#     queryset = Search.objects.all()
#     serializer_class = SearchSerializer

#     def perform_create(self, serializer):
#         value = serializer.validated_data.get('text')
#         upsert_value(value)  # Call your upsert function here
#         serializer.save()
class UpsertResourceView(APIView):
    def post(self, request):
        serializer = SearchSerializer(data=request.data)

        if serializer.is_valid():
            # Check if the resource already exists based on a unique identifier
            unique_field_value = serializer.validated_data['text']
            try:
                existing_resource = Search.objects.get(text=unique_field_value)
            except Search.DoesNotExist:
                existing_resource = None

            if existing_resource:
                # If the resource exists, perform an update
                serializer.update(existing_resource, serializer.validated_data)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                # If the resource doesn't exist, perform an insert
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)