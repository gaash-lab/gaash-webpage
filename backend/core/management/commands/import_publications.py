import json
from django.core.management.base import BaseCommand
from core.models import Publication

class Command(BaseCommand):
    help = "Import predefined publications into the database"

    def handle(self, *args, **kwargs):
        publications = [
            {
                "id": 1,
                "title": "Climate Change Parameter Dataset (CCPD): A Benchmark Dataset for Climate Change parameters in Jammu and Kashmir",
                "authors": "Tajamul Ashraf, Janibul Bashir",
                "conference": "International Conference on Data Science and Applications (ICDSA) 2023",
                "paperLink": "https://link.springer.com/chapter/10.1007/978-981-99-7862-5_1",
                "year": 2023
            },
            {
                "id": 2,
                "title": "An Integral Computer Vision System for Apple Detection, Classification, and Semantic Segmentation",
                "authors": "Tajamul Ashraf, Naiyer Abbas, Mohammad Haseeb, Nadeem Yousuf, Janibul Bashir",
                "conference": "International Conference on Machine Vision (ICMV) 2022",
                "paperLink": "https://www.spiedigitallibrary.org/conference-proceedings-of-spie/12701/127011H/An-integral-computer-vision-system-for-apple-detection-classification-and/10.1117/12.2680881.short",
                "codeLink": "https://github.com/Tajamul21/Detection-Classification-and-Semantic_Segmentation-of-apples",
                "year": 2022
            },
            {
                "id": 22,
                "title": "TransFed: A way to epitomize Transformer-based Focal Modulation using Federated Learning",
                "authors": "Tajamul Ashraf, Fuzayil Mir, Iqra Altaf Gillani",
                "conference": "Winter Conference on Applications of Computer Vision (WACV) 2024",
                "paperLink": "https://ieeexplore.ieee.org/document/10483650",
                "codeLink": "https://github.com/Tajamul21/TransFed",
                "year": 2024
            },
            {
                "id": 39,
                "title": "OpSAVE: Eviction based scheme for efficient optical network-on-chip",
                "authors": "Uzmat Ul Nisa, Janibul Bashir",
                "conference": "Journal of Microprocessors and Microsystems (JMM) 2024",
                "paperLink": "https://www.sciencedirect.com/science/article/abs/pii/S0141933124000565",
                "year": 2024,
                "field": "computer-architecture"
            },
            {
                "id": 40,
                "title": "Towards Efficient On-chip Communication: A Survey on Silicon Nanophotonics and Optical Network-on-Chip",
                "authors": "Uzmat Ul Nisa, Janibul Bashir",
                "conference": "Journal of Systems Architecture (JSA) 2024",
                "paperLink": "https://www.sciencedirect.com/science/article/abs/pii/S1383762124001085",
                "year": 2024,
                "field": "computer-architecture"
            }
        ]

        for pub in publications:
            pub_obj, created = Publication.objects.get_or_create(
                title=pub['title'],
                defaults={
                    'authors': pub.get('authors', ''),
                    'conference': pub.get('conference', ''),
                    'paperLink': pub.get('paperLink', ''),
                    'codeLink': pub.get('codeLink', None),
                    'year': int(pub.get('year', 2025)),
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"Added: {pub_obj.title}"))
            else:
                self.stdout.write(self.style.WARNING(f"Skipped (already exists): {pub_obj.title}"))
