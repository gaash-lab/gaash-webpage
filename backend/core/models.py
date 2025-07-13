from django.db import models

class News(models.Model):
    year = models.IntegerField(default=2025)  
    date = models.CharField(max_length=20, default="Jan")  
    text = models.TextField(default="(No news text)")
    link = models.URLField(blank=True, null=True)
    recent = models.BooleanField(default=False)

    def __str__(self):
        return f"[{self.year}] {self.text[:50]}"


class TeamMember(models.Model):
    name = models.CharField(max_length=255, default="Unnamed")
    designation = models.CharField(max_length=255, blank=True)
    university = models.CharField(max_length=255, blank=True)
    email = models.EmailField(blank=True)
    website = models.URLField(blank=True)
    scholar = models.URLField(blank=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    linkedin = models.URLField(blank=True)
    github = models.URLField(blank=True)
    
    type = models.CharField(max_length=50, default="student")

    def __str__(self):
        return f"{self.name} ({self.type})"


class Publication(models.Model):
    title = models.CharField(max_length=512, default="Untitled Paper")
    authors = models.TextField(default="Unknown Author")
    conference = models.CharField(max_length=255, default="Unknown Conference")
    paperLink = models.URLField(default="https://example.com")
    codeLink = models.URLField(blank=True, null=True)
    year = models.IntegerField(default=2025)

    def __str__(self):
        return f"{self.title[:60]} ({self.year})"
