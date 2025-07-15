from django.urls import path
from .views import NewsListAPIView, TeamListAPIView, PublicationListAPIView, WebTeamMemberListAPIView

urlpatterns = [
    path('news/', NewsListAPIView.as_view(), name='news-list'),
    path('publications/', PublicationListAPIView.as_view(), name='publications-list'),
    path('team/', TeamListAPIView.as_view(), name='team-list'),
    path('web-team/', WebTeamMemberListAPIView.as_view(), name='web-team-list'),  
]
