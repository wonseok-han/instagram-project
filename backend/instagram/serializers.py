from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Post


class AuthoSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["username", "name", "avatar_url"]


class PostSerializer(serializers.ModelSerializer):
    author = AuthoSerializer(read_only=True)

    class Meta:
        model = Post
        fields = "__all__"
