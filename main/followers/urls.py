from django.urls import path
from . import views

urlpatterns = [
    path('follow/',views.followlist_class.as_view(),name='follow'),
    path('follow/<pk>/',views.followlist_class.as_view(),name='follow_get'),
    path('follow_a_user/<id1>/<id2>/',views.follow_a_user,name='follow_a_user'),
    path('follow_back_users/<id1>/',views.follow_back_users,name='follow_back_users'),
    path('check_user/<id1>/<id2>/',views.check_user,name='check_user'),
    
    path('addposts/<id>',views.addposts,name='addposts'),
    path('getposts/<id>/',views.getPosts,name='getposts'),
    path('userpost/<uid>/',views.userPost,name='userPost'),
    path('searching',views.searching,name='searching'),
    path('isliked/<id>/',views.isliked,name='isliked'),
    path('editpost/<id>/',views.editpost,name='editpost'),



    ####################comments#############
    path('addcomments/<id>/<id2>/',views.addcomments,name='addcomments'),
    path('getcomments/<id>/',views.getcomments,name='getcomments'),
    path('editcomment/<id>/',views.editcomment,name='editcomment'),
    path('deletecomment/<id>/',views.deletecomment,name='deletecomment'),


    path('suggestion/<pk>/',views.suggestion,name='suggestion'),
    path('adminpost/',views.adminpost,name='adminpost'),
    path('adminpost/',views.adminpost,name='adminpost'),
    path('deletePostAdmin/<id>/',views.deletePostAdmin,name='deletePostAdmin'),

    
]