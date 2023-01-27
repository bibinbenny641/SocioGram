from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from adminSide.models import User
from django.contrib.auth.hashers import make_password
from adminSide.serializers import UserSerializer
from followers.serializers import FollowlistSerializer
from rest_framework import status
from followers.models import FollowList

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['is_active'] = user.active
        token['fullname'] = user.fullname
        token['phoneno'] = user.phoneno
        token['is_admin'] = user.admin
        token['is_staff'] = user.staff
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoute(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
        'users',
        'block'
        
    ]
    return Response(routes)


@api_view(['POST'])
def registerUser(request):
    try:

        data = request.data
        print(data)
        fullname = data['fullname']
        print(fullname)
        email = data['email']
        phoneno = data['phoneno']
        

        if User.objects.filter(email=email).exists():
            print('email exists')
            message = "email already exists"
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(phoneno=phoneno).exists():
            print("phoneno exists")
            message="phone no already taken"
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        else:
            print("uccess")
            user = User.objects.create(
            fullname = data['fullname'],
            email = data['email'],
            phoneno=data['phoneno'],
            password = make_password(data['password1'])
            )
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    except Exception as e:
        print(e)
        message = {'detail': 'Some Problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)    
    

@api_view(['GET'])
@permission_classes([IsAdminUser])
@authentication_classes([JWTAuthentication])
def getUser(request):
    u = User.objects.filter()
    print("uuuuuuuuuuuuuuuuuuu")
    print(u)
    serializer = UserSerializer(u, many=True)
    print("nnnnnnnnnnnnnnnn")
    print(serializer)
    return Response({"data":serializer.data})



@api_view(['PATCH'])
@permission_classes([IsAdminUser])
@authentication_classes([JWTAuthentication])
def BlockUser(request,id):
    user = User.objects.get(id=id)
    print(user.active)
    print("bibbibibibibibibibibi")
    if user.active==True:
        user.active = False
    else:
        user.active = True
    user.save()
    serializer = UserSerializer(user, many=False)
    return Response({"data":serializer.data})

@api_view(['GET'])
def profile(reques,id):
    print('profile function clicked')
    user = User.objects.get(id=id)
    serializer = UserSerializer(user, many=False)
    return Response({"data":serializer.data})


@api_view(['PUT'])
def Editpro(request,id):
    user = User.objects.get(id=id)
    data = request.data
    print(data)
    fullname = data['fullname']
    user_name = data['user_name']

    user.fullname = fullname
    user.user_name = user_name
    user.save()
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)