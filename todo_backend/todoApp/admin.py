from django.contrib import admin
from .models import User
from .models import Bucket
from .models import Todo

class UserAdmin(admin.ModelAdmin):
    list_display=['id', 'name', 'email']

class BucketAdmin(admin.ModelAdmin):
    list_display=['id', 'name', 'belongs_to']

class TodoAdmin(admin.ModelAdmin):
    list_display=['id', 'title', 'description', 'completed','belongs_to','assigned_to']
# Register your models here.

admin.site.register(User, UserAdmin)
admin.site.register(Bucket, BucketAdmin)
admin.site.register(Todo, TodoAdmin)