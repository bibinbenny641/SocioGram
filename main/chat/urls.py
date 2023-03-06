from django.urls import path
from . import views

urlpatterns = [
    path('chatlists/<id>/',views.chatlists,name='chatlists'),
    path('create_or_find_room/<id1>/<id2>',views.create_or_find_room,name='create_or_find_room'),
    path('getMessages/<id>/',views.getMessages,name='getMessages'),
    


]