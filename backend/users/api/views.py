from .serializers import UserSerializer
from users.models import User
from rest_framework import generics
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

class UsersList(generics.ListAPIView):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'

class UserUpdate(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'

@csrf_exempt
def update_user_field(request, id):
    if request.method == 'PATCH':  # Use PATCH for partial updates
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

        # Get the field you want to update from the request data
        data = json.loads(request.body)
        field_to_update = data.get('field_name')
        new_value = data.get('new_value')

        # Perform validation or any additional logic here if needed

        # Update the user field
        setattr(user, field_to_update, new_value)
        user.save()

        return JsonResponse({'status': 'success'})

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)