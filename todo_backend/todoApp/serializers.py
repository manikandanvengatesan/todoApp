from rest_framework import serializers
from .models import User
from .models import Bucket
from .models import Todo

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'email')

class BucketSerializer(serializers.ModelSerializer):
    #belongs_to = serializers.StringRelatedField(many=False)
    class Meta:
        model = Bucket
        fields = ('id', 'name', 'belongs_to')

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description', 'completed','belongs_to','assigned_to')