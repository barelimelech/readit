from .serializers import LinkSerializer
from users.models import Link
from rest_framework import generics
import requests
from bs4 import BeautifulSoup
from django.http import JsonResponse

class LinksList(generics.ListAPIView):
    queryset = Link.objects.all().order_by('-timestamp')
    serializer_class = LinkSerializer

class LinkCreate(generics.CreateAPIView):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer

class LinkDetail(generics.RetrieveAPIView):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer

class LinkDelete(generics.DestroyAPIView):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer

class LinkUpdate(generics.UpdateAPIView):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer

def get_website_title(request):
    url = request.GET.get('url')  # Get the URL parameter from the request
    
    try:
        response = requests.get(url)  # Fetch the HTML content of the website
        response.raise_for_status()  # Raise an exception for any HTTP error status codes
        soup = BeautifulSoup(response.text, 'html.parser')
        title = soup.title.string  # Extract the title from the HTML
        return JsonResponse({'title': title})
    except (requests.exceptions.RequestException, AttributeError) as error:
        # Handle the error and return the URL
        return JsonResponse({'error': str(error), 'url': url})
