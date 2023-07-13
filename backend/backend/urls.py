"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from searches.api import views as searches_api_views
from users.api import views as users_api_views
from waitinglist.api import views as waitinglist_api_view
from django.shortcuts import render

def render_react(request):
    return render(request, "index.html")


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/searches', searches_api_views.SearchesList.as_view()),
    path('api/searches/create/', searches_api_views.SearchCreate.as_view()),
    path('api/searches/<int:pk>/', searches_api_views.SearchDetail.as_view()),
    # path('api/profiles/<int:pk>/', users_api_views.ProfileDetail.as_view()),
    path('api/searches/<int:pk>/delete/',searches_api_views.SearchDelete.as_view()),
    path('api/searches/<int:pk>/update/',searches_api_views.SearchUpdate.as_view()),
    path('api/searches/upsert/',searches_api_views.UpsertResourceView.as_view()),
    # path('api/search/', searches_api_views.search_view),


    path('api-auth-djoser/', include('djoser.urls')),
    path('api-auth-djoser/', include('djoser.urls.authtoken')),

    path('api/users/', users_api_views.UsersList.as_view()),
    path('api/users/<int:id>/', users_api_views.UserDetail.as_view()),
    path('api/users/<int:id>/update/', users_api_views.UserUpdate.as_view()),

    path('api/waitinglist/', waitinglist_api_view.WaitingListList.as_view()),
    path('api/waitinglist/create/', waitinglist_api_view.WaitingListCreate.as_view()),
    path('api/waitinglist/<int:id>/', waitinglist_api_view.WaitingListDetail.as_view()),
    path('api/waitinglist/<int:id>/update/', waitinglist_api_view.WaitingListUpdate.as_view()),
    re_path(r"^$", render_react),
    re_path(r"^(?:.*)/?$", render_react),
]
