from django.urls import path
from .views import NewsListAPIView, TeamListAPIView, PublicationListAPIView

urlpatterns = [
    path('news/', NewsListAPIView.as_view(), name='news-list'),
    path('publications/', PublicationListAPIView.as_view(), name='publications-list'),
    path('team/', TeamListAPIView.as_view(), name='team-list'),
]
