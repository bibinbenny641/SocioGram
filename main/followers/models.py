from django.db import models
from adminSide.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
import datetime 
# Create your models here.
class FollowList(models.Model):
    seconduser = models.ForeignKey(User ,on_delete= models.CASCADE,related_name='followingr')
    firstuser = models.ForeignKey(User ,on_delete= models.CASCADE,related_name='followedByr')
    firstUname = models.CharField(max_length=255,null=True)
    secondUname= models.CharField(max_length=255,null=True)
    time = models.TimeField(auto_now_add=True)

@receiver(post_save,sender=FollowList)
def socio(sender,instance,**kwargs):
    ins = instance.firstuser

    f = FollowList.objects.get(id = instance.id)
    print(f.firstuser.fullname)
    print(f.seconduser.fullname)
    FollowList.objects.filter(id = instance.id).update(firstUname=f.firstuser.fullname,secondUname=f.seconduser.fullname)
        


class Posts(models.Model):
    postImage = models.ImageField(upload_to='pics/')
    postCaptioin = models.CharField(max_length=255,null=True,default=None)
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="posts")
    username = models.CharField(max_length=255,null=True)
    date = models.TimeField(auto_now_add=True)
    visibility = models.BooleanField(default=True)

@receiver(post_save,sender=Posts)
def addUsername(sender,instance,**kwargs):
    print("...........................................")

    Posts.objects.filter(id=instance.id).update(username = User.objects.filter(id=instance.user.id).values('user_name') ) 
