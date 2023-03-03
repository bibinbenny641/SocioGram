from rest_framework import serializers
from .models import FollowList,Posts,Like

class FollowlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowList
        fields ='__all__'


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):

    liked_post = LikeSerializer(many=True,read_only = True)
    class Meta:
        model = Posts
        fields = '__all__'



        