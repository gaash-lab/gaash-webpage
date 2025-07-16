import os
from django.core.management.base import BaseCommand
from django.core.files import File
from core.models import TeamMember  # Change 'core' to your app name
from django.conf import settings

class Command(BaseCommand):
    help = "Import team members into the database"

    def handle(self, *args, **kwargs):
        team = [
            {
                "name": "Dr. Janibul Bashir",
                "designation": "Department of Information Technology",
                "university": "NIT Srinagar",
                "email": "janibbashir@nitsri.ac.in",
                "website": "https://www.janibbashir.com/",
                "scholar": "https://scholar.google.co.in/citations?user=p_VztE0AAAAJ&hl=en",
                "image": "images/team/faculty/janib.png",
                "linkedin": "https://www.linkedin.com/in/janibul-bashir-272b5b70/",
                "type": "faculty"
            },
            {
                "name": "Dr. Iqra Altaf Gillani",
                "designation": "Department of Information Technology",
                "university": "NIT Srinagar",
                "email": "iqraaltaf@nitsri.ac.in",
                "website": "https://sites.google.com/nitsri.net/iqraaltaf/home",
                "scholar": "https://scholar.google.com/citations?user=Jzg3x20AAAAJ&hl=en",
                "image": "images/team/faculty/iqra.png",
                "type": "faculty"
            },
            {
                "name": "Tajamul Ashraf",
                "designation": "Researcher",
                "university": "MBZUAI",
                "email": "tajamul@sit.iitd.ac.in",
                "website": "https://www.tajamulashraf.com/",
                "github": "https://github.com/Tajamul21",
                "linkedin": "https://www.linkedin.com/in/tajamul221/",
                "scholar": "https://scholar.google.com/citations?user=n6fSkQ4AAAAJ&hl=en",
                "image": "images/team/collaborators/tajamul.png",
                "type": "collaborator"
            },
            {
                "name": "Aqsa Makhdoomi",
                "designation": "SRF",
                "email": "aqsa_2021phaite002@nitsri.ac.in",
                "university": "NIT Srinagar",
                "scholar": "https://scholar.google.com/citations?user=QN2u0PgAAAAJ&hl=en&oi=ao",
                "linkedin": "https://www.linkedin.com/in/aqsa-makhdoomi-425a86167/",
                "github": "https://github.com/AqsaMakhdoomi/",
                "type": "project"
            },
            {
                "name": "Rabia Bhat",
                "designation": "PhD Scholar",
                "email": "rabiabhat_2023phaite002@nitsri.ac.in",
                "scholar": "https://scholar.google.com/citations?hl=en&user=Q3t0mCdMwDoC",
                "image": "Rabia",
                "university": "NIT Srinagar",
                "linkedin": "https://www.linkedin.com/in/rabia-bhat-60170235a/",
                "github": "https://github.com/RabiaLatief07",
                "type": "scholar"
            },
            {
                "name": "Uzmat Ul Nisa",
                "designation": "PhD Scholar",
                "university": "NIT Srinagar",
                "email": "uzmat_2021phaite004@nitsri.ac.in",
                "scholar": "https://scholar.google.com/citations?user=ido_DnsAAAAJ&hl=en&oi=ao",
                "linkedin": "http://www.linkedin.com/in/uzmat-ul-nisa",
                "type": "scholar"
            },
            {
                "name": "Umar Bashir",
                "designation": "PhD Scholar",
                "university": "NIT Srinagar",
                "email": "umar_2022phaite005@nitsri.ac.in",
                "scholar": "https://scholar.google.com/citations?hl=en&user=HQguZbsAAAAJ",
                "linkedin": "https://www.linkedin.com/in/umar-mir-279079116?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                "image": "Umar",
                "type": "scholar"
            },
            {
                "name": "Aaqib Zahoor",
                "designation": "PhD Scholar",
                "university": "NIT Srinagar",
                "email": "aaqib_phaite003@nitsri.ac.in",
                "scholar": "https://scholar.google.com/citations?user=z0lFQhEAAAAJ&hl=en&oi=sra",
                "linkedin": "https://www.linkedin.com/in/aaqib-zahoor-112a47147/",
                "website": "https://www.aaqibzahoor.in/",
                "github": "https://github.com/AaqibZ",
                "image": "Aqib",
                "type": "scholar"
            },
            {
                "name": "Aksa Urooj",
                "designation": "PhD Scholar",
                "university": "NIT Srinagar",
                "image": "Aksa",
                "github": "http://github.com/aksa-urooj",
                "email": "aksaurooj62@gmail.com",
                "linkedin": "https://www.linkedin.com/in/aksaurooj07/",
                "type": "scholar"
            },
            {
                "name": "Tajamul Ashraf",
                "designation": "Researcher",
                "university": "MBZUAI",
                "email": "tajamul@sit.iitd.ac.in",
                "website": "https://www.tajamulashraf.com/",
                "github": "https://github.com/Tajamul21",
                "linkedin": "https://www.linkedin.com/in/tajamul221/",
                "scholar": "https://scholar.google.com/citations?user=n6fSkQ4AAAAJ&hl=en",
                "image": "Tajamul",
                "type": "collaborator"
            },
            {
                "name": "Dr. Moloud Abdar",
                "designation": "Senior Data Scientist",
                "university": "University of Queensland",
                "email": "tajamul@sit.iitd.ac.in",
                "linkedin": "https://www.linkedin.com/in/moloud-abdar-997126b9/?originalSubdomain=au",
                "scholar": "https://scholar.google.com/citations?user=PwgggdIAAAAJ&hl=en",
                "image": "Moloud",
                "type": "collaborator"
            },
            {
                "name": "Dr. Sadia Hussain",
                "designation": "Contractual Faculty",
                "university": "NIT Srinagar",
                "email": "sadiahussain.hussain@gmail.com",
                "scholar": "https://scholar.google.com/citations?user=AnznRVEAAAAJ&hl=en",
                "linkedin": "https://www.linkedin.com/in/sadia-hussain-1b0028119/",
                "image": "Sadia",
                "github": "https://github.com/sadiahussain",
                "type": "collaborator"
            },
            {
                "name": "Tavaheed Tariq",
                "designation": "B.Tech Student",
                "email": "tawheedtariq090@gmail.com",
                "website": "https://tavaheed.netlify.app/",
                "linkedin": "https://www.linkedin.com/in/tawheed-tariq-868b02249/",
                "github": "https://github.com/Tawheed-tariq",
                "type": "student"
            },
            {
                "name": "Sonia Yadav",
                "designation": "B.Tech Student",
                "email": "soniayadavnitsgr@gmail.com",
                "linkedin": "https://www.linkedin.com/in/sonia-yadav-a05444282/",
                "github": "https://github.com/ya-sonia",
                "type": "student"
            },
            {
                "email": "abrarnitsri0@gmail.com",
                "linkedin": "https://www.linkedin.com/in/abrar-ul-riyaz-a7852432a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                "github": "https://github.com/AbrarAhmed435",
                "designation": "B.Tech Student",
                "name": "Abrar-ul-Riyaz",
                "type": "student"
            },
            {
                "email": "shubhamraihero2015@gmail.com",
                "linkedin": "https://www.linkedin.com/in/shubham-rai-969267225",
                "github": "https://github.com/Shubham23011",
                "designation": "B.Tech Student",
                "name": "Subham Rai",
                "type": "student"
            },
            {
                "name": "Mohammad Hashid",
                "email": "hashidmyt@gmail.com",
                "type": "student"
            },
            {
                "name": "Tejal Kumari",
                "email": "tejal_2022bite083@nitsri.ac.in",
                "linkedin": "https://www.linkedin.com/in/tejal-kumari-3b652725b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                "type": "student"
            },
            {
                "email": "burhaanrasheed1350@gmail.com",
                "name": "Burhaan Rasheed",
                "designation": "B.Tech Student",
                "linkedin": "https://www.linkedin.com/in/burhaan-rasheed-zargar?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                "github": "https://github.com/BurhaanRasheedZargar",
                "type": "student"
            }
        ]

        for member in team:
            image_path = member.get('image')
            image_file = None

            if image_path:
                full_path = os.path.join(settings.MEDIA_ROOT, image_path)
                if os.path.exists(full_path):
                    image_file = File(open(full_path, 'rb'))
                else:
                    self.stdout.write(self.style.WARNING(f"Image not found: {image_path}"))

            obj, created = TeamMember.objects.get_or_create(
                name=member['name'],
                defaults={
                    'designation': member.get('designation', ''),
                    'university': member.get('university', ''),
                    'email': member.get('email', ''),
                    'website': member.get('website', ''),
                    'scholar': member.get('scholar', ''),
                    'linkedin': member.get('linkedin', ''),
                    'github': member.get('github', ''),
                    'type': member.get('type', 'faculty'),
                }
            )

            if image_file:
                obj.image.save(os.path.basename(image_path), image_file, save=True)

            if created:
                self.stdout.write(self.style.SUCCESS(f"Added: {obj.name}"))
            else:
                self.stdout.write(self.style.WARNING(f"Skipped (already exists): {obj.name}"))
