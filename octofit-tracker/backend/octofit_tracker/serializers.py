from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout
from bson import ObjectId

class ObjectIdField(serializers.Field):
    def to_representation(self, value):
        return str(value)

    def to_internal_value(self, data):
        return ObjectId(data)

class UserSerializer(serializers.ModelSerializer):
    _id = ObjectIdField()

    class Meta:
        model = User
        fields = '__all__'

class TeamSerializer(serializers.ModelSerializer):
    _id = ObjectIdField()
    members = UserSerializer(many=True)

    class Meta:
        model = Team
        fields = '__all__'

class ActivitySerializer(serializers.ModelSerializer):
    _id = ObjectIdField(required=False)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Activity
        fields = '__all__'

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        # Ensure _id is always a string
        if '_id' in rep and rep['_id']:
            rep['_id'] = str(rep['_id'])
        # Ensure user is always a string
        if 'user' in rep and rep['user']:
            rep['user'] = str(rep['user'])
        return rep

class LeaderboardSerializer(serializers.ModelSerializer):
    _id = ObjectIdField()
    user = UserSerializer()

    class Meta:
        model = Leaderboard
        fields = '__all__'

class WorkoutSerializer(serializers.ModelSerializer):
    _id = ObjectIdField()

    class Meta:
        model = Workout
        fields = '__all__'
