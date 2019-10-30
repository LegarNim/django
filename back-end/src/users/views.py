from rest_framework import viewsets
from django.shortcuts import render

from .models import UserAuth
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = UserAuth.objects.all()