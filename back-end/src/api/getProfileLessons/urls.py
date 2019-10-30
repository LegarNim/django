from django.urls import path
from api.views import LessonViewSetList

urlpatterns = [
    path('get/', LessonViewSetList.as_view({'get': 'list'})),
]