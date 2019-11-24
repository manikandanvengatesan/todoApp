from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework import generics
from .serializers import UserSerializer
from .serializers import BucketSerializer
from .serializers import TodoSerializer
from .models import User
from .models import Bucket
from .models import Todo

class Login(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    def get_queryset(self):
        queryset = User.objects.all()
        email = self.request.query_params.get('email', None)
        password = self.request.query_params.get('password', None)
        if email is not None:
            queryset = queryset.filter(email=email,password=password)
        return queryset

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class BucketView(viewsets.ModelViewSet):
    serializer_class = BucketSerializer
    def get_queryset(self):
        user_id = self.request.query_params.get('user_id', None)
        queryset = Bucket.objects.filter(belongs_to=user_id)
        return queryset

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    def get_queryset(self):
        user_id = self.request.query_params.get('user_id', None)
        queryset = Todo.objects.filter(_to=user_id)
        return queryset