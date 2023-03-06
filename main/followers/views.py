from django.shortcuts import render
from rest_framework.views import APIView
from .models import FollowList,Posts,Like
from .serializers import FollowlistSerializer,PostSerializer
from adminSide.serializers import UserSerializer,UserdemoSerializer
from django.http import Http404

from rest_framework.response import Response
from rest_framework import status
from adminSide.models import User
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.db.models import Q
from rest_framework.permissions import AllowAny, IsAdminUser
from django.contrib.auth import get_user
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated


# Create your views here.
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class followlist_class(APIView):
    
    def post(self, request, format=None):
        print('inside the post function to follow a user ')

        print(request.data)
        serial = FollowlistSerializer(data=request.data)
        if serial.is_valid():
            serial.save()
            return Response(serial.data, status=status.HTTP_201_CREATED)
        return Response(serial.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self,request,pk):
        data = request.data
        print(data)
        print("inside the get function")
        er = FollowList.objects.filter(firstuser=pk)
        sec = FollowList.objects.filter(seconduser=pk)
        
        ser = FollowlistSerializer(er,many=True)
        sec = FollowlistSerializer(sec,many=True)
        return Response({'following':ser.data,'followers':sec.data})
    

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def addposts(request):
    print(request.user)
    data = request.data
    print(data)
    caption = data['caption']
    post = data['image']
    print(caption)
    print(post)
    p =Posts(postImage=post,postCaptioin=caption)
    p.save()
    
    return Response(status=status.HTTP_200_OK)
    


# ..................all posts fetched from here......................
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def getPosts(request,id):
    postukal = Posts.objects.all()
    myfollowers = FollowList.objects.filter(firstuser=id)
    posts = []
    for i in myfollowers:
        posts.append(i.seconduser.id)
    p = Posts.objects.filter(Q(user__in= posts) | Q(user=id)).order_by('-id')

    postSer = PostSerializer(p,many=True)
    print("haiii")
    return Response({"data":postSer.data})



# ...................... individual posts fetched from here.....................

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def userPost(request,uid):
    print("userspost functions///")
    p = Posts.objects.filter(user_id=uid).order_by("-id")
    userPostSer = PostSerializer(p,many=True)
    return Response({"data":userPostSer.data})




@api_view(['POST'])
@authentication_classes([JWTAuthentication])
def searchUser(request):
    print("search working")
    print(request.data)
    
    res = User.objects.filter(Q(fullname__icontains=request.data['name']) | Q(user_name__icontains=request.data['name']))
    print("hai")
    for i in res:
        print(i.fullname)
    
    results = UserdemoSerializer(res,many=True)

    return Response({'results':results.data})

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
def isliked(request,id):
    print('hai isliked function on backend ')
    data  = request.data
    userid = User.objects.get(id=id)
    print(userid)
    post = Posts.objects.get(id=data['id'])
    

    like = Like.objects.filter(Q(likedPost=data['id']) & Q(likedby = userid.id))
    if like:
        print('deleted the like that exists')
        like.delete()
    else:
        print('like added ')
        Like.objects.create(likedby=User.objects.get(id=userid.id),likedPost = post)


    print('success  ')
    return Response({'results':data})
@api_view(['GET'])
def getcomments(request,id):
    print("working")
    message = "hai"
    return Response({'data':message})


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def suggestion(request,pk):
    print(pk)
    user = User.objects.all().exclude(id=pk)
    followers = FollowList.objects.filter(seconduser = pk)
    s_user = []
    
    
    results = UserdemoSerializer(user,many=True)
    if results.is_valid:
        return Response(results.data,status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)


 ##################  ADMIN SIDE POST MANAGEMENT   ##########################
@api_view(['GET'])
@permission_classes([IsAdminUser])
@authentication_classes([JWTAuthentication])
def adminpost(request):
    print('inside adminpost function')
    post = Posts.objects.all().order_by('-id')
    p = PostSerializer(post,many=True)
    if p.is_valid:
        return Response(p.data,status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)



@api_view(['PATCH'])
@permission_classes([IsAdminUser])
@authentication_classes([JWTAuthentication])
def deletePostAdmin(request,id):
    print(id)
    print('delete function clicked')
    post = Posts.objects.filter(id = id)
    post.delete()
    return Response(status=status.HTTP_200_OK)




####################          #####################         ################

