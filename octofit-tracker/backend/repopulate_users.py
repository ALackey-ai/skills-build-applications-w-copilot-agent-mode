import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "octofit_tracker.settings")
django.setup()
from octofit_tracker.models import User

# Example users to add
users = [
    {"username": "alice", "email": "alice@example.com", "password": "password123"},
    {"username": "bob", "email": "bob@example.com", "password": "password123"},
    {"username": "charlie", "email": "charlie@example.com", "password": "password123"},
]

def run():
    for u in users:
        if not User.objects.filter(email=u["email"]).exists():
            User.objects.create(**u)
    print("Users repopulated.")

if __name__ == "__main__":
    run()
