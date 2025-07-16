from django.core.management.base import BaseCommand
from core.models import News  # replace 'core' with your app name if different

class Command(BaseCommand):
    help = "Import predefined news entries into the database"

    def handle(self, *args, **kwargs):
        news_data = [
            { 
                "date": "Apr", 
                "text": "4 H100 GPU Cluster deployed to boost compute",
                "recent": True,
                "year": 2025
            },
            { 
                "date": "Nov", 
                "text": "One paper accepted in WACV 2024.",
                "link": "https://www.tajamulashraf.com/assets/Documents/wacv/transfed.pdf",
                "recent": True,
                "year": 2024
            },
            { 
                "date": "Nov", 
                "text": "One paper accepted in MoSICom 2024.",
                "link": "https://ieeexplore.ieee.org/abstract/document/10880901",
                "recent": False,
                "year": 2024
            },
            { 
                "date": "July", 
                "text": "One paper accepted in CVIP 2023.",
                "link": "https://www.tajamulashraf.com/assets/Documents/cvip/022.pdf",
                "recent": False,
                "year": 2023
            },
            { 
                "date": "March", 
                "text": "One paper accepted in ICDSA 2023.",
                "link": "https://www.tajamulashraf.com/assets/Documents/icdsa/paper.pdf",
                "recent": False,
                "year": 2023
            }
        ]

        for entry in news_data:
            news_obj, created = News.objects.get_or_create(
                text=entry["text"],
                defaults={
                    "year": entry.get("year", 2025),
                    "date": entry.get("date", "Jan"),
                    "link": entry.get("link", None),
                    "recent": entry.get("recent", False)
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"Added: {news_obj.text[:50]}"))
            else:
                self.stdout.write(self.style.WARNING(f"Skipped (already exists): {news_obj.text[:50]}"))
