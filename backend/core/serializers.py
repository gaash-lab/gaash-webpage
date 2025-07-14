from rest_framework import serializers
from .models import News, TeamMember, Publication, WebTeamMember

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = '__all__'

class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = '__all__'

class WebTeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebTeamMember
        fields = '__all__'