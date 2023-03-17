from django.shortcuts import render
from rest_framework.views import APIView
from .models import FollowList,Posts,Like,Comments
from .serializers import FollowlistSerializer,PostSerializer,CommentSerializer
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
        
        er = FollowList.objects.filter(firstuser=pk)
        sec = FollowList.objects.filter(seconduser=pk)
        
        ser = FollowlistSerializer(er,many=True)
        sec = FollowlistSerializer(sec,many=True)
        return Response({'following':ser.data,'followers':sec.data})
    

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def addposts(request,id):
    print(request.user.id)
    userid = User.objects.get(id = id)
    print(id,'hhh')
    data = request.data
    print(data)
    caption = data['caption']
    post = data['image']
    print(caption)
    print(post)
    p =Posts(postImage=post,postCaptioin=caption,user = userid)
    p.save()
    dat = {'success':'okay'}
    return Response(dat,status=status.HTTP_200_OK)
                                                                                                                                    


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

@api_view(['POST'])
def addcomments(request,id,id2):
    print(id,'add comments inside comments f')
    print(id2)
    data = request.data
    c=data['values']
    print(c['comment'])
    comm = Comments.objects.create(post = Posts.objects.get(id=id2),user = User.objects.get(id=id),comment = c['comment'])
    ss = {'hai':'hh'}
    return Response(ss,status=status.HTTP_200_OK)

@api_view(['GET'])
def getcomments(request,id):
    print("working")
    comment = Comments.objects.filter(post=id).select_related('user').order_by('-id')
    print(comment)
    serializer = CommentSerializer(comment,many=True)
    if serializer.is_valid:
        return Response(serializer.data,status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)
    

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def suggestion(request,pk):
    
    user = User.objects.filter().exclude(id=pk)
    fo = FollowList.objects.all()
    common = User.objects.exclude(id__in=FollowList.objects.values_list('firstuser',flat=True))
    
    
    foll = User.objects.filter(followedByr__isnull=True).exclude(id=pk)

    # print(foll)
    results = UserdemoSerializer(common,many=True)
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

################## end #######################


@api_view(['POST'])
@authentication_classes([JWTAuthentication])
def follow_a_user(request,id1,id2):
    
    id = int(id2)
    print(id)
    second = User.objects.values_list('id',flat=True).get(id=id2)
    secons_user = User.objects.get(pk = id2)
    print(secons_user)
    if FollowList.objects.filter(firstuser = User.objects.get(id=id1),seconduser = User.objects.get(id=id2)).exists():
        print('already exists..........')
        unfollow = FollowList.objects.filter(firstuser = User.objects.get(id=id1),seconduser = User.objects.get(id=id2))
        unfollow.delete()
        data={'hai':'unfollowed'}
    else:
        follow = FollowList.objects.create(firstuser = User.objects.get(id=id1),seconduser = User.objects.get(id=id2))
        data = {'hai':'followed'}
    return Response(data,status=status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def follow_back_users(request,id1):
    print('haiqqqqqqqqqqqqqqqqqqqqqqq')
    following = FollowList.objects.filter(Q(firstuser = id1))
    print(following)
    f = FollowList.objects.filter(Q(firstuser=id1) and Q(seconduser=id1)).exclude(seconduser=id1)
    
    print(f,'1212121212')
    follow = FollowList.objects.filter(seconduser = id1)
    
    serial = FollowlistSerializer(follow,many=True)
    
    print(follow,'sjjssj')
    data={'hai':'hai'}
    if serial.is_valid: 
        return Response(serial.data,status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


####################          #####################         ################

