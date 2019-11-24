from django.db import models

# Create your models here.

# User model
class User(models.Model):
    name = models.CharField(max_length=120)
    email = models.CharField(max_length=120)
    password = models.CharField(max_length=120)

# Bucket model
class Bucket(models.Model):
    name = models.CharField(max_length=120)
    belongs_to = models.ForeignKey(User, related_name='belongs_to', on_delete=models.CASCADE)

# todo model
class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    belongs_to = models.ForeignKey(Bucket, on_delete=models.CASCADE)
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE)
    
    # def _str_(self):
    #     return self.title