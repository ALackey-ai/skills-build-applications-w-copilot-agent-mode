import pymongo
from bson import ObjectId

client = pymongo.MongoClient('mongodb://127.0.0.1:27017')
db = client['octofit_tracker']
users = db['octofit_tracker_user']

# Remove all existing users
users.delete_many({})

# Insert new users
new_users = [
    {"_id": ObjectId(), "username": "alice", "email": "alice@example.com", "password": "password123"},
    {"_id": ObjectId(), "username": "bob", "email": "bob@example.com", "password": "password123"},
    {"_id": ObjectId(), "username": "charlie", "email": "charlie@example.com", "password": "password123"},
]

users.insert_many(new_users)
print("Inserted new users into MongoDB.")
