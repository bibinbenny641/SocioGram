from django.shortcuts import render
from rest_framework.views import APIView
from .models import FollowList,Posts,Likes
from .serializers import FollowlistSerializer,PostSerializer
from adminSide.serializers import UserSerializer,UserdemoSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from adminSide.models import User
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.db.models import Q
from django.contrib.auth import get_user

# Create your views here.
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
        print("inside the get function")
        # followers = FollowList.objects.filter(followedBy=pk)
        # following = FollowList.objects.filter(following=pk)
        # serial_followers = FollowlistSerializer(followers,many=True)
        # serial_following = FollowlistSerializer(following,many=True)

        # return Response({"followers":serial_followers.data,"following":serial_following.data})


        er = FollowList.objects.filter(firstuser=pk)
        sec = FollowList.objects.filter(seconduser=pk)
        
        print(er)

        ser = FollowlistSerializer(er,many=True)
        sec = FollowlistSerializer(sec,many=True)
        return Response({'following':ser.data,'followers':sec.data})




@api_view(['POST'])
def addposts(request,id):
    print("bbbbbbbbbbbbbbbbb")
    data = request.data
    print(data)
    caption = data['caption']
    post = data['image']
    print(caption)
    print(post)
    p =Posts(postImage=post,postCaptioin=caption,user=User.objects.get(id=id))
    p.save()
    
    return Response({"set":"bbbbb"})
    


# ..................all posts fetched from here......................
@api_view(['GET'])
def getPosts(request,id):
    print("hai hai posts")
    myfollowers = FollowList.objects.filter(firstuser=id)
    posts = []
    for i in myfollowers:
        posts.append(i.seconduser.id)

    new = []

    p = Posts.objects.filter(user__in= posts).order_by('-id')
    print(p[1].user.fullname)
    like = Likes.objects.all()
    print(like)
    for i in p:
        print(i.user.fullname)

    
    postSer = PostSerializer(p,many=True)
    print("haiii")
    return Response({"data":postSer.data})



# individual posts fetched from here
@api_view(['GET'])
def userPost(request,uid):
    print("userspost functions///")
    p = Posts.objects.filter(user_id=uid).order_by("-id")
    userPostSer = PostSerializer(p,many=True)
    return Response({"data":userPostSer.data})

@api_view(['POST'])
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
def isliked(request,id):
    print('hai isliked function on backend ')
    data  = request.data
    userid = User.objects.get(id=id)
    print(userid)
    post = Posts.objects.get(id=data['id'])
    liked = Likes(isLiked = userid.id,likedPost = post)
    liked.save()
    # Likes.isLiked.set(userid)
    # Likes.likedPost.set(post)
    print('success  ')
    return Response({'results':data})


