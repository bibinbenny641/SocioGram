from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    
    TokenRefreshView,
)

urlpatterns = [
    path('',views.getRoute),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.registerUser, name='register'),
    path('users/',views.getUser,name='getUser'),
    path('block/<id>/',views.BlockUser,name='BlockUser'),
    path('profile/<id>',views.profile,name='profile'),
    path('editpro/<id>',views.Editpro,name='Editpro'),
]