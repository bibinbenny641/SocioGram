from rest_framework import serializers
from .models import FollowList,Posts,Likes

class FollowlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowList
        fields ='__all__'


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = '__all__'

class LikeSerializer(serializers.ModelSerializer):
    post = PostSerializer()
    class Meta:
        model = Likes
        fields = '__all__'



        