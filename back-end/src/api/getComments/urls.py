from django.urls import path
from api.views import CommentViewSetList

urlpatterns = [
    path('get/', CommentViewSetList.as_view({'get': 'list'})),
]