from rest_framework import serializers
from .models import FollowList,Posts

class FollowlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowList
        fields ='__all__'


class PostSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Posts
        fields = '__all__'