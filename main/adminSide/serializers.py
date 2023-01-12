from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields ='__all__'


class UserdemoSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields = ['id','fullname','user_name','phoneno']
        
