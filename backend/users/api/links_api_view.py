from .serializers import LinkSerializer
from users.models import Link
from rest_framework import generics
import requests
from bs4 import BeautifulSoup
from django.http import JsonResponse
from requests.exceptions import RequestException

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

        # Check for redirects
        if response.history:
            final_url = response.url
            # You can choose to handle the redirect by making another request to final_url if needed.
        else:
            final_url = url

        soup = BeautifulSoup(response.content, 'html.parser')
        title = soup.title.string.strip() if soup.title else 'No title found'  # Extract the title from the HTML

        return JsonResponse({'title': title, 'url': final_url})

    except RequestException as error:
        # Handle network or connection errors
        return JsonResponse({'error': str(error), 'url': url})