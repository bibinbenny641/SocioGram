from rest_framework import serializers
from .models import FollowList,Posts,Like,Comments
from adminSide.serializers import UserdemoSerializer

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
    # commenteduser = CommentSerializer(many = True,read_only = True)
    class Meta:
        model = Posts
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    user_na = serializers.SerializerMethodField()
    class Meta:

        model = Comments
        fields = 'id','post','user','comment','user_na'

    def get_user_na(self,ob):
        print('hai')
        return ob.user.fullname
    
        