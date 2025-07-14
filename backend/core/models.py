from django.db import models

class News(models.Model):
    year = models.IntegerField(default=2025)  
    date = models.CharField(max_length=20, default="Jan", choices=[
        ('Jan', 'January'),
        ('Feb', 'February'),
        ('March', 'March'),
        ('Apr', 'April'),
        ('May', 'May'),
        ('June', 'June'),
        ('July', 'July'),
        ('Aug', 'August'),
        ('Sep', 'September'),
        ('Oct', 'October'),
        ('Nov', 'November'),
        ('Dec', 'December'),
    ])  
    text = models.TextField(default="(No news text)")
    link = models.URLField(blank=True, null=True)
    recent = models.BooleanField(default=False)

    def __str__(self):
        return f"[{self.year}] {self.text[:50]}"


class TeamMember(models.Model):
    name = models.CharField(max_length=255, default="Unnamed")
    designation = models.CharField(max_length=255, blank=True, default="Department of Information Technology")
    university = models.CharField(max_length=255, blank=True, default="NIT Srinagar")
    email = models.EmailField(blank=True)
    website = models.URLField(blank=True)
    scholar = models.URLField(blank=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    linkedin = models.URLField(blank=True)
    github = models.URLField(blank=True)
    
    type = models.CharField(max_length=50, default="faculty", choices=[
        ('faculty', 'Faculty'),
        ('collaborator', 'Collaborator'),
        ('student', 'Student'),
        ('scholar', 'Scholar'),
        ('project', 'Project Staff'),
    ])

    def __str__(self):
        return f"{self.name} ({self.type})"

class WebTeamMember(models.Model):
    name = models.CharField(max_length=255, default="Unnamed")
    role = models.CharField(max_length=255, blank=True, default="Frontend Developer")
    email = models.EmailField(blank=True)
    website = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    github = models.URLField(blank=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    projects = models.TextField(blank=True, default="project1, project2")  # Store as JSON string or comma-separated
    member_since = models.CharField(max_length=4, blank=True, default="2021")
    isActive = models.BooleanField(default=True)
    team = models.CharField(max_length=50, default="lead", choices=[
        ('lead', 'Team Lead'),
        ('frontend', 'Frontend Developer'),
        ('backend', 'Backend Developer')
    ])

    def __str__(self):
        return f"{self.name} ({self.designation})"

class Publication(models.Model):
    title = models.CharField(max_length=512, default="Untitled Paper")
    authors = models.TextField(default="Author1, Author2, ...")
    conference = models.CharField(max_length=255, default="Unknown Conference")
    paperLink = models.URLField(default="https://example.com")
    codeLink = models.URLField(blank=True, null=True)
    year = models.IntegerField(default=2025)

    def __str__(self):
        return f"{self.title[:60]} ({self.year})"
