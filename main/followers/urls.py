from django.urls import path
from . import views

urlpatterns = [
    path('follow/',views.followlist_class.as_view(),name='follow'),
    path('follow/<pk>/',views.followlist_class.as_view(),name='follow_get'),
    
    path('addposts/',views.addposts,name='addposts'),
    path('getposts/<id>/',views.getPosts,name='getposts'),
    path('userpost/<uid>/',views.userPost,name='userPost'),
    path('search',views.searchUser,name='search'),
    path('isliked/<id>/',views.isliked,name='isliked'),
    path('getcomments/<id>/',views.getcomments,name='getcomments'),
    path('suggestion/<pk>/',views.suggestion,name='suggestion'),
    path('adminpost/',views.adminpost,name='adminpost'),
    path('adminpost/',views.adminpost,name='adminpost'),
    path('deletePostAdmin/<id>/',views.deletePostAdmin,name='deletePostAdmin'),

    
]