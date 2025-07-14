from django.contrib import admin
from .models import News, TeamMember, Publication, WebTeamMember

admin.site.register(News)
admin.site.register(TeamMember)
admin.site.register(Publication)
admin.site.register(WebTeamMember)
