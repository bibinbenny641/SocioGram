from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from adminSide.models import User
from followers.models import FollowList
from followers.serializers import FollowlistSerializer
from adminSide.serializers import UserSerializer,UserdemoSerializer
from rest_framework import status
from.models import Room,Message
from.serializers import RoomSerializers,MessageSerializer
# Create your views here.

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def chatlists(request,id):
    print('hai inside chat app')
    chats = FollowList.objects.filter(firstuser = id)
    print(chats)
    seriali = FollowlistSerializer(chats,many = True)
    if seriali.is_valid:
        return Response(seriali.data,status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)
    

@api_view(['GET'])
def create_or_find_room(request,id1,id2):
    id1=User.objects.get(id=id1)
    id2=User.objects.get(id=id2)
    print(id1,id2,'jjjjjjj')
    if request.method == 'GET':
        try:
            posts = Room.objects.get(first_person=id1,second_person=id2)
        except:
            try:
                posts = Room.objects.get(first_person=id2,second_person=id1)
            except:
                posts = Room.objects.create(first_person=id1,second_person=id2)
                posts.save()
        serialzer = RoomSerializers(posts)
        if serialzer.is_valid:
            return Response(serialzer.data,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
        
@api_view(['GET'])
def getMessages(request,id):
    print('jjaij')
    if request.method == 'GET':
        msg = Message.objects.filter(room=id)
        serialzer = MessageSerializer(msg, many=True)
        if serialzer.is_valid:
            return Response(serialzer.data,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
